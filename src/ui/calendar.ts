import * as ex from "excalibur";
import { calendarSpriteSheet } from "../resources";
import { CalendarPage } from "./calendarPage";
import { CALENDAR_DAY_INTERVAL } from "../constants";

export class Calendar extends ex.ScreenElement {
  private dayIndex = 0;
  sprite;
  isActive;
  isChristmas = false;
  private hasActivated = false;

  constructor(x: number, y: number, isActive = true) {
    super({
      name: "calendar",
      pos: new ex.Vector(x, y),
    });

    this.sprite = calendarSpriteSheet.getSprite(0, 0) as ex.Sprite;
    this.sprite.scale = ex.vec(0.4, 0.4);

    this.isActive = isActive;
  }

  getIsChristmas(): boolean {
    return this.isChristmas;
  }

  setIsActive(val: boolean): void {
    this.isActive = val;
  }

  onPreUpdate(engine: ex.Engine, _delta: number): void {
    if (!this.hasActivated && this.isActive) {
      this.onActivate(engine);
    }
  }

  onActivate(engine: ex.Engine): void {
    this.hasActivated = true;
    this.z = -1.1;
    this.graphics.use(this.sprite);

    setTimeout(() => {
      this.nextDay(engine);
    }, CALENDAR_DAY_INTERVAL);
  }

  nextDay(engine: ex.Engine): void {
    if (!this.isActive) return;
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
        this.isChristmas = true;
      }, 1000);
      return;
    }

    setTimeout(() => {
      this.nextDay(engine);
    }, CALENDAR_DAY_INTERVAL);
  }
}
