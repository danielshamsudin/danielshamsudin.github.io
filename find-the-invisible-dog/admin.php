<?php
  /*db name:posematching
    table name:images,interface
	variable name:image (varchar 200), image (varchar 200)
	file name:images*/

  // Create database connection
  $db = mysqli_connect("localhost", "root", "", "posematching");

  // Initialize message variable
  $msg = "";
  $msg2 = "";
  // If upload button is clicked ...
  if (isset($_POST['upload'])) {
	  
	mysqli_query($db,"DELETE from images");
	
  	// Get image name
  	$image = $_FILES['image']['name'];

  	// image file directory
  	$target = "images/".basename($image);

  	$sql = "INSERT INTO images (image) VALUES ('$image')";
  	// execute query
  	mysqli_query($db, $sql);

  	if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
  		$msg = "Image uploaded successfully";
  	}else{
  		$msg = "Failed to upload image";
  	}
  }
  $result = mysqli_query($db, "SELECT * FROM images");
  
  $row = mysqli_fetch_assoc($result);
  
  if (isset($_POST['interface'])) {
	  
	mysqli_query($db,"DELETE from interface");
	
  	// Get image name
  	$image = $_FILES['image']['name'];

  	// image file directory
  	$target = "images/".basename($image);

  	$sql = "INSERT INTO interface (image) VALUES ('$image')";
  	// execute query
  	mysqli_query($db, $sql);

  	if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
  		$msg2 = "Image uploaded successfully";
  	}else{
  		$msg2 = "Failed to upload image";
  	}
  }
?>
<!DOCTYPE html>
<html>
<head>
<title>Admin Page</title>
<link rel="shortcut icon" href="image/icon.ico" type="image/x-icon"/>
<style type="text/css">
   @font-face {
	  font-family: font1;
	  src: url(ft1.ttf);
	}
	
    *{font-family:font1;
	  font-size:30px;}
   #content{
   	width: 50%;
   	margin: 40px 30%;
   	border: 1px solid black;
   }
   form{
   	width: 50%;
   	margin: 20px auto;
   }
   form div{
   	margin-top: 5px;
   }
   
   img{
 
   	margin-right: 200px;
   	width: 90px;
   	height: 70px;
	background-repeat:repeat-y;
	background-position:left;
   }
   
   body{background-color:#FCE5B0;
   background-image:url(<?php echo "images/".$row['image']; ?>);
		 background-size:90px 70px;
		 background-repeat:repeat-y;
		 background-position:left;
		 margin-right:200px;}
		 

</style>
</head>
<body>

<div id="content">
  
  <form method="POST" enctype="multipart/form-data">
  	<input type="hidden" name="size" value="1000000">
	
  	<div>
	  Upload a image to change the image in intro pages<br>
  	  <input type="file" name="image" style="font-size:20px;width:350px;">
  	</div>
  
  	<div>
  		<button type="submit" name="upload" style="font-size:25px;width:70px;">Upload</button>
		<br>
		<?php echo $msg ?>
  	</div>

  	<div>
	<br>
  		<input type="button" name="back" value="Intro Page" onclick="window.location.href = 'index.php';" style="font-size:25px;"><br>
  	</div>	
  </form>
</div>

<div id="content">
  
  <form method="POST" enctype="multipart/form-data">
  	<input type="hidden" name="size" value="1000000">
	
  	<div>
	  Upload a image to change the image in pop out interface<br>
  	  <input type="file" name="image" style="font-size:20px;width:350px;">
  	</div>
  
  	<div>
  		<button type="submit" name="interface" style="font-size:25px;width:70px;">Upload</button>
		<br>
		<?php echo $msg2 ?>
  	</div>

  	
  </form>
</div>
</body>
</html>