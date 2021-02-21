const videoWidth = 640;
const videoHeight = 480;
const MIN_ACCEPTABLE_KEYPOINT_SCORE = 0.6;
const MAX_ACCEPTED_ANGLE_DIFF_REG_POSE = 15; // Threshold for register pose
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d"); // for drawing
canvasElement.width = videoWidth;
canvasElement.height = videoHeight;
const backgroundMusic = document.getElementById("background-music");
const TIME_COUNT_DOWN_TO_START = 7000;  // ms
const TIME_PLAYABLE = 5000;  // ms
const TIME_TOTAL = TIME_COUNT_DOWN_TO_START + TIME_PLAYABLE;
const TIME_GAME_IS_ENDING = 15000;  // ms, the threshold to tell the game is ending soon
const TIME_CHANGE_REF_POSE_COOL_DOWN = 1000;  // ms, the threshold to tell the game is ending soon
const TIME_REGISTER_POSE = 2000;  // ms, time to register a pose
const imageArray = [
  "img/100.jpg",
  "img/101.jpg",
  "img/102.jpg",
  "img/103.jpg",
  "img/104.jpg",
  "img/105.jpg",
  "img/106.jpg",
  "img/107.jpg",
  "img/108.jpg",
  "img/109.jpg",
  "img/110.jpg",
  "img/111.jpg",
  "img/112.jpg",
  "img/113.jpg",
  "img/114.jpg",
];
const numReferencePose = imageArray.length;
// let numReferencePose = 7;
const DEBUG = false;

//load camera
const webcam = new Webcam(webcamElement);
webcamElement.width = videoWidth;
webcamElement.height = videoHeight;

//timer
let previousTime = 0;

//loop image
let gameStart = false;
let imageTime = 0;

//Detect position 35 sec time
//  let positionTime = 0;

let gameCompleted = true;
//store user input id purpose,
let userid = null;
let startTime;
let userName = null;

//Maintance the post
let maintanceTime = 0;
let coolDownTime = 0; // cool down timer for change reference pose
let loading = 0;

//  let file = {};
//counts all angle

//ref data
let reference_poses = []; //data from json file
let ref_pose_angle = []; // photo angle points

//
let currentRefPose = -1;
let ref_ID = -1;
//pose matching
let lastdiff = [];
let angleDiff = [];
let timestamp = 0;
let current_ref_pose_for_render = [];

//score
let maxScore = 20;
// let maxScore = 1;
let totalScore = 0;
// skeleton and keypoints color
let color = "white";
let poseRegistered = false;

// array to store data
let files = {
  library: [],
  UserInput: [],
  Data: [],
};

document.getElementById("debug").disabled = true;

let frame = 0;
let net;
let indexxx = 0;
let Flag_ProcessFrame = true; // The process of pose estimation only conduct once at a time 
let center = (videoWidth + 1) / 2; // center of x-axis
let c_left = Math.floor(center); // the left pixel of center of x-axis
let c_right = Math.ceil(center); // the right pixel of center of x-axis
let start;
let fps;
let skeletonPoints;
let skeletonPointsDistance; // the distance between points
let ref_current_angle_differences = []; //store the differences between ref and sample angle

let Flag_ProcessLogic = false; // Only conduct the processes that based on the skeleton when the new skeleton is presented. 
let ignoreSkeletonPoint = [0,1,2,3,4,11,12,13,14,15,16]; // ignore head and lower body.
let skeletonDescription = [];
skeletonDescription[0]="nose";
skeletonDescription[1]="leftEye";
skeletonDescription[2]="rightEye";
skeletonDescription[3]="leftEar";
skeletonDescription[4]="rightEar";
skeletonDescription[5]="leftShoulder";
skeletonDescription[6]="rightShoulder";
skeletonDescription[7]="leftElbow";
skeletonDescription[8]="rightElbow";
skeletonDescription[9]="leftWrist";
skeletonDescription[10]="rightWrist";
skeletonDescription[11]="leftHip";
skeletonDescription[12]="rightHip";
skeletonDescription[13]="leftKnee";
skeletonDescription[14]="rightKnee";
skeletonDescription[15]="leftAnkle";
skeletonDescription[16]="rightAnkle";
let ignoreSkeletonPart = [];
for (var i=0; i<ignoreSkeletonPoint.length; i++)
  ignoreSkeletonPart.push(skeletonDescription[ignoreSkeletonPoint[i]]);

