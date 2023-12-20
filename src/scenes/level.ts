import * as ex from "excalibur";
import { Player } from "../player";
import { ChristmasTree } from "../christmasTree";
import { StatusBar } from "../ui/statusBar";
import { SOUNDTRACK_VOLUME, TOTAL_HEAT, TOTAL_WATER } from "../constants";
import { TileMap } from "../maps/tileMap";
import { LevelBackground } from "../ui/levelBackground";
import { Campfire } from "../campfire";
import { Resources, barCanSprite, barWoodSprite } from "../resources";
import { Calendar } from "../ui/calendar";
import { SceneManager } from "../sceneManager";
import { LEVEL_MAP_LAYOUT } from "../maps/levelMap";
import { PlayerCameraMount } from "../playerCameraMount";

// Level should last 200 seconds
export class Level extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    if (Resources.sounds.soundtrack.isPaused())
      Resources.sounds.soundtrack.play(SOUNDTRACK_VOLUME);
    const player = new Player(
      engine.halfDrawWidth + 40,
      engine.halfDrawHeight + 300
    );

    const cameraMount = new PlayerCameraMount(player);

    const map = new TileMap(
      engine.halfDrawWidth,
      engine.halfDrawHeight,
      LEVEL_MAP_LAYOUT
    );
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
      calendar
    );

    const campfire = new Campfire(
      engine.halfDrawWidth + 350,
      engine.halfDrawHeight + 265,
      heatBar,
      calendar
    );

    const manager = new SceneManager(tree, campfire, calendar, player);

    const bg = new LevelBackground(this.camera);

    engine.add(player);
    engine.add(cameraMount);

    floorsToDraw.forEach((floorActor) => engine.add(floorActor));

    engine.add(waterBar);
    engine.add(heatBar);
    engine.add(calendar);
    engine.add(tree);
    engine.add(campfire);
    engine.add(manager);

    engine.add(bg);

    // For the test harness to be predicable
    if (!(window as any).__TESTING) {
      // Create camera strategy
      this.camera.pos = cameraMount.pos;
      this.camera.clearAllStrategies();
      this.camera.strategy.elasticToActor(cameraMount, 0.05, 0.1);
    }
  }
}
