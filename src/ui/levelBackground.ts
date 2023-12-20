import * as ex from "excalibur";
import { backgroundLevelSprite } from "../resources";

export class LevelBackground extends ex.Actor {
  private camera;

  constructor(camera: ex.Camera) {
    super({
      x: 0,
      y: 0,
    });
    this.z = -2;
    this.camera = camera;
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    this.pos = this.camera.pos;
  }

  onInitialize(engine: ex.Engine) {
    const sprite = backgroundLevelSprite;
    const scaleX = (1.5 * engine.drawWidth) / sprite.width;
    const scaleY = (1.5 * engine.drawHeight) / sprite.height;
    sprite.scale = new ex.Vector(
      Math.max(scaleX, scaleY),
      Math.max(scaleX, scaleY)
    );
    this.graphics.use(sprite);
  }
}