console.log("Ignored body parts");
console.log(ignoreSkeletonPart);

// document.getElementById("debug").addEventListener("click", function () {
//   debug = !debug;
//   if (debug) {
//     document.getElementById("debug").innerHTML = "Debug ON";
//   } else {
//     document.getElementById("debug").innerHTML = "Debug OFF";
//     document.getElementById("fps").innerHTML = "";
//   }
// });

// document.getElementById("setTimer").addEventListener("click", function () {
//   userid = localStorage.getItem("Usergmail");
//   userName = localStorage.getItem("Username");
//   startStore = false;
//   document.getElementById("setTimer").style.visibility = "hidden";
//   document.getElementById("debug").style.visibility = "hidden";

//   files.library.push({ Name: "Posenet", Achiterture: "Resnet50" });
//   files.UserInput.push({ Name: userName, Gmail: userid });

//   startTime = Date.now();
//   timer = true;
// });

document.addEventListener("DOMContentLoaded", function (event) {
  userid = localStorage.getItem("Usergmail");
  userName = localStorage.getItem("Username");
  gameCompleted = false;
  document.getElementById("setTimer").style.visibility = "hidden";
  document.getElementById("debug").style.visibility = "hidden";
  document.getElementById("sec").style.display = "block";
  files.library.push({ Name: "Posenet", Achiterture: "Resnet50" });
  files.UserInput.push({ Name: userName, Gmail: userid });

  startCamera();
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
    if (DEBUG) 
    {
      document.getElementById("fps").innerHTML = "FPS: " + fps;
      // console.log("FPS: " + fps);
    }
    Flag_ProcessFrame = true;
    Flag_ProcessLogic = true;
  }, false
);

function startCamera() {
  webcam
    .start()
    .then((result) => {
      console.log("webcam started");
      startTime = Date.now();
      backgroundMusic.play();
      getRefData();
      requestAnimationFrame(main);
    })
    .catch((err) => {
      console.log(err);
      console.log("webcam ended")
      window.parent.wsRequireHardwareMessage("camera");      
    });
}

function main(time) {
  setTimeout(function () {
    if (Flag_ProcessFrame) {
      start = Date.now();
      Flag_ProcessFrame = false;
      
      // webcam feed to canvas, then get image from the canvas
      var canvas = document.createElement("canvas");
      canvas.width = webcamElement.width;
      canvas.height = webcamElement.height;
      canvas.getContext("2d").drawImage(webcamElement, 0, 0);
      let img = canvas
        .getContext("2d")
        .getImageData(0, 0, videoWidth, videoHeight);

      worker.postMessage(img);
    } 
    if (Flag_ProcessLogic) {
      //
      //
      //		PUT ALL THE PROCESSING HERE!!!!
      //		chg image, save data, all here.

      // countdown or timer event
      let deltaTime = time - previousTime;
      previousTime = time;
      if (!gameStart && !gameCompleted && time < TIME_TOTAL) {
        if(time > TIME_COUNT_DOWN_TO_START) {  
          document.getElementsByClassName("score")[0].style.display = "block";
          document.getElementsByClassName("score")[1].style.display = "block";
          changeReferencePose();
          gameStart = true;
        }
        else {
          document.getElementById("sec").innerHTML = "&nbsp;";
          ctx.clearRect(0, 0, videoWidth, videoHeight);
          ctx.beginPath();
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 0, videoWidth, videoHeight);    
          ctx.font = "830% Arial";
          ctx.fillStyle = "white";
          ctx.fillText(Math.ceil((TIME_COUNT_DOWN_TO_START - time)/1000), videoWidth / 2 - 30, videoWidth / 2 - 30);
          ctx.closePath();
          ctx.stroke();
        }
      }

      if(gameStart)
      {
        if(time > TIME_TOTAL)
        {
          ctx.clearRect(0, 0, videoWidth, videoHeight);
          ctx.beginPath();
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.fillRect(0, 0, videoWidth, videoHeight);    
          ctx.font = "800% Arial";
          ctx.fillStyle = "white";
          ctx.fillText("TIME'S UP", 5, videoWidth / 2 - 30);
          ctx.closePath();
          ctx.stroke();
          document.getElementById("sec").innerHTML = "Time:0";
          gameCompleteAction();
        }
        else 
        {
          if (TIME_TOTAL - time <= TIME_GAME_IS_ENDING)
          {
            backgroundMusic.playbackRate = 1.5;
          }
          document.getElementById("sec").innerHTML = "Time:" + Math.ceil((TIME_TOTAL - time)/1000);
        }
      }
    
      if (gameStart) {
        timestamp = Date.now();
        // Save skeleton data
        let file = {
          RefPose_ID: ref_ID,
          Timestamp: timestamp,
          Keypoints: skeletonPoints.keypoints,
        };
        files.Data.push(file);

        // Pose matching
        poseMatching(deltaTime);

        // Draw skeleton on screen
        render(skeletonPoints);
        if (currentRefPose>=0)
          drawReferencePose(current_ref_pose_for_render);

        // Draw score on screen
        ctx.beginPath();
        ctx.font = "400% Arial";
        ctx.fillStyle = "black";
        document.getElementsByClassName("score")[0].innerHTML =
          "Score : " + Math.round(totalScore * maxScore);
        // ctx.fillText("Score : " + Math.round(totalScore), 30, 50);
        ctx.closePath();
      }

      // render skeletons
      Flag_ProcessLogic = false;
    }
    requestAnimationFrame(main);
  }, 11); // 1000(ms) / 90(camera fps * 3) = 11.11
}

