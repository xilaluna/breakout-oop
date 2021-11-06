/* eslint-disable operator-linebreak */
class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.ballRadius = 10;
    this.brickRowCount = 5;
    this.brickColumnCount = 3;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.color = '#0095DD';
    this.ARROW_RIGHT = 'ArrowRight';
    this.ARROW_LEFT = 'ArrowLeft';
    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleYStart = this.canvas.height - this.paddleHeight;

    this.ball = new Ball({
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      radius: this.ballRadius,
      color: this.color,
    });

    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetLeft: this.brickOffsetLeft,
      offsetTop: this.brickOffsetTop,
      color: this.color,
    });

    this.paddle = new Sprite({
      x: this.paddleXStart,
      y: this.paddleYStart,
      width: this.paddleWidth,
      height: this.paddleHeight,
      color: this.color,
    });

    this.scoreLabel = new GameLabel({
      x: 8,
      y: 20,
      color: this.color,
      text: 'Score: ',
      font: '16px Arial',
    });

    this.livesLabel = new GameLabel({
      x: this.canvas.width - 65,
      y: 20,
      color: this.color,
      text: 'Lives: ',
      font: '16px Arial',
    });

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
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x &&
            this.ball.x < brick.x + this.brickWidth &&
            this.ball.y > brick.y &&
            this.ball.y < brick.y + this.brickHeight
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
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionWithCanvas() {
    if (
      this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ||
      this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddleWidth) {
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
    if (e.code === this.ARROW_RIGHT) {
      this.rightPressed = true;
    } else if (e.code === this.ARROW_LEFT) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.code === this.ARROW_RIGHT) {
      this.rightPressed = false;
    } else if (e.code === this.ARROW_LEFT) {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
    this.collisionDetection();
    this.collisionWithCanvas();
    this.ball.move();
    this.checkKeys();
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
