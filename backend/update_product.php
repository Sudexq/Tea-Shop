<?php
include 'config.php';

header('Content-Type: application/json');

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$image_url = $_POST['image_url'];
$stock = $_POST['stock'];

$sql = "UPDATE products SET 
           name = '$name', 
           description = '$description', 
           price = $price, 
           image_url = '$image_url', 
           stock = $stock 
       WHERE id = $id";

if ($connection->query($sql) === TRUE) {
    echo json_encode(['message' => 'Product updated successfully']);
} else {
    echo json_encode(['error' => 'Failed to update product']);
}
?>
