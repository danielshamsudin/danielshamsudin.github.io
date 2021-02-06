<!DOCTYPE HTML>
<?php include "../connection.php" ?>
<html>

<head>
	<link href="../style.css" rel="stylesheet" type="text/css"> 
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
	#plyerid button {
		width: 60%; 
		height: 40px;
		margin: 20px;
		border-radius: 20px;
		position: relative;
		background-color: rgba(255,255,255,0.3);
		transition: 0.3s  all;
	}
	p{
		text-align: center;
	}
	#container{
		color:white;
	}
	</style>
</head>
<body>
	<center>
	</center><br>
	<form method="post" action="imageup.php"> <!--enctype="multipart/form-data"--> 
		<center>
		
	<center>
		<img src="https://fontmeme.com/permalink/200514/1cefabc3834d4acd54c67fc046f4b2ec.png" alt="indiana-jones-font" border="0" style="width: 50%; height: 90%;">
	</center><br>
			<div id="container">
				<div class="ribbon">
					<div class="ribbon-content"><p><b>Upload the 3 Image</b></p></div>
				</div><br><br><br><br>
				<div id="plyerid">					
					<p style="color: orange;" >The image size must 280 X 580(width: 280px, heigth: 580px)</p>
					<br>
					<center><input type="file" name="image2" id="img1" accept=".jpg, .png" required/></center><br>

					<center><input type="file" name="image3" id="img1" accept=".jpg, .png" required/></center><br>
					
					<center><input type="file" name="image4" id="img1" accept=".jpg, .png" required/></center>
				
					<center>
					<button target="adisplay.php"" type="submit" name="insert2" id="insert2" style="background-color:white;color:black; padding:5px;">Submit</button></center>
					<br />
					<div id="images_list" ></div>
					
				</div>		
			</div>
		</center>
			
	</form>
	<br>
	<?php include 'footer.php' ?>
</body><!--
<script>
 function validateimg(ctrl) { 
        var fileUpload = ctrl;
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (fileUpload.files) != "undefined") {
                var reader = new FileReader();
                reader.readAsDataURL(fileUpload.files[0]);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var height = this.height;
                        var width = this.width;
                        if (height < 580 || width < 250) {
                            alert("At least you can upload a 250*580 photo size.");
							window.location.reload();
                            return false;
                        }
						else if (height > 620 || width > 284) {
                            alert("Your imgae size over 284*600 photo size.");
							window.location.reload();
                            return false;
                        }else{
                            //alert("Uploaded image has valid Height and Width.");
                            return true;
                        }
                    };
                }
            } else {
                alert("This browser does not support HTML5.");
                return false;
            }
        } else {
            alert("Please select a valid Image file.");
            return false;
        }
    }
</script>-->
</html>
<?php

	if(isset($_POST['insert2']))
	{
		
		$image2 = $_POST['image2'];
		$image3 = $_POST['image3'];
		$image4 = $_POST['image4'];

		$sql1 = "INSERT INTO image(image_file) VALUES ('$image2')";
		$sql2 = "INSERT INTO image(image_file) VALUES ('$image3')";
		$sql3 = "INSERT INTO image(image_file) VALUES ('$image4')";
		
		mysqli_query($connect, $sql1);
		mysqli_query($connect, $sql2);
		mysqli_query($connect, $sql3);
		
		
		header("Location:adisplay.php");
		
	}
?>