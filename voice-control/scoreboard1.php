<?php include("connect.php"); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<meta http-equiv="refresh" content=302;localhost/abc/signage.php" />

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
	
	body{color:white;
	background-image:url("888.gif");
	background-position:bottom right;
	}
	
		footer {
			text-align: center;
			color: white;
		}
		
		table{
			text-align: center;
		}
		
		th{
			font-size: 50px;color:black;
			
		}
		
		td{
			font-size: 50px; color:black;
		}
		
	</style>
</head>

<body>

    
	
	<div class="game-screen">
    <div class="header" width="auto">
      <div class="logo" onclick="window.location.href = 'index.php';"></div>
	  
      <p style="font-size:55px; color:black;">Scoreboard Ranking</p>
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
	
	</footer>
	
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
    crossorigin="anonymous"></script>
	<script src="app.js"></script>
	<script src="maze.js"></script>
	<script src="plugins/sweetalert/sweetalert.min.js"></script>

</body>
</html>