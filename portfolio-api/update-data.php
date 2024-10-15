<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';
require_once 'db.php';
require_once 'jwt.php';

$database = new Database();
$db = $database->connect();

$headers = getallheaders();
$jwt = new JWTHandler(JWT_SECRET);

if (isset($headers['Authorization'])) {
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $decoded = $jwt->validateToken($token);

    if ($decoded) {
        $data = json_decode(file_get_contents("php://input"));

        try {
            $db->beginTransaction();

            // Update contact info
            $query = "UPDATE contact_info SET email = :email, phone = :phone, whatsapp = :whatsapp WHERE id = 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':email', $data->contactInfo->email);
            $stmt->bindParam(':phone', $data->contactInfo->phone);
            $stmt->bindParam(':whatsapp', $data->contactInfo->whatsapp);
            $stmt->execute();

            // Update skills
            $deleteSkills = "DELETE FROM skills";
            $db->exec($deleteSkills);

            $insertSkill = "INSERT INTO skills (name, level) VALUES (:name, :level)";
            $stmt = $db->prepare($insertSkill);
            foreach ($data->skills as $skill) {
                $stmt->bindParam(':name', $skill->name);
                $stmt->bindParam(':level', $skill->level);
                $stmt->execute();
            }

            // Update projects
            $deleteProjects = "DELETE FROM projects";
            $db->exec($deleteProjects);

            $insertProject = "INSERT INTO projects (title, description) VALUES (:title, :description)";
            $stmt = $db->prepare($insertProject);
            foreach ($data->projects as $project) {
                $stmt->bindParam(':title', $project->title);
                $stmt->bindParam(':description', $project->description);
                $stmt->execute();
            }

            $db->commit();

            http_response_code(200);
            echo json_encode(array("success" => true, "message" => "Data updated successfully"));
        } catch (Exception $e) {
            $db->rollBack();
            http_response_code(500);
            echo json_encode(array("success" => false, "message" => "Failed to update data: " . $e->getMessage()));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("success" => false, "message" => "Invalid token"));
    }
} else {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Token not provided"));
}
?>