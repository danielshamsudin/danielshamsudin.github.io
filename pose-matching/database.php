<?php
    // $conn = mysqli_connect("localhost","root","","test_game");
    $conn = mysqli_connect("178.128.48.225:3306","root","tm@123456","test_game");
    $user = $_POST["User_Name"];
    $gmail = $_POST["User_gmail"];
    $timestamp = $_POST["Time"];
    $score = $_POST["Score"];
    $matchdata = $user."_".$timestamp.".json";
    $sql = "INSERT INTO pose_match ( User_Name,User_Email,Timestamp,Score,File_Name) VALUES ('$user','$gmail','$timestamp','$score','$matchdata');";
    mysqli_query($conn,$sql);
?>