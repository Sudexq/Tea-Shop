<?php
session_start();
include 'config.php';

// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id']; // Get logged-in user ID

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);
$cartItems = $data['cartItems'] ?? [];
$total_price = $data['totalPrice'] ?? 0;

// Validate order data
if (empty($cartItems) || $total_price <= 0) {
    echo json_encode(['error' => 'Invalid order data.']);
    exit;
}

// Generate a unique order number
$order_number = uniqid();

// Convert cart items to JSON
$items_json = json_encode($cartItems);

// Insert the order into the `orders` table
$sql = "INSERT INTO orders (user_id, order_number, items, total_price) VALUES (?, ?, ?, ?)";
$stmt = $connection->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Failed to prepare statement for orders: ' . $connection->error]);
    exit;
}

$stmt->bind_param("issd", $user_id, $order_number, $items_json, $total_price);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Order placed successfully.', 'order_number' => $order_number]);
} else {
    echo json_encode(['error' => 'Failed to insert order: ' . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$connection->close();
?>
