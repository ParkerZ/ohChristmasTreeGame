import * as ex from "excalibur";
import { Resources, loader, ornamentSprite } from "./resources";
import { Level } from "./scenes/level";
import { StartButton } from "./ui/startButton";
import { Menu } from "./scenes/menu";

const engine = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#b2ebf7"),
  width: 800,
  height: 600,
  fixedUpdateFps: 60,
});

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 2500);

// Setup first level as a custom scene
const level = new Level();
engine.add("level", level);

// title screen
const menu = new Menu();
engine.add("menu", menu);
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
  Resources.sounds.soundtrack.play(0.1);
});

// For test hook
(window as any).engine = engine;
(window as any).level = level;
