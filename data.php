<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Expose-Headers: X-MIK-WARNING");
header("Content-Type: application/json");


$allowedFiles = ['data.json', 'data-en.json', 'data-fr.json', 'new-json.json', 'mik-json.json'];

$requestedFile = isset($_GET['file']) ? basename($_GET['file']) : 'data.json';
$originalFile = $requestedFile;

if (!in_array($requestedFile, $allowedFiles)) {
    $requestedFile = 'data.json';
    header("X-MIK-WARNING: Requested file '{$originalFile}' is not allowed. Using default 'data.json'.");
}

$filePath = __DIR__ . '/' . $requestedFile;

if (file_exists($filePath)) {
    echo file_get_contents($filePath);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'File not found.']);
}
