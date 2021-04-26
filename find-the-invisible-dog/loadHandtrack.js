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
var cwidth = document.querySelector("#canvascontainer").clientWidth;
var cheight = document.querySelector("#canvascontainer").clientHeight;
var spawn = [];
var extraScore = 0;
var highestScore = 0;
var score = 0;

// variables for gift spawning
const hintRandomTime = (min, max) => { //gift will randomly spawn between 8 and 20
    return Math.floor(Math.random() * (max - min) + min);
};

var hintSpawn = false; //gift can be start being touched
var hintEnd = false;   //a cycle of a gift spawn ends
var hintStart = false; //starts only when detect hand

var sec = 60;
var totalSec = sec; //used for gift spawning calculation;
var hintAvailableSec = totalSec - ((totalSec * 0.1) + (totalSec - (totalSec * 0.9)) + (numOfGift * 3));

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

//create function to receive game data; ajax function
// target creation
for (var i =1; i <= numOfTarget; i++)
{
    spawn.push(new spawnableItem('dog', cwidth, cheight, objRadius));

    let emptyDogContainer = document.querySelector("#emptydogcontainer");
    let img = document.createElement("img");
    let dogSize;

    if (numOfTarget <= 6) dogSize = 0.5
    else if (numOfTarget <= 8) dogSize = 0.4;
    else dogSize = 0.3;

    img.className = "basketdoggy";
    img.src = "Assets/white-dog.png";
    img.style.height = emptyDogContainer.clientHeight * dogSize + "px";
    img.style.width = emptyDogContainer.clientHeight * dogSize + "px";
    emptyDogContainer.appendChild(img);
}

// trap creation
for (var i=1; i <= numOfTrap; i++)
{
    spawn.push(new spawnableItem('trap', cwidth, cheight, objRadius));
}

//gift creation
for (var i = 1; i <= numOfGift; i++) {

    spawn.push(new spawnableItem('hint', cwidth, cheight, objRadius));
}

