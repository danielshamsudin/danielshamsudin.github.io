var check = setInterval(() => {
  if (isStart) {
    isSplash = true;
    state();
    clearInterval(check);
  }
}, 1000);

var loadingStartTime = performance.now(), loadingEndTime, loadingTimeEllapse, loadingMin, loadingSec;

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

      getLoadingTimeEllapse(); //record time taken to load the game

      setTimeout(() => {
        splash.style.display = "none";
      }, 500);
       isSplash = false;
	   state();
    }, 500);
  } 
  isPlay = true;
  // findobj();
}

//Record loading time
function getLoadingTimeEllapse() {
    loadingEndTime = performance.now();
    loadingTimeEllapse = Math.round((loadingEndTime - loadingStartTime) / 1000);

    loadingMin = Math.floor(loadingTimeEllapse / 60);
    loadingSec = Math.floor(loadingTimeEllapse - (loadingMin * 60));

    if (loadingMin < 10) {
        loadingMin = "0" + loadingMin;
    }
    if (loadingSec < 10) {
        loadingSec = "0" + loadingSec;
    }
    loadingTimeEllapse = loadingMin + ":" + loadingSec;
    console.log("Loading Time Ellapsed : " + loadingTimeEllapse);
}
