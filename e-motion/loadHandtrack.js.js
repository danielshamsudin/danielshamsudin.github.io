const modelParams = {
  //flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.6, // ioU threshold for non-max suppression
  scoreThreshold: 0.8, // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

handTrack.startVideo(video).then((status) => {
  var countdownToLobby; 

  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
        //run
        console.log(status);
        clearInterval(countdownToLobby);
        setInterval(runDetection, 100);
        //runDetection();
      },
      (err) => console.log(err)
    );
  } else if (!status) {
    window.parent.wsRequireHardwareMessage("camera");
    // location.href = "https://fuyoh-ads.com/campaign_web/#/game";
    countdownToLobby= setInterval(runRedirectToLobby, 60000);
  }
});

function runRedirectToLobby() {
  location.href = "https://fuyoh-ads.com/campaign_web/#/game";
}
function runDetection() {
  //requestAnimationFrame(runDetection);
  if (model === undefined) return;
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas1, ctx1, video);
    if (predictions.length !== 0) {
      handX = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
      handY = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
      //console.log(handX, handY);
      isLoaded = true;
    }
    if (predictions == 0) {
      isStart = true;
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

/* // Temporary Only
function changeDetectionSpeed() {
  var e = document.getElementById("detectspeed");
  var speed = e.options[e.selectedIndex].value;
  console.log("speed is ", speed);
  setInterval(runDetection, parseInt(speed));
}
 */
