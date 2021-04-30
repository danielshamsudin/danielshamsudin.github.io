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
var c = canvas.getContext("2d", {
    desynchronized: true
});

// GUI Canvas for dogs and gifts
var gcanvas = document.querySelector("#guicanvas");
gcanvas.setAttribute('width', ccontainer.clientWidth);
gcanvas.setAttribute('height', ccontainer.clientHeight);
var gctx = gcanvas.getContext("2d", {
    desynchronized: true
});

// Dog Animation Canvas (move from field to basket)
var dogcanvas = document.querySelector("#doganimate");
dogcanvas.setAttribute('width', fullSize.clientWidth);
dogcanvas.setAttribute('height', fullSize.clientHeight);
var dctx = dogcanvas.getContext("2d", {
    desynchronized: true
});

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
var difficulty = "normal"; // get from JSON

if (difficulty == "easy") {

    numOfTarget = 6;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.04;
    handRadius = ccontainer.scrollHeight * 0.1;
    catReset = false;
    dogReset = false;
} else if (difficulty == "normal") {

    numOfTarget = 6;
    numOfTrap = 2;
    objRadius = ccontainer.scrollHeight * 0.03;
    handRadius = ccontainer.scrollHeight * 0.1;
    catReset = true;
    dogReset = false;
} else if (difficulty == "custom") {

    numOfTarget = 3;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.04;
    handRadius = ccontainer.scrollHeight * 0.1;
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

// roundRect function to use with canvas2d objects
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}