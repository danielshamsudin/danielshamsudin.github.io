var BGM = document.getElementById("BGM");
BGM.src = "backgroundsound.mp3";
BGM.volume = 0.2;

var titleImg = document.querySelector("#titleimg");
titleImg.src = "img/dog.png";

var catchImg = document.querySelector("#catchimg");
catchImg.src = "img/dog.png";
var catchAudio = new Audio("catch dog.mp3");
var catchNearby = new Audio("dog.mp3");

var trapImg = document.querySelector("#trapimg");
trapImg.src = "img/cat.png";
var trapAudio = new Audio("catch cat.mp3");
var trapNearby = new Audio("cat.mp3");

var winAudio = new Audio("win.mp3");
var loseAudio = new Audio("lose.mp3");
winAudio.volume = 0.2;
loseAudio.volume = 0.2;