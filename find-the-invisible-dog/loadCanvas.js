var ccontainer = document.querySelector("#canvascontainer"); //play region container
var vcontainer = document.querySelector("#vcanvascontainer"); //video canvas container
//video.width = window.innerWidth;
//video.height = window.innerHeight;

var canvas = document.querySelector("#canvas");
canvas.setAttribute('width', ccontainer.clientWidth);
canvas.setAttribute('height', ccontainer.clientHeight);
var c = canvas.getContext("2d");

var gcanvas = document.querySelector("#guicanvas");
gcanvas.setAttribute('width', ccontainer.clientWidth);
gcanvas.setAttribute('height', ccontainer.clientHeight);
var gctx = gcanvas.getContext("2d");

var vcanvas = document.querySelector("#vcanvas");
vcanvas.setAttribute('width', vcontainer.clientWidth);
vcanvas.setAttribute('height', vcontainer.clientHeight);
var vctx = vcanvas.getContext("2d");

const video = document.querySelector("#video");
video.width = vcontainer.clientWidth;
video.height = vcontainer.clientHeight;

var numOfGift = 4;
var numOfTarget;
var numOfTrap;
var objRadius;
var handRadius;
var catReset;
var dogReset;
var difficulty = "custom"; // get from JSON

if (difficulty == "easy") {

    numOfTarget = 2;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.04;
    handRadius = ccontainer.scrollHeight * 0.2;
    catReset = false;
    dogReset = false;
} else if (difficulty == "normal") {

    numOfTarget = 5;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.03;
    handRadius = ccontainer.scrollHeight * 0.1;
    catReset = true;
    dogReset = false;
} else if (difficulty == "hard") {

    numOfTarget = 8;
    numOfTrap = 2;
    objRadius = ccontainer.scrollHeight * 0.01;
    handRadius = ccontainer.scrollHeight * 0.08;
    catReset = true;
    dogReset = true;
} else if (difficulty == "custom") {

    numOfTarget = 4;
    numOfTrap = 2;
    objRadius = ccontainer.scrollHeight * 0.04;
    handRadius = ccontainer.scrollHeight * 0.2;
    catReset = true;
    dogReset = false;
}

var hintimgcontainer = document.getElementById("hintimgcontainer");
hintimgcontainer.style.width = (ccontainer.scrollHeight * 0.2) + "px";
hintimgcontainer.style.height = (ccontainer.scrollHeight * 0.2) + "px";

var handimgcontainer = document.getElementById("handimgcontainer");
handimgcontainer.style.width = handRadius * 2 + "px";
handimgcontainer.style.height = handRadius * 2 + "px";

var targetimgcontainer = document.getElementById("targetimgcontainer");
targetimgcontainer.style.width = (ccontainer.clientHeight * 0.2) + "px";
targetimgcontainer.style.height = (ccontainer.clientHeight * 0.2) + "px";

var trapimgcontainer = document.getElementById("trapimgcontainer");
trapimgcontainer.style.width = (ccontainer.clientHeight * 0.2) + "px";
trapimgcontainer.style.height = (ccontainer.clientHeight * 0.2) + "px";

let model;
let handX, handY;

var w = canvas.width;
var h = canvas.height;

var isStart = false;  //load handtrack
var isSplash = false; //load splash screen
var isPlay = false;   //load idk
var isGift = false;   //used forstop time when showing hint
var isLoaded = false; //used to disable handtracking
var isEnd = false;
var splashScreen = document.querySelector("#splashscreen");

//var bgcolor = localStorage.getItem("pass");
//document.getElementsByTagName('html')[0].style.background = bgcolor;


