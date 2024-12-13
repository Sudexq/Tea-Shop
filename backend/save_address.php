<?php
include 'config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'config.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
$user_id = $data['user_id'] ?? null;
$address = $data['address'] ?? null;
$city = $data['city'] ?? null;
$postal_code = $data['postal_code'] ?? null;
$phone = $data['phone'] ?? null;

if (!$user_id || !$address || !$city || !$postal_code || !$phone) {
    echo json_encode(['error' => 'All fields are required.']);
    exit;
}

// Update address details in the database
$sql = "UPDATE users SET address = ?, city = ?, postal_code = ?, phone = ? WHERE id = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssssi", $address, $city, $postal_code, $phone, $user_id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Address saved successfully.']);
} else {
    echo json_encode(['error' => 'Failed to save address. Please try again.']);
}

$stmt->close();
$connection->close();
?>
