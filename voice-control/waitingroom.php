<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?php include("connect.php"); ?>
<!DOCTYPE html>
<html>
<head>
<title>Waiting Room</title>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="stylechat.css" type="text/css" />
	<link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="plugins/sweetalert/sweetalert.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="chat.js"></script>
    <script type="text/javascript">
	// ask user for name with popup prompt    
        var name = prompt("Create an anonymous name and chat online :", "Guest");
        
        // default name is 'Guest'
    	if (!name || name === ' ') {
    	   name = "Guest";	
    	}
    	
    	// strip tags
    	name = name.replace(/(<([^>]+)>)/ig,"");
    	
    	// display name on page
    	$("#name-area").html("You are: <span>" + name + "</span>");
    	
    	// kick off chat
        var chat =  new Chat();
    	$(function() {
    	
    		 chat.getState(); 
    		 
    		 // watch textarea for key presses
             $("#sendie").keydown(function(event) {  
             
                 var key = event.which;  
           
                 //all keys including return.  
                 if (key >= 33) {
                   
                     var maxLength = $(this).attr("maxlength");  
                     var length = this.value.length;  
                     
                     // don't allow new content if length is maxed out
                     if (length >= maxLength) {  
                         event.preventDefault();  
                     }  
                  }  
    		 																																																});
    		 // watch textarea for release of key press
    		 $('#sendie').keyup(function(e) {	
    		 					 
    			  if (e.keyCode == 13) { 
    			  
                    var text = $(this).val();
    				var maxLength = $(this).attr("maxlength");  
                    var length = text.length; 
                     
                    // send 
                    if (length <= maxLength + 1) { 
                     
    			        chat.send(text, name);	
    			        $(this).val("");
    			        
                    } else {
                    
    					$(this).val(text.substring(0, maxLength));
    					
    				}	
    				
    				
    			  }
             });
            
    	});
    </script>

<style>

body, html {
  background: url("css/mazebg.png") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  text-align: center;
  
}

		table {
	font-family: Comic Sans MS;
	border-collapse: collapse;
	width: 300px;
	text-align: center;
	border:0px solid black;
	margin-left:auto;
	margin-right:auto;"
	
	}
	
	th {
		background-color: palegoldenrod;
	}

	th, td {
	border : 2px solid black;
	color: white;
  text-align: center;
  padding: 8px;
  background-image:url(dmc.jpg);
  background-position:right;
	}
	
	#user{
	border : 2px solid black;
  text-align: center;
  padding: 8px;
  color:white;
	}
	
	tr:nth-child(odd) {background-color: khaki;}
	tr:nth-child(even) {background-color: lightyellow;}

#back2Top {
    width: 40px;
    line-height: 40px;
    overflow: hidden;
    z-index: 999;
    display: none;
    cursor: pointer;
    -moz-transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    position: fixed;
    bottom: 50px;
    right: 0;
    background-color: #DDD;
    color: #555;
    text-align: center;
    font-size: 30px;
    text-decoration: none;
}
#back2Top:hover {
    background-color: #DDF;
    color: #000;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 40px;
}


        ::-webkit-scrollbar {
          width: 0px; 
        background: transparent; 
		}
</style>
</head>
<body>
<div class="game-screen">
    <div class="header" width="auto">
      <!-- <div align="center"><img src="img/assets/icon.png" style="text-align: center; height: 100%; width: 100px; max-width: 100%; max-height: 100%;"></div> -->
	  <br><br><br>
	  <div style="font-size:24px; font-weight: bold; font-family: Comic Sans MS; text-align: center;">Waiting Room</div>
	  <div style="color: black; text-align: center; font-family: Comic Sans MS; font-size: 24px;"><img src="img/assets/cat.png" style="height: 30px; width: 30px;">Time left = <span id="timer"></span><img src="img/assets/cat.png" style="height: 30px; width: 30px;"></div>
    </div>
	<br><br><br><br><br>
</div>

