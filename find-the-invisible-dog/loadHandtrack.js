// String utility function to use with toFormattedString()
String.prototype.padLeft = function (length, character)
{
	return new Array(length - this.length + 1).join(character || ' ')+ this;
}

// utility function to format Date() object to dd/mm/YYYY hh:mm
Date.prototype.toFormattedString = function () {
    return [String(this.getDate()).padLeft(2, '0'),
            String(this.getMonth()+1).padLeft(2, '0'),
            String(this.getFullYear())].join("/") + " " +
           [String(this.getHours()).padLeft(2, '0'),
            String(this.getMinutes()).padLeft(2, '0'),
            String(this.getSeconds()).padLeft(2, '0')].join(":");
};

// give admin control over how many dogs and cat
var cwidth = document.getElementsByClassName("container-item4")[0].clientWidth;
var cheight = document.getElementsByClassName("container-item4")[0].clientHeight;
var spawn = [];

// function retrieveJSON()
// {
//   $.ajax({
//     type:"GET",
//     url:"gamesetting.json",
//     data:
//     {
//       numOfTarget: numOfTarget,
//       numOfTrap: numOfTrap,
//     },
//     //do something on success
//   });
// }


var numOfTarget = 3; // get from JSON
var numOfTrap = 1; // get from JSON
var objRadius = 10; // get from JSON
var handRadius = 20; // get from JSON

//create function to receive game data; ajax function
// target creation
for (var i =1; i <= numOfTarget; i++)
{
  spawn.push(new spawnableItem('dog', cwidth, cheight, objRadius));
}

// trap creation
for (var i=1; i <= numOfTrap; i++)
{
  spawn.push(new spawnableItem('trap', cwidth, cheight, objRadius));
}

var dogImage = "";
var stDate = new Date(Date.now());
draw();
const modal = document.querySelector(".modal");
modal.style.height = window.innerHeight;
modal.style.width = window.innerWidth;
var number1 = 0, number2 = 0, number3 = 0, total = 0;
var x, y, x2, y2, x3, y3, trapx, trapy;
var disx, disy, disx2, disy2, disx3, disy3, distx, disty;
var statustrap = 0;
var score = 0;

var perfTime = [];
var handLocations = [];

// distance checking for each objects so that they are not close to each other
// enable this in final version of the game
(function(){
  for (var i=0;i<spawn.length;i++)
  {
    for (var j = i+1; j<spawn.length; j++)
    {
      if((calcEuclDistance(spawn[i], spawn[j]) <= (0.05*cheight)))
      {
        spawn[j].regenerateXY();
      }

      // if (calcEuclDistance(spawn[i],{'x':video.width, 'y':video.height}) <= (video.width / 2))
      // {
      //   spawn[i].regenerateXY();
      // }

      // if (calcEuclDistance(spawn[j],{'x':video.width, 'y':video.height}) <= (video.height / 2))
      // {
      //   spawn[j].regenerateXY();
      // }
    }
  }
})();

// put in json file from server
const modelParams = {
  // flipHorizontal: false,
  imageScaleFactor: 0.5, //changed here
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.9, // confidence threshold for predictions.
};

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
function renderVideo()
{
  vctx.drawImage(video,0,0,vcanvas.width,vcanvas.height);
  requestAnimationFrame(renderVideo);
}

