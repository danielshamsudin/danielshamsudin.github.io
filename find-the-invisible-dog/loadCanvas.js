const video = document.querySelector("#video");
var ccontainer = document.querySelector(".container-item4"); //play region container
var vcontainer = document.querySelector(".container-item3"); //video canvas container
video.width = window.innerWidth;
video.height = window.innerHeight;

var canvas = document.querySelector("#canvas");
canvas.setAttribute('width', ccontainer.scrollWidth);
canvas.setAttribute('height', ccontainer.scrollHeight);
var c = canvas.getContext("2d");

var vcanvas = document.querySelector("#vcanvas");
vcanvas.setAttribute('width', vcontainer.scrollWidth);
vcanvas.setAttribute('height', vcontainer.scrollHeight);
var vctx = vcanvas.getContext("2d");

var numOfTarget;
var numOfTrap;
var objRadius;
var handRadius;
var catReset;
var dogReset;
var difficulty = "hard"; // get from JSON

if (difficulty == "easy") {

    numOfTarget = 2;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.04;
    handRadius = ccontainer.scrollHeight * 0.2;
    catReset = false;
    dogReset = false;
} else if (difficulty == "normal") {

    numOfTarget = 3;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.03;
    handRadius = ccontainer.scrollHeight * 0.1;
    catReset = true;
    dogReset = false;
} else if (difficulty == "hard") {

    numOfTarget = 20;
    numOfTrap = 1;
    objRadius = ccontainer.scrollHeight * 0.01;
    handRadius = ccontainer.scrollHeight * 0.08;
    catReset = true;
    dogReset = true;
} else if (difficulty == "custom") {

}

var giftimgcontainer = document.getElementById("giftimgcontainer");
giftimgcontainer.style.width = (ccontainer.scrollHeight * 0.05) + "px";
giftimgcontainer.style.height = (ccontainer.scrollHeight * 0.05) + "px";

var handimgcontainer = document.getElementById("handimgcontainer");
handimgcontainer.style.width = handRadius * 2 + "px";
handimgcontainer.style.height = handRadius * 2 + "px";
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

//c.fillStyle = "white";
//c.fillRect(0, 0, canvas.width, canvas.height);
document.getElementById("splash-text").innerHTML = "Dogs Come... <br> ..READYYYYYYYY";


