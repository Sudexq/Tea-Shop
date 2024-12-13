<?php
include 'config.php';

header('Content-Type: application/json');

$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$image_url = $_POST['image_url'];
$stock = $_POST['stock'];

$sql = "INSERT INTO products (name, description, price, image_url, stock) 
        VALUES ('$name', '$description', $price, '$image_url', $stock)";

if ($connection->query($sql) === TRUE) {
    echo json_encode(['message' => 'Product added successfully']);
} else {
    echo json_encode(['error' => 'Failed to add product']);
}
?>
