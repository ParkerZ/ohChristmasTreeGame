import * as ex from "excalibur";
import { Resources, woodSprite } from "../resources";
import { HoldableItem } from "./holdableItem";

export class Firewood extends HoldableItem {
  constructor(x: number, y: number) {
    super(x + 20, y, 26, 34, Resources.bloop, "log");

    const sprite = woodSprite;
    sprite.scale = new ex.Vector(0.4875, 0.4875);

    this.graphics.show(woodSprite, { offset: new ex.Vector(0, 5) });
  }
}