function inverseSkeletonXaxis(skeletonPoints, imageWidth)
{
   for (let i = 0; i < skeletonPoints.keypoints.length; i++) {
    let newX, offset;
    let x = skeletonPoints.keypoints[i].position.x;
    if (x > center) {
      offset = imageWidth - x;
      newX = 1 + offset;
    } //(x < center)
    else {
      offset = c_left - x;
      newX = c_right + offset;
    }
    skeletonPoints.keypoints[i].position.x = newX;
  }
  return skeletonPoints;
}

function debugRender(poses) {
  for (let i = 0; i < poses.keypoints.length; i++) {
    if (ignoreSkeletonPoint.includes(i))
      continue;
      
    let x = poses.keypoints[i].position.x;
    let y = poses.keypoints[i].position.y;
    let s = poses.keypoints[i].score.toFixed(2);

    ctx.beginPath();
    ctx.font = "15px Arial";
    if (s >= MIN_ACCEPTABLE_KEYPOINT_SCORE) {
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
      id: "userName",
      currentTime: startTime,
    },
  });
}

function openDataBase(userName, userid, startTime, totalScore, data) {
  $.ajax({
    type: "POST",
    // url: "https://fuyoh-ads.com/pose-matching/database.php",
    url: "database.php",
    data: {
      // User_Name: userName,
      User_Name: "userName",
      // User_gmail: userid,
      User_gmail: "userid",
      Time: startTime,
      Score: totalScore,
      MatchData: JSON.stringify(data),
    },
  });
}

function render(poses) {
  let poses_for_render = inverseSkeletonXaxis(poses, videoWidth);
  ctx.clearRect(0, 0, videoWidth, videoHeight);
  drawSkeleton(poses_for_render);
  if (DEBUG) {
    debugRender(poses_for_render);
  }
}

function drawReferencePose(pose) {
  // y max = 1300 or 1400
  for (let i = 0; i < pose.keypoints.length; i++) {
    if(ignoreSkeletonPoint.includes(i))
      continue;

    let x = pose.keypoints[i].position.x/10;
    let y = pose.keypoints[i].position.y/10;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "Red";
    ctx.fill();
    ctx.closePath();
}
     
  var skeleton = posenet.getAdjacentKeyPoints(pose.keypoints);
  for (let j = 0; j < skeleton.length; j++) {
    var segment = skeleton[j];
    if(ignoreSkeletonPart.includes(segment[0].part) || ignoreSkeletonPart.includes(segment[1].part))
      continue;

    ctx.beginPath();
    ctx.strokeStyle = "Red";
    ctx.moveTo(segment[0].position.x/10, segment[0].position.y/10);
    ctx.lineTo(segment[1].position.x/10, segment[1].position.y/10);
    ctx.stroke();
  }
}

