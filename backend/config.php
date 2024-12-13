<?php
$host = 'localhost';
$user = 'root'; // Default XAMPP MySQL user
$password = ''; // Leave blank if no password is set
$database = 'tea_shop_db';

$connection = new mysqli($host, $user, $password, $database);

if ($connection->connect_error) {
    die("Database connection failed: " . $connection->connect_error);
}
?>
