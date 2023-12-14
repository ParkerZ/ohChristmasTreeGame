import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import e from "express";

const trianglePoints = [ex.vec(20, 20), ex.vec(20, 0), ex.vec(0, 20)];
const offset = new ex.Vector(40, 40);

export class Floor extends ex.Actor {
  constructor(
    x: number,
    y: number,
    sprite: ex.Sprite,
    collider?: ex.PolygonCollider
  ) {
    super({
      name: "Floor",
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
      collider: collider ?? ex.Shape.Box(20, 20, ex.Vector.Zero),
    });

    this.graphics.use(sprite, {
      anchor: ex.Vector.Zero,
    });
  }
}
