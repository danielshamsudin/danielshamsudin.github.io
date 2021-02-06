const videoWidth = 640;
const videoHeight = 480;
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");

canvasElement.width = videoWidth;
canvasElement.height = videoHeight;

//load camera
const webcam = new Webcam(webcamElement);
webcamElement.width = videoWidth;
webcamElement.height = videoHeight;
startCamera();

//timer
let countdownsec = 6;
let sec = 60;
let lastTime = 0;
let counter = 0;
let counterInterval = 1000;
let timer = false;

//loop image
let imageLoop = false;
let imageTime = 0;

//Detect position 35 sec time
//  let positionTime = 0;

let startStore = false;
//store user input id purpose,
let userid = null;
let startTime = 0;
let userName = null;

//Maintance the post
let maintance = 0;
let maintanceTime = 0;
let loadingTime = 1000;
let loading = 0;

//  let file = {};
//counts all angle
let all_angle = [];

//ref data
let ref_angle = []; //data from json file
let ref_pose = []; // photo angle points

//
let l = 0;
let ref_ID = 0;
//pose matching
let poseMatch = false; // haven't use
let match = false; // if different angle small then 20 match = true
let different = []; //store the different between ref and sam angle
let lastdiff = [];
let angleDiff = [];
let timestamp = 0;

//score
let averageScore = 0;
let maxScore = 20;
let score = [];
let totalScore = 0;
// skeleton and keypoints color
let color = "LawnGreen";
//debug purpose
let debug = false;
// array to store data
let files = {
  library: [],
  UserInput: [],
  Data: [],
};
let a = 0;

document.getElementById("debug").disabled = true;

let frame = 0;
let net;
let indexxx = 0;
let Flag_ProcessFrame = true;
let center = (videoWidth + 1) / 2; // center of x-axis
let c_left = Math.floor(center); // the left pixel of center of x-axis
let c_right = Math.ceil(center); // the right pixel of center of x-axis
let start;
let fps;
let skeletonPoints;
let Flag_ProcessLogic = false;
document.getElementById("debug").addEventListener("click", function () {
  debug = !debug;
  if (debug) {
    document.getElementById("debug").innerHTML = "Debug ON";
  } else {
    document.getElementById("debug").innerHTML = "Debug OFF";
    document.getElementById("fps").innerHTML = "";
  }
});
document.getElementById("setTimer").addEventListener("click", function () {
  userid = localStorage.getItem("Usergmail");
  userName = localStorage.getItem("Username");
  startStore = false;
  document.getElementById("setTimer").style.visibility = "hidden";
  document.getElementById("debug").style.visibility = "hidden";

  files.library.push({ Name: "Posenet", Achiterture: "Resnet50" });
  files.UserInput.push({ Name: userName, Gmail: userid });

  startTime = Date.now();
  timer = true;
});

document.addEventListener("DOMContentLoaded", function (event) {
  userid = localStorage.getItem("Usergmail");
  userName = localStorage.getItem("Username");
  startStore = false;
  document.getElementById("setTimer").style.visibility = "hidden";
  document.getElementById("debug").style.visibility = "hidden";
  document.getElementById("sec").style.display = "block";
  files.library.push({ Name: "Posenet", Achiterture: "Resnet50" });
  files.UserInput.push({ Name: userName, Gmail: userid });

  startTime = Date.now();
  timer = true;
});

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

var worker = new Worker("estimatepose.js");
worker.addEventListener(
  "message",
  function (e) {
    // console.log('Single: ', e.data);
    skeletonPoints = e.data;
    fps = Math.round(1000 / (Date.now() - start));
    if (debug) document.getElementById("fps").innerHTML = "FPS: " + fps;
    Flag_ProcessFrame = true;
    Flag_ProcessLogic = true;
  },
  false
);

function startCamera() {
  webcam
    .start()
    .then((result) => {
      console.log("webcam started");
      requestAnimationFrame(processFrame);
      getRefData();
    })
    .catch((err) => {
      console.log(err);
      console.log("webcam ended")

      window.parent.wsRequireHardwareMessage("camera");

      
    });
}

