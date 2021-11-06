class Ball extends Sprite {
  constructor(options) {
    super(options.x, options.y, options.radius * 2, options.radius * 2, options.color);
    this.dx = options.dx;
    this.dy = options.dy;
    this.radius = options.radius;
    this.piTwo = Math.PI * 2;
  }

  move() {
    this.moveBy(this.dx, this.dy);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.piTwo);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
