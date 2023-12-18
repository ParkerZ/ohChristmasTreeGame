import * as ex from "excalibur";
import { Player } from "./player";
import { Resources, envSpriteSheet, ornamentSprite } from "./resources";
import { BUCKET_WATER_VALUE, ENV_TILE_RATIO, TOTAL_WATER } from "./constants";
import { StatusBar } from "./ui/statusBar";

export class ChristmasTree extends ex.Actor {
  private water = TOTAL_WATER;
  private decor = 0;
  private waterDecayMS = 100;

  waterStatusBar: StatusBar;

  updateGraphics(): void {
    this.graphics.layers.create({ name: "decor", order: 1 });
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
      collider: ex.Shape.Box(50, 75, ex.Vector.Half, new ex.Vector(10, 0)),
    });

    this.waterStatusBar = waterBar;
    this.updateGraphics();
  }

  setWater(val: number): void {
    this.water = val;
    this.waterStatusBar.setCurrent(this.water);

    if (this.water <= 0) alert("You lose (water)");
  }

  setDecor(val: number): void {
    this.decor = val;

    switch (this.decor) {
      case 1:
        const sprite = ornamentSprite.clone();
        sprite.scale = ex.vec(0.1, 0.1);

        this.graphics.layers
          .get("decor")
          .show(sprite, { offset: ex.vec(0, -5) });
        break;
      case 2:
        const sprite1 = ornamentSprite.clone();
        sprite1.scale = ex.vec(0.1, 0.1);
        sprite1.flipHorizontal = true;

        this.graphics.layers
          .get("decor")
          .show(sprite1, { offset: ex.vec(10, -35) });
        break;
      case 3:
        const sprite2 = ornamentSprite.clone();
        sprite2.scale = ex.vec(0.1, 0.1);

        this.graphics.layers
          .get("decor")
          .show(sprite2, { offset: ex.vec(25, -25) });
        break;
      case 4:
        const sprite3 = ornamentSprite.clone();
        sprite3.scale = ex.vec(0.1, 0.1);
        sprite3.flipHorizontal = true;

        this.graphics.layers
          .get("decor")
          .show(sprite3, { offset: ex.vec(14, -12) });
        break;
      case 5:
        const sprite4 = ornamentSprite.clone();
        sprite4.scale = ex.vec(0.1, 0.1);

        this.graphics.layers
          .get("decor")
          .show(sprite4, { offset: ex.vec(-5, -20) });
        break;
      default:
        break;
    }
  }

  /**
   * Lose one bucket's worth every 30 seconds
   * Collecting the furthest bucket takes < 40 seconds
   */ startWaterDecline(): void {
    setTimeout(() => {
      this.setWater(this.water - BUCKET_WATER_VALUE / (10 * 30));
      this.startWaterDecline();
    }, this.waterDecayMS);
  }

  onInitialize(_engine: ex.Engine): void {
    this.z = -1;
    this.startWaterDecline();

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onCollisionStart(evt: ex.CollisionStartEvent) {
    if (!(evt.other instanceof Player)) return;

    switch (evt.other.getInventory()) {
      case "bucket":
        evt.other.setInventory("empty");
        Resources.sounds.water.play(0.75);
        this.setWater(this.water + BUCKET_WATER_VALUE);
        break;
      case "ornament":
        evt.other.setInventory("empty");
        Resources.sounds.ornament.play(0.75);
        this.setDecor(this.decor + 1);
      default:
        break;
    }
  }
}
