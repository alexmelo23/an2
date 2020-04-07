import { fabric } from "fabric";

export interface IPolygonOptions {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  objectCaching?: boolean;
  id?: string;
  selectable?: boolean;
  hasBorders?: boolean;
  hasControls?: boolean;
  hoverCursor?: string;
  evented?: boolean;
  name?: string;
  opacity?: number;
  description?: string;
}

export default class Polygon extends fabric.Polygon {
  public polygon_id?: number;
  public constructor(
    points: Array<{ x: number; y: number }>,
    options: IPolygonOptions
  ) {
    const polygonOptions: any = {
      stroke: options.stroke,
      strokeWidth: options.strokeWidth,
      fill: options.fill,
      opacity: options.opacity,
      objectCaching: options.objectCaching,
      selectable: options.selectable,
      hasBorders: options.hasBorders,
      hasControls: options.hasControls,
      evented: options.evented,
      name: options.name,
      description: options.description,
      id: options.id
    };
    super(points, polygonOptions);
  }

  _renderText(ctx: any) {
    // ctx.font = "30px Arial";
    // ctx.fillText("Hello World", 10, 50);
    // console.log("render function", ctx);
  }
}
