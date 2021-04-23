// TODO: fade out for dogs


// String utility function to use with toFormattedString()
String.prototype.padLeft = function (length, character) {
  return new Array(length - this.length + 1).join(character || " ") + this;
};

// utility function to format Date() object to dd/mm/YYYY hh:mm
Date.prototype.toFormattedString = function () {
  return (
    [
      String(this.getDate()).padLeft(2, "0"),
      String(this.getMonth() + 1).padLeft(2, "0"),
      String(this.getFullYear()),
    ].join("/") +
    " " +
    [
      String(this.getHours()).padLeft(2, "0"),
      String(this.getMinutes()).padLeft(2, "0"),
      String(this.getSeconds()).padLeft(2, "0"),
    ].join(":")
  );
};

// give admin control over how many dogs and cat
var cwidth = document.querySelector("#canvascontainer").clientWidth;
var cheight = document.querySelector("#canvascontainer").clientHeight;
var spawn = [];
var extraScore = 0;
var highestScore = 0;
var score = 0;

// RNG for target selection
const randomIndex = Math.floor(Math.random() * (spawn.length-1));
// 3 target + 1 trap
// random * 3 = 0<= x <= 3


// variables for gift spawning
const hintRandomTime = (min, max) => {
  //gift will randomly spawn between 8 and 20
  return Math.floor(Math.random() * (max - min) + min);
};

var hintSpawn = false; //gift can be start being touched
var hintEnd = false; //a cycle of a gift spawn ends
var hintStart = false; //starts only when detect hand

var sec = 60;
var totalSec = sec; //used for gift spawning calculation;
var hintAvailableSec =
  totalSec - (totalSec * 0.1 + (totalSec - totalSec * 0.9) + numOfGift * 3);

// function retrieveJSON()
// {
//   $.ajax({
//     type:"GET",
//     url:"gamesetting.json",
//     data:
//     {
//       numOfTarget: numOfTarget,
//       numOfTrap: numOfTrap,
//       gameMode: gameMode,
//     },
//     //do something on success
//   });
// }

// game mode selection from admin page

var gameMode = 1; // 1 - easy , 2 - medium , 3 - hard, 4 - custom

// TODO:
// target maintain
// trap add
// choose optimized time for each difficulties

var numOfTarget, numOfTrap, objRadius, handRadius;

if (gameMode == 1) {
  // easy
  numOfTarget = 3;
  numOfTrap = 2;
  objRadius = 15;
  handRadius = 30;
}
if (gameMode == 2) {
  // medium
  numOfTarget = 5;
  numOfTrap = 2;
  objRadius = 10;
  handRadius = 10;
}
if (gameMode == 3) {
  // hard
  numOfTarget = 6;
  numOfTrap = 3;
  objRadius = 5;
  handRadius = 10;
}
if (gameMode == 4) {
  // custom
  // fetch from admin page
}
if (gameMode === undefined) {
  // default if file not loaded
  numOfTarget = 3;
  numOfTrap = 1;
  objRadius = 20;
  handRadius = 20;
}

//create function to receive game data; ajax function
// target creation
for (var i = 1; i <= numOfTarget; i++) {
  spawn.push(new spawnableItem("dog", cwidth, cheight, objRadius));
}

// trap creation
for (var i = 1; i <= numOfTrap; i++) {
  spawn.push(new spawnableItem("trap", cwidth, cheight, objRadius));
}

//gift creation
for (var i = 1; i <= numOfGift; i++) {
  spawn.push(new spawnableItem("hint", cwidth, cheight, objRadius));
}

var stDate = new Date(Date.now());
var total = 0;
draw();

var perfTime = [];
var handLocations = [];
// TODO: mode for admin to select, easy medium hard, change objnum, objradius, handradius
// distance checking for each objects so that they are not close to each other
// enable this in final version of the game
(function () {
  for (var i = 0; i < spawn.length; i++) {
    for (var j = i + 1; j < spawn.length; j++) {
      if (calcEuclDistance(spawn[i], spawn[j]) <= 0.05 * cheight) {
        spawn[j].regenerateXY();
      }
    }
  }
})();

// put in json file from server
const modelParams = {
  //flipHorizontal: true,
  imageScaleFactor: 0.5, //changed here
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.7, // confidence threshold for predictions.
};

