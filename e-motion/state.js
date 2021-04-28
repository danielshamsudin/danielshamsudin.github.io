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
    document.getElementById("splash-text").innerHTML = "Ready?";
    c.fillStyle = "red";
    c.fillRect(0, 0, canvas.width, canvas.height);

    setTimeout(() => {
      document.getElementById("splash-text").innerHTML = "Set...";
      c.fillStyle = "yellow";
      c.fillRect(0, 0, canvas.width, canvas.height);
    }, 1000);

    setTimeout(() => {
      splash.style.backgroundColor = "rgb(0, 0, 0, 0)";
      document.getElementById("splash-text").style.color = "lightgreen";
      document.getElementById("splash-text").innerHTML = "Go!!!";
      setTimeout(() => {
        splash.style.display = "none";
      }, 1000);
      isSplash = false;
      isPlay = true;
      state();
    }, 2000);
  }
  else if (isPlay) {
    document.getElementById("timer-con").style.display = "block";
    document.getElementById("timer").innerHTML = mm + " : " + ss;
    document.getElementById("points").style.display = "block";
    document.getElementById("speed").style.display = "block";
    document.getElementById("status").style.display = "block";
    play();
  }
  else if (isEnd) {
    setTimeout(() => {
      var playername = null;
      /*   
        var playername = prompt(
        "Your Score is: " +
          point +
          ". Please enter your name to store it into database.",
        "Player"
      ); 
      */
      if (!playername) {
        playername = "Player";
      }
      console.log(
        "Data to be stored into database: " + playername + ", " + point
      );
      console.log("it's new i insert liao");
      
      console.log("padColor");
      var padColor = localStorage.getItem("pass");
      console.log(padColor);

      
      let data ={"padColor":padColor};
      console.log(data);

      window.parent.wsCreateScore(point,data);
      window.location.href = "./scoreboard.php";
      /*   $.ajax({
        type: "POST",
        url: "pass.php",
        data: {
          playername: playername,
          point: point,
          longCount: longCount,
          shortCount: shortCount,
          boomCount: boomCount,
          id1: img1count,
          id2: img2count,
          id3: img3count,
          id4: img4count,
          id5: img5count,
        },
        success: (window.location.href = "./scoreboard.php"),
      }); */

      //location.href = "./scoreboard.php";
    }, 2000);
  }
}

function play() {
    isDrop = true;
    _bgm.volume = 0.3;
    _bgm.loop = true;
    _bgm.play();

    var x = setInterval(() => {
        //console.log(mm, ss);
        mm = parseInt(mm);
        ss = parseInt(ss);
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;

        if (isLoaded) {
            document.getElementById("timer").innerHTML = mm + " : " + ss;
            ss--;
            if (mm != 0 && ss < 0) {
                mm--;
                ss = 59;
            }
            else if (mm == 00 && ss == -1) {
                isDrop = false;
                document.getElementById("timer").innerHTML = "Time's Up!";
                c.fillStyle = "white";
                c.fillRect(0, 0, canvas.width, canvas.height);
                clearInterval(x);
                isPlay = false;
                isEnd = true;
                state();
            }
        }
    }, 1000);
  update();
}
