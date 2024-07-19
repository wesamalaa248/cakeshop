<?php
include 'database.php';


$sql = "SELECT cart.id AS id, products.pro_id AS product_id, products.pro_name, products.pro_price, products.pro_img, cart.quantity 
        FROM cart 
        JOIN products ON cart.product_id = products.pro_id";

$result = $conn->query($sql);

$cartItems = array();
while ($row = $result->fetch_assoc()) {
    $cartItems[] = $row;
}

echo json_encode($cartItems);

$conn->close();
?>