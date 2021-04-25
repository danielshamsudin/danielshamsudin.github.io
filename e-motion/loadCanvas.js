const video = document.querySelector("#video");

video.width = window.innerWidth;

var canvas = document.querySelector("#canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var canvas1 = document.querySelector("#canvas1");
var ctx1 = canvas1.getContext("2d");

var splash = document.getElementById("splash");

var speed;
var responsiveAddHeight = canvas.height > canvas.width ? canvas.height * 0.03 : canvas.height * 0.02;
var responsiveInterval = 250;
var padLength = canvas.height > canvas.width ? canvas.width * 0.3 : canvas.height * 0.3;
var spawnSize = canvas.height > canvas.width ? canvas.width * 0.1 : canvas.height * 0.1;

if (canvas.height > canvas.width) {
  speed = 8;

  if (isMobile() !== null) {
    //responsiveAddHeight = 75;
    //responsiveInterval = 100;
  }
} else speed = 5;

console.log(
  "ismobile",
  isMobile(),
  navigator.userAgent,
  responsiveAddHeight,
  responsiveInterval,
  speed
);

var model;
var handX, handY;
var paddleX;
var point = 0;

var timeOutLong;
var timeOutShort;
var timeOutStatus;
var timeOutDelay;
var longCount = 0;
var shortCount = 0;
var boomCount = 0;
var img1count = 0;
var img2count = 0;
var img3count = 0;
var img4count = 0;
var img5count = 0;

var _catch = new Audio("./sound/catch.mp3");
var _boom = new Audio("./sound/boom.mp3");
var _bgm = new Audio("./sound/bgm.wav");
var _hurry = new Audio("./sound/hurry.wav");

//states====================
var isStart = false;
var isSplash = false;
var isPlay = false;
var isEnd = false;
//==========================
var isDrop = false;
var mm = 01;
var ss = 30;
mm = parseInt(mm);
ss = parseInt(ss);
mm = mm < 10 ? "0" + mm : mm;
ss = ss < 10 ? "0" + ss : ss;

c.fillStyle = "grey";
c.fillRect(0, 0, canvas.width, canvas.height);

document.getElementById("splash-text").innerHTML = "Game is loading...";

function isMobile() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    navigator.userAgent.match(/ZuneWP7/i)
  );
}
