import * as ex from "excalibur";
import { Resources, ornamentSprite } from "../resources";
import { HoldableItem } from "./holdableItem";

export class Ornament extends HoldableItem {
  constructor(x: number, y: number) {
    super(x, y, 25, 20, Resources.bloop, "ornament");

    const sprite = ornamentSprite;
    sprite.scale = new ex.Vector(0.3, 0.3);

    this.graphics.show(ornamentSprite);
  }
}