function processFrame(time) {
  setTimeout(function () {
    if (Flag_ProcessFrame) {
      start = Date.now();
      Flag_ProcessFrame = false;
      var canvas = document.createElement("canvas");
      canvas.width = webcamElement.width;
      canvas.height = webcamElement.height;
      canvas.getContext("2d").drawImage(webcamElement, 0, 0);
      // worker.postMessage(canvas.toDataURL()); // send data to our worker.

      let img = canvas
        .getContext("2d")
        .getImageData(0, 0, videoWidth, videoHeight);
      worker.postMessage(img);

      // indexxx = indexxx + 1;
      // worker.postMessage(indexxx); // Send data to our worker.
    } else if (Flag_ProcessLogic) {
      //
      //
      //		PUT ALL THE PROCESSING HERE!!!!
      //		chg image, save data, all here.

      const deltaTime = time - lastTime;
      lastTime = time;
      counter += deltaTime;
      if (timer && counter >= counterInterval) {
        counter = 0;
        recordTimer();
      }
      if (imageLoop) {
        // positionTime += deltaTime;

        timestamp = Date.now();
        let file = {
          RefPose_ID: ref_ID,
          Timestamp: timestamp,
          Keypoints: skeletonPoints.keypoints,
        };
        files.Data.push(file);
        a++;
        saveAngle(skeletonPoints);
        poseMatching(deltaTime);
      }
      if (startStore == true) {
        storeData(files, userName, startTime);
        openDataBase(userName, userid, startTime, totalScore);
        window.parent.wsCreateScore(Math.round(totalScore));
        startStore = false;
      }
      // Inverse x-axis of skeleton points
      for (let i = 0; i < skeletonPoints.keypoints.length; i++) {
        let newX, offset;
        let x = skeletonPoints.keypoints[i].position.x;
        if (x > center) {
          offset = videoWidth - x;
          newX = 1 + offset;
        } //(x < center)
        else {
          offset = c_left - x;
          newX = c_right + offset;
        }
        skeletonPoints.keypoints[i].position.x = newX;
      }

      // render skeletons
      render(skeletonPoints);
      Flag_ProcessLogic = false;
    }
    requestAnimationFrame(processFrame);
  }, 11); // 1000(ms) / 90(camera fps * 3) = 11.11
}

function recordTimer() {
  if (!imageLoop) {
    imageIndex = 0;
    document.getElementById("sec").innerHTML = "&nbsp;";
    if (countdownsec > 1) {
      countdownsec--;

      document.getElementById("sec").innerHTML = "&nbsp;";
    } else {
      var backgroundMusic = document.getElementById("background-music");
      backgroundMusic.play();

      document.getElementsByClassName("score")[0].style.display = "block";
      document.getElementsByClassName("score")[1].style.display = "block";

      imageLoop = true;
      sec = 60;
    }
  } else if (imageLoop) {
    countDownTimer();
  }
}

function debugRender(poses) {
  for (let i = 0; i < poses.keypoints.length; i++) {
    let x = poses.keypoints[i].position.x;
    let y = poses.keypoints[i].position.y;
    let s = poses.keypoints[i].score.toFixed(2);

    ctx.beginPath();
    ctx.font = "15px Arial";
    if (s >= 0.7) {
      ctx.font = "15px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(s, x + videoWidth * 0.01, y);
    } else {
      ctx.fillStyle = "#ffb3b3";
      ctx.fillText(s, x + videoWidth * 0.01, y);

      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "crimson";
      ctx.fill();
    }
  }
}
function storeData(files, userName, startTime) {
  $.ajax({
    type: "POST",
    url: "storeData.php",
    data: {
      keypoint: JSON.stringify(files, null, 3),
      id: userName,
      currentTime: startTime,
    },
  });
}

function openDataBase(userName, userid, startTime, totalScore, data) {
  $.ajax({
    type: "POST",
    url: "database.php",
    data: {
      User_Name: userName,
      User_gmail: userid,
      Time: startTime,
      Score: totalScore,
      MatchData: JSON.stringify(data),
    },
  });
}
function countDownTimer() {
  if (sec > 0) {
    sec--;
    if (sec == 15) {
      var backgroundMusic = document.getElementById("background-music");
      backgroundMusic.playbackRate = 1.5;
    }
    document.getElementById("sec").innerHTML = "Time:" + sec;

    if (imageTime <= 0) {
      imageTime = 5;
      changeImage();
    }
  } else {
    sec = 6;
    color = "LawnGreen";
    imageIndex = 0;
    document.getElementById("sec").innerHTML = "&nbsp;";
    imageLoop = false;
    timer = false;
    startStore = true;
    localStorage.setItem("Score", Math.round(totalScore));
  }
}

function render(poses) {
  ctx.clearRect(0, 0, videoWidth, videoHeight);
  drawSkeleton(poses);
  if (debug) {
    debugRender(poses);
  }
}

