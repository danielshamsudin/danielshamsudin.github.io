//==================================================
var ranObj;
var ranval;
//declare image
var img1 = new Image();
img1.src = img1php;
var img2 = new Image();
img2.src = img2php;
var img3 = new Image();
img3.src = img3php;
var img4 = new Image();
img4.src = img4php;
var img5 = new Image();
img5.src = img5php;
var long = new Image();
long.src = "./img/long.png";
var short = new Image();
short.src = "./img/short.png";
var boom = new Image();
boom.src = "./img/boom.png";
//declare audio

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);

    let json = JSON.parse(this.responseText);

    if (json) {
      let settings = json.data;

      console.log(settings);

      for (var i = 0; i < settings.length; i++) {
        let data = settings[i];

        if (data.type == "fixed_image") {
          let images = data.data.images;
          img1.src = images[0];
          img2.src = images[1];
          img3.src = images[2];
          img4.src = images[3];
          img5.src = images[4];
        }
      }
    }
  }
};
xhttp.open(
  "GET",
  "https://fuyoh-ads.com/game_web/campaign_game/settings?activity_id=1",
  true
);
xhttp.send();

var img = [];
var num = 10;
var obj = [];
var i = 0;

//==================================================
//Initialize constructor for object
class _Object {
  constructor(x, y, img, dx, dy, id) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.dy = dy;
    this.dx = dx;
    this.id = id;
  }

  //Draw image at set parameters
  draw() {
    c.drawImage(this.img, this.x, this.y, 75, 75);

    this.detect();
  }

  //Set the detection range of the paddle
  detect() {
    if (this.y > canvas.height + 500) return;
    if (
      (this.id == 1 ||
        this.id == 2 ||
        this.id == 3 ||
        this.id == 4 ||
        this.id == 5) &&
      this.x + 75 > handX &&
      this.x < handX + padLength &&
      this.y + responsiveAddHeight > canvas.height - 125 &&
      this.y + responsiveAddHeight < canvas.height - 50
    ) {
      //this.x = canvas.width + 100;
      //music.play();
      //Score style properties

      if (this.id == 1) {
        img1count++;
      } else if (this.id == 2) {
        img2count++;
      } else if (this.id == 3) {
        img3count++;
      } else if (this.id == 4) {
        img4count++;
      } else if (this.id == 5) {
        img5count++;
      }

      point += 50;
      document.getElementById("status").style.top = canvas.height - 140 + "px";
      document.getElementById("status").style.left = handX + "px";
      document.getElementById("status").style.color = "lightgreen";
      document.getElementById("status").innerHTML = "";

      //Score will show on the collision location
      clearTimeout(timeOutDelay);
      timeOutDelay = setTimeout(() => {
        document.getElementById("status").innerHTML = "Point +50!";
      }, 50);

      clearTimeout(timeOutStatus);
      timeOutStatus = setTimeout(() => {
        document.getElementById("status").innerHTML = "";
      }, 1000);
      this.y = canvas.height + 300;
      _catch.play();
    } else if (
      this.id == 6 &&
      this.x + 75 > handX &&
      this.x < handX + padLength &&
      this.y + responsiveAddHeight > canvas.height - 125 &&
      this.y + responsiveAddHeight < canvas.height - 50
    ) {
      //this.x = canvas.width + 100;
      //music.play();
      //Makes the paddle longer for a set timer
      longCount++;
      if (padLength == 200) {
        padLength += 100;
        timeOutLong = setTimeout(() => {
          padLength -= 100;
          console.log("long 1");
        }, 5000);
      } else if (padLength == 100) {
        clearTimeout(timeOutShort);
        padLength = 200;
        console.log("short back to normal");
      } else {
        clearTimeout(timeOutLong);
        timeOutLong = setTimeout(() => {
          padLength -= 100;
          console.log("long 2");
        }, 5000);
      }
      document.getElementById("status").style.top = canvas.height - 140 + "px";
      document.getElementById("status").style.left = handX + "px";
      document.getElementById("status").style.color = "cyan";
      document.getElementById("status").innerHTML = "";

      clearTimeout(timeOutDelay);
      timeOutDelay = setTimeout(() => {
        document.getElementById("status").innerHTML =
          "Paddle length increased!";
      }, 50);

      clearTimeout(timeOutStatus);
      timeOutStatus = setTimeout(() => {
        document.getElementById("status").innerHTML = "";
      }, 1000);

      this.y = canvas.height + 300;
      _catch.play();
      //==========================================================================
    } else if (
      this.id == 7 &&
      this.x + 75 > handX &&
      this.x < handX + padLength &&
      this.y + responsiveAddHeight > canvas.height - 125 &&
      this.y + responsiveAddHeight < canvas.height - 50
    ) {
      //this.x = canvas.width + 100;
      //music.play();
      //Makes the paddle longer for a set timer
      shortCount++;
      if (padLength == 200) {
        padLength -= 100;
        timeOutShort = setTimeout(() => {
          padLength += 100;
          console.log("short 1");
        }, 5000);
      } else if (padLength == 300) {
        clearTimeout(timeOutLong);
        padLength = 200;
        console.log("long back to normal");
      } else {
        clearTimeout(timeOutShort);
        timeOutShort = setTimeout(() => {
          padLength += 100;
          console.log("short 2");
        }, 5000);
      }
      document.getElementById("status").style.top = canvas.height - 140 + "px";
      document.getElementById("status").style.left = handX + "px";
      document.getElementById("status").style.color = "violet";
      document.getElementById("status").innerHTML = "";

      clearTimeout(timeOutDelay);
      timeOutDelay = setTimeout(() => {
        document.getElementById("status").innerHTML =
          "Paddle length decreased!";
      }, 50);

      clearTimeout(timeOutStatus);
      timeOutStatus = setTimeout(() => {
        document.getElementById("status").innerHTML = "";
      }, 1000);

      this.y = canvas.height + 300;
      _catch.play();
      //==========================================================================
    } else if (
      this.id == 8 &&
      this.x + 75 > handX &&
      this.x < handX + padLength &&
      this.y + responsiveAddHeight > canvas.height - 125 &&
      this.y + responsiveAddHeight < canvas.height - 50
    ) {
      //this.x = canvas.width + 100;
      //music.play();
      //The boom/dynamite that -300 points
      boomCount++;
      point -= 300;
      if (point < 0) point = 0;
      document.getElementById("status").style.top = canvas.height - 140 + "px";
      document.getElementById("status").style.left = handX + "px";
      document.getElementById("status").style.color = "crimson";
      document.getElementById("status").innerHTML = "";

      clearTimeout(timeOutDelay);
      timeOutDelay = setTimeout(() => {
        document.getElementById("status").innerHTML = "Point -300!";
      }, 50);

      clearTimeout(timeOutStatus);
      timeOutStatus = setTimeout(() => {
        document.getElementById("status").innerHTML = "";
      }, 1000);

      this.y = canvas.height + 300;
      _boom.volume = 0.5;
      _boom.play();
    }
    //=================================================================================
    document.getElementById("points").innerHTML = "Scores : " + point;
    //Update the point in the HTML
  }

  //update funtion called from obj[j].update
  update() {
    this.y += responsiveAddHeight; //make the object falling

    this.draw(); //call draw funtion (look above)
  }
}

