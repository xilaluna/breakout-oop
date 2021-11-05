// DOM references
// eslint-disable-next-line max-classes-per-file
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Constants
const ballRadius = 10;
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
const paddleHeight = 10;
const paddleWidth = 75;
const color = '#0095DD';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const paddleXStart = (canvas.width - paddleWidth) / 2;
const piTwo = Math.PI * 2;

// Variables
let paddleX;

let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

// Classes
class Ball {
  constructor(x = 0, y = 0, dx = 0, dy = 0, radius = ballRadius, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, piTwo);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const ball = new Ball();
resetBallAndPaddle();

initBricks();

// Functions
function initBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      const x = (brickWidth + brickPadding) * r + brickOffsetLeft;
      const y = (brickHeight + brickPadding) * c + brickOffsetTop;
      bricks[c][r] = new Brick(x, y, brickWidth, brickHeight, color);
    }
  }
}

function resetBallAndPaddle() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddleX = paddleXStart;
}

function keyDownHandler(e) {
  if (e.code === ARROW_RIGHT) {
    rightPressed = true;
  } else if (e.code === ARROW_LEFT) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.code === ARROW_RIGHT) {
    rightPressed = false;
  } else if (e.code === ARROW_LEFT) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        brick.render(ctx);
      }
    }
  }
}
function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = color;
  ctx.fillText(`Score: ${score}`, 8, 20);
}
function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = color;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + brickWidth &&
          ball.y > brick.y &&
          ball.y < brick.y + brickHeight
        ) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function collisionWithCanvas() {
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        resetBallAndPaddle();
      }
    }
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function checkKeys() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.render(ctx);
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  collisionWithCanvas();
  moveBall();
  checkKeys();
  requestAnimationFrame(draw);
}

function init() {
  // Event listeners
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  document.addEventListener('mousemove', mouseMoveHandler, false);

  // Start game loop
  draw();
}

init();
