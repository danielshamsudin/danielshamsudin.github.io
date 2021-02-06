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
			flex-direction: column;
		}

		body, html {
			height:100%
		}
		#insert{
			width: 60%;
			height:40px;
			margin:20px;
			border-radius: 20px;
			position: relative;
			background-color: rgba(255,255,255,0.3);
			transition: 0.3s all;
			
		}
		#plyerid input[type="text"],input[type="email"], input[type="password"]{
			width: 20%;
			height:40px;
			margin:20px;
			border-radius: 50px;
			position: relative;
			background-color: rgba(255,255,255,0.3);
			text-align:center;
			font-size:25px;
		}
		

</style>
<body>
	<center>
		<img src="https://fontmeme.com/permalink/200514/beeed48749ee56e335625c3f4b203d30.png" alt="indiana-jones-font" border="0" style="width: 40%; height: 90%;">
	</center><br>
	
	<form action='admin.php' method="POST" enctype="multipart/from-data">
		<center>
			<div id="container">
				<div class="ribbon">
					<div class="ribbon-content"><p><b>Image Name</b></p></div>
				</div><br><br><br>
				<div id="plyerid">
					<img style="width: 200px; height: 100px; margin-top: 30px;" name="image" src="<?php $sql1 = "SELECT * FROM adimage ORDER BY id DESC";
					$result1 = mysqli_query($connect,$sql1);
					$row1 = mysqli_fetch_assoc($result1);
					echo $row1['add_image'];
					?>">
					<center><p>Insert 3 image name.</p></center>
					<input type="text" name="imagename" required>
					<input type="text" name="imagename1" required>
					<input type="text" name="imagename2" required>
					<center><input type="submit" id="insert" name="insert" value="Continue" style="background-color:white;colro:black;"/></center>
					<br />
				</div>		
			</div>
		</center>
		<br>
	<br>
	<br>
	
			
	</form>
	</div>

</body>
</html>
<?php
	if(isset($_POST['insert']))
	{
		$sql2 = "SELECT * FROM adimage ORDER BY id DESC";
		$result2 = mysqli_query($connect,$sql1);
		$row2 = mysqli_fetch_assoc($result2);
		$image = $row2['add_image'];
		$imagename = $_POST['imagename'];
		$imagename1 = $_POST['imagename1'];
		$imagename2 = $_POST['imagename2'];
		
		//$padding=10;
		$info = getimagesize($image);
		$width=$info[0];
		$height=$info[1];
		
		$leftcrop=0;
		$top=0;
		// Calculate dimensions of output image
		$canvasWidth=$width/3;
		$canvasHeight=$height;
		
		
		ini_set("memory_limit","-1");
		// create white canvas
		$left = imagecreatetruecolor($canvasWidth, $canvasHeight);
		$mid = imagecreatetruecolor($canvasWidth, $canvasHeight);
		$right = imagecreatetruecolor($canvasWidth, $canvasHeight);
		
		// read in original image
		$orig = imagecreatefromjpeg($image);
		
		//$orig2 = imagecreatefromjpeg($image);
		
		// copy left third to output image
		imagecopy($left, $orig,0,0,$leftcrop, $top, $width/3, $height);
		// copy central third to output image
		imagecopy($mid, $orig,0,0,$width/3, 0, $width/3, $height);
		// copy right third to output image
		imagecopy($right, $orig,0,0,2*$width/3, 0, $width/3, $height);
		
		// save output image
		imagejpeg($left,"$imagename.jpg");
		imagejpeg($mid,"$imagename1.jpg");
		imagejpeg($right,"$imagename2.jpg");
	
		header("Location:imageup.php");
	}
		
?>
		<?php include 'footer.php' ?>