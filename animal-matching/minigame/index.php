<!DOCTYPE html>
<?php include "connection.php";session_start();?>
<html>
  <head>
    <title>Flywatter Game</title>

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <script>
      function startGame() {
        //var level = document.getElementById("level").value;
        //if (level === "") {
         // alert("Select a level before start!");
          //return false;
        //}
        window.location.href = "app.php?" + "extreme";
      }
    </script>

  </head>
  <body >
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <img src="imagens/gme.png" />
          </div>
        </div>
      </div>

      <!--<div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <div class="mb-2">
              <select class="form-control" id="level">
                <option value="">-- Select difficulty -- </option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
          </div>
        </div>
      </div>-->

      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
		  
            <button
              type="button"
              class="btn btn-danger btn-lg"
              onclick="startGame()"
            >
              Start Game
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