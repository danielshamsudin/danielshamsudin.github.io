//findobj();
draw();
const modal = document.querySelector(".modal");
modal.style.height = window.innerHeight;
modal.style.width = window.innerWidth;
document.getElementsByClassName("splashT").height = window.innerHeight;
var number1 = 0, number2 = 0, number3 = 0, total = 0;
var x, y, x2, y2, x3, y3, trapx, trapy;
var disx, disy, disx2, disy2, disx3, disy3, distx, disty;
var statustrap = 0;
var score = 0;
var dog = new Audio("dog.mp3");
var cat = new Audio("cat.mp3");
var catchdog = new Audio("catch dog.mp3");
var catchcat = new Audio("catch cat.mp3");
var win = new Audio("win.mp3");
var lose = new Audio("lose.mp3");

// spawn dogs and cats
function findobj() {
  console.log("width:");
  console.log(w);
  console.log("height:");
  console.log(h);

  //first obj
  x = Math.random() * canvas.width; 
  // console.log(x);

  y = (Math.random() * video.videoHeight) + (canvas.height - video.videoHeight) ;
  // console.log(y);
  console.log([x,y]);

  //second obj
  x2 = Math.random() * canvas.width;
  // console.log(x2);

  y2 = (Math.random() * video.videoHeight)+ (canvas.height - video.videoHeight);
  console.log([x2,y2]);
  // console.log(y2);

  //third obj
  x3 = Math.random() * canvas.width;
  // console.log(x3);

  y3 = (Math.random() * video.videoHeight)+ (canvas.height - video.videoHeight);
  // console.log(y3);
  console.log([x3,y3]);

  //trap
  trapx = Math.random() * canvas.width;
  // console.log(trapx);

  trapy = (Math.random() * video.videoHeight)+ (canvas.height - video.videoHeight);
  // console.log(trapy);
  console.log([trapx,trapy]);
}

// changed imagescalefactor and confidence threshold
// found that 0.7 scoreThreshold optimal
const modelParams = {
  //flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 1, //changed here
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.6, // ioU threshold for non-max suppression
  scoreThreshold: 0.7, // confidence threshold for predictions.
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
      {video:{
        // width: 1280,
        // height: 720
      }}, 
      (stream) => {
        video.srcObject = stream;
        //run
        console.log("status "+status)
        clearInterval(countdownToLobby);
        setInterval(runDetection, 250);
        //runDetection();
      },
      (err) =>{
        console.log("status "+status)
        console.log(err)
      } 
    )
  }else if (!status) {
     window.parent.wsRequireHardwareMessage("camera");
    // location.href = "https://fuyoh-ads.com/campaign_web/#/game";
    countdownToLobby= setInterval(runRedirectToLobby, 60000);
  }
});

var begin = 0;

