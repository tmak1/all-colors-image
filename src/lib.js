class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.hue = Math.atan2(
      Math.sqrt(3) * (this.g - this.b),
      2 * this.r - this.g,
      this.b
    );
    this.min = Math.min(this.r, this.g);
    this.min = Math.min(this.min, this.b);
    this.min /= 255;
    this.max = Math.max(this.r, this.g);
    this.max = Math.max(this.max, this.b);
    this.max /= 255;
    this.luminance = (this.min + this.max) / 2;
    if (this.min === this.max) {
      this.saturation = 0;
    } else if (this.luminance < 0.5) {
      this.saturation = (this.max - this.min) / (this.max + this.min);
    } else if (this.luminance >= 0.5) {
      this.saturation = (this.max - this.min) / (2 - this.max - this.min);
    }
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const hueSort = (a, b) => {
  if (a.hue < b.hue) return -1;
  if (a.hue > b.hue) return 1;
  if (a.luminance < b.luminance) return -1;
  if (a.luminance > b.luminance) return 1;
  if (a.saturation < b.saturation) return -1;
  if (a.saturation > b.saturation) return 1;
  return 0;
};

const colorSort = (a, b) => {
  if (a.red < b.red) return -1;
  if (a.red > b.red) return 1;
  if (a.green < b.green) return -1;
  if (a.green > b.green) return 1;
  if (a.blue < b.blue) return -1;
  if (a.blue > b.blue) return 1;
  return 0;
};

const initColors = (steps, sort) => {
  let colors = [];
  for (let r = 0; r < steps; r++) {
    for (let g = 0; g < steps; g++) {
      for (let b = 0; b < steps; b++) {
        colors.push(
          new Color(
            (r * 255) / (steps - 1),
            (g * 255) / (steps - 1),
            (b * 255) / (steps - 1)
          )
        );
      }
    }
  }
  sort === 'color' ? colors.sort(colorSort) : colors.sort(hueSort);
  return colors;
};

const initGrid = ({ width, height }) => {
  let grid = [];
  for (let x = 0; x < width; x++) {
    grid.push(new Array());
    for (let y = 0; y < height; y++) {
      grid[x].push(0);
    }
  }
  return grid;
};

const initPoint = (x, y) => {
  return new Point(x, y);
};

export { Color, Point, initColors, initGrid, initPoint };
