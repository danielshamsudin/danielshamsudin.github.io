<?php

session_start();

include("connection.php");

if (isset($_POST["chgstatusbtn"]))
{
	$imageid = $_POST['imageid'];
	echo $imageid;
	$f = intval($imageid) -2;
	$s = intval($imageid) -1;
	$t = intval($imageid);
	$getstatus = "SELECT * from image where image_id = $imageid";
	$resultimage = mysqli_query($connect, $getstatus);
	$row = mysqli_fetch_assoc($resultimage);
	$status = $row['image_status'];
	echo $status;
	
	if($status == 'Active')
		$status2 = 'Inactive';
	else
		$status2 = 'Active';
	
	$changestatus = "UPDATE image set image_status = '$status2' where (image_id = '$f' OR image_id = '$s' OR image_id = '$t' )";
	$change = mysqli_query($connect,$changestatus);
	if($change)
	{
		echo '<script>alert("Successfully change to '.$status2.'")</script>';
		header("location:adisplay.php?pageno=1");
	}
	else
		echo "failed";
}

?>
