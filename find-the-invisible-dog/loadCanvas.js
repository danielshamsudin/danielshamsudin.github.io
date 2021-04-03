var numOfTarget = 3; // get from JSON
var numOfTrap = 1; // get from JSON
var objRadius = 10; // get from JSON
var handRadius = 20; // get from JSON
var catReset = true;
var dogReset = true;

const video = document.querySelector("#video");
var ccontainer = document.querySelector(".container-item4"); //play region container
var vcontainer = document.querySelector(".container-item3"); //video canvas container
video.width = window.innerWidth;
video.height = window.innerHeight;

var handimgcontainer = document.getElementById("handimgcontainer");
handimgcontainer.style.width = handRadius * 2 + "px";
handimgcontainer.style.height = handRadius * 2 + "px";
//window.scrollY + document.querySelector('#elementId'). // Y
//window.scrollX + document.querySelector('#elementId'). // X

var canvas = document.querySelector("#canvas");
canvas.setAttribute('width', ccontainer.scrollWidth);
canvas.setAttribute('height', ccontainer.scrollHeight);
var c = canvas.getContext("2d");

var vcanvas = document.querySelector("#vcanvas");
vcanvas.setAttribute('width', vcontainer.scrollWidth);
vcanvas.setAttribute('height', vcontainer.scrollHeight);
var vctx = vcanvas.getContext("2d");

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


