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
var extraScore = 0;
var highestScore = 0;
var score = 0;
var touchAvailable = true; //to freeze time after touching spawns


// variables for gift spawning
const giftRandomTime = (min, max) => { //gift will randomly spawn between 8 and 20
    return Math.floor(Math.random() * (max - min) + min);
};

var giftSpawn = false; //gift can be start being touched
var giftEnd = false;   //a cycle of a gift spawn ends
var giftStart = false; //starts only when detect hand

var sec = 300;
var totalSec = sec; //used for gift spawning calculation;
var giftAvailableSec = totalSec - ((totalSec * 0.15) + (totalSec - (totalSec * 0.8)) + (numOfGift * 3));
console.log("spawn " + numOfGift + " in " + giftAvailableSec);
console.log("max sec of each spawn: " + giftAvailableSec / numOfGift);
console.log("min sec : " + (giftAvailableSec / numOfGift) / 3);
//gift spawning calculation
//if (sec >= totalSec * 0.15 && sec <= totalSec * 0.8) {
//    if (sec <= totalSec * 0.8) {
//        
//    }
//    giftRandomTime(2, giftAvailableSec / numOfGift);
//}

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
}

// trap creation
for (var i=1; i <= numOfTrap; i++)
{
    spawn.push(new spawnableItem('trap', cwidth, cheight, objRadius));
}

//gift creation
for (var i = 1; i <= numOfGift; i++) {

    spawn.push(new spawnableItem('gift', cwidth, cheight, objRadius));
}

