// String utility function to use with toFormattedString()
String.prototype.padLeft = function (length, character)
{
	return new Array(length - this.length + 1).join(character || ' ')+ this;
}

// utility function to format Date() object to dd/mm/YYYY hh:mm
Date.prototype.toFormattedString = function () {
    return [String(this.getDate()).padLeft(2, '0'),
            String(this.getMonth()+1).padLeft(2, '0'),
            String(this.getFullYear()).substr(2, 2)].join("/") + " " +
           [String(this.getHours()).padLeft(2, '0'),
            String(this.getMinutes()).padLeft(2, '0')].join(":");
};

//findobj();
var stDate = new Date(Date.now()).toFormattedString();
draw();
const modal = document.querySelector(".modal");
modal.style.height = window.innerHeight;
modal.style.width = window.innerWidth;
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

var perfTime = [];

// spawn dogs and cats
function findobj() {
  console.log("width:");
  console.log(w);
  console.log("height:");
  console.log(h);

  //first obj
  x = Math.random() * canvas.width; 
  // console.log(x);

  y = Math.random() * canvas.height;
  // console.log(y);
  console.log([x,y]);

  //second obj
  x2 = Math.random() * canvas.width;
  // console.log(x2);

  y2 = Math.random() * canvas.height;
  console.log([x2,y2]);
  // console.log(y2);

  //third obj
  x3 = Math.random() * canvas.width;
  // console.log(x3);

  y3 = Math.random() * canvas.height;
  // console.log(y3);
  console.log([x3,y3]);

  //trap
  trapx = Math.random() * canvas.width;
  // console.log(trapx);

  trapy = Math.random() * canvas.height;
  // console.log(trapy);
  console.log([trapx,trapy]);
}

// changed imagescalefactor and confidence threshold
// found that 0.7 scoreThreshold optimal
// change to default and compare FPS

