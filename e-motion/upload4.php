<?php
  $db = mysqli_connect("localhost", "root", "", "e-motion");

  $msg = "";

  $result = mysqli_query($db, "SELECT * FROM images");
  if(mysqli_num_rows($result) ===0) {
    $sql = "INSERT INTO images VALUES (1,'tm1.jpg'), (2,'tm2.jpg'), (3,'tm3.png'), (4,'tm4.png'), (5,'tm5.png')";

    mysqli_query($db, $sql);
  }

  if (isset($_POST['upload'])) {
	  
	
  	// Get image name
  	$image = $_FILES['image4']['name'];

  	// image file directory
  	$target = "img/".basename($image);

  	$sql = "UPDATE images SET img='$image' WHERE id='4'";
  	// execute query
  	mysqli_query($db, $sql);

    if (move_uploaded_file($_FILES['image4']['tmp_name'], $target)) {
  		$msg = "Image uploaded successfully";
      header("Location: adminpage.php?uploadsuccess");
  	}else{
  		$msg = "Failed to upload image";
      header("Location: adminpage.php?uploadfailed");
  	}
  }
  echo $msg

?>
