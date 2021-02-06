<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Find The Invisible Dog</title>
    <link rel="stylesheet" href="stylegame.css" />
<style>
    ::-webkit-scrollbar {
	width: 0px; 
	background: transparent; 
	}
  
	</style>
  </head>

  <body>
    <video id="video"></video>
	
	<div class="count">
		<div id="timer"></div>
	</div> 

	<div id="midbox">
	<p id="obj" class="info">You find <span>0</span></p> 
	</div>
	<div class="lineHorizontal__container">
	</div>
    <canvas id="canvas1" class="videocanvas"></canvas>
	<div class="lineHorizontal"></div>
	<div id="splash" class="splashT">
        <h1 id="splash-text" style="color:black;font-size:4rem;"></h1>
       <img src="3.gif" id="loading" class="cat-loading" style="width:80%;"> 
       <img src="img/loading2.gif" id="loading" style="width:50%;">

    </div>
	<div id="doggy">
        <img src="img/dog.png" id="dogcenter">
    </div>
	<div id="catty">
        <img src="img/cat.png" id="catcenter">
    </div>
      <canvas id="canvas"></canvas>
      <div id="display" class="modal">
		<div class="modal-content animate">
			<img src="<?php echo "images/".$row['image']; ?>" class="tmLogo"></img>
			<p id="score" style=" position:relative;text-align:center"></p>
			<!--<button id="button_tg" class="button">Try Again</button>-->
			<button id="button_h" class="button" style="margin-left:auto;margin-right:auto;display:block;">Scoreboard</button>
		</div>
	</div>
    
    <script src="https://cdn.jsdelivr.net/npm/handtrackjs/dist/handtrack.min.js"></script>
    <script src="loadCanvas.js"></script>
	<script src="state.js"></script>
	<script src="choose.js"></script>
    <script src="loadHandtrack.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src='https://kit.fontawesome.com/a076d05399.js'></script>
  </body>
</html>
