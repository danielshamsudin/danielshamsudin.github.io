

<!DOCTYPE html>
<?php include("scorepp.php");?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pong Game JavaScript</title>
    <link rel="stylesheet" href="index.css">
    <script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head> 
<body>
   <canvas id="pong" width="600" height="400" onclick="begin()"></canvas>
    <div id="restart">
        <div id="gameOver">
            <button onclick="resetGame()">RETRY</button>
            <button onclick="backToMenu()">Back To Menu</button>
        </div>
    </div>
   <div id="main" width = "600" height="400">
       <div id="button">
       <button onclick="start()">Start</button> 
       
       <button onclick="score()">Scoreboard</button>
	   
        </div>
		
        <div class="scoreboard">
            <table border="1" width="400px" height="100px">
                <tr>
                    
                    <th>Username</th>
                    <th>Score</th>
                    
                </tr> 
                <?php 
				$num=10;
				$sql = "Select * from scorepp ORDER BY score DESC LIMIT $num";
		  $result = mysqli_query($connect,$sql);
		  while($row=mysqli_fetch_assoc($result)){?>
				<tr>
				
				<th><?php echo $row["user"] ?></th>
				<th><?php echo $row["score"] ?></th>
				</tr><?php } ?>	
            </table>
            <button onclick="back()">Return</button>
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
    <div id="timer">
    <span id="min">5</span>: <span id="sec">00</span> 
    </div>
   <script src="pong.js"></script>
   <script src="component.js"></script>
   <script src="component2.js"></script>
</body>
</html>