import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import { Floor } from "./floor";

export class SurfaceClosed extends Floor {
  constructor(x: number, y: number) {
    const sprite = envSpriteSheet.getSprite(3, 0) as ex.Sprite;
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);

    super(x, y, sprite);
  }
}
