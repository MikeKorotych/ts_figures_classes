type Shape = 'triangle' | 'circle' | 'rectangle';
type Color = 'red' | 'green' | 'blue';

const validColors = ['red', 'green', 'blue'];

export interface Figure {
  shape: Shape;
  color: Color;
  getArea(): number;
}

export class Triangle implements Figure {
  constructor(
    public color: Color,
    public a: number,
    public b: number,
    public c: number,
    public shape: Shape,
  ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.color = color;
    this.shape = shape;

    if (!validColors.includes(this.color)) {
      throw new Error('Color must be one of: red, green, blue');
    }
  }

  getArea(): number {
    if (this.a <= 0 || this.b <= 0 || this.c <= 0) {
      throw new Error('Side length must be greater than 0');
    }

    const sides = [this.a, this.b, this.c];
    const longestSide = Math.max(...sides);

    sides.splice(sides.indexOf(longestSide), 1);

    if (longestSide >= sides[0] + sides[1]) {
      throw new Error('The sum of any two sides must be > than the third side');
    }

    const p = 0.5 * (this.a + this.b + this.c);
    const result = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));

    return Math.floor(result * 100) / 100;
  }
}

export class Circle implements Figure {
  constructor(
    public color: Color,
    public radius: number,
    public shape: Shape,
  ) {
    this.color = color;
    this.radius = radius;
    this.shape = shape;
  }

  getArea(): number {
    if (this.radius <= 0) {
      throw new Error('Radius must be a positive number');
    }

    return Math.floor(Math.PI * this.radius ** 2 * 100) / 100;
  }
}

export class Rectangle implements Figure {
  constructor(
    public color: Color,
    public shape: Shape,
    public width: number,
    public height: number,
  ) {
    this.color = color;
    this.shape = shape;
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    if (this.width <= 0 || this.height <= 0) {
      throw new Error('Rectangle width and height must be > 0');
    }

    return Math.floor(this.width * this.height * 100) / 100;
  }
}

export function getInfo(figure: Figure): string {
  return `A ${figure.color} ${figure.shape} - ${figure.getArea()}`;
}
