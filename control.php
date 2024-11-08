<?php
// Get the URL
$url = isset($_GET['url']) ? rtrim($_GET['url'], '/') : '';
$urlParts = explode('/', $url);

// Extract the class and method
$class = isset($urlParts[0]) ? $urlParts[0] : '';
$method = isset($urlParts[1]) ? $urlParts[1] : 'index';

// Load the class file
require_once "classes/$class.php"; // Assuming classes are in a "classes" directory

// Check if class and method exist
if (class_exists($class) && method_exists($class, $method)) {
    $obj = new $class();
    echo $obj->$method(); // Call the method and output the result
} else {
    echo json_encode(['error' => 'Invalid route']);
}
