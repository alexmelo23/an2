export default class canvasAnnotate {
  ctx: CanvasRenderingContext2D;
  shapes: Array<any> = [];
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  public on = (obj: any) => {
    // this.isInPath(obj.click);
    this.canvas.addEventListener("click", e => {
      const isInPath = this.isInPath(e);

      // e.target = "data test";
      obj.click(e);
    });
    // this.canvas.addEventListener("mousemove", obj.mousemove);
  };

  getMousePos = (evt: MouseEvent) => {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };

  isInPath = (e: MouseEvent) => {
    const { x, y } = this.getMousePos(e);
    for (var i = 0; i < this.shapes.length; i++) {
      console.log("this.shapes", this.shapes);

      // if (this.shapes[i].isPointInPath(x, y)) {
      //   console.log("this.shapes", this.shapes[i]);
      // }
    }
  };

  public render = (ctx: CanvasRenderingContext2D): void => {
    this.shapes.forEach(c => {
      c.draw(this.ctx);
    });
  };
}