const modelParams = {
  //flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.1, //changed here
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.6, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
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

// function to compare distance of targets/trap to handX,handY
// params: 
// d1 -> target / trap x or y value
// d2 -> handX or handY value
function compareDistance(d1,d2)
{
  if (d1 > d2)
  {
    return d1-d2;
  }
  return d2-d1;
}

function runDetection() {
  //requestAnimationFrame(runDetection);
  if (model === undefined) return;
  var timeStart = performance.now();
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, vcanvas, vctx, video);

    var timeEnd = performance.now();
    var resTime = 1000 / (timeEnd - timeStart);
    var roundedResTime = Math.round((resTime + Number.EPSILON) * 100) / 100;
    var sTime = Date.now();
    var tid = setInterval(perfTime.push(roundedResTime),2000);

    if (Date.now() - sTime >= 10000)
    {
      tid = null;
    }

    isStart = true;
    if (predictions.length !== 0) {
      handX = (predictions[0].bbox[0] + predictions[0].bbox[2] / 2) - (canvas.width * 0.2);
      handY = (predictions[0].bbox[1] + predictions[0].bbox[3] / 2) - (canvas.height * 0.2);

      begin = 1;

      disx = compareDistance(handX,x);
      disy = compareDistance(handY,y);
      disx2 = compareDistance(handX,x2);
      disy2 = compareDistance(handY,y2);
      disx3 = compareDistance(handX,x3);
      disy3 = compareDistance(handY,y3);
      distx = compareDistance(handX,trapx);
      disty = compareDistance(handY,trapy);
      
      //sound on when near obj1
      if (number1 == 0) {
        if (disx >= 0 && disx <= 50 && disy >= 0 && disy <= 50) {
          console.log("gotcha");
          catchdog.play();
          catchdog.volume = 1.0;
          number1 = 1;
          stopDetect();
          setTimeout(() => {
              document.getElementById("dogcenter").style.display = "flex";
            setTimeout(() => {
                document.getElementById("dogcenter").style.display = "none";
            }, 300);
          }, 300);
          checkWL();
        } else if (disx > 50 && disx <= 100 && disy > 50 && disy <= 100) {
          console.log("near alr");
          dog.play();
          dog.volume = 0.8;
        }
      }

      //sound on when near obj2
      if (number2 == 0) {
        if (disx2 >= 0 && disx2 <= 50 && disy2 >= 0 && disy2 <= 50) {
          console.log("gotcha");
          catchdog.play();
          catchdog.volume = 1.0;
          number2 = 1;
          stopDetect();
          setTimeout(() => {
              document.getElementById("dogcenter").style.display = "flex";
            setTimeout(() => {
                document.getElementById("dogcenter").style.display = "none";
            }, 300);
          }, 300);
          checkWL();
        }
        else if (disx2 > 50 && disx2 <= 100 && disy2 > 50 && disy2 <= 100) 
        {
          console.log("near alr");
          dog.play();
          dog.volume = 0.8;
        }
      }

      //sound on when near obj3
      if (number3 == 0) {
        if (disx3 >= 0 && disx3 <= 50 && disy3 >= 0 && disy3 <= 50) {
          console.log("gotcha");
          catchdog.play();
          catchdog.volume = 1.0;
          number3 = 1;
          stopDetect();
          setTimeout(() => {
              document.getElementById("dogcenter").style.display = "flex";
            setTimeout(() => {
                document.getElementById("dogcenter").style.display = "none";
            }, 300);
          }, 300);
          checkWL();
        } else if (disx3 > 50 && disx3 <= 100 && disy3 > 50 && disy3 <= 100) {
          console.log("near alr");
          dog.play();
          dog.volume = 0.8;
        }
      }

      //sound on when near trap (cat sound)
      if (statustrap == 0) {
        if (distx >= 0 && distx <= 50 && disty >= 0 && disty <= 50) {
          number1 = 0;
          number2 = 0;
          number3 = 0;
          catchcat.play();
          catchcat.volume = 1.0;
          stopDetect();
            document.querySelector(".container-item2 span").innerHTML =
            "<i class='fas fa-cat'></i>!!!";
          setTimeout(() => {
            document.getElementById("catcenter").style.display = "flex";
            setTimeout(() => {
                document.getElementById("catcenter").style.display = "none";
            }, 300);
          }, 300);
          statustrap = 1;
        } else if (distx > 50 && distx <= 100 && disty > 50 && disty <= 100)
        {
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
       document.querySelector(".container-item2 span").innerHTML =
         "<i class='fas fa-dog'></i>";
     } else if (total == 2) {
       document.querySelector(".container-item2 span").innerHTML =
         "<i class='fas fa-dog'></i><i class='fas fa-dog'></i>";
     }
   } else if (total == 3) {
      clearInterval(countDown);
    //  console.log(perfTime.length);
      display_win();
   }
}

var name;

function display_win() {
  dlData();
  score = 1000;
  total = 3;
  win.play();
  win.volume = 1.0;
  statustrap = 1;
  document.querySelector(".container-item2 span").innerHTML = "<i class='fas fa-dog'></i><i class='fas fa-dog'></i><i class='fas fa-dog'></i>";
  document.getElementById("display").style.display = "block";
  document.getElementById("score").innerHTML = "Congrats! You Win! Your score is " + score;

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

function dlData() {
  console.log(perfTime.length);
  var data = new Object();
  data.starttime = stDate;
  data.avgfps = (function()
  {
    var sum = perfTime.reduce((sum, val) => (sum += val));
    return Math.round((sum / perfTime.length)*1000) / 1000;
  })();

  data.median = (function()
  {
    const sorted = perfTime.sort();
    const midElement = Math.ceil(perfTime.length / 2);
    const median = (perfTime.length % 2 == 0) ? (perfTime[midElement] + perfTime[midElement - 1]) / 2 : perfTime[midElement -1];
    return Math.round(median * 1000) / 1000;
  })();

  data.stddev = (function()
  {
    var numerator = perfTime.reduce((numerator, v)=> (numerator += ((v-data.avgfps)**2)));
    numerator /= perfTime.length;
    numerator = Math.sqrt(numerator);
    return Math.round(numerator * 1000) / 1000;
  })();

  data.animalLocation = {
    'dog1': [x,y],
    'dog2': [x2,y2],
    'dog3': [x3,y3],
    'trap': [trapx,trapy]
  }


  const text = JSON.stringify(data);
  const name = "data.json";
  const type = "text/plain";

  const a = document.createElement("a");
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
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
  c.arc(x,y,5,0,Math.PI * 2);
  c.strokeStyle = 'green';
  c.stroke();
  c.beginPath();
  c.arc(x2,y2,5,0,Math.PI * 2);
  c.strokeStyle = 'green';
  c.stroke();
  c.beginPath();
  c.arc(x3,y3,5,0,Math.PI * 2);
  c.strokeStyle = 'green';
  c.stroke();
  c.lineWidth = 2;
  c.beginPath();
  c.arc(trapx,trapy,5,0,Math.PI * 2);
  c.strokeStyle = 'red';
  c.stroke();

  let controlX = handX;
  let controlY = handY;
  
  c.lineWidth = 5;
  c.beginPath();
  controlX = (controlX >= canvas.width) ? canvas.width : controlX;
  controlY = (controlY >= canvas.height) ? canvas.height : controlY;

    if (canvas.width >= 0 && canvas.width <2000) {
        c.ellipse(controlX, controlY, 25, 50, 0, 0, Math.PI * 2);
        c.strokeStyle = 'black';
        c.stroke();
    }
    else if (canvas.width >= 2000) {
        c.ellipse(controlX, controlY, 50, 100, 0, 0, Math.PI * 2);
        c.strokeStyle = 'black';
        c.stroke();
    }
}