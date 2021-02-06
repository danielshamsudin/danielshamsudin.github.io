<?php include("connect.php"); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

	<title>Scoreboard</title>
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="plugins/sweetalert/sweetalert.css">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">
	
	<style>
	body{color:white;}
		footer {
			text-align: center;
			color: white;
		}
		
		table{
			text-align: center;
		}
		
		th{
			font-size: 20px;
		}
		
		td{
			font-size: 20px;
		}
		
	</style>
</head>

<body>

    
	
	<div class="game-screen">
    <div class="header" width="auto">
      <div class="logo" onclick="window.location.href = 'index.php';"></div>
	  
      <h1>Scoreboard Ranking</h1>
	  <button class="btn btn-left btn-small" title="Info" onclick="window.location.href = 'index.php';"></button>
    </div>
</div>
	<br><br><br><br><br><br>
	
	<?php
	$result=mysqli_query($con, "SELECT * FROM player LIMIT 10");
	?>
	
	<table border="1" width="auto" align="center">
		<tr>
			<th>ID</th>
				<th>First Name</th>
				<th>Last Name</th>
			<th>Score</th>
		</tr>
		
	<?php
	
			while($row=mysqli_fetch_assoc($result))
			{
	?>
			<tr>
				<td><?php echo $row['player_id'];?></td>
				<td><?php echo $row['player_fname'];?></td>
				<td><?php echo $row['player_lname'];?></td>
				<td><?php echo $row['player_score'];?></td>
			
			</tr>
		
	<?php

			}

	?>			

	</table>
	
	<br><br>
	
	<footer>
			<p>Posted By: Yeo Fu Cheng and Vivian Quek Jia Yi</p>
			<p>Contact Us: <a href="mailto:1181202878@student.mmu.edu.my">Email(Vivian)</a>
			or <a href="mailto:1181201138@student.mmu.edu.my">Email(Yeo)</a></p>
		

			<small>&copy; Copyright 2020, The Voices. All Rights Reserved</small>
	</footer>
	
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
    crossorigin="anonymous"></script>
	<script src="app.js"></script>
	<script src="maze.js"></script>
	<script src="plugins/sweetalert/sweetalert.min.js"></script>

</body>
</html>