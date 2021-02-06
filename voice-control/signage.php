<!DOCTYPE html>
<html>
<?php include("connect.php"); ?>
<head>
<meta http-equiv="refresh" content="302;localhost/abc/scoreboard1.php" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<title>Signage</title>
<style>
body{ background: url("5.gif") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  text-align: center;
  color: white;
  

}

	th, td {
	border : 3px solid black;
	border-radius:5px;
	color: #FF66B2;
  text-align: center;
  padding: 8px;
  background-image:url(7.gif);
  background-repeat:no-repeat;
  background-size:cover;
  font-size:50px;
	}
	
	#user{
	border : 2px solid black;
  text-align: center;
  padding: 8px;
  color:white;
	}
	
	tr:nth-child(odd) {background-color: khaki;}
	tr:nth-child(even) {background-color: lightyellow;}
	source{width:70%;height:70%;}
</style>
</head>

<body>
	  <div style="color: black; text-align: center; font-family: Comic Sans MS; font-size: 70px;">Time left before game starts = <img src="img/assets/cat.png" style="height: 50px; width: 50px;"><span id="timer"></span><img src="img/assets/cat.png" style="height: 50px; width: 50px;"></div>

<h2 style="font-size:70px; font-weight: bold; text-decoration: overline underline; font-family: Comic Sans MS; text-align: center;color: black;" >Current Participating Users</h2>

 <?php
	$result=mysqli_query($con, "SELECT * FROM player LIMIT 15");
	?>
	<br><br>
	
	<table border="0" align="center" width="60%">
		
	<?php
	
			while($row=mysqli_fetch_assoc($result))
			{
	?>
			<tr>
				<td><?php echo $row['player_fname'];?>&nbsp;<?php echo $row['player_lname'];?></td>		
			</tr>
		
	<?php

			}

	?>			

	</table>
	
	<br><br>
	
	<h2 style="font-size:60px; font-weight: bold; text-decoration: overline underline; font-family: Comic Sans MS; text-align: center;color: black;" >Tutorial Guide</h2>
<video width="95%" height="95%" controls loop autoplay>
<source src="guide.mp4" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" align="center" height="80%" width="80%" style="float:center;">
</video>
<script>
document.getElementById('timer').innerHTML=005 + ":" + 01;
		startTimer();

		function startTimer() {
		var presentTime = document.getElementById('timer').innerHTML;
		var timeArray = presentTime.split(/[:]+/);
		var m = timeArray[0];
		var s = checkSecond((timeArray[1] - 1));
		if (s==59){m=m-1}
		
  
		document.getElementById('timer').innerHTML =
		m + ":" + s;
		console.log(m)
		setTimeout(startTimer, 1000);
		}

		function checkSecond(sec) {
		if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
		if (sec < 0) {sec = "59"};
		return sec;
		}
		</script>
</body>
</html>