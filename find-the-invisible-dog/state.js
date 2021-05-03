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
	console.log("none");
	console.log("white");

    setTimeout(() => {
	  console.log("lightgreen");
	  console.log("gogo");

      getLoadingTimeEllapse(); //record time taken to load the game

        setTimeout(() => {
          splashScreen.style.display = "none";
          document.querySelector("#loading").style.display = "none";
          isLoaded = true; //ensures game starts after loading page ends
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
