import * as ex from "excalibur";
import { Player } from "./player";
import { Resources, envSpriteSheet } from "./resources";
import {
  BUCKET_WATER_VALUE,
  ENV_TILE_RATIO,
  LOG_HEAT_VALUE,
} from "./constants";

const trianglePoints = [ex.vec(-25, 40), ex.vec(0, -40), ex.vec(25, 40)];

export class ChristmasTree extends ex.Actor {
  private heat = 100;
  private water = 100;
  private decor = 0;
  private heatDecayMS = 1000;
  private waterDecayMS = 500;

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

  constructor(x: number, y: number) {
    super({
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      collisionGroup: ex.CollisionGroupManager.groupByName("tree"),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(60, 75, ex.Vector.Half, new ex.Vector(10, 0)),
    });

    this.updateGraphics();
  }

  setHeat(val: number): void {
    this.heat = val;

    if (this.heat === 0) alert("You lose (heat)");
  }

  setWater(val: number): void {
    this.water = val;

    if (this.water === 0) alert("You lose (water)");
  }

  setDecor(val: number): void {
    this.decor = val;
  }

  startHeatDecline(): void {
    setTimeout(() => {
      this.setHeat(this.heat - 1);
      this.startHeatDecline();
    }, this.heatDecayMS);
  }

  startWaterDecline(): void {
    setTimeout(() => {
      this.setWater(this.water - 1);
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