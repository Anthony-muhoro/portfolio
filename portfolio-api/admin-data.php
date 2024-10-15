<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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
        // Fetch contact info
        $query = "SELECT * FROM contact_info LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $contactInfo = $stmt->fetch(PDO::FETCH_ASSOC);

        // Fetch skills
        $query = "SELECT * FROM skills";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $skills = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch projects
        $query = "SELECT * FROM projects";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch messages
        $query = "SELECT * FROM messages ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode(array(
            "contactInfo" => $contactInfo,
            "skills" => $skills,
            "projects" => $projects,
            "messages" => $messages
        ));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid token"));
    }
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Token not provided"));
}
?>