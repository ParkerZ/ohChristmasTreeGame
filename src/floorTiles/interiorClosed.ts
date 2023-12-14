import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import { Floor } from "./floor";

// 6
export class InteriorClosed extends Floor {
  constructor(x: number, y: number) {
    const sprite = envSpriteSheet.getSprite(2, 1) as ex.Sprite;
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);

    super(x, y, sprite);
  }
}