var stDate = new Date(Date.now());
var total = 0;
draw();
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

      if (calcEuclDistance(spawn[i],{'x':video.width, 'y':video.height}) <= (video.width / 2))
      {
        spawn[i].regenerateXY();
      }
      
      if (calcEuclDistance(spawn[j],{'x':video.width, 'y':video.height}) <= (video.height / 2))
      {
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
        var tid = setInterval(perfTime.push(model.getFPS()), 2000);
        var tid2 = setInterval(handLocations.push([handX, handY]), 2000); //TODO: [X,Y,time,touchedItem] -> if touched dog/cat

        isStart = true;
        if (predictions.length !== 0 && isLoaded == true) { //isLoaded ensures the game won't start at loading page and can be set as a condition to disable the tracking

            hintStart = true;

            midX = (predictions[0].bbox[0] + predictions[0].bbox[2] / 2);
            midY = (predictions[0].bbox[1] + predictions[0].bbox[3] / 2);
            handX = (cwidth * (midX / video.width)) + ((midX >= video.width / 2) ? (canvas.width * 0.01) : -(canvas.width * 0.01));
            handY = (cheight * (midY / video.height)) + ((midY >= video.height / 2) ? (canvas.height * 0.01) : -(canvas.height * 0.01));
            // handX = cwidth *  (midX / video.width);
            // handY = cheight * (midY / video.height);

            begin = 1;

            for (var i = 0; i < spawn.length; i++) {
                spawn[i].calculateDistanceHandToObject(handX, handY);
            }

            for (var i = 0; i < spawn.length; i++) // repeatedly redetect one target as many
            {
                if (spawn[i].type == 'dog' && spawn[i].isTouch == false) //target
                {
                    if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius)) {
                        
                        total++;
                        recordTimeTouch.push(calcTouchTime("target")); //calc touch time
                        spawn[i].isTouch = true;
                        console.log("touched dog");
                        targetAudio.play();
                        targetAudio.volume = 1.0;
                        updateGUI(spawn[i].type, i);
                        stopDetect();
                        checkWL();
                        console.log('returned from checkWL');
                    } else if (spawn[i].distanceX > (spawn[i].radius + handRadius) && spawn[i].distanceX <= 1.1 * (spawn[i].radius + handRadius) && spawn[i].distanceY > (spawn[i].radius + handRadius) && spawn[i].distanceY <= 1.1 * (spawn[i].radius + handRadius)) {
                        // console.log("near dog");
                        targetNearby.play();
                        targetNearby.volume = 0.8;
                    }
                }

                else if (spawn[i].type == 'trap' && spawn[i].isTouch == false) {
                    if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius)) {

                        recordTimeTouch.push(calcTouchTime("trap")); //calc touch time
                        trapAudio.play();
                        trapAudio.volume = 1.0;
                        updateGUI(spawn[i].type, i);
                        stopDetect();

                        if (dogReset === true) {
                            for (var j = 0; j < spawn.length; j++) {
                                if (spawn.type != 'trap') {
                                    spawn[j].regenerateXY(cwidth, cheight);
                                }
                            }
                        }
                        if (catReset === true) {
                            spawn[i].regenerateXY(cwidth, cheight);
                        }
                        draw();
                        spawn[i].isTouch = true; //cat isTouch
                        
                    } else if (spawn[i].distanceX > (spawn[i].radius + handRadius) && spawn[i].distanceX <= 1.1 * (spawn[i].radius + handRadius) && spawn[i].distanceY > (spawn[i].radius + handRadius) && spawn[i].distanceY <= 1.1 * (spawn[i].radius + handRadius)) {
                        console.log("near cat");
                        trapNearby.play();
                        trapNearby.volume = 0.8;
                    }
                }

                else if (spawn[i].type == 'hint' && spawn[i].isTouch == false && hintSpawn == true && spawn[i].isDespawn == false) {                   
                                                                                                                                                                                             
                    if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius)) {
                        
                        recordTimeTouch.push(calcTouchTime("hint"));//calc touch time
                        spawn[i].isTouch = true;
                        console.log("touched hint");
                        hintAudio.play();
                        hintImg.style.display = "none";
                        hintSpawn = false;
                        hintEnd = false;
                        updateGUI(spawn[i].type, i);
                        isLoaded = false;
                        //insert perks here
                        //var hint = Math.round(Math.random() * 2); 
                        var hint = 2;
                        switch (hint) {
                            case 0: //region of dogs
                                break;
                            case 1: //region of cats
                                break;
                            case 2: //extra time
                                sec += 20;
                                break;
                            //case 3: //extra score
                            //    extraScore += 200;
                            //    break;
                        }

                        //Enables user to know which gift they ge                    
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

var countDiv = document.getElementById("timer"), secpass = (function () {
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

    if (sec > 0 && isGift == false) {
        sec = sec - 1;
        checkWL();
    } else {
        if (sec == 0) {
            isLoaded = false; //ensures the game(hand) wont continue to move
            clearInterval(countDown);
            display_lose();
        }
    }
}),
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
    //ensures the game(hand) wont continue to move
      clearInterval(countDown);
      display_win();
  }
}

var name;

