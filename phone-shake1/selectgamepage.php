<!DOCTYPE html>
<?php include("score.php");?>
<html lang="en">
<head>
    <title>Break Out</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Germania+One">
    <script src="https://code.jquery.com/jquery-3.5.0.min.js"
  integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
  crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./css/index.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
    <div class="game_detail">
        <div class="detail">
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
							left: 32%;
							-ms-transform: translate(-50%, -50%);
							transform: translate(-50%, -50%);
						  "><a href="game.php" style="text-decoration: none;color:white;"><br>Brick Breaker</a></p></button>
            <button style="	float: left;
							padding: 1px 4px;
							font-weight: bolder;
							border-radius: 50px;
							font-size: 20px;	
							text-align: center;		
							width: 100px;
							margin: 0;
							position: absolute;
							top: 47%;
							left: 61%;
							-ms-transform: translate(-50%, -50%);
							transform: translate(-50%, -50%);
						  "><a href="pingpong/index.php" style="text-decoration: none;color:white;"><br>Ping<br>Pong</a></p></button>
						  
            <button style="	float: left;
							padding: 1px 4px;
							font-weight: bolder;
							border-radius: 50px;
							font-size: 20px;	
							text-align: center;		
							width: 100px;
							margin: 0;
							position: absolute;
							top: 63%;
							left: 47%;
							-ms-transform: translate(-50%, -50%);
							transform: translate(-50%, -50%);
						  "><a href="firstpage.php" style="text-decoration: none;color:white;"><br>Previous<br>Page</a></p></button>
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