function runRedirectToLobby() {
  location.href = "https://fuyoh-ads.com/campaign_web/#/game";
}
function runDetection() {
  //requestAnimationFrame(runDetection);
  if (model === undefined) return;

  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas1, ctx1, video);
    isStart = true;
    if (predictions.length !== 0) {
      /*
      prediction returns array 
      [{
        bbox: [x, y, width, height]
        class: string
        score: int
      }]
      */ 

      // change handX,handY to an elipse
      handX = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
      handY = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
      
      // small radius for hand in bbox
      var toleranceValue = 10;
      radius = handX + toleranceValue
      
      // console.log(handX);
      // console.log(handY);

      begin = 1;

      // Note: Object detection now works with the midpoint of the box,
      // can try using a radius instead of a point so that can act as a
      // tolerance hence it will be easier. 

      //distance predictions obj1
      if (handX > x) {
        disx = handX - x;
        //console.log("hand big");
        //console.log(disx);
      } else {
        disx = x - handX;
        //console.log("x big");
        //console.log(disx);
      }

      if (handY > y) {
        disy = handY - y;
        //console.log("handy big");
        //console.log(disy);
      } else {
        disy = y - handY;
        //console.log("y big");
        //console.log(disy);
      }

      //distance predictions obj2
      if (handX > x2) {
        disx2 = handX - x2;
        //console.log("hand big");
        //console.log(disx2);
      } else {
        disx2 = x2 - handX;
        //console.log("x big");
        //console.log(disx2);
      }

      if (handY > y2) {
        disy2 = handY - y2;
        // console.log("handy big");
        // console.log(disy2);
      } else {
        disy2 = y2 - handY;
        // console.log("y big");
        // console.log(disy2);
      }

      //distance predictions obj3
      if (handX > x3) {
        disx3 = handX - x3;
        // console.log("hand big");
        // console.log(disx3);
      } else {
        disx3 = x3 - handX;
        //  console.log("x big");
        // console.log(disx3);
      }

      if (handY > y3) {
        disy3 = handY - y3;
        //  console.log("handy big");
        // console.log(disy3);
      } else {
        disy3 = y3 - handY;
        // console.log("y big");
        //  console.log(disy3);
      }

      //distance predictions trap
      if (handX > trapx) {
        distx = handX - trapx;
      } else {
        distx = trapx - handX;
      }

      if (handY > trapy) {
        disty = handY - trapy;
      } else {
        disty = trapy - handY;
      }

      //sound on when near obj1
      if (number1 == 0) {
        if (disx >= 0 && disx <= 150 && disy >= 0 && disy <= 150) {
          console.log("gotcha");
          catchdog.play();
          catchdog.volume = 1.0;
          number1 = 1;
          stopDetect();
          setTimeout(() => {
            document.getElementById("dogcenter").style.display = "block";
            setTimeout(() => {
              document.getElementById("dogcenter").style.display = "none";
            }, 300);
          }, 300);
          checkWL();
        } else if (disx >= 151 && disx <= 350 && disy >= 151 && disy <= 350) {
          console.log("near alr");
          dog.play();
          dog.volume = 0.8;
        }
      }

      //sound on when near obj2
      if (number2 == 0) {
        if (disx2 >= 0 && disx2 <= 150 && disy2 >= 0 && disy2 <= 150) {
          console.log("gotcha");
          catchdog.play();
          catchdog.volume = 1.0;
          number2 = 1;
          stopDetect();
          setTimeout(() => {
            document.getElementById("dogcenter").style.display = "block";
            setTimeout(() => {
              document.getElementById("dogcenter").style.display = "none";
            }, 300);
          }, 300);
          checkWL();
        }
        else if (disx2 >= 151 && disx2 <= 350 && disy2 >= 151 && disy2 <= 350) 
        {
          console.log("near alr");
          dog.play();
          dog.volume = 0.8;
        }
      }

      //sound on when near obj3
      if (number3 == 0) {
        if (disx3 >= 0 && disx3 <= 150 && disy3 >= 0 && disy3 <= 150) {
          console.log("gotcha");
          catchdog.play();
          catchdog.volume = 1.0;
          number3 = 1;
          stopDetect();
          setTimeout(() => {
            document.getElementById("dogcenter").style.display = "block";
            setTimeout(() => {
              document.getElementById("dogcenter").style.display = "none";
            }, 300);
          }, 300);
          checkWL();
        } else if (
          disx3 >= 151 &&
          disx3 <= 350 &&
          disy3 >= 151 &&
          disy3 <= 350
        ) {
          console.log("near alr");
          dog.play();
          dog.volume = 0.8;
        }
      }

      //sound on when near trap (cat sound)
      if (statustrap == 0) {
        if (distx >= 0 && distx <= 150 && disty >= 0 && disty <= 150) {
          number1 = 0;
          number2 = 0;
          number3 = 0;
          catchcat.play();
          catchcat.volume = 1.0;
          stopDetect();
          document.querySelector("#obj span").innerHTML =
            "<i class='fas fa-cat'></i>!!!";
          setTimeout(() => {
            document.getElementById("catcenter").style.display = "block";
            setTimeout(() => {
              document.getElementById("catcenter").style.display = "none";
            }, 300);
          }, 300);
          statustrap = 1;
        } else if (
          distx >= 151 &&
          distx <= 350 &&
          disty >= 151 &&
          disty <= 350
        ) {
          cat.play();
          cat.volume = 1.0;
        }
      }
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

function stopDetect() {
  clearInterval(runDetection);
  setTimeout(setInterval(runDetection, 1000), 300);
  console.log("STOP");
}

var sec = 3600, countDiv = document.getElementById("timer"), secpass,
countDown = setInterval(function () {
    "use strict";

    //start countdown for 1 min
    if (begin == 1) {
      secpass();
    }
  }, 1000);

function secpass() {
  "use strict";

  var min = Math.floor(sec / 60),
    remSec = sec % 60;

  if (remSec < 10) {
    remSec = "0" + remSec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  countDiv.innerHTML = min + ":" + remSec;

  if (sec > 0) {
    sec = sec - 1;
    checkWL();
  } else {
    if (sec == 0) {
      clearInterval(countDown);
      total = number1 + number2 + number3;
      display_lose();
    }
  }
}

function checkWL() {
  total = number1 + number2 + number3;
  if (total != 3) {
    if (total == 1) {
      document.querySelector("#obj span").innerHTML =
        "<i class='fas fa-dog'></i>";
    } else if (total == 2) {
      document.querySelector("#obj span").innerHTML =
        "<i class='fas fa-dog'></i><i class='fas fa-dog'></i>";
    }
  } else if (total == 3) {
    clearInterval(countDown);
    display_win();
  }
}
var name;
function display_win() {
  score = 1000;
  total = 3;
  win.play();
  win.volume = 1.0;
  statustrap = 1;
  document.querySelector("#obj span").innerHTML =
    "<i class='fas fa-dog'></i><i class='fas fa-dog'></i><i class='fas fa-dog'></i>";
  document.getElementById("display").style.display = "block";
  document.getElementById("score").innerHTML =
    "Congrats!You Win!Your score is " + score;

  window.parent.wsCreateScore(score);

  document.getElementById("button_h").onclick = function () {
    /*name=prompt("Enter name to store score in scoreboard:");
		
		if(!name){
			name="Player";
		}
		
		$.ajax({
			type:"POST",
			url:"pass.php",
			data:{name:name, score:score},
			success:(window.location.href="scoreboard.php"),
		});*/
    window.location.href = "scoreboard.php";
  };
}

function display_lose() {
  lose.play();
  lose.volume = 1.0;
  number1 = 1;
  number2 = 1;
  number3 = 1;
  statustrap = 1;
  document.getElementById("display").style.display = "block";

  if (total == 0) {
    score = 0;
    document.getElementById("score").innerHTML =
      "No catch anything!Score is " + score;
  } else if (total != 0) {
    // console.log("hi lose");
    score = total*300 ;
    document.getElementById("score").innerHTML =
      "You only catch " + total + ".Score is " + score;
  }

  window.parent.wsCreateScore(score);

  document.getElementById("button_h").onclick = function () {
    /*name=prompt("Enter name to store score in scoreboard:");
		
		if(!name){
			name="Player";
		}
		
		$.ajax({
			type:"POST",
			url:"pass.php",
			data:{name:name, score:score},
			success:(window.location.href="scoreboard.php"),
    });*/

    window.location.href = "scoreboard.php";
  };
}

var bgcolor = localStorage.getItem("pass");
function draw() {
  c.fillStyle = bgcolor;
  c.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
  c.lineWidth = 2;
  c.beginPath();
  c.arc(x,y,10,0,Math.PI * 2);
  c.strokeStyle = 'green';
  c.stroke();
  c.beginPath();
  c.arc(x2,y2,10,0,Math.PI * 2);
  c.strokeStyle = 'green';
  c.stroke();
  c.beginPath();
  c.arc(x3,y3,10,0,Math.PI * 2);
  c.strokeStyle = 'green';
  c.stroke();
  c.lineWidth = 2;
  c.beginPath();
  c.arc(trapx,trapy,10,0,Math.PI * 2);
  c.strokeStyle = 'red';
  c.stroke();
  // c.fillRect(x2,y2,canvas.width,canvas.height);
  // c.fillRect(x3,y3,canvas.width,canvas.height);
  controlX = handX;
  controlY = handY;
  c.lineWidth = 5;
  c.beginPath();
  c.arc(controlX, controlY, 30, 0, Math.PI * 2);
  c.strokeStyle = 'black';
  c.stroke();
  c.fillStyle = "rgba(0,0,255,0.5)";
  c.fillRect(0, (canvas.height - video.videoHeight), canvas.width, video.videoHeight);
}