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
import { TUTORIAL_MAP_LAYOUT } from "../maps/tutorialMap";
import { Igloo } from "../igloo";

export class Tutorial extends ex.Scene {
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

    const map = new TileMap(
      engine.halfDrawWidth,
      engine.halfDrawHeight,
      TUTORIAL_MAP_LAYOUT,
      1,
      1,
      1
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
      ex.vec(-20, -23),
      400,
      25,
      false
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
      350,
      25,
      false
    );

    const calendar = new Calendar(engine.drawWidth - 140, 20, false);

    const tree = new ChristmasTree(
      engine.halfDrawWidth + 550,
      engine.halfDrawHeight + 260,
      waterBar,
      calendar,
      false
    );

    const campfire = new Campfire(
      engine.halfDrawWidth + 675,
      engine.halfDrawHeight + 265,
      heatBar,
      calendar,
      false
    );

    const manager = new SceneManager(tree, campfire, calendar, player, true);

    const igloo = new Igloo(
      engine.halfDrawWidth + 1500,
      engine.halfDrawHeight + 265
    );

    const inputText = new ex.Label({
      pos: ex.vec(200, engine.halfDrawHeight + 450),
      text: "A, D, Space to move",
      font: new ex.Font({ size: 48, family: "verdana" }),
    });

    const bg = new LevelBackground(this.camera);

    engine.add(player);

    floorsToDraw.forEach((floorActor) => engine.add(floorActor));

    engine.add(waterBar);
    engine.add(heatBar);
    engine.add(calendar);
    engine.add(tree);
    engine.add(campfire);
    engine.add(manager);
    engine.add(igloo);

    engine.add(inputText);
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
