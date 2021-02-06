var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
    console.log(this.responseText)

    let json =JSON.parse(this.responseText) 

    if(json)
    {
      let settings = json.data

      console.log(settings)

      for(var i=0;i<settings.length;i++)
      {
        let data = settings[i];

        if(data.type =="fixed_image")
        {
          let icon = data.data.images[0];

          let param_name = data.param_name;

          if(param_name =="player_icon")
          {
            player_icon=icon
          }

          if(param_name =="destination_icon")
          {
            destination_icon=icon
          }
      
          console.log("icon "+icon)



          // setPaddleColor(colors);

        }

      }


    }


  }
};
xhttp.open("GET", "https://fuyoh-ads.com/game_web/campaign_game/settings?activity_id=5", true);
xhttp.send();


let player_icon = "./img/unifi.jpg";
let destination_icon ="./img/tmcompany.jpg"; 


// function setPlayerIcon(icon){
//   player_icon
// }

// function setDestinationIcon(icon){
//   destination_icon
// }

//to record time taken
var startTime, endTime;

function start() {
  startTime = performance.now();
}

function end() {
  endTime = performance.now();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  return seconds;
}

//making the maze
class Maze {
  constructor(height, width, maze, walls, currentPosition) {
    this.height = height % 2 == 0 ? height + 1 : height;
    this.width = width % 2 == 0 ? width + 1 : width;
    this.maze = maze;
    this.walls = walls;
    this.currentPosition = currentPosition;

    // this is also set in the CSS under .block
    // this.blockHeight = 40;
    // this.blockWidth = 40;
  }

