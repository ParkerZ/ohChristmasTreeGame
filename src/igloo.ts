import * as ex from "excalibur";
import { Player } from "./player";
import { envSpriteSheet } from "./resources";
import { ENV_TILE_RATIO } from "./constants";
import { Level } from "./scenes/level";

export class Igloo extends ex.Actor {
  loadLevel = false;

  constructor(x: number, y: number) {
    super({
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      collisionGroup: ex.CollisionGroupManager.groupByName("tree"),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(45, 75, ex.Vector.Half, new ex.Vector(10, 0)),
    });
  }

  updateGraphics(engine: ex.Engine): void {
    const doorSprite = envSpriteSheet.getSprite(13, 3)?.clone() as ex.Sprite;
    const wallSprite = envSpriteSheet.getSprite(12, 3)?.clone() as ex.Sprite;
    const roofLeftSprite = envSpriteSheet
      .getSprite(11, 2)
      ?.clone() as ex.Sprite;
    const roofMidSprite = envSpriteSheet.getSprite(12, 2)?.clone() as ex.Sprite;
    const roofRightSprite = envSpriteSheet
      .getSprite(13, 2)
      ?.clone() as ex.Sprite;

    doorSprite.scale = new ex.Vector(0.5, 0.5);
    wallSprite.scale = new ex.Vector(0.5, 0.5);
    roofLeftSprite.scale = new ex.Vector(0.5, 0.5);
    roofRightSprite.scale = new ex.Vector(0.5, 0.5);
    roofMidSprite.scale = new ex.Vector(0.5, 0.5);

    this.graphics.show(roofLeftSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(-1 * roofLeftSprite.width, -2 * roofLeftSprite.height),
    });

    this.graphics.show(roofMidSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0 * roofMidSprite.width, -2 * roofMidSprite.height),
    });

    this.graphics.show(roofRightSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(1 * roofRightSprite.width, -2 * roofRightSprite.height),
    });

    this.graphics.show(doorSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(-1 * doorSprite.width, -1 * doorSprite.height),
    });

    this.graphics.show(wallSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0 * wallSprite.width, -1 * wallSprite.height),
    });

    this.graphics.show(wallSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(1 * wallSprite.width, -1 * wallSprite.height),
    });

    const frontWallSprite = envSpriteSheet
      .getSprite(12, 3)
      ?.clone() as ex.Sprite;
    frontWallSprite.scale = new ex.Vector(0.93, 0.93);

    const frontWall = new ex.Actor({
      x: this.pos.x - 5,
      y: this.pos.y - 70,
      z: 1,
    });
    frontWall.graphics.show(frontWallSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0, 0),
    });

    engine.add(frontWall);
  }

  onInitialize(engine: ex.Engine): void {
    this.z = -1;

    this.updateGraphics(engine);

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onPostUpdate(engine: ex.Engine, _delta: number): void {
    if (!this.loadLevel) return;
    engine.add("level", new Level());
    engine.goToScene("level");
    this.kill();
  }

  onCollisionStart(evt: ex.CollisionStartEvent) {
    if (!(evt.other instanceof Player)) return;

    this.loadLevel = true;
  }
}
