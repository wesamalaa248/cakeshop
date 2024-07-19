<?php
include 'database.php';

// show by url
if(isset($_GET['cond'])){
 $cond=$_GET['cond'];
$sql="SELECT * FROM products WHERE ".$cond; 
}
else {
$sql="SELECT * FROM products ";
}
$stmt=$conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $users = array();
    while ($row=$result->fetch_assoc()){
        $users[]=$row;
    }
    echo json_encode($users);  
}
else{
    echo json_encode(array()); 
}

$stmt->close();
$conn->close();
?>