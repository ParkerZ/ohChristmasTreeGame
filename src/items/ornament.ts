import * as ex from "excalibur";
import { Resources, ornamentSprite } from "../resources";
import { HoldableItem } from "./holdableItem";

export class Ornament extends HoldableItem {
  constructor(x: number, y: number) {
    super(x + 15, y, 30, 25, Resources.bloop, "ornament");

    const sprite = ornamentSprite;
    sprite.scale = new ex.Vector(0.36, 0.36);

    this.graphics.show(ornamentSprite);
  }
}
