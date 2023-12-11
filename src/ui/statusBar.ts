import * as ex from "excalibur";
import { Vector } from "excalibur";

export class StatusBar extends ex.Actor {
  barWidth = 400;
  barHeight = 25;
  total;
  current;
  constructor(x: number, y: number, total: number, color: ex.Color) {
    super({
      name: "statusBar",
      color,
      pos: new ex.Vector(x, y),
    });

    this.total = total;
    this.current = total;

    this.transform.coordPlane = ex.CoordPlane.Screen;
    this.body.collisionType = ex.CollisionType.PreventCollision;
    this.graphics.anchor = Vector.Zero;
    this.graphics.use(
      new ex.Canvas({
        draw: (ctx) => this.draw(ctx),
        cache: false,
        width: this.barWidth + 20,
        height: this.barHeight + 50,
      })
    );
  }

  setCurrent(val: number): void {
    this.current = val;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color.toString();
    ctx.fillStyle = this.color.toString();
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, this.barWidth + 10, this.barHeight + 10);
    ctx.fillRect(
      5,
      5,
      Math.min(
        Math.max(this.barWidth * (this.current / this.total), 0),
        this.barWidth
      ),
      this.barHeight
    );
  }
}
