import * as ex from "excalibur";
import { Resources, woodSprite } from "../resources";
import { HoldableItem } from "./holdableItem";
import { randomBool } from "../utils";
import { FIREWOOD_SPRITE_SCALE } from "../constants";

export class Firewood extends HoldableItem {
  constructor(x: number, y: number) {
    super(x + 20, y, 26, 34, Resources.sounds.woodPickup, "log");

    const sprite = woodSprite.clone();
    sprite.scale = FIREWOOD_SPRITE_SCALE;
    sprite.flipHorizontal = randomBool();

    this.graphics.show(sprite, { offset: new ex.Vector(0, 5) });
  }
}
