import * as ex from "excalibur";

export class DisplayText extends ex.ScreenElement {
  text;

  constructor(x: number, y: number, text: string) {
    super({
      x,
      y,
    });

    this.text = text;
  }

  onInitialize(_engine: ex.Engine): void {
    const graphic = new ex.Text({
      text: this.text,
      font: new ex.Font({ size: 24, family: "verdana" }),
    });
    this.graphics.use(graphic);
  }
}
