<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Find The Invisible Dog</title>
    <link rel="stylesheet" href="stylegame.css" />
</head>
<body>
    <audio autoplay id="BGM">
  		<source type="audio/mpeg">
  		Your browser does not support the audio tag.
  	</audio>

    <div id="titleimgcontainer">
        <img id="titleimg">
    </div>
    <video id="video"></video>
    <div id="gui-container">
        <div id="count" class="container-item1">
            <p id="timer">1</p>
        </div>

        <div class="container-item2">
            <p class="info">You find <span>0</span></p>
        </div>

        <div class="container-item3">
            <canvas id="vcanvas"></canvas> <!-- video canvas -->
        </div>
        <div class="container-item4">
            <canvas id="canvas"></canvas>
        </div>
    </div>

    <div id="splash" class="splashT">
        <p id="splash-text"></p>
        <img src="3.gif" id="loading" class="cat-loading">
        <img src="img/loading2.gif" id="loading">
    </div>

    <div id="doggy">
        <img id="catchimg">
    </div>

    <div id="catty">
        <img id="trapimg">
    </div>

    <div id="display" class="modal">
        <div class="modal-content animate">
            <!-- <img src="<?php echo " images /".$row['image']; ?>" class="tmLogo"></img> -->
            <img src="img/tmlogo.png" class="tmlogo"></img>
            <p id="score"></p>
            <!-- <button id="button_tg" class="button">Try Again</button> -->
            <button id="button_h" class="button">Scoreboard</button>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/handtrackjs/dist/handtrack.min.js"></script>
    <script src="loadCanvas.js"></script>
	<script src="state.js"></script>
    <script src="spawnableItem.js"></script>
	<script src="choose.js"></script>
    <script src="loadHandtrack.js"></script>
    <script src="loadItem.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src='https://kit.fontawesome.com/a076d05399.js'></script>
</body>
</html>
