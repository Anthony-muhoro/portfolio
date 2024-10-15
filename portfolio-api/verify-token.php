<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';
require_once 'jwt.php';

$headers = getallheaders();
$jwt = new JWTHandler(JWT_SECRET);

if (isset($headers['Authorization'])) {
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $decoded = $jwt->validateToken($token);

    if ($decoded) {
        http_response_code(200);
        echo json_encode(array("valid" => true, "user_id" => $decoded->id));
    } else {
        http_response_code(401);
        echo json_encode(array("valid" => false, "message" => "Invalid token"));
    }
} else {
    http_response_code(401);
    echo json_encode(array("valid" => false, "message" => "Token not provided"));
}
?>