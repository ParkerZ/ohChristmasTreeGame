import * as ex from "excalibur";
import { backgroundMenuSprite } from "../resources";

export class MenuBackground extends ex.ScreenElement {
  constructor() {
    super({
      x: 0,
      y: -20,
    });
  }

  onInitialize(engine: ex.Engine) {
    const sprite = backgroundMenuSprite;
    const scaleX = engine.drawWidth / sprite.width;
    const scaleY = engine.drawHeight / sprite.height;
    sprite.scale = new ex.Vector(
      Math.max(scaleX, scaleY),
      Math.max(scaleX, scaleY)
    );
    this.graphics.use(sprite);
  }
}
