//============================================================//
// Page Setting //
//============================================================//

// Width and Height for responsive page
var ccontainer = document.querySelector("#canvascontainer"); //play region container
var vcontainer = document.querySelector("#vcanvascontainer"); //video canvas container
var fullSize = document.querySelector("#messagecontainer");

// Main Canvas for Gameplay
var canvas = document.querySelector("#canvas");
canvas.setAttribute('width', ccontainer.clientWidth);
canvas.setAttribute('height', ccontainer.clientHeight);
var c = canvas.getContext("2d");

// GUI Canvas for dogs and gifts
var gcanvas = document.querySelector("#guicanvas");
gcanvas.setAttribute('width', ccontainer.clientWidth);
gcanvas.setAttribute('height', ccontainer.clientHeight);
var gctx = gcanvas.getContext("2d");

// Dog Animation Canvas (move from field to basket)
var dogcanvas = document.querySelector("#doganimate");
dogcanvas.setAttribute('width', fullSize.clientWidth);
dogcanvas.setAttribute('height', fullSize.clientHeight);
var dctx = dogcanvas.getContext("2d");

// Video live feed canvas
var vcanvas = document.querySelector("#vcanvas");
vcanvas.setAttribute('width', vcontainer.clientWidth);
vcanvas.setAttribute('height', vcontainer.clientHeight);
var vctx = vcanvas.getContext("2d");

const video = document.querySelector("#video");
video.width = vcontainer.clientWidth;
video.height = vcontainer.clientHeight;

//============================================================//
// Game Settings //
//============================================================//

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

    numOfTarget = 1;
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
var trapimgcontainer = document.getElementById("trapimgcontainer");
targetimgcontainer.style.width = (ccontainer.clientHeight * 0.2) + "px";
targetimgcontainer.style.height = (ccontainer.clientHeight * 0.2) + "px";
trapimgcontainer.style.width = (ccontainer.clientHeight * 0.2) + "px";
trapimgcontainer.style.height = (ccontainer.clientHeight * 0.2) + "px";

//window.scrollY + document.querySelector('#elementId'). // Y
//window.scrollX + document.querySelector('#elementId'). // X

let model;
let handX, handY;

//var w = window.innerWidth;
//var h = window.innerHeight;
var w = canvas.width;
var h = canvas.height;

var isStart = false;
var isSplash = false;
var isPlay = false;

document.getElementById("splash-text").innerHTML = "Dogs Come... <br> ..READYYYYYYYY";

//var bgcolor = localStorage.getItem("pass");
//document.getElementsByTagName('html')[0].style.background = bgcolor;


