


// select Canvas element
const cvs = document.getElementById('breakout');
const ctx = cvs.getContext('2d');
cvs.width = 500;
cvs.height = 600;
//Loob bg image
const MAIN_IMG = new Image();
MAIN_IMG.src = "img/mainMenu.jpg";

const LIFEFALL_IMG = new Image();
LIFEFALL_IMG.src = "img/lifefall.png";

const BG_IMG = new Image();
BG_IMG.src = "img/bg.jpg";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.png";

//LOAD SOUND
const WALL_HIT = new Audio();
WALL_HIT.src = "sound/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "sound/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sound/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "sound/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "sound/brick_hit.mp3";

//show you win
function showYouWin()
{
    // gameover.style.display = "block";
    // youwon.style.display = "block"; 
    document.querySelector("#youwon").style.display = "block";
    document.querySelector("#win").style.display = "block";
}

//show you lose
function showYouLose()
{
    //gameover.style.display = "block";
    //youlose.style.display = "block";
    document.querySelector("#youwon").style.display = "block";
    document.querySelector("#lose").style.display = "block";
}

//reset game
function resetGame()
{
    document.querySelector("#youwon").style.display = "none";

    createBricks();

    drawBricks();

    paddle.x = cvs.width / 2 - PADDLE_WIDTH /2;
    paddle.y = cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;

    LEVEL = 1;

    LIFE = 3;

    SCORE = 0;

    GAME_OVER = false;
   
}
// ADD BORDER TO CANVAS
cvs.style.border = "5px solid #0ff";



// make line thik when drawing to canvas
ctx.lineWidth = 3;

//GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH  = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
const SCORE_UNIT = 10;
const MAX_LEVEL = 5;
let START = false;
let GAME_OVER = false;
let LEVEL = 1;
let SCORE = 0;
let LIFE = 3; // life
let leftArrow = false;
let rightArrow = false;

let createScore = false;

// create the paddle
const paddle = 
{
    x : cvs.width / 2 - PADDLE_WIDTH /2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx : 5
}

// draw paddle
function drawPaddle()
{
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}

// control paddle
document.addEventListener("keydown", function(event)
{
    if(event.keyCode == 37)
    {
        leftArrow = true;
    }
    else if(event.keyCode == 39)
    {
        rightArrow = true;
    }

});
document.addEventListener("keyup", function(event)
{
    if(event.keyCode == 37)
    {
        leftArrow = false;
    }
    else if(event.keyCode == 39)
    {
        rightArrow = false;
    }
    
});


window.addEventListener("devicemotion",function(event){
    if(this.window.innerHeight > this.window.innerWidth){
     var x = event.accelerationIncludingGravity.x *3;
 
     if(x > 2 && paddle.x > 0)
     {
         paddle.x -= paddle.dx;
     }
     if(x < -2 && paddle.x + paddle.width < cvs.width)
     {
         paddle.x += paddle.dx;
     }
  
     {
 
     }
     }
     else if(this.window.innerWidth > this.window.innerHeight)
     {
     var  y = event.accelerationIncludingGravity.y *3;
 
     if(y > -2 && paddle.x + paddle.width < cvs.width)
     {
         paddle.x += paddle.dx;
     }
     if(y < 2 && paddle.x > 0 )
     {
         paddle.x -= paddle.dx;
     }
    }
 });

//reset game
function backToMenu(){
    window.addEventListener('devicemotion', shakeEventHandler, false);
    }
  
   var THRESHOLD = 1000;
   var preX = preY = preZ = x = y = z = 0;
   var preTime = 0;  
   
   function shakeEventHandler(event) {
       var acceleration = event.accelerationIncludingGravity; 
       var curTime = new Date().getTime();
       var diffTime = curTime-preTime;
   
       if (diffTime > 100) { 
           preTime = curTime;  
           x = acceleration.x;  
           y = acceleration.y;  
           z = acceleration.z;  
   
           var accelerationDiff = Math.abs(x + y + z - preX - preY - preZ) / diffTime * 10000;  
   
           if (accelerationDiff > THRESHOLD) {  
               location.href = "selectgamepage.php";
           }  
           preX = x;  
           preY = y;  
           preZ = z;  
       }  
   }

