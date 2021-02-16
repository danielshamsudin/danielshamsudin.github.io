
<?php
    $keypoint = $_POST["keypoint"];
    $ID = $_POST["id"];
    $CURRENTTIME = $_POST["currentTime"];



    $files = fopen("data_collection/".$ID."_".$CURRENTTIME.".json","a");
    
    fwrite($files,$keypoint."\n");
   fclose($files);

    
?>