handTrack.startVideo(video).then((status) => {
  // video.width = 1920;
  // video.height = 1080;
  var countdownToLobby; 
  if (status) {
    navigator.getUserMedia(
      {video:{}}, 
      (stream) => {
        video.srcObject = stream;
        //run
        console.log("status "+status)
        clearInterval(countdownToLobby);
        renderVideo();
        setInterval(runDetection, 100);
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
  var timeStart = performance.now();
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, vcanvas, vctx, video); //webgl
    // console.log(predictions);
    var tid = setInterval(perfTime.push(model.getFPS()),2000);
    var tid2 = setInterval(handLocations.push([handX,handY]),2000); //TODO: [X,Y,time,touchedItem] -> if touched dog/cat

    isStart = true;
    if (predictions.length !== 0) {
      midX = (predictions[0].bbox[0] + predictions[0].bbox[2] / 2);
      midY = (predictions[0].bbox[1] + predictions[0].bbox[3] / 2);
      handX = (cwidth * (midX / video.width)) + ((midX >= video.width / 2)? (canvas.width * 0.01) : -(canvas.width*0.01));
      handY = (cheight * (midY / video.height)) + ((midY >= video.height / 2)? (canvas.height * 0.01) : -(canvas.height*0.01));
      // handX = cwidth *  (midX / video.width);
      // handY = cheight * (midY / video.height);

      begin = 1;

      for (var i=0;i<spawn.length;i++)
      {
        spawn[i].calculateDistanceHandToObject(handX,handY);
      }

      for (var i=0;i<spawn.length;i++) // repeatedly redetect one target as many
      {
        if (spawn[i].type == 'dog' && spawn[i].isTouch == false) //target
        {
          if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius))
          {
            recordTimeTouch.push(calcTouchTime("target")); //calc touch time
            spawn[i].isTouch = true;
            console.log("touched dog");
            catchAudio.play();
            catchAudio.volume = 1.0;
            stopDetect();
            setTimeout(() => {
                catchImg.style.display = "flex";
              setTimeout(() => {
                  catchImg.style.display = "none";
              }, 300);
            }, 300);
            if (total == -1) total = 1; // touched target from trap
            else total++; // touched target
            
            checkWL();
            console.log('returned from checkWL');
          }else if (spawn[i].distanceX > (spawn[i].radius + handRadius) && spawn[i].distanceX <= 1.1*(spawn[i].radius + handRadius) && spawn[i].distanceY > (spawn[i].radius + handRadius) && spawn[i].distanceY <= 1.1*(spawn[i].radius + handRadius)) {
            // console.log("near dog");
            catchNearby.play();
            catchNearby.volume = 0.8;
          }
        }
        else if (spawn[i].type == 'trap')
        {
          if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius))
          {
            total = 0;
            recordTimeTouch.push(calcTouchTime("trap")); //calc touch time
            trapAudio.play();
            trapAudio.volume = 1.0;
            stopDetect();
            spawn[i].regenerateXY(cwidth, cheight);
            draw();
            dogImage = "";
            document.querySelector(".container-item2 span").innerHTML = "<i class='fas fa-cat'></i>!!!";
            setTimeout(() => {
              trapImg.style.display = "flex";
              setTimeout(() => {
                  trapImg.style.display = "none";
              }, 300);
            }, 300);
            spawn[i].isTouch = true; //cat isTouch
            total = -1; // touched trap, differentiate trap from target
            spawn.forEach(index => {
              index.isTouch = false;
            });
          }else if (spawn[i].distanceX > (spawn[i].radius + handRadius) && spawn[i].distanceX <= 1.1*(spawn[i].radius + handRadius) && spawn[i].distanceY > (spawn[i].radius + handRadius) && spawn[i].distanceY <= 1.1*(spawn[i].radius + handRadius)) {
            console.log("near cat");
            trapNearby.play();
            trapNearby.volume = 0.8;
          }
        }
      }
    }
  });
  
}


function stopDetect() {
  clearInterval(runDetection);
  setTimeout(setInterval(runDetection, 1000), 300);
  console.log("STOP");
}

var touchTimeStart = performance.now(); 
var touchTimeEnd, touchSec, touchMinute;
var recordTimeTouch = [];

