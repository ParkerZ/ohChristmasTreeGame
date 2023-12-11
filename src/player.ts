import * as ex from "excalibur";
import { Resources, playerSpriteSheet } from "./resources";
import { PlayerInventory } from "./types";

export class Player extends ex.Actor {
  public xVelocity = 250;
  public yVelocity = 770;
  public onGround = true;
  public jumped = false;
  public crouch = false;
  public crouchTime: number = 0;
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
    if (val !== "empty") {
      this.crouch = true;
      this.crouchTime = 250;
    }
    this.inventory = val;
  }

  public getInventory(): PlayerInventory {
    return this.inventory;
  }

  // OnInitialize is called before the 1st actor update
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

    // Register animations with actor
    this.graphics.add("idleRight", idleRight);
    this.graphics.add("idleLeft", idleLeft);
    this.graphics.add("right", right);
    this.graphics.add("left", left);
    this.graphics.add("jumpRight", jumpRight);
    this.graphics.add("jumpLeft", jumpLeft);
    this.graphics.add("crouchRight", crouchRight);
    this.graphics.add("crouchLeft", crouchLeft);

    // onPostCollision is an event, not a lifecycle meaning it can be subscribed to by other things
    this.on("postcollision", (evt) => this.onPostCollision(evt));
    this.on("collisionstart", (evt) => this.onCollisionStart(evt));

    this.vel.x = 1;
  }

  onCollisionStart(evt: ex.CollisionStartEvent) {
    // console.log(evt.other.name);
  }

  onPostCollision(evt: ex.PostCollisionEvent) {
    // Bot has collided with it's Top of another collider
    console.log(evt.other.name);
    if (evt.side === ex.Side.Bottom) {
      this.onGround = true;
    }

    // if (this.inventory !== "empty" && evt.other instanceof HoldableItem) {
    //   console.log("we got one");
    //   this.crouch = true;
    //   this.crouchTime = 500;
    // }

    // // Bot has collided on the side, display hurt animation
    // if (
    //   (evt.side === ex.Side.Left || evt.side === ex.Side.Right) &&
    //   evt.other instanceof Baddie
    // ) {
    //   if (this.vel.x < 0 && !this.hurt) {
    //     this.graphics.use("hurtleft");
    //   }
    //   if (this.vel.x >= 0 && !this.hurt) {
    //     this.graphics.use("hurtright");
    //   }
    //   this.hurt = true;
    //   this.hurtTime = 1000;
    //   Resources.hit.play(0.1);
    // }
  }

  // After main update, once per frame execute this code
  onPreUpdate(engine: ex.Engine, delta: number) {
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

    // Reset x velocity
    this.vel.x = 0;

    // Player input
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
      Resources.jump.play(0.1);
    }

    // Change animation based on velocity
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
  }
}
