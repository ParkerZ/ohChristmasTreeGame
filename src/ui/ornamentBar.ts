import * as ex from "excalibur";
import { ornamentEmptyIconSprite, ornamentFullIconSprite } from "../resources";

export class OrnamentBar extends ex.ScreenElement {
  private numOrnaments = 0;

  constructor() {
    super({
      x: 0,
      y: 0,
    });
  }

  public setNumOrnaments(val: number): void {
    this.numOrnaments = val;

    const emptySprite = ornamentEmptyIconSprite.clone();
    const fullSprite = ornamentFullIconSprite.clone();

    this.graphics.hide();

    new Array(5).fill(true).forEach((_e, i) => {
      if (i < this.numOrnaments) {
        this.graphics.show(fullSprite, { offset: ex.vec(110 + i * 100, 175) });
      } else {
        this.graphics.show(emptySprite, { offset: ex.vec(110 + i * 100, 175) });
      }
    });
  }
}