function calcTouchTime (touchType) { //For data collection

    if (touchType == "target" || touchType == "trap") {

        touchTimeEnd = performance.now();
        touchSec = ((touchTimeEnd - touchTimeStart) / 1000);
        touchMinute = Math.floor(touchSec / 60);
        touchSec = Math.floor(touchSec - (touchMinute * 60));

        if (touchMinute < 10) {
            touchMinute = "0" + touchMinute;
        }
        if (touchSec < 10) {
            touchSec = "0" + touchSec;
        }

        console.log(recordTimeTouch);
        return { "time": touchMinute + ":" + touchSec, "touchtype": touchType };
    }
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

  var min = Math.floor(sec / 60), //remaining minutes
    remSec = sec % 60; //remaining seconds

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
  dogImage = ""; // picture
  if (total == -1)
  {
    dogImage = "<i class='fas fa-cat'></i>!!!";
  }
  else{
    for (i=0;i<total;i++)
    {
      dogImage += "<i class='fas fa-dog'></i>";
    }
  }

  document.querySelector(".container-item2 span").innerHTML = dogImage;
  
  if (total == numOfTarget) {
    total = 0;
    // clearInterval(countDown);
    // dogImage = "";
    // display_win();
  }
}

var name;

function display_win() {

  dlData();
  // score change to json
  score = (total / numOfTarget) * 100; // set score for dogs
  BGM.pause();
  winAudio.play();
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
  var data = new Object();
  data.touchtime = recordTimeTouch;
  data.playcanvassize = { "playcanvaswidth": canvas.width, "playcanvasheight": canvas.height };
  data.windowsize = { "windowwidth": window.innerWidth, "windowheight": window.innerHeight };
  data.starttime = stDate.toFormattedString();
  data.handSize = {"handImgWidth": handImg.width, "handImgHeight": handImg.height };
  data.loadingTimeTaken = loadingTimeEllapse;
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

  data.gameObj = spawn;

  data.handLocation = handLocations;

  data.score = score;

  // TODO: add object radius

  $.ajax({
    type:"POST",
    url:"gamedata.php",
    data:
    {
      startTime: data.starttime,
      avgFPS: data.avgfps,
      medianFPS: data.median,
      stddevFPS: data.stddev,
      handLocation: data.handLocation,
      gameObj: data.gameObj,
      touchTime: data.touchtime,
      playableCanvasSize: data.playcanvassize,
      windowSize: data.windowsize,
      handSize: data.handSize,
      loadingTimeTaken: data.loadingTimeTaken
    },
    // on success do nothing
  })

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
  BGM.pause();
  loseAudio.play();
  document.getElementById("display").style.display = "block";
  score = (total / numOfTarget) * 100;
  document.getElementById("score").innerHTML = "You only catch " + total + ". Score is " + score;
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

var controlX = cwidth / 2;
var controlY = cheight / 2;
function handAnimation()
{
  let offset = 5;
  if (handX > controlX)
  {
    controlX += offset;
  }
  else if (handX + offset < controlX)
  {
    controlX -= offset;
  }

  if (handY > controlY)
  {
    controlY += offset;
  }
  else if (handY + offset < controlY)
  {
    controlY -= offset;
  }
}

function draw() 
{
  c.clearRect(0,0, canvas.width, canvas.height);
  document.getElementsByTagName('html')[0].style.background = bgcolor;
  requestAnimationFrame(draw);
  c.lineWidth = 2;
  spawn.forEach(item =>{
    c.beginPath();
    c.arc(item.x, item.y, objRadius, 0, Math.PI * 2);
    if (item.type == 'dog')
    {
      c.strokeStyle = 'blue';
    }
    else
    {
      c.strokeStyle = 'white';
    }
    c.stroke();
  });

  handAnimation();
  var handImgPosX = controlX - (handimgcontainer.clientWidth / 2);
  var handImgPosY = controlY - (handimgcontainer.clientHeight / 2);
  
  // handimgcontainer.style.left = handImgPosX + "px";
  // handimgcontainer.style.top = handImgPosY + "px";
  c.drawImage(handImg, handImgPosX, handImgPosY, 80, 80);
}