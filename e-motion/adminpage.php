<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Page</title>
    <link rel="stylesheet" href="./adminpage.css" />
    <link rel="shortcut icon" href="./icon.ico" type="image/x-icon" />
  </head>

  <body>
    <?php
$db = mysqli_connect("localhost", "root", "", "e-motion");

$result = mysqli_query($db, "SELECT * FROM images");

$imgArray = array();
while($row = mysqli_fetch_assoc($result)){
    $imgArray[] = $row['img'];
    
}

?>

    <div class="title1 rainbow-bg">
      <h1 align="center" style="margin: 0;">Admin Page</h1>
    </div>
    <div class="admin-box">
      <p class="pre-text">Preview Image:</p>
      <div class="preview-img" style="display: flex;">
        <div>
          <label style="margin: 0 5px;">
            <img
              class="img"
              src="./img/<?php echo $imgArray[0];?>"
              alt="No Image Uploaded"
              width="75px"
              height="75px"
            />
            <p>Image 1</p>
          </label>
          <label style="margin: 0 5px;">
            <img
              class="img"
              src="./img/<?php echo $imgArray[1];?>"
              alt="No Image Uploaded"
              width="75px"
              height="75px"
            />
            <p>Image 2</p>
          </label>

          <label style="margin: 0 5px;">
            <img
              class="img"
              src="./img/<?php echo $imgArray[2];?>"
              alt="No Image Uploaded"
              width="75px"
              height="75px"
            />
            <p>Image 3</p>
          </label>

          <label style="margin: 0 5px;">
            <img
              class="img"
              src="./img/<?php echo $imgArray[3];?>"
              alt="No Image Uploaded"
              width="75px"
              height="75px"
            />
            <p>Image 4</p>
          </label>

          <label style="margin: 0 5px;">
            <img
              class="img"
              src="./img/<?php echo $imgArray[4];?>"
              alt="Image 5"
              width="75px"
              height="75px"
            />
            <p>Image 5</p>
          </label>
        </div>
      </div>
      <div class="admin-form">
        <form
          action="./upload1.php"
          method="post"
          enctype="multipart/form-data"
        >
          Change "Image 1" :
          <input
            type="file"
            name="image1"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <button class="admin-btn" name="upload">Upload</button>
        </form>
        <form
          action="./upload2.php"
          method="post"
          enctype="multipart/form-data"
        >
          Change "Image 2" :
          <input
            type="file"
            name="image2"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <button class="admin-btn" name="upload">Upload</button>
        </form>
        <form
          action="./upload3.php"
          method="post"
          enctype="multipart/form-data"
        >
          Change "Image 3" :
          <input
            type="file"
            name="image3"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <button class="admin-btn" name="upload">Upload</button>
        </form>
        <form
          action="./upload4.php"
          method="post"
          enctype="multipart/form-data"
        >
          Change "Image 4" :
          <input
            type="file"
            name="image4"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <button class="admin-btn" name="upload">Upload</button>
        </form>
        <form
          action="./upload5.php"
          method="post"
          enctype="multipart/form-data"
        >
          Change "Image 5" :
          <input
            type="file"
            name="image5"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <button class="admin-btn" name="upload">Upload</button>
        </form>
        <form action="./reset.php" method="post" enctype="multipart/form-data">
          <button class="reset-btn" name="upload">Reset</button>
        </form>
      </div>
      <div style="text-align: left;">
        <p class="font-32" style="margin: 0px;">
          Change the color of the paddle
        </p>
        <label>
          <input type="radio" name="padcol" id="orange" value="orange" />
          <img src="./img/orange.png" />
          <p style="margin: 0px;">Orange</p>
        </label>
        <label>
          <input type="radio" name="padcol" id="black" value="black" />
          <img src="./img/black.png" />
          <p style="margin: 0px;">Black</p>
        </label>
        <label>
          <input type="radio" name="padcol" id="blue" value="blue" />
          <img src="./img/blue.png" />
          <p style="margin: 0px;">Blue</p>
        </label>
        <label>
          <input type="radio" name="padcol" id="violet" value="violet" />
          <img src="./img/violet.png" />
          <p style="margin: 0px;">Violet</p>
        </label>
        <label>
          <input type="radio" name="padcol" id="yellow" value="yellow" />
          <img src="./img/yellow.png" />
          <p style="margin: 0px;">Yellow</p>
        </label>
        <label>
          <input type="radio" name="padcol" id="rose" value="rose" />
          <img src="./img/rose.png" />
          <p style="margin: 0px;">Pink</p>
        </label>
      </div>
      <div style="text-align: center; clear: both;">
        <button class="return-btn" onclick="return setColor()">
          Set Default Paddle Color
        </button>
        <button class="return-btn" onclick="document.location = './index.html'">
          Logout
        </button>
        <button class="return-btn" onclick="document.location = './scoreboard.php'">
          Go to scoreboard
        </button>
      </div>
    </div>
  </body>
  <script src="loadCanvas.js"></script>
  <script>
    function setColor() {
      if (document.getElementById("orange").checked) {
        padColor = "orange";
        alert("Paddle color set to Orange!");
      } else if (document.getElementById("black").checked) {
        padColor = "black";
        alert("Paddle color set to Black!");
      } else if (document.getElementById("blue").checked) {
        padColor = "blue";
        alert("Paddle color set to Blue!");
      } else if (document.getElementById("violet").checked) {
        padColor = "violet";
        alert("Paddle color set to Violet!");
      } else if (document.getElementById("yellow").checked) {
        padColor = "yellow";
        alert("Paddle color set to Yellow!");
      } else if (document.getElementById("rose").checked) {
        padColor = "pink";
        alert("Paddle color set to Pink!");
      } else {
        alert(
          "You didn't select a paddle color!"
        );
        return false;
      }
      localStorage.clear();
      localStorage.setItem("pass", padColor);
    }
  </script>
</html>
