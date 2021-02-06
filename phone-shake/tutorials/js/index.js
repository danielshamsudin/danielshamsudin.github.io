const cvs = document.getElementById("tutorials");
const ctx = cvs.getContext("2d");
const SCREEN_HEIGHT = 600;
const SCREEN_WIDTH = 500;
//ball
const ball = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT - 120,
  radius: 10,
  color: "white",
  dx: 5 * (Math.random() * 2 - 1),
  dy: -5,
  speed: 6,
  newX: 0,
  newY: 0,
};

//paddle
const paddle = {
  x: SCREEN_WIDTH / 2 - 100 / 2,
  y: SCREEN_HEIGHT - 100,
  width: 100,
  height: 20,
  color: "white",
  dx: 7,
};

let leftArrow = false;
let rightArrow = false;
let totalObjects = 0;
let gameStatus = true;
const SCORE_UNIT = 1;
let SCORE = 0;

document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (!isIOS()) {
      document.getElementById("request").style.display = "none";
      document.getElementById("request").click();
    }
  },
  false
);

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    leftArrow = true;
  } else if (event.keyCode == 39) {
    rightArrow = true;
  }
});

function requestMotionPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", function (evt) {
            if (this.window.innerHeight > this.window.innerWidth) {
              var x = event.accelerationIncludingGravity.x * 3;

              if (x > 2 && paddle.x > 0) {
                paddle.x -= paddle.dx;
              }
              if (x < -2 && paddle.x + paddle.width < cvs.width) {
                paddle.x += paddle.dx;
              }
            } else if (this.window.innerWidth > this.window.innerHeight) {
              alert("Please Make Sure Your Are In Portrait Mode");
            }
          });
        }
      })
      .catch((error) => alert(error));
  } else {
    window.addEventListener("devicemotion", function (evt) {
      if (this.window.innerHeight > this.window.innerWidth) {
        var x = event.accelerationIncludingGravity.x * 3;

        if (x > 2 && paddle.x > 0) {
          paddle.x -= paddle.dx;
        }
        if (x < -2 && paddle.x + paddle.width < cvs.width) {
          paddle.x += paddle.dx;
        }
      } else if (this.window.innerWidth > this.window.innerHeight) {
        alert("Please Make Sure Your Are In Portrait Mode");
      }
    });
  }
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) {
    leftArrow = false;
  } else if (event.keyCode == 39) {
    rightArrow = false;
  }
});

document.addEventListener("click", function () {
  if (gameStatus == false) {
    gameStatus = true;
    paddle.x = SCREEN_WIDTH / 2 - 100 / 2;
    paddle.y = SCREEN_HEIGHT - 100;
  }
});

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawText(text, x, y) {
  ctx.fillStyle = "#FFF";
  ctx.font = "75px fantasy";
  ctx.fillText(text, x, y);
}

let object = {
  x: [],
  y: [],
  width: 20,
  height: 20,
  color: "red",
  status: [],
  dy: 2,
};

function makeEnemies() {
  if (Math.random() < 0.02) {
    object.x.push(Math.random() * SCREEN_WIDTH);
    object.y.push(0);
    object.status.push(true);
  }
  totalObjects = object.x.length;
}

function drawEnemies() {
  for (let i = 0; i < totalObjects; i++) {
    if (object.status[i] == true) {
      drawRect(
        object.x[i],
        object.y[i],
        object.width,
        object.height,
        object.color
      );
    }
  }
}

function draw() {
  //draw background
  drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#000");

  //draw Text
  drawText(SCORE, SCREEN_WIDTH / 2 - 15, SCREEN_HEIGHT - 500);
  //draw paddle
  drawRect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.color);

  drawEnemies();

  makeEnemies();
}

function moveEnemy() {
  for (let i = 0; i < totalObjects; i++) {
    object.y[i] += object.dy;
  }
}

function collisionDetection() {
  for (let i = 0; i < totalObjects; i++) {
    if (object.status[i]) {
      if (
        object.x[i] <= paddle.x + paddle.width &&
        object.x[i] + object.width >= paddle.x &&
        object.y[i] <= paddle.y + paddle.height &&
        object.y[i] + object.height >= paddle.y
      ) {
        SCORE++;
        object.status[i] = false;
      }
    } else if (object.y[i] + object.height > SCREEN_HEIGHT) {
      object.status[i] = false;
    }
  }
}
function movePaddle() {
  if (leftArrow == true && paddle.x >= 0) {
    paddle.x -= paddle.dx;
  } else if (rightArrow == true && paddle.x + paddle.width <= SCREEN_WIDTH) {
    paddle.x += paddle.dx;
  }
}

function gameOver() {
  object.status = [];
  object.x = [];
  object.y = [];
}

function update() {
  movePaddle();
  collisionDetection();
  moveEnemy();
}

function game() {
  draw();
  update();

  requestAnimationFrame(game);
}

game();

function isIOS() {
  return (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i)
  );
}
