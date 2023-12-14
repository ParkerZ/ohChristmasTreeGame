import * as ex from "excalibur";
import { Player } from "./player";
import { ChristmasTree } from "./christmasTree";
import { WaterBucket } from "./items/waterBucket";
import { Firewood } from "./items/firewood";
import { Ornament } from "./items/ornament";
import { StatusBar } from "./ui/statusBar";
import { TOTAL_HEAT, TOTAL_WATER } from "./constants";
import { SurfaceSlopedLeft } from "./floorTiles/surfaceSlopedLeft";
import { SurfaceClosed } from "./floorTiles/surfaceClosed";
import { SurfaceSlopedRight } from "./floorTiles/surfaceSlopedRight";
import { InteriorClosed } from "./floorTiles/interiorClosed";
import { SurfaceOpenRight } from "./floorTiles/surfaceOpenRight";
import { SurfaceOpenLeft } from "./floorTiles/surfaceOpenLeft";
import { TileMap } from "./tileMap";

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
      engine.halfDrawWidth + 40,
      engine.halfDrawHeight + 300
    );

    const map = new TileMap(engine.halfDrawWidth, engine.halfDrawHeight);
    const floorsToDraw = map.getFloorTiles();

    const waterBar = new StatusBar(20, 20, TOTAL_WATER, ex.Color.ExcaliburBlue);
    const heatBar = new StatusBar(20, 60, TOTAL_HEAT, ex.Color.Red);

    const tree = new ChristmasTree(
      engine.halfDrawWidth + 300,
      engine.halfDrawHeight + 260,
      waterBar,
      heatBar
    );

    engine.add(actor);

    floorsToDraw.forEach((floorActor) => engine.add(floorActor));

    engine.add(waterBar);
    engine.add(heatBar);
    engine.add(tree);

    // For the test harness to be predicable
    if (!(window as any).__TESTING) {
      // Create camera strategy
      this.camera.clearAllStrategies();
      this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
    }
  }
}
