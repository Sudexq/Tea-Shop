<?php
include 'config.php';

header('Content-Type: application/json');

$id = $_POST['id'];

$sql = "DELETE FROM products WHERE id = $id";

if ($connection->query($sql) === TRUE) {
    echo json_encode(['message' => 'Product deleted successfully']);
} else {
    echo json_encode(['error' => 'Failed to delete product']);
}
?>
