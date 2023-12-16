import * as ex from "excalibur";
import { Resources, ornamentSprite } from "../resources";
import { HoldableItem } from "./holdableItem";
import { randomBool } from "../utils";
import { ORNAMENT_SPRITE_SCALE } from "../constants";

export class Ornament extends HoldableItem {
  constructor(x: number, y: number) {
    super(x + 15, y, 30, 25, Resources.bloop, "ornament");

    const sprite = ornamentSprite.clone();
    sprite.scale = ORNAMENT_SPRITE_SCALE;
    sprite.flipHorizontal = randomBool();

    this.graphics.show(sprite);
  }
}
