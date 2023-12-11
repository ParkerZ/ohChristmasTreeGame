import * as ex from "excalibur";
import { loader } from "./resources";
import { Level } from "./level";

const engine = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#5fcde4"),
  width: 800,
  height: 600,
  fixedUpdateFps: 60,
});

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 2500);

// Setup first level as a custom scene
const level = new Level();
engine.add("level", level);
engine.goToScene("level");

// Game events to handle
engine.on("hidden", () => {
  console.log("pause");
  engine.stop();
});
engine.on("visible", () => {
  console.log("start");
  engine.start();
});

// Start the engine
engine.start(loader).then(() => {
  console.log("game start");
});

// For test hook
(window as any).engine = engine;
(window as any).level = level;