function drawSkeleton(poses) {
  // draw all the key points
  for (let i = 0; i < poses.keypoints.length; i++) {
    let x = poses.keypoints[i].position.x;
    let y = poses.keypoints[i].position.y;
    let s = poses.keypoints[i].score;

    //if score bigger then 0.7
    if (s >= 0.5) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
  }

  if (timer && !imageLoop) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, videoWidth, videoHeight);

    ctx.font = "830% Arial";
    ctx.fillStyle = "white";
    ctx.fillText(countdownsec, videoWidth / 2 - 30, videoWidth / 2 - 30);
    ctx.closePath();
  }

  if (timer && imageLoop) {
    ctx.beginPath();
    ctx.font = "400% Arial";
    ctx.fillStyle = "black";
    document.getElementsByClassName("score")[0].innerHTML =
      "Score : " + Math.round(totalScore);
    document.getElementsByClassName("score")[1].innerHTML =
      "Score : " + Math.round(totalScore);
    // ctx.fillText("Score : " + Math.round(totalScore), 30, 50);
    ctx.closePath();
  }

  if (timer && imageLoop && loadingTime <= 1000) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, videoWidth, videoHeight);

    ctx.font = "430% Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Next Pose!!!", videoWidth / 2 - 240, videoWidth / 2 - 240);
    ctx.closePath();
  }

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.beginPath();
  if (poses.keypoints[0].score >= 0.5 && poses.keypoints[1].score >= 0.5) {
    ctx.lineTo(poses.keypoints[0].position.x, poses.keypoints[0].position.y);
    ctx.lineTo(poses.keypoints[1].position.x, poses.keypoints[1].position.y);
  }

  if (poses.keypoints[0].score >= 0.5 && poses.keypoints[2].score >= 0.5) {
    ctx.lineTo(poses.keypoints[0].position.x, poses.keypoints[0].position.y);
    ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
  }

  if (poses.keypoints[1].score >= 0.5 && poses.keypoints[3].score >= 0.5) {
    ctx.lineTo(poses.keypoints[1].position.x, poses.keypoints[1].position.y);
    ctx.lineTo(poses.keypoints[3].position.x, poses.keypoints[3].position.y);
    ctx.lineTo(poses.keypoints[1].position.x, poses.keypoints[1].position.y);
    ctx.lineTo(poses.keypoints[0].position.x, poses.keypoints[0].position.y);
  }
  if (poses.keypoints[2].score >= 0.5 && poses.keypoints[4].score >= 0.5) {
    ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
    ctx.lineTo(poses.keypoints[4].position.x, poses.keypoints[4].position.y);
    //  ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
  }
  ctx.stroke();
  ctx.closePath();

  var skeleton = posenet.getAdjacentKeyPoints(poses.keypoints);
  // 0 > 1; 0 > 2; 1 > 3; 2 > 4;

  for (let j = 0; j < skeleton.length; j++) {
    var segment = skeleton[j];
    ctx.beginPath();
    ctx.strokeStyle = color;
    if (segment[0].score >= 0.5 && segment[1].score >= 0.5) {
      ctx.lineTo(segment[0].position.x, segment[0].position.y);
      ctx.lineTo(segment[1].position.x, segment[1].position.y);
    }
    ctx.stroke();
  }
}

function saveAngle(pose) {
  let point = pose.keypoints;

  all_angle[0] = Angle(point[5].position, point[7].position);
  all_angle[1] = Angle(point[7].position, point[9].position);
  all_angle[2] = Angle(point[6].position, point[8].position);
  all_angle[3] = Angle(point[8].position, point[10].position);
  all_angle[4] = Angle(point[11].position, point[13].position);
  all_angle[5] = Angle(point[13].position, point[15].position);
  all_angle[6] = Angle(point[12].position, point[14].position);
  all_angle[7] = Angle(point[14].position, point[16].position);
}
// Array(8)
// 0: 228.8485125495745
// 1: 36.48705920993465
// 2: -3640.7291242715637
// 3: 176.0864739803398
// 4: 190.82851215548655
// 5: 358.9989626694376
// 6: 30.51790277936547
// 7: 137.005688845850

