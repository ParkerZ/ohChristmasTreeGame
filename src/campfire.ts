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
import { Calendar } from "./ui/calendar";

export class Campfire extends ex.Actor {
  private heat = TOTAL_HEAT;
  private heatDecayMS = 100;
  private isActive;

  private heatStatusBar: StatusBar;
  private calendar: Calendar;

  constructor(
    x: number,
    y: number,
    heatBar: StatusBar,
    calendar: Calendar,
    isActive = true
  ) {
    super({
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      collisionGroup: ex.CollisionGroupManager.groupByName("tree"),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(45, 50, ex.Vector.Half, new ex.Vector(-4, 0)),
      color: ex.Color.Green,
    });

    this.heatStatusBar = heatBar;
    this.calendar = calendar;
    this.z = -1;
    this.isActive = isActive;
  }

  getHeat(): number {
    return this.heat;
  }

  setHeat(val: number): void {
    if (!this.isActive) return;

    this.heat = val;
    this.heatStatusBar.setCurrent(this.heat);
  }

  setIsActive(val: boolean): void {
    if (!this.isActive && val) this.onActivate();

    this.isActive = val;
  }

  onActivate(): void {
    this.heatStatusBar.setIsActive(true);
    this.startHeatDecline();
  }

  /**
   * Lose one log's worth every 23 seconds
   * Collecting the furthest log takes < 30 seconds
   */
  startHeatDecline(): void {
    setTimeout(() => {
      if (!this.isActive) return;

      this.setHeat(this.heat - LOG_HEAT_VALUE / (10 * 23));
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
