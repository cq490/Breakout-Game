var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var height = document.getElementById("myCanvas").getAttribute("height");
var width = document.getElementById("myCanvas").getAttribute("width");

var ballRadius = 10;
var x = width/2;
var y = height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

function createBricks() {
  var brics = [];
  for (c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (r=0; r<brickRowCount; r++) {
      brics[c][r] = { x: 0, y: 0};
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function initializeGame() {
    clear();
    x = width/2;
    y = height - 30;
    dx = 4;
    dy = -4;
    paddleX = (width - paddleWidth)/2;
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } 
  else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } 
  else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

/*function drawBricks() {
  for (c=0; c<brickColumnCount; c++) {
    for (r=0; r<brickRowCount; r++) {
      var brickX = (c*(brickWidth + brickPadding) + brickOffsetLeft);
      var brickY = (r*(brickHeight + brickPadding) + brickOffsetTop);
      bricks[c][r].x = brickX;
      bricks[c][r].y =brickY;
      ctx.beginPath();
      ctx.rect(0, 0, brickWidth, brickHeight);
      ctx.fillStyle("#0095DD");
      ctx.fill();
      ctx.closePath();
    }
  }
}*/

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

}

function paddleMove() {
  if (rightPressed && ((paddleWidth + paddleX) < width)) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0 ) {
    paddleX -= 7;
  }
}

function drawGameOver() {
  ctx.beginPath();
  ctx.font = "30px Roboto Slab";
  ctx.fillStyle = "0095DD"
  ctx.fillText("Game Over!", 180, 120);
}

function gameOver() {
  alert("Game Over!");
  document.location.reload();
}

createBricks();

function draw() {
  clear();
  if ((x>paddleX) && (x<paddleX+paddleWidth) && (y + dy + ballRadius> height)) {
    dy = -dy;
  } else if (y + dy + ballRadius> height) {
    drawGameOver();
    setInterval(gameOver, 2000);
  }
  if (y + dy < ballRadius ) {
    dy = -dy;
  }
  if ( x + dx + ballRadius > width || x + dx < ballRadius) {
    dx = -dx;
  }

  drawBall();
  drawPaddle();

  paddleMove();
  x += dx;
  y += dy;

}

setInterval(draw, 10);