function display_win() {
  score = total * 100 + sec;
  document.querySelector("#score").innerHTML = score + "<br />";

  dlData();
  BGM.pause();
  winAudio.play();
  cancelAnimationFrame(draw);
  document.querySelector("#gameover").style.display = "flex";
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
  score = total * 100 + sec;
  document.querySelector("#score").innerHTML = score + "<br />";

  dlData();
  BGM.pause();
  loseAudio.play();
  cancelAnimationFrame(draw);
  document.querySelector("#gameover").style.display = "flex";
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
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
  c.lineWidth = 2;
   spawn.forEach(item => {
       if (item.type != 'hint') {
   
           c.beginPath();
           c.arc(item.x, item.y, objRadius, 0, Math.PI * 2);
           if (item.type == 'dog') {
               c.strokeStyle = 'blue';
           }
           else if (item.type == 'trap') {
               c.strokeStyle = 'white';
           }
           c.stroke();
       } else {
           if (item.isSpawn == false && hintEnd == false && hintStart == true && sec >= totalSec * 0.1 && sec <= totalSec * 0.9 && isLoaded == true) {
               hintEnd = true;
               console.log("enter hint");
   
               setTimeout(function () {
                   if (sec >= totalSec * 0.1) {
                       hintImg.style.display = "flex";
                       hintimgcontainer.style.left = (item.x - (hintimgcontainer.clientHeight / 2)) + "px";
                       hintimgcontainer.style.top = (item.y - (hintimgcontainer.clientHeight / 2)) + "px";
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
               }, hintRandomTime(((hintAvailableSec / numOfGift) / 3) * 1000, (hintAvailableSec / numOfGift) * 1000));
           }
       }
   });

  handAnimation();
  var handImgPosX = controlX - (handimgcontainer.clientWidth / 2);
  var handImgPosY = controlY - (handimgcontainer.clientHeight / 2);

  //handimgcontainer.style.left = handImgPosX + "px";
  //handimgcontainer.style.top = handImgPosY + "px";
  c.drawImage(handImg, handImgPosX, handImgPosY, handImg.width, handImg.height);
}

function updateGUI(type, i) {

    if (type === 'dog') {

        //basket doggy
        let basketDoggyContainer = document.querySelector("#basketdoggycontainer");
        let img = document.createElement("img");
        let dogSize;

        if (numOfTarget <= 6) dogSize = 0.5
        else if (numOfTarget <= 8) dogSize = 0.4;
        else dogSize = 0.3;

        img.className = "basketdoggy";
        img.src = "Assets/img-09.png";
        img.style.height = basketDoggyContainer.clientHeight * dogSize + "px";
        img.style.width = basketDoggyContainer.clientHeight * dogSize + "px";
        basketDoggyContainer.appendChild(img);

        //dog appear
        let locX = spawn[i].x - ((ccontainer.clientHeight * 0.2) / 2);
        let locY = spawn[i].y - ((ccontainer.clientHeight * 0.2) / 2);

        setTimeout(function () {
            gctx.drawImage(targetImg, locX, locY, ccontainer.clientHeight * 0.2, ccontainer.clientHeight * 0.2);

            setTimeout(function () {
                gctx.clearRect(0, 0, ccontainer.clientWidth, ccontainer.clientHeight);
            }, 3000);
        }, 100);
    }

    else if (type === "trap") {
        //cat appear
        let locX = spawn[i].x - ((ccontainer.clientHeight * 0.2) / 2);
        let locY = spawn[i].y - ((ccontainer.clientHeight * 0.2) / 2);

        setTimeout(function () {
            gctx.drawImage(trapImg, locX, locY, ccontainer.clientHeight * 0.2, ccontainer.clientHeight * 0.2);
            isLoaded = false;
            document.querySelector(".container-item4").style.filter = "grayscale(100%)";
            document.querySelector(".container-item4").style.filter = "brightness(20%)";
            //document.querySelector("#blackscreen").style.display = "block";
            document.querySelector("#freezemessage").style.display = "block";

            let freezeCounter = 5;
            document.querySelector("#freezemessage > span").innerHTML = "<br />" + freezeCounter + " seconds";
            let freezeTimer = setInterval(() => {
                freezeCounter--;
                document.querySelector("#freezemessage > span").innerHTML = "<br />" + freezeCounter + " seconds";
            }, 1000);

            setTimeout(function () {
                gctx.clearRect(0, 0, ccontainer.clientWidth, ccontainer.clientHeight);
                document.querySelector(".container-item4").style.filter = "grayscale(0)";
                document.querySelector(".container-item4").style.filter = "brightness(100%)";
                //document.querySelector("#blackscreen").style.display = "none";
                document.querySelector("#freezemessage").style.display = "none";
                clearInterval(freezeTimer);

                if (total != numOfTarget && sec != 0) isLoaded = true;

                spawn.forEach(index => {
                    if (index.type == 'trap') {
                        index.isTouch = false;
                    }
                });
            }, 5000);
        }, 100);
    }

    else {
        hintImg.style.display = "none";
        openingHint.style.display = "flex";
        isGift = true;

        setTimeout(function () {
            openingHint.style.display = "none";
            openedHint.style.display = "flex";
            document.querySelector("#hintmessage").innerHTML = "+ 20 secs";
            document.querySelector("#hintmessage").style.display = "block";
            document.querySelector("#hintad").style.display = "block";

            setTimeout(function () {
                document.querySelector("#hintad").style.display = "none";
                document.querySelector("#hintmessage").style.display = "none";
                openedHint.style.display = "none";
                isLoaded = true;
                isGift = false;
            }, 3000);
        }, 1000);
    }
}