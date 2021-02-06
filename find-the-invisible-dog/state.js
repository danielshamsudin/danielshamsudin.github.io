var check = setInterval(() => {
  if (isStart) {
    isSplash = true;
    state();
    clearInterval(check);
  }
}, 1000);

function state() {
  if (isSplash) {
    document.getElementById("loading").style.display = "none";
	console.log("none");
    document.getElementById("splash-text").innerHTML = "Ready?";
	console.log("white");

    setTimeout(() => {
      document.getElementById("splash-text").style.color = "black";
	  console.log("lightgreen");
      document.getElementById("splash-text").innerHTML = "Go!!!";
	  console.log("gogo");
      setTimeout(() => {
        splash.style.display = "none";
      }, 500);
       isSplash = false;
	   state();
    }, 500);
  } 
      isPlay = true;
      findobj();
}
