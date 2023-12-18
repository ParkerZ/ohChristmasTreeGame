import * as ex from "excalibur";
import {
  barBlueLeftSprite,
  barBlueMidSprite,
  barBlueRightSprite,
  barCanSprite,
  barWhiteLeftSprite,
  barWhiteMidSprite,
  barWhiteRightSprite,
  barYellowLeftSprite,
  barYellowMidSprite,
  barYellowRightSprite,
} from "../resources";

const iconOffset = ex.vec(60, 0);

export class StatusBar extends ex.ScreenElement {
  foreLeft;
  foreMid;
  foreRight;
  backLeft = barWhiteLeftSprite.clone();
  backMid = barWhiteMidSprite.clone();
  backRight = barWhiteRightSprite.clone();
  iconSprite;
  iconPos;
  barWidth = 400;
  barHeight = 25;
  total;
  current;
  constructor(
    x: number,
    y: number,
    total: number,
    color: string,
    iconSprite: ex.Sprite,
    iconPos: ex.Vector,
    width = 400,
    height = 25
  ) {
    super({
      name: "statusBar",
      pos: new ex.Vector(x, y),
    });

    if (color === "yellow") {
      this.foreLeft = barYellowLeftSprite.clone();
      this.foreMid = barYellowMidSprite.clone();
      this.foreRight = barYellowRightSprite.clone();
    } else {
      this.foreLeft = barBlueLeftSprite.clone();
      this.foreMid = barBlueMidSprite.clone();
      this.foreRight = barBlueRightSprite.clone();
    }

    this.iconSprite = iconSprite;
    this.iconPos = iconPos;

    this.total = total;
    this.current = total;

    this.transform.coordPlane = ex.CoordPlane.Screen;
    this.body.collisionType = ex.CollisionType.PreventCollision;

    this.barWidth = width;
    this.barHeight = height;
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.layers.create({ name: "background", order: -1 });
    this.graphics.layers.create({ name: "icon", order: 1 });

    this.graphics.layers
      .get("icon")
      .show(this.iconSprite, { offset: this.iconPos });

    this.graphics.layers
      .get("background")
      .show(this.backLeft, { offset: iconOffset });

    this.backMid.scale = ex.vec(this.barWidth / (this.backLeft.width * 3), 1);
    this.graphics.layers.get("background").show(this.backMid, {
      offset: ex.vec(this.backLeft.width, 0).add(iconOffset),
    });

    this.graphics.layers.get("background").show(this.backRight, {
      offset: ex
        .vec(this.backLeft.width + this.backMid.width, 0)
        .add(iconOffset),
    });

    this.draw();
  }

  setCurrent(val: number): void {
    this.current = val;
    this.draw();
  }

  draw() {
    // clear graphics
    this.graphics.hide();

    // draw foreground
    this.graphics.show(this.foreLeft, { offset: iconOffset });

    if (this.current <= 1) return;

    this.foreMid.scale = ex.vec(
      Math.min(this.current / this.total, 1) *
        (this.barWidth / (this.foreLeft.width * 3)),
      1
    );
    this.graphics.show(this.foreMid, {
      offset: ex.vec(this.foreLeft.width, 0).add(iconOffset),
    });

    if (this.current < this.total) return;

    this.graphics.show(this.foreRight, {
      offset: ex
        .vec(this.foreLeft.width + this.foreMid.width, 0)
        .add(iconOffset),
    });
  }
}
