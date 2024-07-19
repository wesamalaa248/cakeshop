<?php
include 'database.php';
//get content (body) write in postman
$postdata=file_get_contents("php://input");
//decode json data to array
$request=json_decode($postdata,true);
//check allfields are required
if(!isset($request['name'])||!isset($request['price'])||!isset($request['quantity'])
||!isset($request['description'])||!isset($request['catogery'])){
    http_response_code(400);
    echo json_encode(array("message"=>"Missing paramters"));
    return;
}
// extract data from request
$pname = $request['name'];
$price=$request['price'];
$quantity=$request['quantity'];
$desc=$request['description'];
$catogery=$request['catogery'];
// $image = $request['image'];

//check if any required field is empty
if(empty($pname)||empty($price)||empty($quantity)||empty($desc)||empty($catogery)){
 http_response_code(400);
 echo json_encode(array("message"=>"please fill the field"));
}

//insert data into database
$insert_query="INSERT INTO products(pro_name,pro_price,pro_quntity,pro_description,pro_img,pro_cat_id) VALUES (?,?,?,?,?,?)";
$stmt = $conn->prepare($insert_query);
$stmt->bind_param("ssssss",$pname,$price,$quantity,$desc,$image,$catogery);

// Execute the prepared statement
if ($stmt->execute()) {
    echo json_encode(array("message" => "Operation Successful"));
} else {
    // http_response_code(500);
    echo json_encode(array("message" => "Error inserting user into database: " . $conn->error));
}
// Close the statement and connection
$stmt->close();
$conn->close();
?>