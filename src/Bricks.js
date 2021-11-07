/* eslint-disable object-curly-newline */
import Brick from './Brick';

class Bricks {
  constructor(cols, rows, width, height, padding, offsetLeft, offsetTop, color) {
    this.cols = cols;
    this.rows = rows;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.color = color;
    this.bricks = [];
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const x = (this.width + this.padding) * r + this.offsetLeft;
        const y = (this.height + this.padding) * c + this.offsetTop;
        this.bricks[c][r] = new Brick(x, y, this.width, this.height, this.color);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
