import * as ex from "excalibur";
import { Resources } from "../resources";

export class CalendarPage extends ex.Actor {
  private sprite;

  constructor(x: number, y: number, sprite: ex.Sprite) {
    super({
      pos: new ex.Vector(x, y),
    });

    this.sprite = sprite;
  }

  onInitialize(_engine: ex.Engine): void {
    Resources.sounds.page.play(0.75);
    this.transform.coordPlane = ex.CoordPlane.Screen;

    this.z = -1.1;

    this.graphics.show(this.sprite, { offset: ex.vec(54, 55) });

    this.vel = new ex.Vector(0, -300);
    this.acc = ex.Physics.acc;
    this.angularVelocity = 0.5;

    setTimeout(() => this.kill(), 2000);
  }
}
