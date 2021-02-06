<!DOCTYPE html>
<?php include "connection.php";session_start();?>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <script src="game.js"></script>

    <title>Flyswatter Game</title>
  </head>
  <body onresize="ajuste()">
    <div class="panel">
      <div class="life">
        <img id="v1" src="imagens/diamond_full.png" alt="" />
        <img id="v2" src="imagens/diamond_full.png" alt="" />
        <img id="v3" src="imagens/diamond_full.png" alt="" />
      </div>
      <div class="timer">Time Left: <span id="timer"> </span></div>
    </div>
    <script>
      document.getElementById("timer").innerHTML = time;
      var createFly = setInterval(function() {
        randomposition();
      }, createFlyTime);
    </script>
  </body>
</html>
<?php
	$id = $_SESSION['id'];
	$sql2 = "SELECT minigame_played from member where member_id = $id";
	$result2 = mysqli_query($connect,$sql2);
	$row = mysqli_fetch_assoc($result2);
	$status = $row['minigame_played'];
	
	if($status =='yes')
		header("location:../index.php");

?>