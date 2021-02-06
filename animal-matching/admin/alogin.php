<!DOCTYPE HTML>
<?php include "../connection.php" ?>
<html>

<head>
	<link href="../style.css" rel="stylesheet" type="text/css"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body{
			display:flex;
			margin:0;
			flex-direction:column;
		}

		body, html {
			height:100%
		}
		
		
		#container{
			opacity:90%;
		}
		@media only screen and (max-width: 1100px) {
		  img{
			  width:90%;
			  height:150px;
		  }
		  #container{
			width:90%;
		  }
		  
		.ribbon{
			width:85%;
		}  
		}

	</style>
</head>
<body>
	<center>
<img src="https://fontmeme.com/permalink/200506/e05dbe3c6fa7b848d4e178f40f872983.png" alt="indiana-jones-font" border="0" style="width: 50%;height: 90%;">
</center><br>
		<form name="loginfrm" method="post" action="verify.php">
			<center><div id="container" style="height:auto;">
			<div class="ribbon">
				<div class="ribbon-content"><p><b>Admin Login</b></p></div>
			</div><br><br><br><br><br>
			
				<div id="plyerid">
					
					<center><input type="email" name="email"  placeholder="Enter your email" required><center>
					<center><input type="password" name="password"  placeholder="Enter your password" required><center>
					<span id="errormsg" style="color:red"><?php if (isset($_GET["err"])) echo "*Please make sure your email and password are correct.<br>"; ?></span>
					<input type="submit" name="aloginbtn" value="Continue">
				</div>
			</div>
			</center>
		</form>
		<br>
		<br>
		<br>
		
<?php include 'footer.php' ?>
</body>
</html>

