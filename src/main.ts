import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { MainMenu } from "./scenes/mainMenu";
import { WinMenu } from "./scenes/winMenu";
import { LoseHeatMenu } from "./scenes/loseHeatMenu";
import { SOUNDTRACK_VOLUME } from "./constants";

const engine = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#b2ebf7"),
  width: 800,
  height: 600,
  fixedUpdateFps: 60,
});

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 2500);

// Create global collision groups
ex.CollisionGroupManager.create("player");
ex.CollisionGroupManager.create("floor");
ex.CollisionGroupManager.create("items");
ex.CollisionGroupManager.create("tree");

// title screen - level is created in menu
const menu = new MainMenu();

// win/lose screens
const winScreen = new WinMenu();
const loseHeatScreen = new LoseHeatMenu();
const loseWaterScreen = new LoseHeatMenu();

engine.add("menu", menu);
engine.add("win", winScreen);
engine.add("loseHeat", loseHeatScreen);
engine.add("loseWater", loseWaterScreen);

engine.goToScene("menu");

// Game events to handle
engine.on("hidden", () => {
  engine.stop();
});
engine.on("visible", () => {
  engine.start();
});

// Start the engine
engine.start(loader).then(() => {
  Resources.sounds.soundtrack.loop = true;
  Resources.sounds.soundtrack.play(SOUNDTRACK_VOLUME);
});

// For test hook
(window as any).engine = engine;