function drawSkeleton(poses) {
  if (coolDownTime <= TIME_CHANGE_REF_POSE_COOL_DOWN && currentRefPose > 0)
    color = "lawngreen";

  // draw all the key points
  for (let i = 0; i < poses.keypoints.length; i++) {
    if(ignoreSkeletonPoint.includes(i))
      continue;

    let x = poses.keypoints[i].position.x;
    let y = poses.keypoints[i].position.y;
    let s = poses.keypoints[i].score;

    if (s >= MIN_ACCEPTABLE_KEYPOINT_SCORE || DEBUG) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
  }

  if (coolDownTime <= TIME_CHANGE_REF_POSE_COOL_DOWN && currentRefPose > 0) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, videoWidth, videoHeight);
    ctx.font = "430% Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Next Pose!!!", videoWidth / 2 - 200, videoWidth / 2 - 50);
    ctx.closePath();
  }

  // // draw lines to connect head points
  // ctx.beginPath();
  // ctx.strokeStyle = color;
  // if (poses.keypoints[0].score >= 0.5 && poses.keypoints[1].score >= 0.5) {
  //   ctx.lineTo(poses.keypoints[0].position.x, poses.keypoints[0].position.y);
  //   ctx.lineTo(poses.keypoints[1].position.x, poses.keypoints[1].position.y);
  // }

  // // if (!ignoreSkeletonPoint.includes(0) && !ignoreSkeletonPoint.includes(2) && poses.keypoints[0].score >= 0.5 && poses.keypoints[2].score >= 0.5) {
  // if (poses.keypoints[0].score >= 0.5 && poses.keypoints[2].score >= 0.5) {
  //   ctx.lineTo(poses.keypoints[0].position.x, poses.keypoints[0].position.y);
  //   ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
  // }

  // if (poses.keypoints[1].score >= 0.5 && poses.keypoints[3].score >= 0.5) {
  //   ctx.lineTo(poses.keypoints[1].position.x, poses.keypoints[1].position.y);
  //   ctx.lineTo(poses.keypoints[3].position.x, poses.keypoints[3].position.y);
  //   ctx.lineTo(poses.keypoints[1].position.x, poses.keypoints[1].position.y);
  //   ctx.lineTo(poses.keypoints[0].position.x, poses.keypoints[0].position.y);
  // }
  // if (poses.keypoints[2].score >= 0.5 && poses.keypoints[4].score >= 0.5) {
  //   ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
  //   ctx.lineTo(poses.keypoints[4].position.x, poses.keypoints[4].position.y);
  //   //  ctx.lineTo(poses.keypoints[2].position.x, poses.keypoints[2].position.y);
  // }  
  // ctx.stroke();
  // ctx.closePath();

  // // draw lines to connect body points, if pose is registered.
  // if (!poseRegistered)
  //   return;

  var skeleton = posenet.getAdjacentKeyPoints(poses.keypoints);
  // 0 > 1; 0 > 2; 1 > 3; 2 > 4;
  for (let j = 0; j < skeleton.length; j++) {
    var segment = skeleton[j];
    if(ignoreSkeletonPart.includes(segment[0].part) || ignoreSkeletonPart.includes(segment[1].part) ||
      segment[0].score < MIN_ACCEPTABLE_KEYPOINT_SCORE || segment[1].score < MIN_ACCEPTABLE_KEYPOINT_SCORE)
      continue;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(segment[0].position.x, segment[0].position.y);
    ctx.lineTo(segment[1].position.x, segment[1].position.y);
    ctx.stroke();

    // // set color based on angle differences
    // let part1Idx = skeletonDescription.indexOf(segment[0].part);
    // let part2Idx = skeletonDescription.indexOf(segment[1].part);
    // let index = "'" + (Math.pow(2, part1Idx) + Math.pow(2, part2Idx)) + "'";
    // ctx.beginPath();
    // if(!ref_current_angle_differences[index])
    //   ctx.strokeStyle = 'rgb(255, 0, 0)';
    // else if (ref_current_angle_differences[index] <= 10)
    //   ctx.strokeStyle = 'rgb(0, 255, 0)';
    // else
    //   ctx.strokeStyle = 'rgb(255, 0, 0)';

    //   // ctx.strokeStyle = 'rgb(255 * ' + gradient + ', 0, 0)';
    // ctx.moveTo(segment[0].position.x, segment[0].position.y);
    // ctx.lineTo(segment[1].position.x, segment[1].position.y);
    // ctx.stroke();
  }
}

