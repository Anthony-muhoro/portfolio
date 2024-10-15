<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

class JWTHandler {
    private $secret;

    public function __construct($secret) {
        $this->secret = $secret;
    }

    public function generateToken($data) {
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600; // Valid for 1 hour

        $payload = array(
            "iat" => $issuedAt,
            "exp" => $expirationTime,
            "data" => $data
        );

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function validateToken($token) {
        try {
            $decoded = JWT::decode($token, $this->secret, array('HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            return false;
        }
    }
}
?>