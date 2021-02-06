<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <!-- leaderboard form -->
    <title>Leader Board</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- MATERIAL DESIGN ICONIC FONT -->
    <link rel="stylesheet" href="userfont/material-design-iconic-font/css/material-design-iconic-font.min.css" />

    <!-- STYLE CSS -->
    <link rel="stylesheet" href="leader.css" />
</head>

<body>

<?php
        $connect = mysqli_connect("localhost","root","","pose");
    ?>
    <div class="wrapper">
        <div class="inner">

          <!-- congratulation text -->
            <h4 id="cong"></h4>
           
           <!-- score text -->
            <h4 id="sco"></h4>
            

            <table>
            <caption>Top 10 List</caption>
            <tr>
                 
                  <th>Name</th>
                  <th>Score</th>
              </tr>
                <?php 
               
               
                $sql = "SELECT * FROM pose_match WHERE User_Name IS NOT NULL ORDER BY Score DESC LIMIT 10";
		        $result = mysqli_query($connect,$sql);
                while($row=mysqli_fetch_assoc($result)){
                ?>

                <tr>
                 
		         <td><?php echo $row['User_Name'];?></td>
		         <td><?php echo $row['Score'];?></td>
				
				
               </tr>
              
              
               <?php
                }            
              ?>
            </table>

            <!-- button go back to home -->
            <ul class="home">
                <a href="index.html" id="h" class="round green"></a>
            </ul>

        </div>
    </div>
    <script src="leader.js" type="module"></script>
</body>
</html>