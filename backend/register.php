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

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$name || !$email || !$password) {
    echo json_encode(['error' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Invalid email format.']);
    exit;
}

// Check if email already exists
$sql = "SELECT id FROM users WHERE email = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['error' => 'Email already exists.']);
    exit;
}

// Insert user into the database
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Registration successful.']);
} else {
    echo json_encode(['error' => 'Failed to register. Please try again.']);
}

$stmt->close();
$connection->close();
?>
