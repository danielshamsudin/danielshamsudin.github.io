<?php
    $conn = mysqli_connect("localhost","root","","pose");
    $user = $_POST["User_Name"];
    $gmail = $_POST["User_gmail"];
    $timestamp = $_POST["Time"];
    $score = $_POST["Score"];
    $matchdata = "txt_file/".$user."_".$timestamp;
    $sql = "INSERT INTO pose_match ( User_Name,User_Email,Timestamp,Score,File_Name) VALUES ('$user','$gmail','$timestamp','$score','$matchdata');";
    mysqli_query($conn,$sql);

?>