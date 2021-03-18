const video = document.querySelector("#video");
var ccontainer = document.querySelector(".container-item4"); //play region container
var vcontainer = document.querySelector(".container-item3"); //video canvas container
video.width = window.innerWidth;
video.height = window.innerHeight;

<<<<<<< HEAD
var canvas = document.querySelector("#canvas");

canvas.setAttribute('width', ccontainer.scrollWidth);
canvas.setAttribute('height', ccontainer.scrollHeight);

=======
var ellipse = document.getElementById("ellipse");
//window.scrollY + document.querySelector('#elementId'). // Y
//window.scrollX + document.querySelector('#elementId'). // X

var canvas = document.querySelector("#canvas");
canvas.setAttribute('width', ccontainer.scrollWidth);
canvas.setAttribute('height', ccontainer.scrollHeight);
>>>>>>> origin/mw_dev
var c = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
//canvas.width = document.body.scrollWidth;
//canvas.height = document.body.scrollHeight;

var vcanvas = document.querySelector("#vcanvas");
vcanvas.setAttribute('width', vcontainer.scrollWidth);
vcanvas.setAttribute('height', vcontainer.scrollHeight);
var vctx = vcanvas.getContext("2d");

//document.getElementById("dogcenter").src = "img/dog.png";
//document.getElementById("catcenter").src = "img/cat.png";
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


