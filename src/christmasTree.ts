import * as ex from "excalibur";
import { Player } from "./player";
import { Resources, envSpriteSheet } from "./resources";
import {
  BUCKET_WATER_VALUE,
  ENV_TILE_RATIO,
  LOG_HEAT_VALUE,
  TOTAL_HEAT,
  TOTAL_WATER,
} from "./constants";
import { StatusBar } from "./ui/statusBar";

const trianglePoints = [ex.vec(-25, 40), ex.vec(0, -40), ex.vec(25, 40)];

export class ChristmasTree extends ex.Actor {
  private heat = TOTAL_HEAT;
  private water = TOTAL_WATER;
  private decor = 0;
  private heatDecayMS = 100;
  private waterDecayMS = 100;

  waterStatusBar: StatusBar;
  heatStatusBar: StatusBar;

  updateGraphics(): void {
    const tipSprite = envSpriteSheet.getSprite(0, 5) as ex.Sprite;
    const centerSprite = envSpriteSheet.getSprite(9, 5) as ex.Sprite;
    const leftSprite = envSpriteSheet.getSprite(8, 6) as ex.Sprite;
    const rightSprite = envSpriteSheet.getSprite(10, 6) as ex.Sprite;
    const trunkSprite = envSpriteSheet.getSprite(2, 6) as ex.Sprite;

    tipSprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);
    centerSprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);
    leftSprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);
    rightSprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);
    trunkSprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);

    this.graphics.show(tipSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0 * tipSprite.width, -3 * tipSprite.height),
    });

    this.graphics.show(leftSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(-1 * leftSprite.width, -2 * leftSprite.height),
    });

    this.graphics.show(leftSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(-1 * leftSprite.width, -1 * leftSprite.height),
    });

    this.graphics.show(centerSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0 * centerSprite.width, -2 * centerSprite.height),
    });

    this.graphics.show(centerSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0 * centerSprite.width, -1 * centerSprite.height),
    });

    this.graphics.show(rightSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(1 * rightSprite.width, -2 * rightSprite.height),
    });

    this.graphics.show(rightSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(1 * rightSprite.width, -1 * rightSprite.height),
    });

    this.graphics.show(trunkSprite, {
      anchor: ex.Vector.Zero,
      offset: ex.vec(0 * trunkSprite.width, 0 * trunkSprite.height),
    });
  }

  constructor(x: number, y: number, waterBar: StatusBar, heatBar: StatusBar) {
    super({
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      collisionGroup: ex.CollisionGroupManager.groupByName("tree"),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(60, 75, ex.Vector.Half, new ex.Vector(10, 0)),
    });

    this.waterStatusBar = waterBar;
    this.heatStatusBar = heatBar;
    this.updateGraphics();
  }

  setHeat(val: number): void {
    this.heat = val;
    this.heatStatusBar.setCurrent(this.heat);

    if (this.heat === 0) alert("You lose (heat)");
  }

  setWater(val: number): void {
    this.water = val;
    this.waterStatusBar.setCurrent(this.water);

    if (this.water === 0) alert("You lose (water)");
  }

  setDecor(val: number): void {
    this.decor = val;
  }

  /**
   * Lose one log's worth every 25 seconds
   * Collecting the furthest log takes < 30 seconds
   */
  startHeatDecline(): void {
    setTimeout(() => {
      this.setHeat(this.heat - LOG_HEAT_VALUE / (10 * 25));
      this.startHeatDecline();
    }, this.heatDecayMS);
  }

  /**
   * Lose one bucket's worth every 35 seconds
   * Collecting the furthest bucket takes < 40 seconds
   */ startWaterDecline(): void {
    setTimeout(() => {
      this.setWater(this.water - BUCKET_WATER_VALUE / (10 * 35));
      this.startWaterDecline();
    }, this.waterDecayMS);
  }

  onInitialize(_engine: ex.Engine): void {
    this.z = -1;
    this.startHeatDecline();
    this.startWaterDecline();

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onCollisionStart(evt: ex.CollisionStartEvent) {
    if (!(evt.other instanceof Player)) return;

    switch (evt.other.getInventory()) {
      case "bucket":
        evt.other.setInventory("empty");
        Resources.bloop.play(0.1);
        this.setWater(this.water + BUCKET_WATER_VALUE);
        break;
      case "log":
        evt.other.setInventory("empty");
        Resources.bloop.play(0.1);
        this.setHeat(this.heat + LOG_HEAT_VALUE);
        break;
      case "ornament":
        evt.other.setInventory("empty");
        Resources.bloop.play(0.1);
        this.setDecor(this.decor + 1);
      default:
        break;
    }
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // const triangleGraphic = new ex.Polygon({
    //   points: trianglePoints,
    //   color: ex.Color.Green,
    // });
    // this.graphics.use(triangleGraphic);
  }
}
