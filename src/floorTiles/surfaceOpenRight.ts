import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import { Floor } from "./floor";

const quadPoints = [ex.vec(20, 0), ex.vec(0, 0), ex.vec(0, 20), ex.vec(15, 12)];

export class SurfaceOpenRight extends Floor {
  constructor(x: number, y: number) {
    const sprite = envSpriteSheet.getSprite(5, 1) as ex.Sprite;
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);

    super(x, y, sprite, ex.Shape.Polygon(quadPoints));
  }
}
