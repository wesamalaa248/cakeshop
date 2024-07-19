<?php
include 'database.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata,true);

// Check if the required field 'id' is present
if (!isset($request['id'])) {
    http_response_code(400);
    echo json_encode(array("message" => "Missing parameter 'id'"));
    return;
}
// Extract data from request
$product_id = $request['id'];

// Prepare the DELETE statement
$delete_query = "DELETE FROM products WHERE pro_id=?";
$stmt = $conn->prepare($delete_query);
$stmt->bind_param("i", $product_id);

if ($stmt->execute()) {
    echo json_encode(array("message" => "Product deleted successfully"));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error deleting product from database: " . $stmt->error));
}

// Close the statement and connection
$stmt->close();
$conn->close();



?>