  createMaze() {
    let self = this;

    const mazeElement = document.getElementById("maze");

    mazeElement.innerHTML = "";
    // mazeElement.setAttribute('style', 'height:' + this.height * this.blockHeight + 'px; width:' + this.width * this.blockWidth + 'px');

    // fill the whole maze with walls
    for (var y = 0; y < this.height; y++) {
      this.maze[y] = [];
      for (var x = 0; x < this.width; this.maze[y][x++] = "wall") {
        var el = mazeElement.appendChild(document.createElement("div"));
        el.className = "block wall";
        el.setAttribute("id", y + "-" + x);
      }
    }

    this.amaze(this.currentPosition.y, this.currentPosition.x, true);

    while (this.walls.length != 0) {
      var randomWall = this.walls[
          Math.floor(Math.random() * this.walls.length)
        ],
        host = randomWall[2],
        opposite = [
          host[0] + (randomWall[0] - host[0]) * 2,
          host[1] + (randomWall[1] - host[1]) * 2,
        ];
      if (this.valid(opposite[0], opposite[1])) {
        if (this.maze[opposite[0]][opposite[1]] == "maze")
          this.walls.splice(this.walls.indexOf(randomWall), 1);
        else
          this.amaze(randomWall[0], randomWall[1], false),
            this.amaze(opposite[0], opposite[1], true);
      } else this.walls.splice(this.walls.indexOf(randomWall), 1);
    }

    document.getElementById("0-0").className = "block me";
    $("#0-0").css({ 'background-image' : 'url('+player_icon+')','background-size':"cover" });

    let destinationClass= parseInt(this.height) - 1 + "-" + (parseInt(this.width) - 1)
    document.getElementById(
      destinationClass
    ).className = "block finish";


    $("#"+destinationClass).css({ 'background-image' : 'url('+destination_icon+')','background-size':"cover" });
    // background-image: url("../img/tmcompany.jpg");

    document.body.onkeydown = function (e) {
      switch (e.keyCode) {
        case 38:
          self.moveUp();
          break;
        case 40:
          self.moveDown();
          break;
        case 39:
          self.moveRight();
          break;
        case 37:
          self.moveLeft();
          break;
      }
      // var newPosition = self.createNewPosition(e.keyCode);
      //self.movePlayer(self, self.currentPosition, newPosition);
    };
  }
  /**
   * Moves the player to a new position
   * Returns "True" if player was moved and "False" if failed (because of a wall)
   */
  movePlayer(maze, oldPosition, newPosition) {
    if (
      maze.valid(newPosition.y, newPosition.x) &&
      maze.maze[newPosition.y][newPosition.x] != "wall"
    ) {
      document
        .getElementById(oldPosition.y + "-" + oldPosition.x)
        .classList.remove("me");
      // update current position
      maze.currentPosition = newPosition;
      document
        .getElementById(newPosition.y + "-" + newPosition.x)
        .classList.add("me");
      if (maze.isFinished()) {
        clearTimeout(myVar);
        var totalSeconds = end();
        window.localStorage.setItem("totalSeconds", totalSeconds);
        swal(
          {
            title: "Good job!",
            text:
              "You finished the maze in " +
              totalSeconds +
              " seconds! Press 'The End' to see how the story ends!",
            type: "success",
            //   confirmButtonColor: "#DD6B55",
            confirmButtonText: "The End",
            closeOnConfirm: true,
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.href = "gameover.html";
              // maze.newGame();
              // window.location.href = "index.php";
            } else {
              window.location.href = "gameover.html";
            }
          }
        );
      }
      return true;
    } else {
      return false;
    }
  }
  //set player position to starting and make a new maze
  newGame() {
    document.getElementById("maze").innerHTML = "";
    this.walls = [];
    this.currentPosition = { x: 0, y: 0 };
    this.createMaze();
  }
  //set player position to starting using same maze
  restart() {
    if (this.isFinished()) {
      document.getElementById(
        parseInt(this.height) - 1 + "-" + (parseInt(this.width) - 1)
      ).className = "block finish";
    }
    this.movePlayer(this, this.currentPosition, { x: 0, y: 0 });
  }

  amaze(y, x, addBlockWalls) {
    let maze = this.maze;

    maze[y][x] = "maze";
    document.getElementById(y + "-" + x).className = "block";
    if (addBlockWalls && this.valid(y + 1, x) && this.maze[y + 1][x] == "wall")
      this.walls.push([y + 1, x, [y, x]]);
    if (addBlockWalls && this.valid(y - 1, x) && this.maze[y - 1][x] == "wall")
      this.walls.push([y - 1, x, [y, x]]);
    if (addBlockWalls && this.valid(y, x + 1) && this.maze[y][x + 1] == "wall")
      this.walls.push([y, x + 1, [y, x]]);
    if (addBlockWalls && this.valid(y, x - 1) && this.maze[y][x - 1] == "wall")
      this.walls.push([y, x - 1, [y, x]]);
  }

  valid(a, b) {
    return a < this.height && a >= 0 && b < this.width && b >= 0 ? true : false;
  }

  isFinished() {
    return (
      this.currentPosition.y == this.height - 1 &&
      this.currentPosition.x == this.width - 1
    );
  }
  /**
   *  control functions
   *  Returns "True" if player was moved and "False" if failed (because of a wall)
   */
  //to move the icon/circle
  moveDown() {
    const newPosition = {
      x: this.currentPosition.x,
      y: this.currentPosition.y + 1,
    };
    // const newPosition = this.createNewPosition('down');
    return this.movePlayer(this, this.currentPosition, newPosition);
  }
  moveUp() {
    const newPosition = {
      x: this.currentPosition.x,
      y: this.currentPosition.y - 1,
    };
    // const newPosition = this.createNewPosition('down');
    return this.movePlayer(this, this.currentPosition, newPosition);
  }
  moveRight() {
    const newPosition = {
      x: this.currentPosition.x + 1,
      y: this.currentPosition.y,
    };
    // const newPosition = this.createNewPosition('down');
    return this.movePlayer(this, this.currentPosition, newPosition);
  }
  moveLeft() {
    const newPosition = {
      x: this.currentPosition.x - 1,
      y: this.currentPosition.y,
    };
    // const newPosition = this.createNewPosition('down');
    return this.movePlayer(this, this.currentPosition, newPosition);
  }
}

//creating maze base on difficulty and then set the maze size

let maze;

function createMaze(size) {
  let mazeWidth = 5;
  let mazeHeight = 5;

  const mazeElement = document.getElementById("maze");

  switch (size) {
    case "small":
      mazeWidth = 5;
      mazeHeight = 5;
      mazeElement.className = "small-maze";
      break;
    case "medium":
      mazeWidth = 9;
      mazeHeight = 9;
      mazeElement.className = "medium-maze";
      break;

    default:
      mazeWidth = 5;
      mazeHeight = 5;
      mazeElement.className = "small-maze";
      break;
  }

  let startPosition = { x: 0, y: 0 };

  let maze = new Maze(mazeHeight, mazeWidth, [], [], startPosition);
  maze.createMaze();

  return maze;
}
