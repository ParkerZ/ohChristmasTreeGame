import * as ex from "excalibur";
import { StartButton } from "../ui/startButton";
import { MenuBackground } from "../ui/menuBackground";
import { backgroundMenuSprite } from "../resources";

export class MainMenu extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    const bg = new MenuBackground(backgroundMenuSprite);
    const button = new StartButton(
      engine.halfDrawWidth,
      (engine.halfDrawHeight * 4) / 3
    );

    engine.add(bg);
    engine.add(button);
  }
}
