import * as ex from "excalibur";
import { Player } from "../player";
import { PlayerInventory } from "../types";

export class HoldableItem extends ex.Actor {
  public itemType;
  public sound;

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    sound: ex.Sound,
    itemType: PlayerInventory
  ) {
    super({
      pos: new ex.Vector(x, y),
      collisionGroup: ex.CollisionGroupManager.groupByName("items"),
      collisionType: ex.CollisionType.Active,
      collider: ex.Shape.Box(width, height, ex.Vector.Half),
    });
    this.sound = sound;
    this.itemType = itemType;
  }

  onInitialize(_engine: ex.Engine): void {
    // Handle pickup
    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onCollisionStart(evt: ex.CollisionStartEvent) {
    if (evt.other instanceof Player && evt.other.getInventory() === "empty") {
      evt.other.setInventory(this.itemType);
      this.sound.play(0.1);
      setTimeout(() => this.actions.die(), 200);
    }
  }
}
