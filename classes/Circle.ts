import { fabric } from "fabric";

export interface ICircleOptions {
  left: number;
  top: number;
  radius: number;
  isExpanded?: boolean;
  id?: string;
  fill: string;
  selectable: boolean;
  hasBorders: boolean;
  hasControls: boolean;
  hoverCursor: string;
}

export default class Circle extends fabric.Circle {
  public polygon_id?: number;
  public constructor(options: ICircleOptions) {
    const circleOptions: any = {
      id: options.id,
      originX: "center",
      originY: "center",
      left: options.left,
      top: options.top,
      radius: options.radius,
      fill: options.fill,
      selectable: false
    };
    super(circleOptions);
  }
}
