import * as ex from "excalibur";

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
