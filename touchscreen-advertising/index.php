<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Touchscreen Advertising - Flappy Bird</title>
    <meta name='viewport' 
     content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'>
    <link rel="stylesheet" href="js/vendor/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/main.css" />

    <script
    src="https://code.jquery.com/jquery-3.5.1.slim.js"
    integrity="sha256-DrT5NfxfbHvMHux31Lkhxg42LY6of8TaYyK50jnxRnM="
    crossorigin="anonymous"></script>
  </head>

  <body>
      <div class="p-4 d-flex justify-content-center align-items-center h-100"> 
        <!-- <h3 class="title">Welcome To The Creative Touch</h3>
        <h5 class="title">Please have fun playing Flappy Bird!</h5>
        <h6 id="timer" class="text-warning text-bold">Get Ready!</h6> -->
        <canvas id="bird" width="320" height="480" style=""></canvas>
      </div>

    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/vendor/modernizr-3.11.2.min.js"></script>
    <script src="js/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="js/config.js"></script>
    <script src="js/main.js"></script>
    <script src="js/game.js?v=1.0"></script>
  </body>
</html>

<script>
$('.no-zoom').bind('touchend', function(e) {
  e.preventDefault();
  // Add your code here. 
  $(this).click();
  // This line still calls the standard click event, in case the user needs to interact with the element that is being clicked on, but still avoids zooming in cases of double clicking.
})


</script>