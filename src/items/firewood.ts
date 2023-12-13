import * as ex from "excalibur";
import { Resources, woodSprite } from "../resources";
import { HoldableItem } from "./holdableItem";

export class Firewood extends HoldableItem {
  constructor(x: number, y: number) {
    super(x, y, 35, 45, Resources.bloop, "log");

    const sprite = woodSprite;
    sprite.scale = new ex.Vector(0.65, 0.65);

    this.graphics.show(woodSprite, { offset: new ex.Vector(0, 5) });
  }
}
