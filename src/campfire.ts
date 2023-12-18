import * as ex from "excalibur";
import { Player } from "./player";
import {
  Resources,
  campfireFire1Sprite,
  campfireFire2Sprite,
  campfireFire3Sprite,
  campfireWoodSprite,
} from "./resources";
import { LOG_HEAT_VALUE, TOTAL_HEAT } from "./constants";
import { StatusBar } from "./ui/statusBar";

export class Campfire extends ex.Actor {
  private heat = TOTAL_HEAT;
  private heatDecayMS = 100;

  heatStatusBar: StatusBar;

  constructor(x: number, y: number, heatBar: StatusBar) {
    super({
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      collisionGroup: ex.CollisionGroupManager.groupByName("tree"),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(45, 50, ex.Vector.Half, new ex.Vector(-4, 0)),
      color: ex.Color.Green,
    });

    this.heatStatusBar = heatBar;
    this.z = -1;
  }

  setHeat(val: number): void {
    this.heat = val;
    this.heatStatusBar.setCurrent(this.heat);

    if (this.heat === 0) alert("You lose (heat)");
  }

  /**
   * Lose one log's worth every 24 seconds
   * Collecting the furthest log takes < 30 seconds
   */
  startHeatDecline(): void {
    setTimeout(() => {
      this.setHeat(this.heat - LOG_HEAT_VALUE / (10 * 24));
      this.startHeatDecline();
    }, this.heatDecayMS);
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.layers.create({ name: "flames", order: 1 });

    const fire = new ex.Animation({
      frames: [
        { graphic: campfireFire1Sprite },
        { graphic: campfireFire2Sprite },
        { graphic: campfireFire3Sprite },
      ],
      frameDuration: 150,
    });

    const base = campfireWoodSprite;

    fire.scale = ex.vec(0.15, 0.15);
    base.scale = ex.vec(0.2, 0.2);

    this.graphics.add("base", base);
    this.graphics.add("fire", fire);
    this.graphics.show("base");
    this.graphics.layers.get("flames").show("fire", { offset: ex.vec(-2, -6) });

    this.startHeatDecline();

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onCollisionStart(evt: ex.CollisionStartEvent) {
    if (!(evt.other instanceof Player)) return;

    switch (evt.other.getInventory()) {
      case "log":
        evt.other.setInventory("empty");
        Resources.sounds.woodDrop.play(1);
        this.setHeat(this.heat + LOG_HEAT_VALUE);
        break;
      default:
        break;
    }
  }
}
