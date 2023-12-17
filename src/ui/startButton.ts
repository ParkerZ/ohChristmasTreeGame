import * as ex from "excalibur";
import {
  Resources,
  buttonHoverSprite,
  buttonIdleSprite,
  buttonPressSprite,
  buttonTextSprite,
} from "../resources";

export class StartButton extends ex.ScreenElement {
  sprite;
  constructor(x: number, y: number) {
    super({
      x: x - buttonIdleSprite.width / 2,
      y: y - buttonIdleSprite.height / 2,
    });

    this.sprite = buttonIdleSprite;
  }

  onPostUpdate(_engine: ex.Engine, _delta: number): void {
    const group = new ex.GraphicsGroup({
      members: [
        {
          graphic: this.sprite,
          pos: ex.vec(0, 0),
        },
        {
          graphic: buttonTextSprite,
          pos: ex.vec(0, 0),
        },
      ],
    });

    this.graphics.use(group);
  }

  onInitialize(engine: ex.Engine) {
    this.on("pointerdown", () => {
      this.sprite = buttonPressSprite;
      Resources.sounds.button.play(1);
      setTimeout(() => (this.sprite = buttonHoverSprite), 150);
      setTimeout(() => engine.goToScene("level"), 200);
    });

    this.on("pointerenter", () => {
      if (this.sprite !== buttonPressSprite) this.sprite = buttonHoverSprite;
    });

    this.on("pointerleave", () => {
      if (this.sprite !== buttonPressSprite) this.sprite = buttonIdleSprite;
    });
  }
}
