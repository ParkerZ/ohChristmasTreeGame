import * as ex from "excalibur";
import { Player } from "../player";
import { ChristmasTree } from "../christmasTree";
import { StatusBar } from "../ui/statusBar";
import { TOTAL_HEAT, TOTAL_WATER } from "../constants";
import { TileMap } from "../tileMap";
import { LevelBackground } from "../ui/levelBackground";
import { Campfire } from "../campfire";
import { barCanSprite, barWoodSprite } from "../resources";
import { Calendar } from "../ui/calendar";

// Level should last 225 seconds
export class Level extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    ex.CollisionGroupManager.create("player");
    ex.CollisionGroupManager.create("floor");
    ex.CollisionGroupManager.create("items");
    ex.CollisionGroupManager.create("tree");

    const player = new Player(
      engine.halfDrawWidth + 40,
      engine.halfDrawHeight + 300
    );

    const map = new TileMap(engine.halfDrawWidth, engine.halfDrawHeight);
    const floorsToDraw = map.getFloorTiles();

    const waterBarIcon = barCanSprite;
    waterBarIcon.scale = ex.vec(0.2, 0.2);
    const waterBar = new StatusBar(
      20,
      20,
      TOTAL_WATER,
      "blue",
      waterBarIcon,
      ex.vec(-20, -23)
    );

    const heatBarIcon = barWoodSprite;
    barWoodSprite.scale = ex.vec(0.6, 0.6);
    const heatBar = new StatusBar(
      20,
      70,
      TOTAL_HEAT,
      "yellow",
      heatBarIcon,
      ex.vec(-95, -96),
      350
    );

    const calendar = new Calendar(engine.drawWidth - 140, 20);

    const tree = new ChristmasTree(
      engine.halfDrawWidth + 225,
      engine.halfDrawHeight + 260,
      waterBar,
      heatBar
    );

    const campfire = new Campfire(
      engine.halfDrawWidth + 350,
      engine.halfDrawHeight + 265,
      heatBar
    );

    const bg = new LevelBackground(this.camera);

    engine.add(player);

    floorsToDraw.forEach((floorActor) => engine.add(floorActor));

    engine.add(waterBar);
    engine.add(heatBar);
    engine.add(calendar);
    engine.add(tree);
    engine.add(campfire);

    engine.add(bg);

    // For the test harness to be predicable
    if (!(window as any).__TESTING) {
      // Create camera strategy
      this.camera.pos = player.pos;
      this.camera.clearAllStrategies();
      this.camera.strategy.elasticToActor(player, 0.05, 0.1);
    }
  }
}
