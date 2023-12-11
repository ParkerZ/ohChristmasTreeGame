import * as ex from "excalibur";
import { envSpriteSheet } from "./resources";
import { ENV_TILE_RATIO } from "./constants";

export class Floor extends ex.Actor {
  constructor(x: number, y: number, public cols: number, public rows: number) {
    super({
      name: "Floor",
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      anchor: ex.Vector.Zero,
      collider: ex.Shape.Box(20 * cols, 20 * rows, ex.Vector.Zero),
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
    });

    const sprite = envSpriteSheet.getSprite(1, 0) as ex.Sprite;
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.graphics.show(sprite, {
          anchor: ex.Vector.Zero,
          offset: ex.vec(i * sprite.width, j * sprite.height),
        });
      }
    }
  }
}
