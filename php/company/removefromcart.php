<?php
include 'database.php';
$data = json_decode(file_get_contents("php://input"));

if (isset($data->productId)) {
    $productId = $data->productId;

    // Prepare statement to delete the cart item
    $stmt = $conn->prepare("DELETE FROM cart WHERE product_id = ?");
    $stmt->bind_param("i", $productId);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product removed from cart successfully"]);
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