import * as ex from "excalibur";
import { calendarSpriteSheet } from "../resources";
import { CalendarPage } from "./calendarPage";

export class Calendar extends ex.ScreenElement {
  private dayIndex = 0;
  private dayIntervalMS = 8000;
  sprite;

  constructor(x: number, y: number) {
    super({
      name: "calendar",
      pos: new ex.Vector(x, y),
    });

    this.sprite = calendarSpriteSheet.getSprite(0, 0) as ex.Sprite;
    this.sprite.scale = ex.vec(0.4, 0.4);
  }

  onInitialize(engine: ex.Engine): void {
    this.z = -1.1;
    this.graphics.use(this.sprite);

    setTimeout(() => {
      this.nextDay(engine);
    }, this.dayIntervalMS);
  }

  nextDay(engine: ex.Engine): void {
    this.dayIndex += 1;

    const page = new CalendarPage(this.pos.x, this.pos.y, this.sprite);
    engine.add(page);

    const x = this.dayIndex % calendarSpriteSheet.columns;
    const y = Math.min(
      Math.floor(this.dayIndex / calendarSpriteSheet.columns),
      calendarSpriteSheet.rows - 1
    );

    this.sprite = calendarSpriteSheet.getSprite(x, y) as ex.Sprite;
    this.sprite.scale = ex.vec(0.4, 0.4);
    this.graphics.use(this.sprite);

    if (this.dayIndex === 24) {
      setTimeout(() => {
        alert("You win");
      }, 1000);
      return;
    }

    setTimeout(() => {
      this.nextDay(engine);
    }, this.dayIntervalMS);
  }
}
