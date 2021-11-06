class GameLabel extends Sprite {
  constructor(options) {
    super(options.x, options.y, 0, 0, options.color);
    this.text = options.text;
    this.font = options.font;
    this.value = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}
