const video = document.querySelector("#video");

video.width = window.innerWidth;
video.height = window.innerHeight;
var canvas = document.querySelector("#canvas");
canvas.setAttribute('width', '640');
canvas.setAttribute('height', '480');
var c = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
//canvas.width = document.body.scrollWidth;
//canvas.height = document.body.scrollHeight;

var vcanvas = document.querySelector("#vcanvas");
vcanvas.setAttribute('width', '640');
vcanvas.setAttribute('height', '480');
var vctx = vcanvas.getContext("2d");

let model;
let handX, handY;

//var w = window.innerWidth;
//var h = window.innerHeight;
var w = canvas.width; // here
var h = canvas.height;

var isStart = false;
var isSplash = false;
var isPlay = false;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);
document.getElementById("splash-text").innerHTML = "Dogs Come...";


