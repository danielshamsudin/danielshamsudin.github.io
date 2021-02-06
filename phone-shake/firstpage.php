<!DOCTYPE html>
<?php include("score.php");?>
<html lang="en">
<head>
    <title>T&T </title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Germania+One">
    <script src="https://code.jquery.com/jquery-3.5.0.min.js"
  integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
  crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./css/index.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body style="background-image: url('../css/orange.PNG')>
	
    

    <!-- game element -->
    <div id="gameover">
        <img src="img/youwon.png" alt="" id="youwon">
        <img src="img/gameover.png" alt="" id="youlose">
        <div id="restart">Play Again!</div>
    </div>

    <canvas id="breakout" class="breakout" width="500" height="600" onclick="start()"></canvas>
    
    <div class="game_detail">
        <div class="detail" >
            <div class="about">
			
            <p></p><br><br><br><br>
            <button style="	float: left;
							padding: 1px 4px;
							font-weight: bolder;
							border-radius: 50px;
							text-align: center;
							font-size: 20px;							
							width: 100px;
							margin: 0;
							position: absolute;
							top: 47%;
							left: 50%;
							-ms-transform: translate(-50%, -50%);
							transform: translate(-50%, -50%);
						  "><a href="selectgamepage.php" 
						  style="text-decoration: none;
						  color:white;"><br>Game Start</a></p>
			</button>
			
			<button style="	float: left;
							padding: 1px 4px;
							font-weight: bolder;
							border-radius: 50px;
							text-align: center;
							font-size: 20px;							
							width: 100px;
							margin: 0;
							position: absolute;
							position: absolute;
							top: 67%;
							left: 50%;
							-ms-transform: translate(-50%, -50%);
							transform: translate(-50%, -50%);
						  "><a href="redeem.php" 
						  style="text-decoration: none;
						  color:white;"><br>Redeem Token</a></p>
			</button>
			
           
            
        </div>
		
        <div class="game_about">
            <h1>About game</h1>
            <p>You are in control of a sliding platform that can bounce the wrecking balls into the bricks above. Use angles and rebounds to control the direction the balls move. If the balls fall into the abyss below, you will lose a life.</p>
            <button onclick="back()">Return</button>
        </div>

        <div class="how_to_play">
            <br><br><br><br><br><h1><b>How To Play</b></h1>
           <p>Click or touch the game screen to begin. Use your arrow key or tilt your phone to control the sliding platform. The ball will bounce in different directions based on where it hits the platform. Control the ball hit the brick to break it. You are assigned with 3 life, every time the ball falls into abyss your will lost 1 life. The game will lose when your life is 0.</p>
            <button onclick="back1()">Return</button>
        </div>
		
        <div class="scoreboard">
            <table border="1" width="400">
			<br><br><br><br><br><br>
                <tr>
                    <th>Number</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr> 
				
				<?php 
				$num=10;
				$sql = "Select * from score ORDER BY score DESC LIMIT $num";
		  $result = mysqli_query($connect,$sql);
		  while($row=mysqli_fetch_assoc($result)){?>
				<tr>
				<th><?php ?></th>
				<th><?php echo $row["user"] ?></th>
				<th><?php echo $row["score"] ?></th>
				</tr><?php } ?>
		  </table>
            <button onclick="back2()">Return</button>
        </div>
        <div class="main_banner" id="main_banner">
            <div class="imgban" id="imgban3">

            </div>
            <div class="imgban" id="imgban2">
                
            </div>
            <div class="imgban" id="imgban1">
                
            </div>
			
		</div>
		
    </div>
    <div style="display : none;">
    <form action="" method="POST">
    <input type="text" name="storedt" id="store" class="store">
    </form>
    </div>

    <script src="./js/index.js"></script>
    <script src="./js/component.js"></script>
</body>
</html>