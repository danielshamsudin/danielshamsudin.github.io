const video = document.querySelector("#video");

video.width = window.innerWidth;
video.height = window.innerHeight;
var canvas = document.querySelector("#canvas");
var c = canvas.getContext("2d");


//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
canvas.width = document.body.scrollWidth; //here
canvas.height = document.body.scrollHeight;

var canvas1 = document.querySelector("#canvas1");
var ctx1 = canvas1.getContext("2d");

let model;
let handX, handY;

//var w = window.innerWidth;
//var h = window.innerHeight;
var w = document.body.scrollWidth; // here
var h = document.body.scrollHeight;

var isStart = false;
var isSplash = false;
var isPlay = false;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);
document.getElementById("splash-text").innerHTML = "Dogs Come...";


