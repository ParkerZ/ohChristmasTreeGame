import * as ex from "excalibur";
import { StartButton } from "../ui/startButton";
import { MenuBackground } from "../ui/menuBackground";

export class Menu extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    const bg = new MenuBackground();
    const button = new StartButton(
      engine.halfDrawWidth,
      (engine.halfDrawHeight * 4) / 3
    );

    engine.add(bg);
    engine.add(button);
  }
}