//state detection
var startGen = setInterval(() => {
  if (isDrop) {
    gen();
    clearInterval(startGen);
  }
}, 100);

//change background color when the timer left 15 seconds
//play hurry up music too!
var bg = "white";
var hurry = setInterval(() => {
  if (mm == 0 && ss == 15) {
    _bgm.pause();
    _hurry.volume = 0.3;
    _hurry.play();
    bg = "LightSalmon";
    document.getElementById("timer").style.color = "red";
    clearInterval(hurry);
  }
}, 100);

function gen() {
  //control the spawn rate of object with 2000ms
  setInterval(() => {
    //Using Math.random to generate object randomly
    ranObj = Math.random();
    if (ranObj >= 0.0 && ranObj < 0.8) {
      ranval = Math.floor(Math.random() * 5) + 1;
      if (ranval == 1) {
        img[i] = img1;
        var id = 1;
      } else if (ranval == 2) {
        img[i] = img2;
        var id = 2;
      } else if (ranval == 3) {
        img[i] = img3;
        var id = 3;
      } else if (ranval == 4) {
        img[i] = img4;
        var id = 4;
      } else if (ranval == 5) {
        img[i] = img5;
        var id = 5;
      }
      //Spawn rate set at 5%
    } else if (ranObj >= 0.8 && ranObj < 0.85) {
      img[i] = long;
      var id = 6;
    } else if (ranObj >= 0.85 && ranObj < 0.9) {
      img[i] = short;
      var id = 7;
    } else if (ranObj >= 0.9 && ranObj < 1.0) {
      img[i] = boom;
      var id = 8;
    }

    var x = Math.random() * (canvas.width - 300) + 150;
    var y = Math.random() * 40;
    var dx = 5; //x axis speed (never used)
    var dy = Math.floor(Math.random() * 3) + speed;
    obj[i] = new _Object(x, y, img[i], dx, dy, id);
    i++;

    //counter to make the array looping
    if (i == num) {
      i = 0;
    }
  }, 1000);
}

//make the paddle move smoothly
function padAcce() {
  if (handX > paddleX) {
    paddleX += 10;
  } else if (handX + 10 < paddleX) {
    paddleX -= 10;
  }
}

var padColor = localStorage.getItem("pass");
paddleX = canvas.width / 2;

//this function is to make whole thing run
function update() {
  if (isDrop) {
    //to refresh the canvas frame by filling new orange rectangle
    c.fillStyle = bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(update); //refresh frame

    padAcce();

    //speed detection
    if (point == 1000 && (speed == 5 || speed == 8)) {
      speed += 2;
      document.getElementById("speed").innerHTML = "Speed : 2";
      document.getElementById("speed").style.color = "green";
    } else if (point == 2500 && (speed == 7 || speed == 10)) {
      speed += 2;
      document.getElementById("speed").innerHTML = "Speed : 3";
      document.getElementById("speed").style.color = "red";
    } else if (point == 4000 && (speed == 9 || speed == 12)) {
      speed += 3;
      document.getElementById("speed").innerHTML = "Speed : MAX";
      document.getElementById("speed").style.color = "purple";
    }

    //the paddle
    c.beginPath();
    c.fillStyle = padColor;
    c.fillRect(paddleX, canvas.height - 60, padLength, 20);

    //make each object falling
    for (let j = 0; j < num; j++) {
      if (obj[j] && obj[j].update !== undefined) {
        obj[j].update();
      }
    }
  }
}

//=========================================================
