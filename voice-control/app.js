var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// var commands = ['right', 'left', 'up', 'down', 'restart','new game'];
var commands = ["right", "left", "up", "down"];
// var grammar =
//   "#JSGF V1.0; grammar commands; public <command> = " +
//   commands.join(" | ") +
//   " ;";
  var grammar = '#JSGF V1.0; grammar colors; public  = aqua | azure | beige | bisque | black | [LOTS MORE COLOURS] ;'


var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

var countdownToLobby; 
// navigator.permissions.query({name: "microphone"})
// .then(({state}) => {
//   console.log(state)
//   clearInterval(countdownToLobby);

//   if(state!="granted")
//   {
//     window.parent.wsRequireHardwareMessage("microphone");

//     countdownToLobby= setInterval(runRedirectToLobby, 100000);
//   }
  

// },
//   e => {
//     console.log(e.name +": "+ e.message)
//   });


  navigator.getUserMedia(
    { audio: true },
    (stream) => {
      console.log("at jere");
      console.log(stream);
      //run
      console.log(status);
 
      //runDetection();
    },
    (err) => {
      console.log(err)

      window.parent.wsRequireHardwareMessage("microphone");

      // console.log("start count down to lobby")
      // countdownToLobby= setInterval(runRedirectToLobby, 100000);
    }
  );



function runRedirectToLobby() {
  location.href = "https://fuyoh-ads.com/campaign_web/#/game";
}


var diagnostic = document.querySelector(".output");
var bg = document.querySelector("html");

// var commandsList = document.querySelector('.commands-list');
var speakBtn = document.querySelector(".btn-speak");
var stopGameBtn = document.querySelector(".stop-game-btn");
var mic = document.querySelector(".mic");

var commandsHTML = "";
commands.forEach(function (v, i, a) {
  // console.log(v, i);
  // commandsHTML += '<span> ' + v + ' </span>';
  commandsHTML += " " + v + " ";
});

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a command.');
// }

speakBtn.onclick = function () {
  startRecognition();
};

stopGameBtn.onclick = function () {
  stopRecognition();
};

$(document).ready(function () {
  var mazeSizeButtons = $(".maze-size-buttons");
  var btnMazeSelect = $(".btn-maze-size-select");

  btnMazeSelect.on("click", function () {
    mazeSizeButtons.toggleClass("show");
  });

  $(".logo").on("click", function () {
    location.reload();
  });

  $(".btn-maze-size").on("click", function () {
    var size = $(this).data("size");
    updateBtnMazeSizeSelect(size);
    maze = createMaze(size);
  });

  $(".btn-info").on("click", function () {
    swal({
      title: "Info",
      text:
        '<div style="text-align:left">' +
        $(".info-text").html() +
        "<br><br>\
      <strong>Credits To : </strong><br>Developer:Dima Vishnevetsky \
      <br> Designer : Jamil Jadon<br> <br>Modified by : Yeo and Vivian</div>",
      html: true,
    });
  });

  /**
   * Creating the maze
   */
  updateBtnMazeSizeSelect("medium");
  maze = createMaze("easy");

  /**
   * UI buttons events
   */
  //once click on button will move according to arrow
  $(".btn-down").on("click", function () {
    maze.moveDown();
  });
  $(".btn-up").on("click", function () {
    maze.moveUp();
  });
  $(".btn-right").on("click", function () {
    maze.moveRight();
  });
  $(".btn-left").on("click", function () {
    maze.moveLeft();
  });

  $(".btn-new-game").on("click", function () {
    maze.newGame();
  });

  $(".btn-intro-start").on("click", function () {
    $(".intro-screen").hide();
    maze.newGame();
  });

  $(".btn-restart").on("click", function () {
    maze.restart();
  });
});

//select the maze difficulty
function updateBtnMazeSizeSelect(size) {
  $(".btn-maze-size-select")
    .removeClass("icon-small-maze icon-medium-maze")
    .addClass("icon-" + size + "-maze");
}

//stop listening to voice
function stopRecognition() {
  recognition.stop();
  console.log("Recognition stopped.");
  mic.classList.remove("listening");
}
//start listening to voice
function startRecognition() {
  recognition.start();
  console.log("Ready to receive a command.");
  mic.classList.add("listening");
}

// recognition.start();
// console.log('Ready to receive a command.');

recognition.onresult = function (event) {
  stopRecognition();

  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  var confidence = event.results[0][0].confidence;

  // bg.style.backgroundColor = command;
  console.log("command: " + command + " ,confidence: " + confidence);

  if (confidence > 0.4) {
    // first we check if the user asked to restart or play a new game

    if (command.indexOf("restart") >= 0) {
      swal.close();
      maze.restart();
    }
    if (command.indexOf("new game") >= 0) {
      swal.close();
      maze.newGame();
    }
    // TODO: need to color the commands

    // because a command can contain multiple words
    // we need to split it.
    let words = command.split(" ");
    const commandsFromWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (commands.indexOf(word) >= 0) {
        // add word to valid commands
        commandsFromWords.push(word);

        // wrap the command for highlighting
        words[i] =
          '<span class="command" id="com-' +
          (commandsFromWords.length - 1) +
          '">' +
          word +
          "</span>";
        // return;
      }
    }

    // convert back to string
    command = words.join(" ");

    diagnostic.innerHTML = "Result received: " + command + ".";

    executeVoiceCommands(commandsFromWords);
  } else {
    diagnostic.textContent = "Not sure that I understand your command.";
  }
};

function executeVoiceCommands(commands) {
  var delay = 300;

  var i = 0;
  var id = window.setInterval(function () {
    if (i >= commands.length) {
      clearInterval(id);
      // restart recognition again
      startRecognition();
      return;
    }

    doCommand(commands[i], i);

    console.log(
      "Executing command: " +
        commands[i] +
        " (" +
        i +
        " / " +
        commands.length +
        ")"
    );
    i++;
  }, delay);

  // for (i in commands) {
  //   doCommand(commands[i]);
  // }
}

function doCommand(command, index) {
  // commandsList.innerHTML += '<li>' + command + '</li>';

  let executed = false;
  // this might not be the correct place to call maze
  switch (command) {
    case "up":
      executed = maze.moveUp();
      break;
    case "down":
      executed = maze.moveDown();
      break;
    case "right":
      executed = maze.moveRight();
      break;
    case "left":
      executed = maze.moveLeft();
      break;
    // case 'new':
    //   maze.newGame();
    //   break;
    // case 'restart':
    //   maze.restart();
    //   break;
  }

  // Color the commands in user input
  if (executed) {
    document.getElementById("com-" + index).classList.add("done");
  } else {
    document.getElementById("com-" + index).classList.add("fail");
  }
}

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
  stopRecognition();
};

recognition.onerror = function (event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;

  mic.classList.remove("listening");
  startRecognition();
};

// recognition.onend = function(){
//   console.info("voice recognition ended, restarting...");
//     recognition.start();
// }
