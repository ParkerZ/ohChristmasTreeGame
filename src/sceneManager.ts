import * as ex from "excalibur";
import { Calendar } from "./ui/calendar";
import { Campfire } from "./campfire";
import { ChristmasTree } from "./christmasTree";
import { Player } from "./player";
import {
  BUCKET_WATER_VALUE,
  CALENDAR_DAY_INTERVAL,
  LOG_HEAT_VALUE,
  TOTAL_HEAT,
  TOTAL_WATER,
} from "./constants";
import { DisplayText } from "./ui/displayText";

export class SceneManager extends ex.Actor {
  christmasTree;
  campfire;
  calendar;
  player;
  isTutorial;
  lastPlayerInv = "empty";
  displayText: DisplayText | undefined;

  constructor(
    christmasTree: ChristmasTree,
    campfire: Campfire,
    calendar: Calendar,
    player: Player,
    isTutorial = false
  ) {
    super();

    this.christmasTree = christmasTree;
    this.campfire = campfire;
    this.calendar = calendar;
    this.player = player;
    this.isTutorial = isTutorial;
  }

  disableAll(): void {
    this.christmasTree.setIsActive(false);
    this.campfire.setIsActive(false);
    this.calendar.setIsActive(false);
  }

  // Update loop to be run in level
  onUpdate(engine: ex.Engine): void {
    if (this.christmasTree.getWater() < 0) {
      this.disableAll();
      engine.goToScene("loseWater");
      return;
    }

    if (this.campfire.getHeat() < 0) {
      this.disableAll();
      engine.goToScene("loseHeat");
      return;
    }

    if (this.calendar.getIsChristmas()) {
      this.disableAll();
      engine.goToScene("win", this.christmasTree.getDecor());
      return;
    }
  }

  // Update loop to be run in tutorial
  onUpdateTutorial(engine: ex.Engine): void {
    if (this.player.getInventory() !== this.lastPlayerInv) {
      this.lastPlayerInv = this.player.getInventory();

      switch (this.player.getInventory()) {
        case "bucket":
          this.christmasTree.setIsActive(true);
          this.displayText = new DisplayText(
            20,
            125,
            "Bring the water back to your tree!"
          );
          engine.add(this.displayText);
          break;
        case "log":
          this.campfire.setIsActive(true);
          this.displayText = new DisplayText(
            20,
            125,
            "Bring the logs back to your campfire!"
          );
          engine.add(this.displayText);
          break;
        case "ornament":
          this.displayText = new DisplayText(
            20,
            125,
            "Find all the ornaments and decorate your tree!"
          );
          engine.add(this.displayText);
          break;
        default:
          this.displayText?.kill();
          this.displayText = undefined;
          break;
      }
    }

    if (this.christmasTree.getWater() <= TOTAL_WATER - BUCKET_WATER_VALUE) {
      this.christmasTree.setIsActive(false);
    }

    if (this.campfire.getHeat() <= TOTAL_HEAT - LOG_HEAT_VALUE) {
      this.campfire.setIsActive(false);
    }

    if (
      this.christmasTree.getWater() !== TOTAL_WATER &&
      this.campfire.getHeat() !== TOTAL_HEAT &&
      this.christmasTree.getDecor() !== 0 &&
      this.displayText === undefined
    ) {
      this.displayText = new DisplayText(
        20,
        125,
        "Keep your tree watered and warm until the 25th.\nGo inside your igloo to continue!"
      );
      engine.add(this.displayText);

      // Show calendar but prevent it from progressing past the 2nd
      this.calendar.setIsActive(true);
      setTimeout(() => {
        this.calendar.setIsActive(false);
      }, CALENDAR_DAY_INTERVAL + 2000);
    }
  }

  onPostUpdate(engine: ex.Engine, _delta: number): void {
    if (this.isTutorial) {
      this.onUpdateTutorial(engine);
    } else {
      this.onUpdate(engine);
    }
  }
}
