<?php
	 $connect = mysqli_connect("localhost","root","","login");
if($connect){}
else{echo "Connected Failed";}
session_start();



	if(isset($_POST["login"])){
		$name=$_POST["name"];
		$password=$_POST["password"];
		$sql="select * from admin where name='$name' AND password='$password'";
		$result=mysqli_query($connect,$sql);
		if($row = mysqli_fetch_assoc($result))
	{
		$_SESSION["user"] = $row["name"];
		mysqli_close($conn);
		echo"You have successfully logged in";
		header("Location:upload.php");
	}
	
	else
	{
		mysqli_close($conn);
		echo"You have entered incorrect password";
		header("Location:adminlogin.php?err=loginerr");
	}
		
		
		
	}
		
?>