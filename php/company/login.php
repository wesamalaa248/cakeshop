<?php
include 'database.php';
$postdata=file_get_contents("php://input");
//decode json data to array
$request=json_decode($postdata,true);
// check allfields are required
if(!isset($request['email'])||!isset($request['password'])){
    http_response_code(400);
    echo json_encode(array("message"=>"Missing paramters"));
    return;
}
// extract data from request
$email = $request['email'];
$password = $request['password'];

//check if any required field is empty
if(empty($email)||empty($password)){
 http_response_code(400);
 echo json_encode(array("message"=>"please fill the field"));
}

//Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the name and email already exist in the database
$select_query = "SELECT * FROM register WHERE reg_email = ?";
$stmt = $conn->prepare($select_query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check for database errors
if (!$result) {
    http_response_code(500);
    echo json_encode(array("message" => "Database error: " . $conn->error));
}

// Check if the email exists
if ($result->num_rows > 0) {
    // Fetch the user row
    $user = $result->fetch_assoc();
    // Verify the hashed password
    if (password_verify($password, $user['reg_password'])) {
        // http_response_code(200);
        // Return user data
        $userData = array(
            "id" => $user['reg_id'],"name"=>$user['reg_name'],
            "email" => $user['reg_email'],"phone" => $user['reg_phone'],"type" =>$user['type'] );

        echo json_encode(array("message" => "Login success","user_data_login" => $userData));
    } 
    else {
        // http_response_code(401);
        echo json_encode(array("message" => "Email or password is wrong"));
        return;
    }
}
// Close the statement and connection
$stmt->close();
$conn->close();
?>