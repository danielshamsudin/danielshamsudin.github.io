<html>
<head>
	<title>
	Intro Page
	</title>
	<link rel="stylesheet" href="rules.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
<!-- <div class="hint">
Click to play &#9836;
</div>	 -->
	<audio autoplay id="BGM">
		<source type="audio/mpeg">
		Your browser does not support the audio tag.
	</audio>

	<div class="wrapper">

		<div class="title">
			Find the INVISIBLE DOGGGG <img id="logoimg">
		</div>
		<br><br>
	
		<div class="rules">
			<!-- <form name="rules" method="post"> -->
			<p>
				&#10049; First, choose ur preference background color!<br>
				<img src="img/color.gif" id="new" ><br><br>
			</p>
			<p>
				&#10049; Second, move the ring(with ur hand) around the screen<br>
				&nbsp;&nbsp;&nbsp;&nbsp;LISTEN !<br>
				&nbsp;&nbsp;There will be<b> dog sound </b>when you near the DOG!<br>
				<img src="img/catchdog.gif" id="new" ><br><br>
			</p>
			<p>
				&#10049; Please find three <b>DOGSSS</b> in seconds!<br>
				<img id="catchimg"><br><br>
			</p>
			<p>
				&#10049; Be Careful there will be a random <b>CAT</b>!<br>
				&nbsp;&nbsp;There will be<b> cat sound </b>when you near the CAT!<br>
				&nbsp;&nbsp;CAT will reset everything and u need to find again!<br>
				<img id="trapimg"><br><br>
			</p>
			
			<div class="ls">
				<input type="submit" name="gamebtn" value="Start Game" id="btn"  onclick="window.location.href = 'color.html';">
			</div>
		</div>


		<div class="scroll-down" onclick="document.getElementById('btn').scrollIntoView();">
			<img src="img/scroll-down.png">
		</div>
	</div>
	<script src="loadItem.js"></script>
</body>
</html>
