export function startLineCanvas(canvas: HTMLCanvasElement) {
  let intervalId;
  let context = canvas.getContext('2d');
  if (!context) {
    return;
  }
  const lineAnim = new LineAnim(canvas, context);
  const anim = window.requestAnimationFrame(lineAnim.updateLineCanvas);
  console.log('boo');

  return () => {
    console.log('rawr');
    window.cancelAnimationFrame(anim);
  }
}

class LineAnim {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  modifier1: number = 0;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    // @ts-ignore
    window.context = this.context;
    // @ts-ignore
    window.canvas = this.canvas;

    this.updateLineCanvas = this.updateLineCanvas.bind(this);
  }

  updateLineCanvas() {
    this.clearCanvas();
    const height = this.canvas.height;
    const width = this.canvas.width;
    this.modifier1 += 0.01;
    const lines = [
      [
        0, this.canvas.height / 2,
        this.canvas.width / 2, this.canvas.height / 2,
        this.canvas.width, this.canvas.height / 1.8
      ],
      [
        -this.canvas.width / 8, this.canvas.height / 1.8,
        this.canvas.width / 1.8, this.canvas.height / 2.2,
        this.canvas.width, this.canvas.height / 1.9
      ],
      [
        0, this.canvas.height / 2.2,
        this.canvas.width / 2.2, this.canvas.height / 2.2,
        this.canvas.width, this.canvas.height / 2
      ],
      [
        -this.canvas.width / 8, this.canvas.height / 1.7,
        this.canvas.width / 1.6, this.canvas.height / 2,
        this.canvas.width * 1.2, this.canvas.height / 1.9
      ],
    ];

    lines[0][1] += Math.sin(this.modifier1) * 80;
    lines[0][3] += Math.sin(this.modifier1 + 2) * 120;
    lines[0][5] += Math.sin(this.modifier1 + 4) * 100;

    lines[1][1] += Math.sin(this.modifier1 + 4) * 80;
    lines[1][3] += Math.sin(this.modifier1) * 100;
    lines[1][5] += Math.sin(this.modifier1 + 2) * 100;

    lines[2][1] += Math.sin(this.modifier1 + 3) * 120;
    lines[2][3] += Math.sin(this.modifier1 + 5) * 120;
    lines[2][5] += Math.sin(this.modifier1 + 1) * 100;

    lines[3][1] += Math.sin(this.modifier1 + 1) * 80;
    lines[3][3] += Math.sin(this.modifier1 + 3) * 120;
    lines[3][5] += Math.sin(this.modifier1 + 5) * 100;

    for (const line of lines) {
      this.createCurve(line);
    }

    window.requestAnimationFrame(this.updateLineCanvas);
  }

  createCurve(points: number[]) {
    this.context.beginPath();

    for (let i = 0; i < points.length; i += 2) {
      const x1 = points[i];
      const y1 = points[i+1];
      const x2 = points[i+2];
      const y2 = points[i+3];
      const l = this.canvas.width / 5;
      if (!y2) {
        break;
      }

      this.context.moveTo(x1, y1)
      this.context.bezierCurveTo(x1 + l, y1, x2 - l, y2, x2, y2);
      this.context.strokeStyle = '#BB4FB0';
      this.context.lineWidth = 2;
      this.context.stroke();
    }

    this.context.closePath();
  }

  clearCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