function start()
{   
    START = true;  
}


// move paddle
function movePaddle()
{
    if(rightArrow && paddle.x + paddle.width < cvs.width)
    {  
        paddle.x += paddle.dx;
    }
    else if(leftArrow && paddle.x > 0)
    {
        paddle.x -= paddle.dx;
    }
}

// create ball
let ball ={

    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 5,
    dx : 3 * (Math.random()*2-1),
    dy : -5,
    newX : cvs.width / 2,
    newY : paddle.y - BALL_RADIUS,
    x : cvs.width / 2,
}
//draw the ball
function drawBall()
{
    ctx.beginPath();

    ctx.arc( ball.x, ball.y, ball.radius, 0, Math.PI *2)
    ctx.fillStyle = "#ffcd05";
    ctx.fill();

    ctx.strokeStyle = "#2e3548";
    ctx.stroke();

    ctx.closePath();
}

//MOVE THE BALL
function moveBall()
{
    if(START === true)
    {
        createScore = true;
        ball.newX = ball.x + ball.dx;
        ball.newY = ball.y + ball.dy;
    }
}

//create the bricks
const brick = {
    row : 4,
    column : 6,
    width : 55,
    height : 20,
    offSetLeft : 25,
    offSetTop : 20,
    marginTop : 40,
    fillColor : "#2e3548",
    strokeColor : "#FFF"
}

const life = 
{   
    row: brick.row,
    column : brick.column,
    dy : 3,
    width : 30,
    height : 30,
}


let bricks = [];

function createBricks()
{
    for(let r=0; r<brick.row; r++)
    {
        bricks[r] = []; 
        for(let c=0; c < brick.column; c++)
        {
            bricks[r][c] = {
                x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status : true,
                fall : false,
            }
            
        }
    }
}

createBricks();

//draw brick
function drawBricks()
{
    for(let r=0; r<brick.row; r++)
    {
        for(let c=0; c < brick.column; c++)
        {
            let b = bricks[r][c];
            //if the brick isn't broken
            if(bricks[r][c].status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);

                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect( b.x, b.y, brick.width, brick.height);
            }
            
        }
    }
}

//life fall
function createLife()
{
    for(let r=0; r<brick.row; r++)
    {
        bricks[r] = []; 
        for(let c=0; c < brick.column; c++)
        {
            bricks[r][c] = {
                x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status : true,
                fall : false,
            }
            
        }
    }
}

createLife();

//ball brick colision
function ballBrickCollision()
{
    for(let r=0; r<brick.row; r++)
    {
        for(let c=0; c < brick.column; c++)
        {
            let p = Math.random().toFixed(2);
            let b = bricks[r][c];
            //if the brick isn't broken
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width &&
                    ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height)
                    {
                        BRICK_HIT.play();
                        ball.dy = -ball.dy;
                        b.status = false;
                        SCORE +=  SCORE_UNIT;
                        if(p >= 0.8 && LIFE <= 5 && b.fall === false)
                        {
                            b.fall = true;
                            drawLifes();
                        }
                    }
            }
        
        }
    }
    return SCORE;
}


//drawlife
function drawLifes()
{
    for(let r=0; r<life.row; r++)
    {
        for(let c=0; c < life.column; c++)
        {
             let l = bricks[r][c];
            //if the brick isn't broken
            if(l.fall === true){
                ctx.drawImage(LIFEFALL_IMG, l.x, l.y, life.width, life.height);
                moveLife(l);
                lifePaddleCollision(l);
            }
            
        }
    }
}

function lifePaddleCollision(l)
{
    if(l.y + life.height >= paddle.y && l.x <= paddle.x + paddle.width && l.x + life.width >= paddle.x)
                {
                    l.fall = false;
                    LIFE++;
                }
                else if(l.y + life.height> cvs.height )
                {
                    l.fall = false;
                }
}



