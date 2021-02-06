<!DOCTYPE html>
<html lang="en">
<head>
    <title>Break Out</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Germania+One">
    <link rel="stylesheet" href="./css/index.css">

</head>
<body>
	<br><br><br><br><center><img src="https://i.imgur.com/MKApP8V.gif"/ id='title'><br><br><br><br>
        <div class="popup-content"><br>
		<span style="color:white;font-family:'Arial';font-size:30px;">REGISTER NOW</span>
                <div id="up">
                    <form method="POST">
                        <!-- phone number / gmail / name / --><br>
                        <input type="text" placeholder="Username" name="username" >
                        <br>
						<input type="text" placeholder="Phone number" name="phone" style="background-image: url('img/phone.svg');background-repeat: no-repeat;padding-left: 40px;">
                        <br>
                        <input type="password" placeholder="Password" name="password" id="password" onkeyup="check();">
                        <br>
						<input type="password" placeholder="Confirm Password" name="copassword" id="copassword" onkeyup="check();">
                        <br>
						<span id="c"></span>
						<input type="submit" value="Register" name="register">
                       <br><span style="color:white;font-family:Arial">Already have account?</span> <a href="index.php" style="float:center;">LOGIN NOW</a>
					  
                    </form> <br>
                </div>
        </div>
		</center>
<script>
var check=function(){
if(document.getElementById('password').value == document.getElementById('copassword').value)
{	document.getElementById('c').innerHTML= 'Password & Confirm Password are match';
	document.getElementById('c').style.color= 'green';}
else
{	document.getElementById('c').innerHTML= 'Password & Confirm Password are different';
	document.getElementById('c').style.color= 'red';}}
        
		function about()
	{
		document.querySelector(".detail").style.display = "none";
		document.querySelector(".game_about").style.display = "block";
	}

	function how_to_play()
	{
		document.querySelector(".detail").style.display = "none";
		document.querySelector(".how_to_play").style.display = "block";
	}
	function back()
	{
		document.querySelector(".game_about").style.display = "none";
		document.querySelector(".detail").style.display = "flex";
	}
	function back1()
	{
		document.querySelector(".how_to_play").style.display = "none";
		document.querySelector(".detail").style.display = "flex";
	}
	function display_score()
        {
            document.querySelector(".detail").style.display = "none";
		    document.querySelector(".scoreboard").style.display = "block";
        }
	
        function display_score()
        {
            document.querySelector(".detail").style.display = "none";
		    document.querySelector(".scoreboard").style.display = "block";
        }
        function back2()
        {
        document.querySelector(".scoreboard").style.display = "none";
		document.querySelector(".detail").style.display = "flex";
        }
    </script>

    <script src="./js/index.js"></script>
    <script src="./js/component.js"></script>
	<?php

include("connect.php"); 

	if (isset($_POST["register"]))
{	$username=$_POST["username"];
	$password=$_POST["password"];
	$copassword=$_POST["copassword"];
	$phone=$_POST["phone"];
	if($password==$copassword)
	{
	$sql = "Insert INTO users(username,password,phone)VALUES('$username','$password','$phone')";
	if (mysqli_query($connect, $sql)) {} 
	mysqli_close($connect); }
else{?><script>window.alert("Please make sure the confirm password & password are match !!!");window.location.href="register.php?err=signup"; </script> <?php }} ?> 
	
</body>
</html>