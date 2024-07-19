<?php
include 'database.php';
$folderPath = "img/";


$postdata = $_POST;

// var_dump($_FILES['fileSource']);
// die;
//check allfields are required
if(!isset($_POST['name'])){
    http_response_code(400);
    echo json_encode(array("message"=>"Missing paramters"));
    return;
}
// extract data from request
$catname = $_POST['name'];


//check if any required field is empty
if(empty($catname)){
 http_response_code(400);
 echo json_encode(array("message"=>"please fill the field"));
}

// Check if a file is uploaded and there are no errors
if($_POST['file'] !="")
{
    $file_tmp = $_FILES['fileSource']['tmp_name'];
    $file_ext = explode('.',$_FILES['fileSource']['name']);
    $file_extension = end($file_ext);
    $file = $folderPath . uniqid() . '.'.$file_extension;
    move_uploaded_file($file_tmp, $file);
}else{
    $file='';
}

//insert data into database
$insert_query="INSERT INTO catogery(cat_name,cat_img) VALUES (?,?)";
$stmt = $conn->prepare($insert_query);
$stmt->bind_param("ss",$catname,$file);

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