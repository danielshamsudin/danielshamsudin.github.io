<!DOCTYPE html>
<?php include "connection.php";session_start();?>
<html>
  <head>
    <title></title>

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <img src="imagens/win.png" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-dark btn-lg"
              onclick="window.location.href = '../index.php?token=win' "
            >
              Congratulations ~<br> You have earned 1 extra token ~
            </button>
          </div>
        </div>
      </div>
    </div>
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