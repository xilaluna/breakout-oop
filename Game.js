class Game {
  constructor() {
    this.ball = new Ball();
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, color);
    this.scoreLabel = new GameLabel('Score: ', 8, 20, color);
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20, color);
    this.rightPressed = false;
    this.leftPressed = false;
    this.setup();
    this.draw();
  }

  setup() {
    this.livesLabel.value = 3;
    this.resetBallAndPaddle();
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }

  resetBallAndPaddle() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x &&
            this.ball.x < brick.x + brickWidth &&
            this.ball.y > brick.y &&
            this.ball.y < brick.y + brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.rows * this.bricks.cols) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  checkKeys() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionWithCanvas() {
    if (
      this.ball.x + this.ball.dx > canvas.width - this.ball.radius ||
      this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + paddleWidth) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLabel.value -= 1;
        if (this.livesLabel.value < 1) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.resetBallAndPaddle();
        }
      }
    }
  }

  keyDownHandler(e) {
    if (e.code === ARROW_RIGHT) {
      this.rightPressed = true;
    } else if (e.code === ARROW_LEFT) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.code === ARROW_RIGHT) {
      this.rightPressed = false;
    } else if (e.code === ARROW_LEFT) {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, paddleYStart);
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.livesLabel.render(ctx);
    this.collisionDetection();
    this.collisionWithCanvas();
    this.ball.move();
    this.checkKeys();
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
