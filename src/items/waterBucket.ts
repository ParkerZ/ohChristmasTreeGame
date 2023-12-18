import { Resources, canSprite } from "../resources";
import { HoldableItem } from "./holdableItem";
import { randomBool } from "../utils";
import { WATER_BUCKET_SPRITE_SCALE } from "../constants";

export class WaterBucket extends HoldableItem {
  constructor(x: number, y: number) {
    super(x, y, 26, 38, Resources.sounds.water, "bucket");

    const sprite = canSprite.clone();
    sprite.scale = WATER_BUCKET_SPRITE_SCALE;
    sprite.flipHorizontal = randomBool();

    this.graphics.show(sprite);
  }
}
