<?php
include 'database.php';
//get content (body) write in postman
$postdata=file_get_contents("php://input");
//decode json data to array
$request=json_decode($postdata,true);
//check allfields are required
if(!isset($request['name'])||!isset($request['email'])||!isset($request['phone'])||!isset($request['pass'])){
    http_response_code(400);
    echo json_encode(array("message"=>"Missing paramters"));
    return;
}
// extract data from request
$username = $request['name'];
$email = $request['email'];
$phonenum = $request['phone'];
$password = $request['pass'];

//check if any required field is empty
if(empty($username)||empty($email)||empty($phonenum)||empty($password)){
 http_response_code(400);
 echo json_encode(array("message"=>"please fill the field"));
}

// Validate email format
// if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Invalid email format"));
//     return;
// }

// Check if the email already exists in the database
$select_query="SELECT * FROM register WHERE reg_email = ? OR reg_name= ?";
$stmt = $conn->prepare($select_query);
$stmt->bind_param("ss", $email,$username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // http_response_code(409); // Conflict status code
    echo json_encode(array("message" => "Email already exists"));
    return;
}

//Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

//insert data into database
$insert_query="INSERT INTO register(reg_name,reg_email,reg_phone,reg_password) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($insert_query);
$stmt->bind_param("ssss", $username, $email,$phonenum,$hashedPassword);

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