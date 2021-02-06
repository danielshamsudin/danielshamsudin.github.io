<head>
    <title>Brick Breaker</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Germania+One">
    <link rel="stylesheet" href="css/index.css">
	

</head>
<body onload='loadAudio'>
<audio src="audio/music2.mp3" autoplay="true" display="visible" loop></audio>
<br><br><br><br><center><img src="https://i.imgur.com/MKApP8V.gif"/ id='title'><br><br><br><br>

        <div class="popup-content"><br>
		<span style="color:white;font-family:'Arial';font-size:30px;">ADMIN LOGIN PAGE</span>
                <div id="up"><br>
                    <form method="POST" action="insertadmin.php">
                        <input type="text" placeholder="Username" name="name" style="width: 50%;">
                        <br>
                        <input type="password" placeholder="Password" name="password" style="width: 50%;">
                        <br>
                    <input type="submit" value="Login" name="login">
                       <br><a href="index.php">Back</a>
                    </form>
                </div>
        </div>

    <script src="./js/index.js"></script>
    <script src="./js/component.js"></script>
</body>
</html>