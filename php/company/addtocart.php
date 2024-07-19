<?php
include 'database.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->productId)) {
    $productId = $data->productId;

    // Prepare statement to insert or update the cart item
    $stmt = $conn->prepare("INSERT INTO cart (product_id,quantity) VALUES (?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1");
    $stmt->bind_param("i", $productId);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product added to cart successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}
?>