function calculateAngle(pose) {
  let point = pose.keypoints;
  let angle = [];
  if (!ignoreSkeletonPoint.includes(5) && !ignoreSkeletonPoint.includes(7))
    angle["'" + (Math.pow(2, 5) + Math.pow(2, 7)) + "'"] = Angle(point[5].position, point[7].position);
  if (!ignoreSkeletonPoint.includes(7) && !ignoreSkeletonPoint.includes(9))
    angle["'" + (Math.pow(2, 7) + Math.pow(2, 9)) + "'"] = Angle(point[7].position, point[9].position);
  if (!ignoreSkeletonPoint.includes(6) && !ignoreSkeletonPoint.includes(8))
    angle["'" + (Math.pow(2, 6) + Math.pow(2, 8)) + "'"] = Angle(point[6].position, point[8].position);
  if (!ignoreSkeletonPoint.includes(8) && !ignoreSkeletonPoint.includes(10))
    angle["'" + (Math.pow(2, 8) + Math.pow(2, 10)) + "'"] = Angle(point[8].position, point[10].position);
  if (!ignoreSkeletonPoint.includes(11) && !ignoreSkeletonPoint.includes(13))
    angle["'" + (Math.pow(2, 11) + Math.pow(2, 13)) + "'"] = Angle(point[11].position, point[13].position);
  if (!ignoreSkeletonPoint.includes(13) && !ignoreSkeletonPoint.includes(15))
    angle["'" + (Math.pow(2, 13) + Math.pow(2, 15)) + "'"] = Angle(point[13].position, point[15].position);
  if (!ignoreSkeletonPoint.includes(12) && !ignoreSkeletonPoint.includes(14))
    angle["'" + (Math.pow(2, 12) + Math.pow(2, 14)) + "'"] = Angle(point[12].position, point[14].position);
  if (!ignoreSkeletonPoint.includes(14) && !ignoreSkeletonPoint.includes(16))
    angle["'" + (Math.pow(2, 14) + Math.pow(2, 16)) + "'"] = Angle(point[14].position, point[16].position);
  return angle;
}

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
  fetch("refpose_list_upper_body.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      reference_poses = data.data;
    });
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
  coolDownTime += deltaTime;
  let current_angle = [];
  poseRegistered = true;

  // Check if skeleton keypoints' score is above the treshold
  for (let i = 0; i < skeletonPoints.keypoints.length && poseRegistered; i++)
    if(!ignoreSkeletonPoint.includes(i) && skeletonPoints.keypoints[i].score < MIN_ACCEPTABLE_KEYPOINT_SCORE)
      poseRegistered = false;

  // Check if skeleton keypoints are in correct length
  if (poseRegistered)
  {  
    skeletonPointsDistance = calculateSkeletonPointsDistance(skeletonPoints);
    poseRegistered = checkSkeletonValidity(skeletonPointsDistance);
  }
  if(poseRegistered)
    current_angle = calculateAngle(skeletonPoints);

  // if current number of angle less than reference, pose is not match
  if(Object.keys(current_angle).length != Object.keys(ref_pose_angle).length)
     poseRegistered = false;

  if(poseRegistered) 
    Object.keys(current_angle).forEach(function(key){
      ref_current_angle_differences[key] = differentAngle(ref_pose_angle[key], current_angle[key]);
      // console.log(key + " " + current_angle[key] + " / " + ref_pose_angle[key]);
    });  

  Object.keys(current_angle).forEach(function(key){
    if(poseRegistered) 
    {
      angleDiff[key] = Math.abs(ref_current_angle_differences[key] - lastdiff[key]);
      lastdiff[key] = ref_current_angle_differences[key];
      poseRegistered = angleDiff[key] <= MAX_ACCEPTED_ANGLE_DIFF_REG_POSE;    
      // console.log(key + ": " + current_angle[key] + ref_pose_angle[key]); 

    }
  });  

  if (poseRegistered) {
    color = "red";
    if (coolDownTime >= TIME_CHANGE_REF_POSE_COOL_DOWN)
      maintanceTime += deltaTime;

    if (maintanceTime >= TIME_REGISTER_POSE) {
      
      let currentScore = 0;
      Object.keys(current_angle).forEach(function(key){
        let score = ((180 - ref_current_angle_differences[key]) / 180);
        currentScore += score;
      });

      currentScore = (currentScore / Object.keys(current_angle).length );      
      if(currentScore >= 0.75)
        totalScore += currentScore;

      console.log("Score: " + currentScore * maxScore);

      var correct = document.getElementById("correct");
      correct.play();
      changeReferencePose();
      var next = document.getElementById("next");
      next.play();
      maintanceTime = 0;
      coolDownTime = 0;
    }
  } 
  else {
    maintanceTime = 0;
    color = "white";
  }  
}