var stDate = new Date(Date.now());
var total = 0;
draw();
// const modal = document.querySelector(".modal");
// modal.style.height = window.innerHeight;
// modal.style.width = window.innerWidth;
// var number1 = 0, number2 = 0, number3 = 0, total = 0;
// var x, y, x2, y2, x3, y3, trapx, trapy;
// var disx, disy, disx2, disy2, disx3, disy3, distx, disty;
// var statustrap = 0;

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
        var tid = setInterval(perfTime.push(model.getFPS()), 2000);
        var tid2 = setInterval(handLocations.push([handX, handY]), 2000); //TODO: [X,Y,time,touchedItem] -> if touched dog/cat

        isStart = true;
        if (predictions.length !== 0 && isLoaded == true) { //isLoaded ensures the game won't start at loading page and is set to false when game ends

            giftStart = true;

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
                if (spawn[i].type == 'dog' && spawn[i].isTouch == false && touchAvailable == true) //target
                {
                    if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius)) {
                        if ((total * 100) >= highestScore) {
                            score += 100;
                            highestScore = score;
                        }
                        //console.log(score);

                        if (total == -1) total = 1; // touched target from trap
                        else total++; // touched target

                        touchAvailable = false;
                        recordTimeTouch.push(calcTouchTime("target")); //calc touch time
                        spawn[i].isTouch = true;
                        console.log("touched dog");
                        catchAudio.play();
                        catchAudio.volume = 1.0;
                        stopDetect();
                        setTimeout(() => { //users are unable to other spawns withint 1.5 secs
                            touchAvailable = true;
                        }, 1500);

                        setTimeout(() => {
                            catchImg.style.display = "flex";
                            document.querySelector("#doggy span").style.display = 'flex';
                            setTimeout(() => {
                                catchImg.style.display = "none";
                                document.querySelector("#doggy span").style.display = 'none';
                            }, 300);
                        }, 300);

                        checkWL();
                        console.log('returned from checkWL');
                    } else if (spawn[i].distanceX > (spawn[i].radius + handRadius) && spawn[i].distanceX <= 1.1 * (spawn[i].radius + handRadius) && spawn[i].distanceY > (spawn[i].radius + handRadius) && spawn[i].distanceY <= 1.1 * (spawn[i].radius + handRadius)) {
                        // console.log("near dog");
                        catchNearby.play();
                        catchNearby.volume = 0.8;
                    }
                }

                else if (spawn[i].type == 'trap' && touchAvailable == true) {
                    if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius)) {

                        //if (score == 0) score = 0;
                        //else if (score > 0 && score <= 1000) score -= 100;
                        //else score -= 200;
                        //console.log(score);

                        //total = -1; // touched trap, differentiate trap from target
                        touchAvailable = false;
                        recordTimeTouch.push(calcTouchTime("trap")); //calc touch time
                        trapAudio.play();
                        trapAudio.volume = 1.0;
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
                        document.querySelector(".container-item2 .span1").innerHTML = "<i class='fas fa-cat'></i>!!!";
                        setTimeout(() => {
                            trapImg.style.display = "flex";
                            document.querySelector("#catty span").style.display = 'flex';
                            freezeGUI.style.display = 'flex';
                            isLoaded = false;

                            setTimeout(() => {
                                isLoaded = true;
                                freezeGUI.style.display = 'none';
                                trapImg.style.display = "none";
                                document.querySelector("#catty span").style.display = 'none';
                            }, 3000);
                        }, 300);

                        setTimeout(() => { //users are unable to other spawns withint 1.5 secs
                            touchAvailable = true;
                        }, 1500);

                        spawn[i].isTouch = true; //cat isTouch
                        spawn.forEach(index => {
                            if (index.type == 'trap') {
                                index.isTouch = false;
                            }
                        });
                    } else if (spawn[i].distanceX > (spawn[i].radius + handRadius) && spawn[i].distanceX <= 1.1 * (spawn[i].radius + handRadius) && spawn[i].distanceY > (spawn[i].radius + handRadius) && spawn[i].distanceY <= 1.1 * (spawn[i].radius + handRadius)) {
                        console.log("near cat");
                        trapNearby.play();
                        trapNearby.volume = 0.8;
                    }
                }

                else if (spawn[i].type == 'gift' && spawn[i].isTouch == false && giftSpawn == true && spawn[i].isDespawn == false && touchAvailable == true) {   // && spawn[i].isTouch == false                      
                                                                                                                                                                                             
                    if (spawn[i].distanceX >= 0 && spawn[i].distanceX <= (spawn[i].radius + handRadius) && spawn[i].distanceY >= 0 && spawn[i].distanceY <= (spawn[i].radius + handRadius)) {
                        
                        recordTimeTouch.push(calcTouchTime("gift"));//calc touch time
                        spawn[i].isTouch = true;
                        console.log("touched gift");
                        giftAudio.play();
                        giftImg.style.display = "none";
                        giftSpawn = false;
                        giftEnd = false;
                        //insert perks here

                        touchAvailable = false;
                        setTimeout(() => { //users are unable to other spawns withint 1.5 secs
                            touchAvailable = true;
                        }, 1500);
                        
                        var gift = Math.round(Math.random() * 2); 
                        switch (gift) {
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

                        //Enables user to know which gift they get
                        setTimeout(() => {
                            adImg.style.display = "flex";
                            document.querySelector("#hintad span").style.display = "flex";

                            if (gift == 0) document.querySelector("#hintad span").innerHTML = "Dog is here";
                            else if (gift == 1) document.querySelector("#hintad span").innerHTML = "Cat is here";
                            else document.querySelector("#hintad span").innerHTML = "Extra 20 secs";
                            
                            setTimeout(() => {
                                adImg.style.display = "none";
                                document.querySelector("#hintad span").style.display = "none";
                            }, 1000);
                        }, 300);
                        
                        //setTimeout(() => {                                              
                        //    catchImg.style.display = "flex";                            
                        //    setTimeout(() => {                                          
                        //        catchImg.style.display = "none";                        
                        //    }, 300);                                                    
                        //}, 300);                                                        
                        //if (total == -1) total = 1; // touched target from trap         
                        //else total++; // touched target                                 
                        //                                                                
                        //checkWL();                                                      
                        //console.log('returned from checkWL');                           
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

var countDiv = document.getElementById("timer"), secpass,
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
    //checkWL();
  } else {
    if (sec == 0) {
      isLoaded = false; //ensures the game(hand) wont continue to move
      clearInterval(countDown);
      total = number1 + number2 + number3;
      display_lose();
    }
  }
}

var fifthCounter = 0;
var tenthCounter = 0;
var dogCounter = 0;
var dogSize = 70;
var dogImage = "";

function checkWL() {

    dogImage = ""; // picture

    if (total == -1) {
        document.querySelector(".container-item2 .span1").innerHTML = dogImage;
        document.querySelector(".container-item2 .span2").innerHTML = "resetted";
    } else {

        dogImage = "";
        for (i = 0; i < total; i++) {
            dogSize += 7;
            dogImage += "<i class='fas fa-dog' style='font-size:" + dogSize + "%;'></i>";
            dogCounter++;

            if (dogCounter == 5) {
                fifthCounter += 1;
                dogCounter = 0;
                dogImage = "";
                if (tenthCounter != 0) {
                    for (k = 0; k < tenthCounter; k++) {
                        dogImage += "<i class='fas fa-dog' style='color:red'></i>";
                    }
                }
                dogImage += "<i class='fas fa-dog' style='color:yellow; font-size:" + dogSize + "%;'></i>";
                dogSize = 80;
                if (fifthCounter == 2) {
                    tenthCounter += 1;
                    fifthCounter = 0;
                    dogImage = "";

                    for (k = 0; k < tenthCounter; k++) {

                        dogImage += "<i class='fas fa-dog' style='color:red'></i>";
                    }
                }
            }
        }
        dogCounter = 0;
        fifthCounter = 0;
        tenthCounter = 0;

        document.querySelector(".container-item2 .span1").innerHTML = dogImage;
        document.querySelector(".container-item2 .span2").innerHTML = (numOfTarget - total);
    }

  //dogImage = ""; // picture
  //if (total == -1)
  //{
  //  dogImage = "<i class='fas fa-cat'></i>!!!";
  //}
  //else{
  //  for (i=0;i<total;i++)
  //  {
  //    dogImage += "<i class='fas fa-dog'></i>";
  //  }
  //}
  
  if (total == numOfTarget) {
    total = 0;
    isLoaded = false; //ensures the game(hand) wont continue to move
    // clearInterval(countDown);
    // dogImage = "";
    // display_win();
  }
}

var name;

function display_win() {

  dlData();
  // score change to json
  // score = (total / numOfTarget) * 100; // set score for dogs
  if(extraScore != 0) score += extraScore;
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
  //score = (total / numOfTarget) * 100;
  if(extraScore != 0) score += extraScore;
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
        if (item.type != 'gift') {

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
            if (item.isSpawn == false && giftEnd == false && giftStart == true && sec >= totalSec * 0.1 && sec <= totalSec * 0.9) {
                giftEnd = true;
                console.log("enter gift");

                setTimeout(function () {
                    if (sec >= totalSec * 0.1) {
                        giftImg.style.display = "flex";
                        giftimgcontainer.style.left = item.x + "px";
                        giftimgcontainer.style.top = item.y + "px";
                        giftSpawn = true;
                        item.isSpawn = true;
                        item.isDespawn = false;

                        setTimeout(function () {
                            giftImg.style.display = "none";
                            item.isDespawn = true;
                            if (item.isTouch == false) {
                                giftEnd = false;
                                giftSpawn = false;
                            }

                        }, 3000);
                    }
                }, giftRandomTime(((giftAvailableSec / numOfGift) / 3) * 1000, (giftAvailableSec / numOfGift) * 1000));
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