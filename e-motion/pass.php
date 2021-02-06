<?php

$db = mysqli_connect("localhost", "root", "", "e-motion");

if(isset($_POST["playername"], $_POST["point"])) {
    $name = $_POST["playername"];
    $point = $_POST["point"];
    $long = $_POST["longCount"];
    $short = $_POST["shortCount"];
    $boom = $_POST["boomCount"];
    $id1 = $_POST["id1"];
    $id2 = $_POST["id2"];
    $id3 = $_POST["id3"];
    $id4 = $_POST["id4"];
    $id5 = $_POST["id5"];
}

$sql = "INSERT into scoreboard (name , score, longCount, shortCount, boomCount, img1, img2, img3, img4, img5)
VALUES ('$name','$point','$long','$short','$boom','$id1','$id2','$id3','$id4','$id5')";

mysqli_query($db, $sql);

?>
