import * as ex from "excalibur";
import { StartButton } from "../ui/startButton";
import { MenuBackground } from "../ui/menuBackground";
import { Resources, backgroundMenuSprite } from "../resources";
import { SOUNDTRACK_VOLUME } from "../constants";

export class MainMenu extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    const bg = new MenuBackground(backgroundMenuSprite);
    const button = new StartButton(
      engine.halfDrawWidth,
      (engine.halfDrawHeight * 4) / 3,
      true
    );

    engine.add(bg);
    engine.add(button);
  }

  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    Resources.sounds.soundtrack.loop = true;
    Resources.sounds.soundtrack.play(SOUNDTRACK_VOLUME);
  }
}
