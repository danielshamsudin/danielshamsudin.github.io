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
  background-color: #f1f1f1;
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
	width: 200px;
	height: 250px;
	float: left;
	margin : 10px;
}
	
	
@media only screen and (max-width: 1100px) {
	.picture
	{
		width: 300px;
		height: 350px;
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






</style>
<body>
<center><h1 style="border: 1px solid white; background-color: white;">Below's image are alredy insert to database.</h1><br><br></center>
<div class="tab">
  <a href="adisplay.php"><button class="tablinks">ALL</button></a>
  <a href="active.php"><button class="tablinks">ACTIVE</button></a>
  <a href="inactive.php"><button class="tablinks">INACTIVE</button></a>
</div>

  <?php

        if (isset($_GET['pageno'])) 
		{
            $pageno = $_GET['pageno'];
        } 
		else 
		{
            $pageno = 1;
        }
        $no_of_records_per_page = 9;
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
        while($row = mysqli_fetch_array($res_data))
		{
?>
            <img class="picture" src="../admin/<?php echo $row['image_file']; ?>">
<?php        
		}
    ?>
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
<br>
		<a href="uploadimage.php"><button class="btn" type="button">ADD MORE IMAGE</button></a>
		<a href="../existinguser.php"><button class="btn" type="button">BACK</button></a>
		

</body>
</html>
