<!DOCTYPE html>
<?php include("score.php");?>
<html lang="en">
<head>
<title>Signage</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body{
        margin: 0;
        padding: 0;
    }
div{
  background-color: #FF5733;
  width: 100%;
  height: 100%;
  border: 1px solid green;;
  top: 0%;
  left:0%;
  margin: 0;   
  padding: 0;
  
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width:90%;
  
}
p{
	text-align:center;
	
}
tr:nth-child(even) {background-color: #f2f2f2;}
caption{
	 font-size:30px;
	
}
#timer{
    background-color: FF5733;
    width: 70px;
    height: 1px;
    margin-left: 30%;
    border: none;
    font-size: 30px;
    color:white;
}
p
{
    font-size :20pt;
    color:white;
}
tr,th{
	font-size:50px;
}
</style>
</head>
<body>

<div>
<p style="font-weight:bold;color:White;font-family:Arial;font-size:50px;">Scan me for play game!!</p>
<img src="css/qrcode.png" class="center">
<center>
            <table border="1" style="width:90%;">
            
            <img src="css/logo.PNG" class="center">
			<caption><b style="color:white;font-size:50px;;font-family:Arial">Leaderboard</b></caption>
			<br><br><br>
                <tr>
                    
                    <th>Username</th>
                    <th>Score</th>
                </tr> 
				
				 <?php 
				$num=10;
				$sql = "Select * from score ORDER BY score DESC LIMIT $num";
		  $result = mysqli_query($connect,$sql);
		  while($row=mysqli_fetch_assoc($result)){?>
				<tr>
				
				 <th><?php echo $row["user"] ?></th>
				<th><?php echo $row["score"] ?></th>
				</tr><?php } ?>
		  </table>
</center>
		  <br><br><br>
          
	

</div>







</canvas>

<script>
     let min = 0;
        let sec = 05;
        function timer()
        {   
            if(min >= 0)
            {
                if(sec == 0)
                {
                    sec = 60;
                    min = min - 1;
                }
                else if(sec >= 0)
                {
                    sec--;
                }
            }
            else
            {
                location.reload();
            }
        }   
        
        setInterval(timer,1000);
</script>



</body>
</html>