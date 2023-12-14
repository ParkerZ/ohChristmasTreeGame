import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import { Floor } from "./floor";

export class CaneGreenTrunk extends Floor {
  constructor(x: number, y: number) {
    const sprite = envSpriteSheet.getSprite(12, 4) as ex.Sprite;
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);
    sprite.flipHorizontal = true;

    super(x, y, sprite);
  }
}
