
<!DOCTYPE html>
<?php include("score.php");?>
<html lang="en">
<head>
    <title>Break Out</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Germania+One">
    <script src="https://code.jquery.com/jquery-3.5.0.min.js"integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./css/index.css">
	<style>
		#min,#sec{
			font-family: 'Share Tech Mono', monospace;
			color: #daf6ff;
			text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
			letter-spacing: 0.05em;

		}
        
        ::-webkit-scrollbar {
        width: 0px; 
        background: transparent; 
        }
  
		
		@media only screen and (max-width: 1100px) {
			.breakout{
				width:80%;
			}
			.main_banner{
				width:100%;
			}
			 .game_details{
				background-size: 100% 100%;
				width:90%; 
			}
		
			
			.breakout
			{
				display: none;
			}
			.main_banner{
				
			}
			#youwon{
				margin: 155px auto;
				width:80%; 
				height:400px;
			}
		}
		tr:nth-child(even) 
		{
			background-color: #f2f2f2;
		}
		tr:nth-child(odd) 
		{
			background-color: black;
			color:white
		}
		table,tr,th{
			font-family:Verdana;
        }
        
        .flex{
            display:flex;
        }
        .flex-col {
            flex-direction: column ; 
        }
        .justify-center{
            justify-content : center;
        }
        .align-center{
            align-items: center; 
        }
	</style>
</head>
<body class="">
<audio src="audio/music1.mp3" autoplay="true" display="visible" loop></audio>
<div  class=" flex flex-col align-center" style="padding-top:50px">
	<div id="timePosition" class="flex flex-col justify-center align-center">
		<!-- 	
        <div id="timer" style="width:100%;">
		 <span style="font-weight:bold;color:red;font-family:Arial;font-size:20px;">Timer: </span>
            <span id="min"></span>: <span id="sec">&nbsp;</span>
        </div> -->
	
		<p style="color:white; font-size:25px;font-family:Arial;">Play until you are satisfied with the result ! Good Luck !</p>
    </div>
	
    <canvas id="breakout" class=" breakout" onclick="start()"></canvas>
    <div id="youwon">
        <div id="win"><img src="./img/youwon.png" style="width:100%;height:100%;opacity:80%;"></div>
        <div id="lose"><img src="./img/gameover.png" style="width:100%;height:100%;opacity:80%;"></div>
        <button id="retry" onclick="resetGame()">TRY AGAIN</button>
        <!-- <button id="backToMenu" onclick="backToMenu()">Finish</button> -->
    </div>
    
    <div class="game_details">
		<div class="details">
            <div class="about flex flex-col justify-center align-center">
			<img src="https://i.imgur.com/mjE70No.gif"/ width="100%;">
            <button onclick="game()">Start</button>
            <!--	<button onclick="about()">About game</button> 
			//-->
            <!-- <button onclick="how_to_play()">How To Play</button> -->
            <!-- <button onclick="display_score()">Scoreboard</button>
			<button> <a href="index.html" style="text-decoration:none;">Tutorial</a></button>
			<button> <a href="end.html" style="text-decoration:none;">Quit</a></button> -->
            </div>
		</div>
        <div class="game_about">
            <h1>About game</h1>
            <p>You are in control of a sliding platform that can bounce the wrecking balls into the bricks above. Use angles and rebounds to control the direction the balls move. If the balls fall into the abyss below, you will lose a life.</p>
            <button onclick="back()">Return</button>
        </div>

        <div class="how_to_play">
          <h1><b>How To Play</b></h1>
           <p style="color:white;padding:10px;font-size:16px;">Click or touch the game screen to begin. Tilt your phone to control the paddle. The ball will bounce in different directions based on where it hits the platform. Control the ball hit the brick to break it. You have only 3 lifes, every time the ball falls into abyss your will lost 1 life. Good luck and win the game!</p>
		   <br>
		   <img src="css/tilt.gif" width="170" height="100">
			
            <button onclick="back1()">Return</button>
        </div>
		
        <div class="scoreboard" style="margin:10px;">
			
			<span style="color:white;font-size:40px;font-family:'Arial;'">Leaderboard</span>
			<hr>
            <table border="1" width="100%" style="border-collapse: collapse;">
                <tr>
                    <th style="background-color:black;color:white">Number</th>
                    <th style="background-color: black;color:white">Username</th>
                    <th style="background-color: black;color:white">Score</th>
                </tr> 
				
				<?php 
				$num=10;
				$sql = "Select * from score ORDER BY score DESC LIMIT $num";
				$result = mysqli_query($connect,$sql);
				$x=1;
				
					while($row=mysqli_fetch_assoc($result))
					{
				?>
				<tr>
				<th><?php echo $x; $x++;?></th>
				<th><?php echo $row["user"] ?></th>
				<th><?php echo $row["score"] ?></th>
				</tr><?php } ?>
		  </table>
		  <hr>
            <button onclick="back2()">Return</button>
        </div>
        
	</div>

	<span style="color:white;text-align:center;padding-top:20px;font-family:Arial;">This game is supported<br> by Telekom Malaysia.</span>
    
</div>
    <script src="./js/index.js"></script>
    <script src="./js/component.js"></script>
	
	
</body>
</html>
<script>

game()
</script>