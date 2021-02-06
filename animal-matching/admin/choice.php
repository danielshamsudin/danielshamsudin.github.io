
<!DOCTYPE html>
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
		
		.JS
		{
			font-family: fantasy;
			font-size : 30px;
			border: none;
			background-color: pink;
			border-radius: 10px;
			padding: 40px ;
			
		}
		.JS:hover
		{
			background-color: yellow;
			opacity: 0.9;
			cursor: pointer;
			font-style:italic;
			text-decoration:underline;
		}

		.com
		{
			font-family: fantasy;
			font-size: 30px;
			border: none;
			border-radius: 10px;
			background-color: lightblue;
			padding: 40px ;
			
		}

		.com:hover
		{
			background-color: yellow;
			opacity: 0.9;
			cursor: pointer;
			text-decoration:underline;
			font-style:italic;
		}

		.ad
		{
			font-family: fantasy;
			font-size: 30px;
			border: none;
			background-color: orange;
			border-radius: 10px;
			padding: 40px ;
			
		}
		.ad:hover
		{
			background-color: yellow;
			opacity: 0.9;
			cursor: pointer;
			font-style:italic;
			text-decoration:underline;
		}
		#btm
		{
			text-align: center;
		}

	</style>
<body>
	<center>
		<img src="https://fontmeme.com/permalink/200514/dd331b9b1a3866e1e62ad002f9d06350.png" alt="indiana-jones-font" border="0" style="width: 50%;height: 90%;">
	</center><br>
	<div id="container">
		<br>
		<div class="ribbon">
			<div class="ribbon-content"><p><b>Choose</b></p></div>
		</div><br><br><br><br><br>
		<div id="btm"> 
			<a href="uploadimage.php"><input class="JS" type="submit" name="wholebtn" value="Upload Image"></a><br /><br>
			<br>
			<a href="adisplay.php"><input class="com" type="submit" name="cuttedbtn" value="  View Image  "></a>
			<br>
			<br>
		</div>
	</div><br>
<?php include 'footer.php' ?>
</body>
</html>
