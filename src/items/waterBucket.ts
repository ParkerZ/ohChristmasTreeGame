import * as ex from "excalibur";
import { Resources, canSprite } from "../resources";
import { HoldableItem } from "./holdableItem";

export class WaterBucket extends HoldableItem {
  constructor(x: number, y: number) {
    super(x, y, 35, 50, Resources.bloop, "bucket");
    const sprite = canSprite;
    sprite.scale = new ex.Vector(0.2, 0.2);

    this.graphics.show(canSprite);
  }
}
