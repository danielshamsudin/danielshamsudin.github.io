<?php

$con=mysqli_connect("localhost", "root", "");
		
		if($con)
		{
			echo "";
			
			mysqli_query($con, "CREATE DATABASE PROJECT");
			mysqli_select_db($con, "PROJECT");
		
			mysqli_query($con, "CREATE TABLE PLAYER (player_id INT NOT NULL AUTO_INCREMENT, player_fname VARCHAR(50) NOT NULL,
			player_lname VARCHAR(50) NOT NULL,player_num INT NOT NULL, player_mail VARCHAR(35) NOT NULL, player_score INT NOT NULL, PRIMARY KEY(player_id))");
		}
		
?>
