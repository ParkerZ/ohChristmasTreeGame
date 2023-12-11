import * as ex from "excalibur";
import { Player } from "./player";
import { Floor } from "./floor";
import { ChristmasTree } from "./christmasTree";
import { WaterBucket } from "./items/waterBucket";
import { Firewood } from "./items/firewood";
import { Ornament } from "./items/ornament";
import { StatusBar } from "./ui/statusBar";
import { TOTAL_HEAT, TOTAL_WATER } from "./constants";

export class Level extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    // Create collision groups for the game
    ex.CollisionGroupManager.create("player");
    ex.CollisionGroupManager.create("floor");
    ex.CollisionGroupManager.create("items");
    ex.CollisionGroupManager.create("tree");

    // Compose actors in scene
    const actor = new Player(
      engine.halfDrawWidth + 100,
      engine.halfDrawHeight - 100
    );

    const floor = new Floor(0, 300, 45, 1);
    const otherFloor = new Floor(engine.halfDrawWidth + 50, 200, 5, 1);

    const waterBar = new StatusBar(20, 20, TOTAL_WATER, ex.Color.ExcaliburBlue);
    const heatBar = new StatusBar(20, 60, TOTAL_HEAT, ex.Color.Red);

    const tree = new ChristmasTree(
      engine.halfDrawWidth + 300,
      262,
      waterBar,
      heatBar
    );

    const bucket = new WaterBucket(engine.halfDrawWidth - 200, 300 - 30);
    const log = new Firewood(engine.halfDrawWidth - 100, 300 - 30);
    const ornament = new Ornament(engine.halfDrawWidth + 1000, 300 - 30);

    engine.add(actor);
    engine.add(floor);
    engine.add(otherFloor);
    engine.add(waterBar);
    engine.add(heatBar);
    engine.add(tree);
    engine.add(bucket);
    engine.add(log);
    engine.add(ornament);

    // For the test harness to be predicable
    if (!(window as any).__TESTING) {
      // Create camera strategy
      this.camera.clearAllStrategies();
      this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
    }
  }
}
