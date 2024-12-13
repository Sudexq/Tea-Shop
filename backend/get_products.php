<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from React frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers
header("Access-Control-Allow-Credentials: true"); // Allow credentials if needed

include 'config.php';

header('Content-Type: application/json');
// Fetch products
$sql = "SELECT id, name, description, CAST(price AS DECIMAL(10,2)) AS price, image_url, stock FROM products";
$result = $connection->query($sql);

$products = [];
while ($row = $result->fetch_assoc()) {
    $row['price'] = (float) $row['price']; // Convert price to a float
    $products[] = $row;
}

echo json_encode($products);
?>