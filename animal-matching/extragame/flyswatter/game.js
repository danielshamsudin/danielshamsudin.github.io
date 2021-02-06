var height = 0;
var width = 0;
var lives = 1;
var time = 10;

var createFlyTime = 1500;

var level = window.location.search;
level = level.replace("?", "");

if (level === "normal") {
  //1500
  var createFlyTime = 1500;
} else if (level === "hard") {
  //1000
  var createFlyTime = 1000;
} else if (level === "extreme") {
  //750
  var createFlyTime = 750;
}

function ajuste() {
  height = window.innerHeight;
  width = window.innerWidth;

  console.log(width, height);
}

ajuste();

var timer = setInterval(function() {
  time -= 1;

  if (time < 0) {
    clearInterval(timer);
    clearInterval(createFly);
    window.location.href = "winner.html";
  } else {
    document.getElementById("timer").innerHTML = time;
  }
}, 1000);

function randomposition() {
  //remove the already existing fly

  if (document.getElementById("fly")) {
    document.getElementById("fly").remove();

    if (lives > 3) {
      window.location.href = "game_over.html";
    } else {
      document.getElementById("v" + lives).src = "imagens/diamond_empty.png";
      lives++;
    }
  }

  var positionx = Math.floor(Math.random() * width) - 90;
  var positiony = Math.floor(Math.random() * height) - 90;

  positionx = positionx < 0 ? 0 : positionx;
  positiony = positiony < 0 ? 0 : positiony;

  console.log(positionx, positiony);

  //create html element

  var fly = document.createElement("img");
  fly.src = "imagens/fly.png";
  fly.className = randomsize() + " " + randomface();
  fly.style.left = positionx + "px";
  fly.style.top = positiony + "px";
  fly.style.position = "absolute";
  fly.id = "fly";
  fly.onclick = function() {
    this.remove();
  };

  document.body.appendChild(fly);
}

function randomsize() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "fly1";
    case 1:
      return "fly2";
    case 2:
      return "fly3";
  }
}

function randomface() {
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "faceA";
    case 1:
      return "faceB";
  }
}