function Angle(point1, point2) {
  let angle = 0;
  let m = 0;
  let xdiff = 0;
  let ydiff = 0;
  xdiff = point1.x - point2.x;
  ydiff = point1.y - point2.y;

  if (xdiff != 0) {
    if (ydiff > 0 && xdiff > 0) {
      m = ydiff / xdiff;
      angle = (Math.atan(m) * 180) / Math.PI + 180;
    }

    if (ydiff < 0 && xdiff > 0) {
      m = ydiff / xdiff;
      angle = (Math.atan(m) * 180) / Math.PI + 180;
    }

    if (ydiff < 0 && xdiff < 0) {
      m = ydiff / xdiff;
      angle = (Math.atan(m) * 180) / Math.PI;
    }

    if (ydiff > 0 && xdiff < 0) {
      m = ydiff / xdiff;
      angle = (Math.atan(m) * 180) / Math.PI + 360;
    }

    if (ydiff == 0 && xdiff > 0) {
      angle = 180;
    }

    if (ydiff == 0 && xdiff < 0) {
      angle = 0;
    }
  } else {
    if (ydiff < 0) {
      angle = 90;
    }

    if (ydiff > 0) {
      angle = 270;
    }
  }
  return angle;
}

function getRefData() {
  fetch("refpose_list.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      ref_angle = data.data;
    });
}

function refAngle(angleData) {
  if (l < 6);
  {
    let ref_data = angleData[l];
    //.keypoints
    ref_pose[0] = Angle(
      ref_data.keypoints[5].position,
      ref_data.keypoints[7].position
    ); // left shoulder left elboww
    ref_pose[1] = Angle(
      ref_data.keypoints[7].position,
      ref_data.keypoints[9].position
    ); // left elbow left wrist
    ref_pose[2] = Angle(
      ref_data.keypoints[6].position,
      ref_data.keypoints[8].position
    ); // right
    ref_pose[3] = Angle(
      ref_data.keypoints[8].position,
      ref_data.keypoints[10].position
    ); // right
    ref_pose[4] = Angle(
      ref_data.keypoints[11].position,
      ref_data.keypoints[13].position
    ); // left
    ref_pose[5] = Angle(
      ref_data.keypoints[13].position,
      ref_data.keypoints[15].position
    ); // left
    ref_pose[6] = Angle(
      ref_data.keypoints[12].position,
      ref_data.keypoints[14].position
    ); //right
    ref_pose[7] = Angle(
      ref_data.keypoints[14].position,
      ref_data.keypoints[16].position
    ); // right
    ref_ID = ref_angle[l].refpose_ID;
  }
  l++;
}

function differentAngle(sam_angle, ref) {
  let dif_angle = 0;

  dif_angle = Math.abs(ref - sam_angle);

  if (dif_angle > 180) {
    dif_angle = 360 - dif_angle;
  }

  return dif_angle;
}

function poseMatching(deltaTime) {
  loadingTime += deltaTime;

  if (loadingTime >= 2000) {
    for (let i = 0; i < 8; i++) {
      different[i] = differentAngle(ref_pose[i], all_angle[i]);
    }

    for (let j = 0; j < 8; j++) {
      angleDiff[j] = different[j] - lastdiff[j];
      lastdiff[j] = different[j];

      match = angleDiff[j] <= 20;
      if (match == true) {
        poseMatch = true;
      } else {
        poseMatch = false;
        break;
      }
    }
    if (poseMatch) {
      color = "red";

      maintanceTime += deltaTime;

      if (maintanceTime >= counterInterval) {
        maintanceTime = 0;
        maintance++;
        if (poseMatch && maintance >= 2) {
          color = "LawnGreen";
          maintance = 0;
          loadingTime = 0;
          for (let z = 0; z < 8; z++) {
            score[z] = ((180 - different[z]) / 180) * maxScore;
          }

          for (let y = 0; y < 8; y++) {
            averageScore += score[y];
          }
          totalScore = (averageScore / 8)*20;

          console.log(averageScore)
          console.log(totalScore)
          // document.getElementById("score").innerHTML ="Score: " + 0;

          var correct = document.getElementById("correct");
          correct.play();
          changeImage();
          var next = document.getElementById("next");
          next.play();
        }
      }
    } else {
      maintanceTime = 0;
      maintance = 0;
      color = "LawnGreen";
    }
  }
}

// Change image purpose
let myImage = document.getElementById("images");
let imageArray = [
  "img/a.jpeg",
  "img/b.jpeg",
  "img/c.jpeg",
  "img/d.jpeg",
  "img/e.jpeg",
  "img/f.jpeg",
  "img/g.jpeg",
];
let imageIndex = 0;

function changeImage() {
  if (imageIndex > 6) {
    imageIndex = 0;
    myImage.setAttribute("src", imageArray[imageIndex]);
    document.getElementById("sec").innerHTML = "&nbsp;";
    color = "LawnGreen";
    sec = 1;
    localStorage.setItem("Score", Math.round(totalScore));
  } else {
    refAngle(ref_angle);
    myImage.setAttribute("src", imageArray[imageIndex]);
    match = false;
    imageIndex++;
  }
}
