<?php include("connect.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    
    <title>Voice controlled maze</title>
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="plugins/sweetalert/sweetalert.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">

    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script>
        
    </script>
    <style>
        ::-webkit-scrollbar {
          display: none;
        }
        
        body{
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
    </style>
</head>

<body> 
    <div class="intro-screen" style="background-size: cover;">
        <div class="top-section">
            <p style="text-align: center; font-size: 30px; color: #bde0ff; text-shadow: 2px 2px 4px #000000;">
                <b>&nbsp;The Voices</b>
            </p>
            <div style="background:white;font-weight:bold;padding:20px">
                <h>Game rules</h>
                <!-- <p class="info-text" style="">-Help unifi-chan to get back to it's home! -->
                <span class="desktop-commands-info"> </span>
                <p style="text-align: center;">
                    <ul style=" ">
                        <li>Use your mic and try speaking "Right", "Left", "Up", "Down" to guide Unifi-Chan back to her home!</li>
                        <li>Once started, the time will start to be recorded and automatically end once you finish the maze</li>
                    </ul>
                </p>
                <!-- </p> -->
            </div>

            <!-- 
                <div align="center"><img src="img/assets/icon.png" style="text-align: center; height: 100%; width: 100px; max-width: 100%; max-height: 100%;">
                </div> 
            -->

            <button class="btn btn-intro-start" title="New Game">
                Start!
            </button>
        </div>
    </div>

    <div class="game-screen">
        <div style="color: white; text-align: center; font-family: Comic Sans MS; font-size: 24px;">
            Time left = <span id="timer"></span>
        </div>
        <div style=" text-align: center;">
            <!-- 
                <button class="btn btn-new-game btn-small" title="New Game"></button> 
            -->
            <!-- 
                <div class="maze-select-wrapper">
                    <button class="btn btn-maze-size-select btn-small" title="Select Maze Size"></button>
                    <div class="maze-size-buttons">
                        <button class="btn icon-small-maze btn-small btn-maze-size" data-size="small" title="Play Easy Maze">Normal</button>
                        <button class="btn icon-medium-maze btn-small btn-maze-size" data-size="medium" title="Play Medium Maze">Hard</button>
                    </div>
                </div> 
            -->
        </div>

        <div class="" style="text-align: center;color:white;">
            <h style="color:#00BFFF;font-weight:bold">
                Say 'command' if you have question
            </h>
            <div>
                <button class="btn btn-restart btn-small" title="Restart Maze"></button>
                <button class="btn btn-small btn-speak mic" title="Click to speak" onclick ="startRecognition(),stopRecognition()"></button>
                <button style="display:none" class="stop-game-btn" onclick ="startRecognition(),stopRecognition()"></button>
            </div>
            <h class="output" style="">
                <em> </em>
            </h>
            <!-- <br>Right microphone to confirm commands<br> -->
        </div>

        <!-- 
        <div class="header">
           <div class="logo"></div>
           <h1>Voice controlled maze</h1>
           <button class="btn btn-info btn-small" title="Info"></button>
        </div> 
        -->
    
        <div class="">
            <!--<ol class="commands-list"></ol>-->
            <div class="">
                <div>
                </div>
            </div>

            <div class="maze-wrapper">
                <div id='maze'>
                </div>
            </div>
     
            <div class="controls-section">
            </div>
      
	        <div style="color: white; text-align: center; ">
                Use your mic and try speaking "Right", "Left", "Up", "Down" to guide!
            </div>
	    </div>
    </div>

    </div>
    </div>

    <script src="app.js"></script>
    <script src="maze.js"></script>
    <script src="plugins/sweetalert/sweetalert.min.js"></script>
    <script>
        // Time
        // document.getElementById('timer').innerHTML= 5 + ":" + 01;
    	// startTimer();
    
    	//function startTimer() {
    	//    var presentTime = document.getElementById('timer').innerHTML;
    	//    var timeArray = presentTime.split(/[:]+/);
    	//    var m = timeArray[0];
    	//    var s = checkSecond((timeArray[1] - 1));
    	//    if (s == 59) { m = m-1 }
        //    if (m < 0){
        //        window.parent.wsCreateScore(0);
        //        //window.location.href = "gameover.html";
        //    }
        //
    	//    document.getElementById('timer').innerHTML = m + ":" + s;
    	//    //console.log(m)
    	//    setTimeout(startTimer, 1000);
    	//}
        //
    	//function checkSecond(sec) {
    	//    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    	//    if (sec < 0) {sec = "59"};
    	//    return sec;
    	//}

        var sec = 60;
        var countDiv = document.getElementById("timer");
        var isEnd = false;
        var isStart = false;

        function secpass () {
            "use strict";
            
            var min = Math.floor(sec / 60), //remaining minutes
              remSec = sec % 60; //remaining seconds
            
            if (remSec < 10) {
              remSec = "0" + remSec;
            }
            if (min < 10) {
              min = "0" + min;
            }
            countDiv.innerHTML = min + ":" + remSec;
            
            if (sec > 0) {
                sec = sec - 1;
            } else {
                if (sec == 0) {
                    clearInterval(countDown);
                    isStart = false;
                    isEnd = true;
                    console.log("time up");
                    timeout();
                }
            }
        }

        var countDown = setInterval(() => {
            if(isStart === true){
                "use strict";
                secpass();
            }
        }, 1000);

        function timeout() {
            if (confirm('Times up! Press OK or Cancel to start over')) {
                location.href='index.php';
            }
            else {
                location.href='index.php';
            }
        }

        document.querySelector(".btn-intro-start").onclick = () => { 
            //let second = 300;
            //setTimeout(timeout, second * 1000);
            startRecognition();
            isStart = true;
            start(); 
        }
        
    </script>

    <!-- <iframe width="1" height="1" wmode="transparent" src="https://www.youtube.com/embed/1GPsepFmNes?autoplay=1&loop=1&playsinline=1"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    -->
</body>

</html>