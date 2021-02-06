<!DOCTYPEhtml>
<?php 
include "../connection.php";
session_start();
?>

<html>
<head>
	<title>Admin Display</title>
	<link href="../style.css" rel="stylesheet" type="text/css"> 
</head>
<style>
body {font-family: Arial;}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: orange;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
.picture
{
	width: 15%;
	height: 250px;
	float: left;
	margin : 10px;
}
	
	
@media only screen and (max-width: 1100px) {
	.picture
	{
		width: 13%;
		height: 250px;
	}
}
.btn{
	width: 20%;
	height:40px;
	margin:20px;
	border-radius: 20px;
}
.pagination{
	display: inline-block;
	text-decoration: none;
	list-style-type: none;
	color:#DC7633 ;	  
}

.pagination a {
  color: black;
  background-color: #80c883;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover{
	background-color: #ddd;
	opacity: 0.6;
}
li{
	float:left;
	space-letter: 10px;
}

.active {
	background-color: grey;
}

input[type=submit]:hover
{
	cursor:pointer;
}

</style>
<body>
<centeR>
<img src="https://fontmeme.com/permalink/200514/2dd6c5e768581cc8f88099bb7a7d49c6.png" alt="indiana-jones-font" border="0" style="width: 50%;height: 90%;"></center><br>
<div id="container" style="height:auto;width:50%;">
<div class="tab">
  <a href="adisplay.php" class="active"><button class="tablinks">ALL</button></a>
  <a href="active.php"><button class="tablinks">ACTIVE</button></a>
  <a href="inactive.php"><button class="tablinks">INACTIVE</button></a>
</div>
	<center><p style="color:red;font-family:'nothing';font-size:20px;">Alert : Please make sure there are 5 groups of images in "Active". Else, the images will be distributed to the player wrongly.</p></centeR>

  <?php

        if (isset($_GET['pageno'])) 
		{
            $pageno = $_GET['pageno'];
        } 
		else 
		{
            $pageno = 1;
        }
        $no_of_records_per_page = 6;
        $offset = ($pageno-1) * $no_of_records_per_page;

        $connect = mysqli_connect("localhost", "root", "", "game");
        // Check connection
        if (mysqli_connect_errno())
		{
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
            die();
        }

        $total_pages_sql = "SELECT COUNT(*) FROM image";
        $result = mysqli_query($connect,$total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $sql = "SELECT * FROM image LIMIT $offset, $no_of_records_per_page";
        $res_data = mysqli_query($connect,$sql);
		$x = 0;
        while($row = mysqli_fetch_array($res_data))
		{
?>			
            <img class="picture" src="../admin/<?php echo $row['image_file']; ?>">
<?php       
			$x++;
			if($x == 3)
			{
				$status = $row['image_status'];
				if(!$status)
					$status = 'Inactive';
				$imageid = $row['image_id'];
				echo "<center><div style='color:white;height:270px; border:2px solid yellow;'><br><br><span style='color:orange;'>Status : ".$status."</span><br>";
				echo "<form method='post' action='changestatus.php'>";
				echo "<input type='hidden' name='imageid' value='$imageid'>";
				echo "<input type='submit' name='chgstatusbtn' value='Change Status' style='color:white;background-color:orange;border:1px solid orange;border-radius:10px;padding:10px;'><br><br>";
				$a = $imageid -2;
				$b = $imageid -1;
				$c = $imageid;
				echo "<span style='color:orange;'>Image ID 1 :".$a."</span><br><br>";
				echo "<span style='color:orange;'>Image ID 2 :".$b."</span><br><br>";
				echo "<span style='color:orange;'>Image ID 3 :".$c."</span>";
				echo "</form></div>";
				
				$x = 0;
			}
			
		}
    ?>
	<center>
    <ul class="pagination">
        <li><a href="?pageno=1">First</a></li>
        <li class="<?php if($pageno <= 1){ echo 'disabled'; } ?>">
            <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>">Prev</a>
        </li>
        <li class="<?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
            <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>">Next</a>
        </li>
        <li><a href="?pageno=<?php echo $total_pages; ?>">Last</a></li>
    </ul>
	<br>

		<a href="uploadimage.php"><button class="btn" type="button">ADD MORE IMAGE</button></a>
		<a href="choice.php"><button class="btn" type="button">BACK</button></a>
	</center>
</div>		

</body>
</html>
