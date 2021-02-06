<?php
	$connect = mysqli_connect("localhost","root","","login");
	session_start();
	$user = $_SESSION["user"];
    $score = $_POST["score"];
	$sql = "INSERT INTO scorepp (score,user) VALUES ('$score','$user');";
    mysqli_query($connect,$sql);
?>	