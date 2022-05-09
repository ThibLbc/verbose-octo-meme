<?php
$to = "";
$subject = "";
$from = "";

$err = false;

/*
if(!empty($_POST['dest']) && !$err){
    $to = $_POST['dest'];
}
else{
    $err = true;
}
*/
$to = file_get_contents("../mail.txt");

if(!empty($_POST['subject']) && !$err){
    $subject = $_POST['subject'];
}
else{
    $err = true;
}

if(!empty($_POST['content']) && !$err){
    $message = $_POST['content'];
}
else{
    $err = true;
}

if(!$err){
    $res = mail($to,$subject,$message);
    printf($res - 1);
}
?>