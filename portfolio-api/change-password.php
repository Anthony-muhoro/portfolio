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

        if (!empty($data->newPassword)) {
            $hashedPassword = password_hash($data->newPassword, PASSWORD_DEFAULT);

            $query = "UPDATE admin SET password = :password WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':id', $decoded->id);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("success" => true, "message" => "Password changed successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("success" => false, "message" => "Failed to change password"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "New password is required"));
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