<?php

session_start();

include("connection.php");

if (isset($_POST["aloginbtn"]))
{
	$email=$_POST["email"];
	$password = $_POST["password"];
	$sql = "SELECT * from admin where adminEmail = '$email' AND adminPassword = '$password'";

	$result = mysqli_query($connect, $sql);
		
	if ($row = mysqli_fetch_assoc($result))
	{
		mysqli_close($connect);	
		header("Location: choice.php");
	}
	else
	{	
		header("location: alogin.php?err=notexist");
		mysqli_close($connect);
	}
}

?>
