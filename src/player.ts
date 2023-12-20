import * as ex from "excalibur";
import {
  Resources,
  canSprite,
  ornamentSprite,
  playerSpriteSheet,
  woodSprite,
} from "./resources";
import { PlayerInventory } from "./types";
import { SurfaceSlopedLeft } from "./floorTiles/surfaceSlopedLeft";
import { SurfaceSlopedRight } from "./floorTiles/surfaceSlopedRight";
import {
  FIREWOOD_SPRITE_SCALE,
  ORNAMENT_SPRITE_SCALE,
  WATER_BUCKET_SPRITE_SCALE,
} from "./constants";
import { CaneGreenTrunk } from "./floorTiles/caneGreenTrunk";
import { CaneRedTrunk } from "./floorTiles/caneRedTrunk";

export class Player extends ex.Actor {
  private xVelocity = 250;
  private yVelocity = 770;
  private onGround = true;
  private jumped = false;
  private crouch = false;
  private crouchTime: number = 0;
  private inventory: PlayerInventory = "empty";
  private lastDir = "right";

  constructor(x: number, y: number) {
    super({
      name: "Player",
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Capsule(32, 48, ex.vec(0, 3)),
      color: ex.Color.Gray,
    });
  }

  public setInventory(val: PlayerInventory): void {
    this.crouch = true;
    this.crouchTime = 250;
    this.inventory = val;
  }

  public getInventory(): PlayerInventory {
    return this.inventory;
  }

  onInitialize(engine: ex.Engine) {
    const idleRight = ex.Animation.fromSpriteSheet(
      playerSpriteSheet,
      [5, 44],
      800
    );
    idleRight.scale = new ex.Vector(0.35, 0.35);

    const idleLeft = ex.Animation.fromSpriteSheet(
      playerSpriteSheet,
      [5, 44],
      800
    );
    idleLeft.scale = new ex.Vector(0.35, 0.35);
    idleLeft.flipHorizontal = true;

    const left = ex.Animation.fromSpriteSheet(playerSpriteSheet, [12, 20], 100);
    left.scale = new ex.Vector(0.35, 0.35);
    left.flipHorizontal = true;

    const right = ex.Animation.fromSpriteSheet(
      playerSpriteSheet,
      [12, 20],
      100
    );
    right.scale = new ex.Vector(0.35, 0.35);

    const jumpRight = ex.Animation.fromSpriteSheet(
      playerSpriteSheet,
      [52],
      100
    );
    jumpRight.scale = new ex.Vector(0.35, 0.35);

    const jumpLeft = ex.Animation.fromSpriteSheet(playerSpriteSheet, [52], 100);
    jumpLeft.scale = new ex.Vector(0.35, 0.35);
    jumpLeft.flipHorizontal = true;

    const crouchRight = ex.Animation.fromSpriteSheet(
      playerSpriteSheet,
      [13],
      100
    );
    crouchRight.scale = new ex.Vector(0.35, 0.35);

    const crouchLeft = ex.Animation.fromSpriteSheet(
      playerSpriteSheet,
      [13],
      100
    );
    crouchLeft.scale = new ex.Vector(0.35, 0.35);
    crouchLeft.flipHorizontal = true;

    this.graphics.layers.create({ name: "items", order: 1 });

    this.graphics.add("idleRight", idleRight);
    this.graphics.add("idleLeft", idleLeft);
    this.graphics.add("right", right);
    this.graphics.add("left", left);
    this.graphics.add("jumpRight", jumpRight);
    this.graphics.add("jumpLeft", jumpLeft);
    this.graphics.add("crouchRight", crouchRight);
    this.graphics.add("crouchLeft", crouchLeft);

    this.on("postcollision", (evt) => this.onPostCollision(evt));

    this.vel.x = 1;
  }

  onPostCollision(evt: ex.PostCollisionEvent) {
    if (
      evt.side === ex.Side.Bottom &&
      !(evt.other instanceof CaneGreenTrunk) &&
      !(evt.other instanceof CaneRedTrunk)
    ) {
      this.onGround = true;
    }

    if (
      (evt.side === ex.Side.Right && evt.other instanceof SurfaceSlopedLeft) ||
      (evt.side === ex.Side.Left && evt.other instanceof SurfaceSlopedRight)
    ) {
      this.onGround = true;
    }
  }

  onPreUpdate(engine: ex.Engine, delta: number) {
    if (this.vel.y >= 200) this.onGround = false;

    this.vel.x = 0;

    if (this.crouchTime > 0) {
      this.crouchTime -= delta;

      if (this.crouchTime < 0) {
        this.crouch = false;
      }
    }

    if (this.crouch && this.lastDir === "left") {
      this.graphics.use("crouchLeft");
      return;
    }

    if (this.crouch && this.lastDir === "right") {
      this.graphics.use("crouchRight");
      return;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
      this.lastDir = "left";
      this.vel.x = -this.xVelocity;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.D)) {
      this.lastDir = "right";
      this.vel.x = this.xVelocity;
    }

    if (
      engine.input.keyboard.wasPressed(ex.Input.Keys.Space) &&
      this.onGround
    ) {
      this.vel.y = -this.yVelocity;
      this.onGround = false;
      Resources.sounds.jump.play(0.75);
    }

    if (this.vel.x < 0) {
      this.graphics.use("left");
    }
    if (this.vel.x > 0) {
      this.graphics.use("right");
    }
    if (this.vel.x === 0 && this.lastDir === "left") {
      this.graphics.use("idleLeft");
    }
    if (this.vel.x === 0 && this.lastDir === "right") {
      this.graphics.use("idleRight");
    }

    if (!this.onGround && this.lastDir === "left") {
      this.graphics.use("jumpLeft");
    }

    if (!this.onGround && this.lastDir === "right") {
      this.graphics.use("jumpRight");
    }

    this.addHeldItemGraphic();
  }

  private getHeldItemOffset(): ex.Vector {
    if (this.lastDir === "left") {
      return ex.vec(-30, 10);
    }
    return ex.vec(30, 10);
  }

  private addHeldItemGraphic(): void {
    if (this.inventory === "empty") {
      this.graphics.layers.get("items").hide();
      return;
    }

    let sprite;
    switch (this.inventory) {
      case "log":
        sprite = woodSprite.clone();
        sprite.scale = FIREWOOD_SPRITE_SCALE;
        break;
      case "ornament":
        sprite = ornamentSprite.clone();
        sprite.scale = ORNAMENT_SPRITE_SCALE;
        break;
      case "bucket":
        sprite = canSprite.clone();
        sprite.scale = WATER_BUCKET_SPRITE_SCALE;
        break;
      default:
        break;
    }

    if (!sprite) return;

    sprite.flipHorizontal = this.lastDir === "right";
    this.graphics.layers.get("items").hide();
    this.graphics.layers
      .get("items")
      .show(sprite, { offset: this.getHeldItemOffset() });
  }
}
