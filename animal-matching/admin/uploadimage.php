<?php
	$msg="";
	if(isset($_POST['jpg']))
	{
		$errors = array();
		$acceptable = array(
			'image/jpeg',
			'image/jpg',
		);

		$target = basename($_FILES['image']['name']);
		$connect = mysqli_connect("localhost","root", "", "game");
		
		$image = $_FILES['image']['name'];
		
		$sql = "INSERT INTO adimage(add_image) VALUES ('$image')";
		mysqli_query($connect, $sql);
		
		if(!in_array($_FILES['image']['type'], $acceptable) && (!empty($_FILES["image"]["type"]))) {
			$errors[] = 'Invalid file type. Only JPG types are accepted.';
		}
		
		if(move_uploaded_file($_FILES['image']['tmp_name'], $target)){
			$msg = "successfully";
		}else{
			$msg = "problem";
		}
		if(count($errors) === 0) {
			//move_uploaded_file($_FILES['image']['tmpname'], $target);
		} else {
			foreach($errors as $error) {
				?>
				<script>
				alert("Invalid file type. Only JPG types are accepted.");
				</script>
				<?php
				header("Location: uploadimage.php");
			}
			die(); //Ensure no more processing is done
			
		}
		
		/*if(move_uploaded_file($_FILES['image']['tmp_name'], $target)){
			$msg = "successfully";
		}else{
			$msg = "problem";
		}
		*/
		header("Location:admin.php");
	}
	
	if(isset($_POST['png']))
	{
		$errors = array();
		$acceptable = array(
			'image/png',
		);

		$target = basename($_FILES['image']['name']);
		$connect = mysqli_connect("localhost","root", "", "game");
		
		$image = $_FILES['image']['name'];
		
		$sql = "INSERT INTO adimage(add_image) VALUES ('$image')";
		mysqli_query($connect, $sql);
		
		if(!in_array($_FILES['image']['type'], $acceptable) && (!empty($_FILES["image"]["type"]))) {
			$errors[] = 'Invalid file type. Only PNG types are accepted.';
		}
		if(move_uploaded_file($_FILES['image']['tmp_name'], $target)){
			$msg = "successfully";
		}else{
			$msg = "problem";
		}
		if(count($errors) === 0) {
			//move_uploaded_file($_FILES['image']['tmpname'], $target);
		} else {
			foreach($errors as $error) {
				?>
				<script>
				alert("Invalid file type. Only PNG types are accepted.");
				</script>
				<?php
				header("Location: uploadimage.php");
			}
			
			die(); //Ensure no more processing is done
		}
		
		header("Location:admin2.php");
	}
?>


<!DOCTYPE html>
<html>
	<head>
	<link href="../style.css" rel="stylesheet" type="text/css"> 
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body{
			display:flex;
			margin:0;
			flex-direction:column;
		}

		body, html {
			height:100%
		}
		#insert{
			width: 60%;
			height:40px;
			margin:20px;
			border-radius: 20px;
			position: relative;
			background-color: rgba(255,255,255,0.3);
			transition: 0.3s all;
			
		}
		#plyerid input[type="text"],input[type="email"], input[type="password"]{
			width: 20%;
			height:40px;
			margin:20px;
			border-radius: 50px;
			position: relative;
			background-color: rgba(255,255,255,0.3);
			text-align:center;
			font-size:25px;
		}
		img{
			width: 200px;
			height: 100px;
			margin-top: 30px;
		}

		.copy-right p {
			color:#fff;
			font-size:14px;
			line-height: 1px;
		}
		.copy-right p a {
			color: #fff;
		}
		.copy-right p a:hover {
			color:#000000;
		}
		.copy-right {
			background:#34ad00;
			text-align: center;
			padding: 0.5em 0;
		}
	
input[type="submit"]{
	width: 20%;
	height:40px;
	margin:20px;
	border-radius: 20px;
}


</style>
<body>
<center>
		<img src="https://fontmeme.com/permalink/200514/cea09af05640bc554bb18bc09f8c1899.png" alt="indiana-jones-font" border="0" style="width: 50%;height: 90%;">
	</center><br><br>
		<form method="POST" action="uploadimage.php" enctype="multipart/form-data">
			
			<input type="hidden" name="size" value="1000000">
			<div id="container" style="color:white">
				<div id="plyerid">
					<center><span style="font-style:italic;font-size:20px;text-align:justify;padding:20px;">*The image size must be 836 x 580(width: 836 pixels, height: 580 pixels)</span></center><br>
					<center><input type="file" id="file" name="image" multiple accept=".jpg, .png" onchange="validateimg(this)" required></center>
					<br>
				</div>
				<div style="text-align:center;">
					<input class="btn" type="submit" name="jpg" value=".jpg" onchange="fileValidation()" >
					<input class="btn" type="submit" name="png" value=".png" onchange="fileValidation2()" >
				</div>
			</form>
			</div>
			<br>
		
<?php include 'footer.php'?>
</body>
</html>
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
                        if (height < 500 || width < 750) {
                            alert("At least you can upload a 750*580 photo size.");
							window.location.reload();
                            return false;
                        }
						else if (height > 620 || width > 850) {
                            alert("Your imgae size over 850*620 photo size.");
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
	
	function fileValidation(){
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .jpeg/.jpg only.');
        fileInput.value = '';
        return false;
    }else{
        return true;
    }
	
	
	function fileValidation2(){
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.png)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .png only.');
        fileInput.value = '';
        return false;
    }else{
        return true;
        }
    }
}
</script>