// handTrack.load(modelParams).then((lmodel) => {
//   model = lmodel;
// });

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

function renderVideo() {
  vctx.drawImage(video, 0, 0, vcanvas.width, vcanvas.height);
  requestAnimationFrame(renderVideo);
}

// handTrack built in method to start video stream
handTrack.startVideo(video).then((status) => {
  var countdownToLobby;
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
        console.log("status " + status);
        clearInterval(countdownToLobby);
        renderVideo();
        setInterval(runDetection, 100);
      },
      (err) => {
        console.log("status " + status);
        console.log(err);
      }
    );
  } else if (!status) {
    window.parent.wsRequireHardwareMessage("camera");
    countdownToLobby = setInterval(runRedirectToLobby, 60000);
  }
});

var begin = 0;

function runRedirectToLobby() {
  location.href = "https://fuyoh-ads.com/campaign_web/#/game";
}

function runDetection() {
  if (model === undefined) return;
  var timeStart = performance.now();
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, vcanvas, vctx, video); //webgl
    var tid = setInterval(perfTime.push(model.getFPS()), 2000);
    var tid2 = setInterval(handLocations.push([handX, handY]), 2000);

    isStart = true;
    if (predictions.length !== 0 && isLoaded == true) {
      //isLoaded ensures the game won't start at loading page and can be set as a condition to disable the tracking

      hintStart = true;

      midX = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
      midY = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
      handX =
        cwidth * (midX / video.width) +
        (midX >= video.width / 2
          ? canvas.width * 0.01
          : -(canvas.width * 0.01));
      handY =
        cheight * (midY / video.height) +
        (midY >= video.height / 2
          ? canvas.height * 0.01
          : -(canvas.height * 0.01));
      // handX = cwidth *  (midX / video.width);
      // handY = cheight * (midY / video.height);

      begin = 1;

      for (var i = 0; i < spawn.length; i++) {
        spawn[i].calculateDistanceHandToObject(handX, handY);
      }

      for (var i = 0; i < spawn.length; i++) {
        if (spawn[i].type == "dog" && spawn[i].isTouch == false) {
          //target
          if (
            spawn[i].distanceX >= 0 &&
            spawn[i].distanceX <= spawn[i].radius + handRadius &&
            spawn[i].distanceY >= 0 &&
            spawn[i].distanceY <= spawn[i].radius + handRadius
          ) {
            total++;
            recordTimeTouch.push(calcTouchTime("target")); //calc touch time
            spawn[i].isTouch = true;
            console.log("touched dog");
            targetAudio.play();
            targetAudio.volume = 1.0;
            updateGUI(spawn[i].type, i);
            // stopDetect();
            checkWL();
            console.log("returned from checkWL");
          } else if (
            spawn[i].distanceX > spawn[i].radius + handRadius &&
            spawn[i].distanceX <= 1.1 * (spawn[i].radius + handRadius) &&
            spawn[i].distanceY > spawn[i].radius + handRadius &&
            spawn[i].distanceY <= 1.1 * (spawn[i].radius + handRadius)
          ) {
            targetNearby.play();
            targetNearby.volume = 0.8;
          }
        } else if (spawn[i].type == "trap" && spawn[i].isTouch == false) {
          if (
            spawn[i].distanceX >= 0 &&
            spawn[i].distanceX <= spawn[i].radius + handRadius &&
            spawn[i].distanceY >= 0 &&
            spawn[i].distanceY <= spawn[i].radius + handRadius
          ) {
            recordTimeTouch.push(calcTouchTime("trap")); //calc touch time
            trapAudio.play();
            trapAudio.volume = 1.0;
            updateGUI(spawn[i].type, i);
            stopDetect();

            if (dogReset === true) {
              for (var j = 0; j < spawn.length; j++) {
                if (spawn.type != "trap") {
                  spawn[j].regenerateXY(cwidth, cheight);
                }
              }
            }
            if (catReset === true) {
              spawn[i].regenerateXY(cwidth, cheight);
            }
            draw();
            spawn[i].isTouch = true; //cat isTouch
          } else if (
            spawn[i].distanceX > spawn[i].radius + handRadius &&
            spawn[i].distanceX <= 1.1 * (spawn[i].radius + handRadius) &&
            spawn[i].distanceY > spawn[i].radius + handRadius &&
            spawn[i].distanceY <= 1.1 * (spawn[i].radius + handRadius)
          ) {
            console.log("near cat");
            trapNearby.play();
            trapNearby.volume = 0.8;
          }
        } else if (
          spawn[i].type == "hint" &&
          spawn[i].isTouch == false &&
          hintSpawn == true &&
          spawn[i].isDespawn == false
        ) {
          if (
            spawn[i].distanceX >= 0 &&
            spawn[i].distanceX <= spawn[i].radius + handRadius &&
            spawn[i].distanceY >= 0 &&
            spawn[i].distanceY <= spawn[i].radius + handRadius
          ) {
            recordTimeTouch.push(calcTouchTime("hint")); //calc touch time
            spawn[i].isTouch = true;
            console.log("touched hint");
            hintAudio.play();
            hintImg.style.display = "none";
            hintSpawn = false;
            hintEnd = false;
            //TODO: gift perks
            var hint = Math.round(Math.random() * 2);
            switch (hint) {
              case 0: //region of dogs
                hintMessage = "SHOW DOGS!";
                let randomX = spawn[randomIndex].x;
                let randomY = spawn[randomIndex].y;
                gctx.strokeStyle = 'red';
                gctx.strokeRect(randomX-50, randomY-50, 200, 200);                
                break;
              case 1: //region of cats
                hintMessage = "SHOW CATS!";
                var trapIndex;
                for (let i=0, len = spawn.length; i< len; i++)
                {
                  if (spawn[i].type == 'strap' && spawn[i].isTouch === false)
                  {
                    gctx.strokeStyle = 'red';
                    gctx.strokeRect(spawn[i].x - 50, spawn[i].y - 50, 200, 200);
                    break;
                  }
                }
                break;
              case 2: //extra time
                hintMessage = "ADDED TIME!";
                sec += 20;
                break;
            }
            updateGUI(spawn[i].type, i);
            isLoaded = false;
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

function calcTouchTime(touchType) {
  //For data collection

  if (touchType == "target" || touchType == "trap") {
    touchTimeEnd = performance.now();
    touchSec = (touchTimeEnd - touchTimeStart) / 1000;
    touchMinute = Math.floor(touchSec / 60);
    touchSec = Math.floor(touchSec - touchMinute * 60);

    if (touchMinute < 10) {
      touchMinute = "0" + touchMinute;
    }
    if (touchSec < 10) {
      touchSec = "0" + touchSec;
    }

    console.log(recordTimeTouch);
    return { time: touchMinute + ":" + touchSec, touchtype: touchType };
  }
}

var countDiv = document.getElementById("timer"),
  secpass = function () {
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
      //checkWL();
    } else {
      if (sec == 0) {
        isLoaded = false; //ensures the game(hand) wont continue to move
        clearInterval(countDown);
        total = number1 + number2 + number3;
        display_lose();
      }
    }
  },
  countDown = setInterval(function () {
    "use strict";

    //start countdown for 1 min
    if (begin == 1) {
      secpass();
    }
  }, 1000);

function checkWL() {
  if (total == numOfTarget) {
    isLoaded = false;
    document.querySelector("#info").innerHTML = "YOU WIN !!";
    //ensures the game(hand) wont continue to move
    // clearInterval(countDown);
    // display_win();
  }
}

var name;

function display_win() {
  dlData();
  // score change to json
  BGM.pause();
  winAudio.play();
  statustrap = 1;
  document.querySelector(".container-item2 span").innerHTML =
    "<i class='fas fa-dog'></i><i class='fas fa-dog'></i><i class='fas fa-dog'></i>";
  document.getElementById("display").style.display = "block";
  document.getElementById("score").innerHTML =
    "Congrats! You Win! Your score is " + score;

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
  data.playcanvassize = {
    playcanvaswidth: canvas.width,
    playcanvasheight: canvas.height,
  };
  data.windowsize = {
    windowwidth: window.innerWidth,
    windowheight: window.innerHeight,
  };
  data.starttime = stDate.toFormattedString();
  data.handSize = {
    handImgWidth: handImg.width,
    handImgHeight: handImg.height,
  };
  data.loadingTimeTaken = loadingTimeEllapse;
  data.avgfps = (function () {
    var sum = perfTime.reduce((sum, val) => (sum += val));
    return Math.round((sum / perfTime.length) * 1000) / 1000;
  })();
  data.median = (function () {
    const sorted = perfTime.sort();
    const midElement = Math.ceil(perfTime.length / 2);
    const median =
      perfTime.length % 2 == 0
        ? (perfTime[midElement] + perfTime[midElement - 1]) / 2
        : perfTime[midElement - 1];
    return Math.round(median * 1000) / 1000;
  })();

  data.stddev = (function () {
    var numerator = perfTime.reduce(
      (numerator, v) => (numerator += (v - data.avgfps) ** 2)
    );
    numerator /= perfTime.length;
    numerator = Math.sqrt(numerator);
    return Math.round(numerator * 1000) / 1000;
  })();
  data.starttime = stDate.toFormattedString();

  data.performance = {
    avgFPS: avgfps,
    medianFPS: median,
    stddevFPS: stddev,
    loadingTime: loadingTimeTaken,
  };

  data.handDetection = {
    handLocation: handLocations,
    recordTimeTouch: recordTimeTouch,
  }; // append with time obj

  data.handSize = {
    handImgWidth: handImg.width,
    handImgHeight: handImg.height,
  };
  data.gameObj = { spawn };
  data.GUIs = {
    canvasSize: playcanvassize,
    windowSize: windowsize,
  };
  data.score = score;

  $.ajax({
    type: "POST",
    url: "gamedata.php",
    data: {
      startTime: data.starttime,
      performance: data.performance,
      handDetection: data.handDetection,
      handSize: data.handSize,
      loadingTimeTaken: data.loadingTimeTaken,
    },
    // on success do nothing
  });

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
  end = true;
  BGM.pause();
  loseAudio.play();
  document.getElementById("display").style.display = "block";
  document.getElementById("score").innerHTML =
    "You only catch " + total + ". Score is " + score;
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

var controlX = cwidth / 2;
var controlY = cheight / 2;
function handAnimation() {
  let offset = 5;
  if (handX > controlX) {
    controlX += offset;
  } else if (handX + offset < controlX) {
    controlX -= offset;
  }

  if (handY > controlY) {
    controlY += offset;
  } else if (handY + offset < controlY) {
    controlY -= offset;
  }
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
  c.lineWidth = 2;
  spawn.forEach((item) => {
    if (item.type != "hint") {
      c.beginPath();
      c.arc(item.x, item.y, objRadius, 0, Math.PI * 2);
      if (item.type == "dog") {
        c.strokeStyle = "blue";
      } else if (item.type == "trap") {
        c.strokeStyle = "white";
      }
      c.stroke();
    } else {
      if (
        item.isSpawn == false &&
        hintEnd == false &&
        hintStart == true &&
        sec >= totalSec * 0.1 &&
        sec <= totalSec * 0.9 &&
        isLoaded == true
      ) {
        hintEnd = true;
        console.log("enter hint");

        setTimeout(function () {
          if (sec >= totalSec * 0.1) {
            hintImg.style.display = "flex";
            hintimgcontainer.style.left =
              item.x - hintimgcontainer.clientHeight / 2 + "px";
            hintimgcontainer.style.top =
              item.y - hintimgcontainer.clientHeight / 2 + "px";
            hintimgcontainer.style.display = "flex";
            hintSpawn = true;
            item.isSpawn = true;
            item.isDespawn = false;

            setTimeout(function () {
              item.isDespawn = true;
              if (item.isTouch == false) {
                hintImg.style.display = "none";
                hintimgcontainer.style.display = "none";
                hintEnd = false;
                hintSpawn = false;
              }
            }, 3000);
          }
        }, hintRandomTime(
          (hintAvailableSec / numOfGift / 3) * 1000,
          (hintAvailableSec / numOfGift) * 1000
        ));
      }
    }
  });

  handAnimation();
  var handImgPosX = controlX - handimgcontainer.clientWidth / 2;
  var handImgPosY = controlY - handimgcontainer.clientHeight / 2;

  c.drawImage(handImg, handImgPosX, handImgPosY, handImg.width, handImg.height);
}

function updateGUI(type, i) {
  if (type === "dog") {
    //basket doggy
    let basketDoggyContainer = document.querySelector("#basketdoggycontainer");
    let img = document.createElement("img");
    let dogSize;

    if (numOfTarget <= 6) dogSize = 0.5;
    else if (numOfTarget <= 8) dogSize = 0.4;
    else dogSize = 0.3;


    //dog appear
    let locX = spawn[i].x - (ccontainer.clientHeight * 0.2) / 2;
    let locY = spawn[i].y - (ccontainer.clientHeight * 0.2) / 2;
    // tX = (fullSize.clientHeight / ccontainer.clientHeight*0.2) + locX;
    // tY = (fullSize.clientHeight / ccontainer.clientHeight*0.2) + locY;

  
    tX = locX;
    tY = locY + (fullSize.clientHeight - ccontainer.clientHeight);
    
    var animateID;
    setTimeout(function () {
      animateDog();
      setTimeout(function () {
        dctx.clearRect(0, 0, fullSize.clientWidth, fullSize.clientHeight);
        cancelAnimationFrame(animateID);
        animateID = undefined;
        setTimeout(function(){
          img.className = "basketdoggy";
          img.src = "Assets/img-09.png";
          img.style.height = basketDoggyContainer.clientHeight * dogSize + "px";
          img.style.width = basketDoggyContainer.clientHeight * dogSize + "px";
          basketDoggyContainer.appendChild(img);
          // TODO: apply opacity more over time
        }, 1500);
      }, 1500);
    }, 100);
  } else if (type === "trap") {
    //cat appear
    let locX = spawn[i].x - (ccontainer.clientHeight * 0.2) / 2;
    let locY = spawn[i].y - (ccontainer.clientHeight * 0.2) / 2;

    setTimeout(function () {
      gctx.drawImage(
        trapImg,
        locX,
        locY,
        ccontainer.clientHeight * 0.2,
        ccontainer.clientHeight * 0.2
      );
      isLoaded = false;
      document.querySelector("#gui-container").style.filter = "grayscale(100%)";
      document.querySelector("#message").innerHTML = "freeze!!";
      document.querySelector("#message").style.backgroundColor = "white";
      document.querySelector("#message").style.display = "block";

      setTimeout(function () {
        gctx.clearRect(0, 0, ccontainer.clientWidth, ccontainer.clientHeight);
        document.querySelector("#gui-container").style.filter = "grayscale(0)";
        document.querySelector("#message").style.backgroundColor =
          "transparent";
        document.querySelector("#message").style.display = "none";

        if (total != numOfTarget && sec != 0) isLoaded = true;

        spawn.forEach((index) => {
          if (index.type == "trap") {
            index.isTouch = false;
          }
        });
      }, 3000);
    }, 100);
  } else {
    hintImg.style.display = "none";
    openingHint.style.display = "flex";

    setTimeout(function () {
      openingHint.style.display = "none";
      openedHint.style.display = "flex";
      document.querySelector("#message").innerHTML = hintMessage;
      document.querySelector("#message").style.display = "block";
      document.querySelector("#hintad").style.display = "flex";

      setTimeout(function () {
        document.querySelector("#hintad").style.display = "none";
        document.querySelector("#message").style.display = "none";
        openedHint.style.display = "none";
        isLoaded = true;
      }, 3000);
    }, 1000);
  }
}

function animateDog() {
  var imgX = ccontainer.clientHeight * 0.2;
  var imgY = ccontainer.clientHeight* 0.2;
  
  dctx.clearRect(0, 0, fullSize.clientHeight, fullSize.clientWidth);
  dctx.drawImage(
    targetImg,
    tX,
    tY,
    imgX,
    imgY
  );

  if (tX > ccontainer.clientWidth / 2) {
    tX -= 5;
    if (tX < ccontainer.clientWidth / 2)
    {
      tX = ccontainer.clientWidth / 2; 
    }
  } 
  else
  {
    tX += 5;
    if (tX > ccontainer.clientWidth / 2)
    {
      tX = ccontainer.clientWidth / 2; 
    }
  }

  if (tY > 0) tY -= 5;
  
  imgX--;
  imgY--;

  if ((tX != ccontainer.clientWidth / 2) || !(tY >= -4 && tY <= 0)) {
    animateID = requestAnimationFrame(animateDog);
  }else
  {
    dctx.clearRect(0,0,fullSize.clientWidth, fullSize.clientHeight);
  }
  // TODO: dog animation fadeout when y -= 1 && y == 0 
}