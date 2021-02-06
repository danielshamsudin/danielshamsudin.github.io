<?php
  $db = mysqli_connect("localhost", "root", "", "e-motion");

if (isset($_POST['upload'])) {

  $target = "img/tm1.jpg";
  $target = "img/tm2.jpg";
  $target = "img/tm3.png";
  $target = "img/tm4.png";
  $target = "img/tm5.png";

  	$sql = "DELETE FROM images";
  	mysqli_query($db, $sql);

	$sql = "INSERT INTO images VALUES (1,'tm1.jpg'), (2,'tm2.jpg'), (3,'tm3.png'), (4,'tm4.png'), (5,'tm5.png')";

    mysqli_query($db, $sql);

    header("Location: adminpage.php?resetsuccessful");
}

?>