<?php
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Catching Game V1.0.0</title>
    <link rel="stylesheet" href="./canvas.css" />
    <link rel="shortcut icon" href="./icon.ico" type="image/x-icon" />
    <style>
      ::-webkit-scrollbar {
        width: 0px; 
      background: transparent; 
      }
    </style>
  </head>

  <body>
    <video id="video"></video>
    <canvas id="canvas1" class="videocanvas"></canvas>
    <div>
      <canvas id="canvas"></canvas>
	
      <div id="splash">
        <h1 id="splash-text"></h1>
        <img src="./img/loading.gif" id="loading" />
      </div>
      <h3 id="points">Scores : 0</h3>
      <h3 id="speed">Speed : 1</h3><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <h3 id="status"></h3>
    </div>
    <div id="timer-con">
      <h3 id="timer"></h3>
	  
    </div>
  </body>
</html>

<script src="./jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/handtrackjs/dist/handtrack.min.js"></script>

<script type="text/javascript">
  var img1php = "./img/tm1.jpg";
  var img2php = "./img/tm2.jpg";
  var img3php = "./img/tm3.png";
  var img4php = "./img/tm4.png";
  var img5php = "./img/tm5.png";




</script>

<script src="./loadCanvas.js"></script>
<script src="./loadHandtrack.js.js"></script>
<script src="./state.js"></script>
<script src="./play.js?build=06102020"></script>