function moveLife(l)
{
    l.y += life.dy;
}

//life wall collision

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY)
{
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);

    //draw image
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);

}

//draw function
function draw()
{

    drawLifes();

    drawPaddle();

    drawBall();

    drawBricks();

    //show score
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);

    //show life
    showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width-55, 5);


    //show level
    showGameStats(LEVEL, cvs.width/2, 25, LEVEL_IMG, cvs.width/2 - 30, 5);
    
}




//ball and wall colission detection
function ballWallCollision()
{
    if( ball.newX < ball.radius)
    {
        ball.x = ball.radius;
        ball.dx = -ball.dx;
        WALL_HIT.play();
    }
    
    else if(ball.newX > cvs.width - ball.radius)
    {
        ball.x = cvs.width - ball.radius;
        ball.dx = -ball.dx;
        WALL_HIT.play();
    } 
    else if(ball.newY < ball.radius)
    {
        ball.dy = -ball.dy;
        WALL_HIT.play();
    }

    else if(ball.y + ball.radius > cvs.height)
    {
        LIFE_LOST.play();
        LIFE = LIFE - 1; //LOSE LIFE
        resetBall();
        START = false;
    }
    else
    {
        ball.x = ball.newX;
        ball.y = ball.newY;
    }
}

//reset the ball
function resetBall()
{
    ball.x = cvs.width / 2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random()*2-1);
    ball.dy = -4;
    ball.speed = 4;
    ball.newX = cvs.width / 2;
    ball.newY = paddle.y - BALL_RADIUS;
    paddle.x = cvs.width / 2 - PADDLE_WIDTH /2;
    paddle.y = cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;
}

//BALL AND PADDLE COLLISION
function ballPaddleCollision()
{
    if(ball.x - ball.radius < paddle.x + paddle.width && ball.x + ball.radius > paddle.x && ball.y + ball.radius > paddle.y)
    {

        // check where the ball hit the paddle
        let collidePoint = ball.x - (paddle.x + paddle.width/2);

        // /normalize the values
        collidePoint = collidePoint / (paddle.width/2);

        //calculate the angle of the ball
        let angle = collidePoint * Math.PI / 3;

        ball.dx = (ball.speed * Math.sin(angle));
        ball.dy = (-ball.speed * Math.cos(angle));
    }
}
//game over
function gameOver(score)
{
    if(LIFE <= 0)
    {   
        storeData(score);
        showYouLose();
        GAME_OVER = true;

        if(createScore ==true)
        {   
            storeScore(score);
            
        }
        
    }
}

function storeScore(score)
{
    createScore =false
    window.parent.wsCreateScore(score)
}


//level up function
function levelUp(score)
{
    let isLevelDone = true;


    //check if all the bricks are broken
    for(let r=0; r<brick.row; r++)
    {
        for(let c=0; c < brick.column; c++)
        {
            isLevelDone = isLevelDone && ! bricks[r][c].status;
            
        
        }
    }
    if(isLevelDone){
        WIN.play();
        if(LEVEL >= MAX_LEVEL)
        {
            storeData(score);
            showYouWin();
            GAME_OVER = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 1;
        resetBall();
        LEVEL++;
    }
}


//update function
function update()
{
    if(!GAME_OVER){
    movePaddle();

    moveBall();
    }
    ballWallCollision();

    ballPaddleCollision();

    score = ballBrickCollision();

    gameOver(score);

    levelUp(score);

}



//game loop
function loop()
{
 
    ctx.drawImage(BG_IMG, 0, 0, cvs.width, cvs.height);
    update();
    draw();
    

    
    requestAnimationFrame(loop);
}

//database
function storeData(score)
{ 
    // console.log("at here")
    // $.ajax({
    //     type:"POST",
    //     url:"score.php",
    //     data:{name: score}
    //   });
 }



loop();


function wsGameService(type,callback){
	console.log(type)

	let data ={}
   
	switch(type) {
		case "end_game":
			data.score =score;
			callback(data);
			break;
		default:
			alert("invalid request")
	}
 
}