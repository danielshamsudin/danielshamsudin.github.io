<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>
<body>
    <div class="center" align="center">
            <div id="content">
                <form enctype="multipart/form-data" method="post">
                    <input type="hidden" value="1000000" name="MAX_FILE_SIZE" >
                        <div id="button">
                            <input type="file" name="uploadedfile">
                            <input type="submit" name="submit" value="Upload" >
                            <?php
                            if(isset($_POST['submit']))
                            {
                                $target_path = "img/";
                                $target_path = $target_path.basename($_FILES['uploadedfile']['name']);
                                if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path))
                                {
                                    $conn = new mysqli("localhost","root","","login");
                                    $sql = "insert into banner3(Image) values ('$target_path')";
                                    if($conn->query($sql)==true)
                                    {
                                        ?>
                                        <script>
                                            alert("Upload Successful!!");
                                        </script>
                                           <?php                                    }
                                    else
                                    {
                                        echo "Error;".$sql.$conn->error;
                                    }
                                    $conn->close();
                                }
                            }
                        ?>
                        </div>

                        <div id="button">
                        <input type="file" name="uploadedfile1">
                        <input type="submit" name="submit1" value="Upload" id="button" >
                        <?php
                        if(isset($_POST['submit1']))
                        {
                            $target_path1 = "img/";
                            $target_path1 = $target_path1.basename($_FILES['uploadedfile1']['name']);
                            if(move_uploaded_file($_FILES['uploadedfile1']['tmp_name'], $target_path1))
                            {
                                $conn = new mysqli("localhost","root","","login");
                                $sql = "insert into banner2(Image) values ('$target_path1')";
                                if($conn->query($sql)==true)
                                {
                                   ?>
                                <script>
                                    alert("Upload Successful!!");
                                </script>
                                   <?php
                                }
                                else
                                {
                                    echo "Error;".$sql.$conn->error;
                                }
                                $conn->close();
                            }
                        }
                        ?>
                        </div>

                        <div id="button">
                        <input type="file" name="uploadedfile2">
                        <input type="submit" name="submit2" value="Upload" id="button" >
                        <?php
                        if(isset($_POST['submit2']))
                        {
                            $target_path2 = "img/";
                            $target_path2 = $target_path2.basename($_FILES['uploadedfile2']['name']);
                            if(move_uploaded_file($_FILES['uploadedfile2']['tmp_name'], $target_path2))
                            {
                                $conn = new mysqli("localhost","root","","login");
                                $sql = "insert into banner1(Image) values ('$target_path2')";
                                if($conn->query($sql)==true)
                                {
                                    ?>
                                    <script>
                                        alert("Upload Successful!!");
                                    </script>
                                       <?php                                }
                            else
                            {
                                echo "Error;".$sql.$conn->error;
                            }
                            $conn->close();
                        }
                        }
                        ?>
                        </div>
            </div>
            </form>
    </div>
    
</body>
</html>