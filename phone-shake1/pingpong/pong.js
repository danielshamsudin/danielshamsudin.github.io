// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

// load sounds
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}
let mainMenu = true;
let gameOver = false;
let gameEnd = 6;
// User Paddle
const user = {
    x : 10, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE",
    dy: 8
}

// COM Paddle
const com = {
    x : canvas.width - 20, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

function begin()
{
    mainMenu = false;
    startTimer();
}

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// listening to the mouse
window.addEventListener("devicemotion", movePaddle)

function movePaddle(evt)
{   
    if(window.innerWidth >= window.innerHeight)
    {
        var y = evt.accelerationIncludingGravity.y *3;

    if(y > -2 && user.y + user.height <= canvas.height)
     {
         user.y += user.dy;
     }
     if(y < 2 && user.y > 0 )
     {
         user.y -= user.dy;
     }
    }
    else
    {
        alert ("Please make sure you opened auto-rotate function and turn your device in landscape mode for best experience.");
    }
    
}

canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// when COM or USER scores, we reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
    ball.speed = 7;
}

// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update function, the function that does all calculations
function update(){
    
    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    
        
    

    

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // computer plays for itself, and we must be able to beat it
    // simple AI
    com.y += ((ball.y - (com.y + com.height/2)))*0.05;
    
    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius <= ball.radius || ball.y + ball.radius >= canvas.height - ball.radius){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
  
    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    // if the ball hits a paddle
    if(collision(ball,player)){
        // play sound
        hit.play();
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
        
        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the b all to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
        
        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.5;
    }
}

function gameover()
{
    drawRect(0, 0, canvas.width, canvas.height, "black ");
}

function gameMenu()
{
    if(mainMenu===true)
    {
        drawRect( 0, 0, 600, 400, "white")
    }
}

function storeData(score)
{
    $.ajax({
        type:"POST",
        url:"scorepp.php",
        data:
        {name : score}
    })
}

// render function, the function that does al the drawing
function render(){
    if (gameOver === true)
    {
        document.querySelector("#restart").style.display = "flex";
        drawRect( 0, 0, 600, 400, "black");
        ctx.beginPath();
        // ctx.globalAlpha = 0.8;
        ctx.font = "30px Germania One";
        ctx.fillStyle = "white";
        ctx.fillText("Time Out!!!" , 235, 50);
        ctx.fillText( "User Score", 50, 80)
        ctx.fillText( user.score, 100, 120);
        ctx.fillText( "AI Score", 450, 80);
        ctx.fillText( com.score, 500, 120);
        ctx.closePath();
    }

    else if(mainMenu === false && gameOver === false){
        
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // draw the user score to the left
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // draw the COM score to the right
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
    }
    
    else if(mainMenu === true || gameOver === true)
    {
        drawRect( 0, 0, 600, 400, "black");
        ctx.beginPath();
        // ctx.globalAlpha = 0.8;
        ctx.font = "30px Germania One";
        ctx.fillStyle = "white";
        ctx.fillText("Click / Touch To Start" , 180, 350);
        ctx.closePath();
    }
}

//timer

let min = 5;
let sec = 0;
function timer()
{   
    if(min >= 0 )
    {
        if(sec == 0)
        {
            sec = 60;
            min = min - 1;
        }
        else if(sec >= 0)
        {
            sec--;
        
            idsec = document.getElementById("sec");
            idsec.innerHTML = sec;

            idmin = document.getElementById("min");
            idmin.innerHTML = min;
        }
    }
    else
    {
        gameOver = true;
        storeData(user.score, com.score);
    }
}   

function startTimer()
{
    if(gameOver == false && mainMenu== false)
    {
    setInterval(timer, 1000);
    }
}

function resetPaddle()
    {
        user.x = 10;
        user.y = (canvas.height - 100)/2;
        
        com.x = canvas.width - 20;
        com.y = (canvas.height - 100)/2;
    }
function resetScore()
{
    user.score = 0;
    com.score = 0;
}
function resetGame()
{
    document.querySelector("#restart").style.display = "none";
    resetBall();
    resetPaddle();
    resetScore();
    gameOver = false;
    min = 5;
    sec = 0;
}
function game(){
    if(gameOver == false && mainMenu == false){
    update();
    }
    render();

    requestAnimationFrame(game);
}


// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
game();

