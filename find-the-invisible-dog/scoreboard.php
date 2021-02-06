<?php
  // Create database connection
  $db = mysqli_connect("localhost", "root", "", "posematching");
  
  $result = mysqli_query($db, "SELECT * FROM images");
  
  $img = mysqli_fetch_assoc($result);
  
?>

<html>
<head><title>Scoreboard</title>
<style>
body{
	background-image: url("img/bg.gif");
	background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center; 
}
h3{margin-left:30%;}

form,p
{
	margin-left:40%;
}

div{margin-left:35%;}

@font-face {
  font-family: font1;
  src: url(ft1.ttf);
}

*{font-family:font1;
  font-size:110%;}
  
input[type=submit]
{
margin-left:-12%;
margin-bottom:5%;
width:70%;
height:90px;
font-family:font1;
background-color:#FF9E67;
color:white;
border-radius:10px;
}

input[type=submit]:hover
{
background-color:#FFFDE3 ;
color:black;
cursor:pointer;
width:auto;
height:90px;
}
th{background-image:url("1.gif");background-size:cover;color:white;font-size:75px;}
</style>
</head>
<body>
	
	<h3 style="font-size:600%;text-decoration:underline;word-spacing:5px;">Scoreboard Here!</h3>
	
	<form action="scoreboard.php">
	<input type="submit" name="subbtn" value="Update Scoreboard" style="font-size:400%;">
	</form>
			<div>
			<table border="1" width="57%" height="11%" style="background-color:#FFD5D5  ;">
			<tr>
				<th>Player's Name</th>
				<th>Player's Score</th>
				
			</tr>
			
			<?php
			
			$result = mysqli_query($db, "SELECT * FROM score ORDER BY scores DESC LIMIT 10;");	
			
			$count = mysqli_num_rows($result);//used to count number of rows
			
			while($row = mysqli_fetch_assoc($result))
			{
				
			?>			

			<tr>
				<th><?php echo $row["name"];?></th>
				<th><?php echo $row["scores"];?></th>
				
			</tr>
			<?php
			
			}
			
			?>
		</table>
		</div>
		
		<form action="index.php">
		<input type="submit" name="quit" value="QUIT" style="font-size:250%;width:20%;margin-left:7%;margin-top:3%;">
		</form>
		 
</body>
</html>