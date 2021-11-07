import Sprite from './Sprite';

class GameLabel extends Sprite {
  constructor(x, y, color, text, font) {
    super(x, y, 0, 0, color);
    this.text = text;
    this.font = font;
    this.value = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
