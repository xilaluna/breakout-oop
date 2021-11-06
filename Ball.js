class Ball {
  constructor(x = 0, y = 0, dx = 0, dy = 0, radius = ballRadius, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, piTwo);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
