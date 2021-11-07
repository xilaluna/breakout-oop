import Sprite from './Sprite';

class Ball extends Sprite {
  constructor(x, y, radius, color, dx, dy) {
    super(x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
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

export default Ball;