<div>

	<h2 style="font-size:24px; font-weight: bold; text-decoration: overline underline; font-family: Comic Sans MS; text-align: center;color: white;" >Tutorial</h2>
		<iframe src="guide.mp4" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" align="center" height="380px" width="300px"> </iframe>
		<br><br>
		<p style="font-size:20px; font-weight: bold; font-family: Comic Sans MS; text-align: center;color: white; text-decoration: underline;" >Rules regarding the maze game</p>
		<p style="color: white;">
		<ul style="color: white;">
		<li>>>>Use your mic and try speaking "Right", "Left", "Up", "Down" to guide Unifi-Chan back to her home!<<<</li>
	    <li>>>>Once started, the time will start to be recorded and automatically end once you finish the maze<<<</li>
	    <li>>>>When you completed the maze, you can choose to continue playing the mini game<<<</li>
	    <li>>>>Tokens increased when you have higher ranking<<<</li>
		</ul>
		</p>
		<br>
		
		<p style="font-size:24px; font-weight: bold; text-decoration: underline overline; font-family: Comic Sans MS; text-align: center; color: white;;">Interactive Chat Bot</p>
		<p style="color:white; font-size:19px;"> (Open it in a new tab) </p>
		
		<a href="voice.html"><img border="0" alt="chatbot" src="chatbot.jpg" height="250px" width="300px" class="center"></a>
		<br>
		<p style="font-size:20px; font-weight: bold; font-family: Comic Sans MS; text-align: center;color: white; text-decoration: underline;" >Tips about Interactive Chat Bot</p>
		<p style="color: white;">
		<ul style="color: white;">
		<li>>>>Interact with Unifi-Chan or TM-Kun now!<<<</li>
	    <li>>>>Both of the characters have different stories for you to discover<<<</li>
		</ul>
		</p>
		<br>
		
		<h2 style="font-size:24px; font-weight: bold; text-decoration: overline underline; font-family: Comic Sans MS; text-align: center;color: white;" >Current Participating Users</h2>
		
		
		<?php
	$result=mysqli_query($con, "SELECT * FROM player");
	?>
	<br>
	
	<table border="0" align="center">
		
	<?php
	
			while($row=mysqli_fetch_assoc($result))
			{
	?>
			<tr>
				<td><?php echo $row['player_fname'];?>&nbsp;<?php echo $row['player_lname'];?></td>		
			</tr>
		
	<?php

			}

	?>			

	</table>
	
	<br>
  
       <h2 style="font-size:24px; font-weight: bold; font-family: Comic Sans MS; text-align: center;color:white;">Chatboard<img src="img/assets/rabbit.gif" style="height: 30px; width: 30px;"></h2>
        <h3 style="color:white;">Let's Chat With Other User!</h3>
        <p id="name-area" style="text-align: left;"></p>
        
        <div id="chat-wrap" style=" text-align: center; width:300px; display: inline-block;"><div id="chat-area" style="height: 250px;  text-align: left;"></div>
        <form id="send-message-area">
            <p style="color: white;">Your message: </p>
            <textarea id="sendie" maxlength = '90' style="width:200px;" ></textarea>
        </form>
		
		</div>
		
		<br><br>
		
		<p style="color: white; font-weight: bold; font-size:10px; text-align: center;">&copy; Copyright 2020, The Voices. All Rights Reserved.</p>

</div>
<script>
document.getElementById('timer').innerHTML=005 + ":" + 01;
		startTimer();

		function startTimer() {
		var presentTime = document.getElementById('timer').innerHTML;
		var timeArray = presentTime.split(/[:]+/);
		var m = timeArray[0];
		var s = checkSecond((timeArray[1] - 1));
		if (s==59){m=m-1}
		if (m<0){window.location.href = "index.php";}
  
		document.getElementById('timer').innerHTML =
		m + ":" + s;
		console.log(m)
		setTimeout(startTimer, 1000);
		}

		function checkSecond(sec) {
		if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
		if (sec < 0) {sec = "59"};
		return sec;
		}
		
/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
 /*Scroll to top when arrow up clicked END*/
</script>

	<a id="back2Top" title="Back to top" href="#">&#10148;</a>
	
	<iframe width="1" height="1" wmode="transparent" src="https://www.youtube.com/embed/20JVBW6oNm0?autoplay=1&loop=1&playsinline=1"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</body>
</html>