// Change image purpose
let myImage = document.getElementById("images");
// inverse preview image

function changeReferencePose() {
  currentRefPose += 1;
  if (currentRefPose >= numReferencePose) {
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, videoWidth, videoHeight);    
    ctx.font = "750% Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Completed!", 5, videoWidth / 2 - 30);
    ctx.closePath();
    ctx.stroke();    
    gameCompleteAction();
  } 
  else {
    console.log("Pose " + (currentRefPose + 1));
    ref_pose_angle = calculateAngle(reference_poses[currentRefPose]);
    current_ref_pose_for_render = inverseSkeletonXaxis(reference_poses[currentRefPose], 1920);
    ref_ID = reference_poses[currentRefPose].refpose_ID;
    myImage.setAttribute("src", imageArray[currentRefPose]);
  }
}

function calculateSkeletonPointsDistance(skeletonPoints)
{
  let distance = [];
  let skeleton = posenet.getAdjacentKeyPoints(skeletonPoints.keypoints);
  for (let i = 0; i < skeleton.length; i++) {
    var segment = skeleton[i];
    if(ignoreSkeletonPart.includes(segment[0].part) || ignoreSkeletonPart.includes(segment[1].part) ||
      segment[0].score < MIN_ACCEPTABLE_KEYPOINT_SCORE || segment[1].score < MIN_ACCEPTABLE_KEYPOINT_SCORE)
      continue;
  
      let part1Idx = skeletonDescription.indexOf(segment[0].part);
      let part2Idx = skeletonDescription.indexOf(segment[1].part);
      distance["'" + (Math.pow(2, part1Idx) + Math.pow(2, part2Idx)) + "'"] = (Math.sqrt(
        Math.pow(segment[0].position.x - segment[1].position.x, 2) + 
        Math.pow(segment[0].position.y - segment[1].position.y, 2)));
  }
  return distance;
}

// compare skeleton validity by using the ratio of longest length and shortest length
function checkSkeletonValidity(skeletonPointsDistance)
{
  let min = 9999;
  let max = -1;
  Object.keys(skeletonPointsDistance).forEach(function(key){
    if (skeletonPointsDistance[key] < min)
      min = skeletonPointsDistance[key];
    if (skeletonPointsDistance[key] > max)
      max = skeletonPointsDistance[key];
  });  

  if (max / min > 2)
    return false;

  // let averageDistance = 0 ;
  // Object.keys(skeletonPointsDistance).forEach(function(key){
  //   averageDistance += skeletonPointsDistance[key];
  // });  
  // averageDistance /= skeletonPointsDistance.length;

  // console.log(averageDistance);
  // // if a distance more than average distance 20%, then it is invalid
  // Object.keys(skeletonPointsDistance).forEach(function(key){
  //   if(Math.abs(skeletonPointsDistance[key] - averageDistance) > averageDistance * 0.4)
  //   {
  //     console.log("Abnormal skeleton detected!");
  //     return false;
  //   } 
  // });

  return true;
}

function gameCompleteAction()
{  
  gameStart = false;
  gameCompleted = true;
  backgroundMusic.playbackRate = 1;
  storeData(files, userName, startTime);
  let finalScore = totalScore * maxScore;
  openDataBase(userName, userid, startTime, finalScore);
  // localStorage.setItem("Score", Math.round(finalScore));
  window.parent.wsCreateScore(Math.round(finalScore));
}