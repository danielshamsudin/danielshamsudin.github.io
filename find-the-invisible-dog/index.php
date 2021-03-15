<html>
<head>
	<title>
	Intro Page
	</title>
	<link rel="stylesheet" href="rules.css">
</head>
<body>
<!-- <div class="hint">
Click to play &#9836;
</div>	 -->
	<audio autoplay id="gameAudio">
		<source src="backgroundsound.mp3" type="audio/mpeg">
		Your browser does not support the audio tag.
	</audio>

	<script>
		var x = document.getElementById("gameAudio");
		x.volume = 0.2;
	</script>

	<div class="wrapper">

		<div class="title">
			Find the INVISIBLE DOGGGG <img src="img/dog.png" id="dogLogo">
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
				<img src="img/dog.png" id="new" ><br><br>
			</p>
			<p>
				&#10049; Be Careful there will be a random <b>CAT</b>!<br>
				&nbsp;&nbsp;There will be<b> cat sound </b>when you near the CAT!<br>
				&nbsp;&nbsp;CAT will reset everything and u need to find again!<br>
				<img src="img/cat.png" id="new" ><br><br>
			</p>
			
			<div class="ls">
				<input type="submit" name="gamebtn" value="Start Game" id="btn"  onclick="window.location.href = 'color.html';">
			</div>
		</div>


		<div class="scroll-down" onclick="document.getElementById('btn').scrollIntoView();">
			<img src="img/scroll-down.png">
		</div>
	</div>
</body>
</html>
