const videoWidth = 600;
const videoHeight = 450;
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");
const fps = 10;

canvasElement.width = videoWidth;
canvasElement.height = videoHeight;

//load camera
const webcam = new Webcam(webcamElement, "user", canvasElement);
webcamElement.width = videoWidth;
webcamElement.height = videoHeight;

let sec = 3;
let lastTime = 0;
let counter = 0;
let counterInterval = 1000;
let debug = false;
let timer = false;
let imageLoop = false;
let frame = 0;
let imageCountdown = 0;

const net = posenet.load();
document.getElementById("debug").addEventListener("click", function () {
  debug = !debug;
});
document.getElementById("setTimer").addEventListener("click", function () {
  timer = true;
});
function startCamera() {
  webcam
    .start()
    .then((result) => {
      console.log("webcam started");
    })
    .catch((err) => {
      console.log(err);
    });
}
//detect pose
function poseNetDetection(time) {
  //load posenet
  setTimeout(function () {
    //currunt time
    let startTime = Date.now();
    posenet
      .load()
      .then(function (net) {
        return net.estimateSinglePose(webcamElement, {
          architecture: "ResNet50",
          // architecture: 'MobileNetV1' ResNet50,
          flipHorizontal: true,
          //   maxDetections: 2,
          //    scoreThreshold: 0.6,
          //    nmsRadius: 20,
          outputStride: 32,
          inputsolution: { width: videoWidth, height: videoHeight },
          imageScaleFactor: 0.5,
        });
      })
      .then(function (poses) {
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        if (debug) {
          drawText(poses);
        }
        // draw all the key points
        for (let i = 0; i < poses.keypoints.length; i++) {
          let x = poses.keypoints[i].position.x;
          let y = poses.keypoints[i].position.y;
          let s = poses.keypoints[i].score;

          //if score bigger then 0.7
          if (s >= 0.7) {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
          }
        }

        const deltaTime = time - lastTime;
        lastTime = time;
        counter += deltaTime;
        if (timer && counter >= counterInterval) {
          counter = 0;
          recordTimer(poses);
        }

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        if (poses.keypoints[0].score > 0.7 && poses.keypoints[1].score > 0.7) {
          ctx.lineTo(
            poses.keypoints[0].position.x,
            poses.keypoints[0].position.y
          );
          ctx.lineTo(
            poses.keypoints[1].position.x,
            poses.keypoints[1].position.y
          );
        }

        if (poses.keypoints[0].score > 0.7 && poses.keypoints[2].score > 0.7) {
          ctx.lineTo(
            poses.keypoints[0].position.x,
            poses.keypoints[0].position.y
          );
          ctx.lineTo(
            poses.keypoints[2].position.x,
            poses.keypoints[2].position.y
          );
        }

        if (poses.keypoints[1].score > 0.7 && poses.keypoints[3].score > 0.7) {
          ctx.lineTo(
            poses.keypoints[1].position.x,
            poses.keypoints[1].position.y
          );
          ctx.lineTo(
            poses.keypoints[3].position.x,
            poses.keypoints[3].position.y
          );
          ctx.lineTo(
            poses.keypoints[1].position.x,
            poses.keypoints[1].position.y
          );
          ctx.moveTo(
            poses.keypoints[0].position.x,
            poses.keypoints[0].position.y
          );
        }
        if (poses.keypoints[2].score > 0.7 && poses.keypoints[4].score > 0.7) {
          ctx.lineTo(
            poses.keypoints[2].position.x,
            poses.keypoints[2].position.y
          );
          ctx.lineTo(
            poses.keypoints[4].position.x,
            poses.keypoints[4].position.y
          );
          //  ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
        }
        ctx.stroke();
        ctx.closePath();
        console.log(imageLoop);
        var skeleton = posenet.getAdjacentKeyPoints(poses.keypoints);
        // 0 > 1; 0 > 2; 1 > 3; 2 > 4;

        for (let j = 0; j < skeleton.length; j++) {
          var segment = skeleton[j];
          ctx.beginPath();
          ctx.strokeStyle = "red";
          if (segment[0].score > 0.7 && segment[1].score > 0.7) {
            ctx.lineTo(segment[0].position.x, segment[0].position.y);
            ctx.lineTo(segment[1].position.x, segment[1].position.y);
          }
          ctx.stroke();
        }

        // end time
        let endTime = Date.now();

        //timedifferent in ms = end time - start time;
        let timeDifferent = endTime - startTime;

        //fps = 1000 / time different
        frame = 1000 / timeDifferent;

        // print fps;
      });
    requestAnimationFrame(poseNetDetection);
  }, 1000 / (fps + frame));
}

function recordTimer(poses) {
  if (!imageLoop) {
    if (sec >= 1) {
      sec--;
      document.getElementById("sec").innerHTML = sec;
    } else {
      imageLoop = true;
      sec = 30;
    }
  } else if (imageLoop) {
    countDownTimer();
    storeData(poses.keypoints);
  }
}

function drawText(poses) {
  for (let i = 0; i < poses.keypoints.length; i++) {
    let x = poses.keypoints[i].position.x;
    let y = poses.keypoints[i].position.y;
    let s = poses.keypoints[i].score.toFixed(2);

    ctx.beginPath();
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(s, x + 15, y);

    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
function storeData(keypoints) {
  window.parent.wsCreateScore(keypoints);
  $.ajax({
    type: "POST",
    url: "storeData.php",
    data: { keypoint: JSON.stringify(keypoints) },
  });
}

function countDownTimer() {
  if (sec > 0) {
    imageCountdown++;
    sec--;
    document.getElementById("sec").innerHTML = sec;
    if (imageCountdown > 4) {
      imageCountdown = 0;
      changeImage();
    }
  } else {
    sec = 30;
    document.getElementById("sec").innerHTML = sec;
    imageLoop = false;
    timer = false;
  }
}

let myImage = document.getElementById("images");
let imageArray = [
  "img/a.jpg",
  "img/b.jpg",
  "img/c.jpg",
  "img/d.jpg",
  "img/e.jpg",
  "img/f.jpg",
  "img/g.jpg",
  "img/h.jpg",
  "img/i.jpg",
  "img/j.jpg",
];
let imageIndex = 1;

function changeImage() {
  myImage.setAttribute("src", imageArray[imageIndex]);
  imageIndex++;
  if (imageIndex > 9) {
    imageIndex = 0;
  }
}

function init() {
  startCamera();
  poseNetDetection();
}

init();
