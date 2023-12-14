import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import { Floor } from "./floor";

const trianglePoints = [ex.vec(20, 20), ex.vec(0, 0), ex.vec(0, 20)];

// 5
export class SurfaceSlopedRight extends Floor {
  constructor(x: number, y: number) {
    const sprite = envSpriteSheet.getSprite(6, 0) as ex.Sprite;
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);

    super(x, y, sprite, ex.Shape.Polygon(trianglePoints));
  }
}
