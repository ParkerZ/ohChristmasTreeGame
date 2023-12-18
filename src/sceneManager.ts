import * as ex from "excalibur";
import { Calendar } from "./ui/calendar";
import { Campfire } from "./campfire";
import { ChristmasTree } from "./christmasTree";

export class SceneManager extends ex.Actor {
  christmasTree;
  campfire;
  calendar;

  constructor(
    christmasTree: ChristmasTree,
    campfire: Campfire,
    calendar: Calendar
  ) {
    super();

    this.christmasTree = christmasTree;
    this.campfire = campfire;
    this.calendar = calendar;
  }

  disableAll(): void {
    this.christmasTree.setIsActive(false);
    this.campfire.setIsActive(false);
    this.calendar.setIsActive(false);
  }

  onPostUpdate(engine: ex.Engine, _delta: number): void {
    if (this.christmasTree.getWater() < 0) {
      this.disableAll();
      engine.goToScene("loseWater");
    }

    if (this.campfire.getHeat() < 0) {
      this.disableAll();
      engine.goToScene("loseHeat");
    }

    if (this.calendar.getIsChristmas()) {
      this.disableAll();
      engine.goToScene("win", this.christmasTree.getDecor());
    }
  }
}
