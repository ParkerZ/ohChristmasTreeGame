import * as ex from "excalibur";
import { StartButton } from "../ui/startButton";
import { MenuBackground } from "../ui/menuBackground";
import { Resources, backgroundLoseHeatSprite } from "../resources";

export class LoseHeatMenu extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    const bg = new MenuBackground(backgroundLoseHeatSprite);
    const button = new StartButton(
      engine.halfDrawWidth,
      (engine.halfDrawHeight * 4) / 3
    );

    engine.add(bg);
    engine.add(button);
  }

  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    Resources.sounds.soundtrack.pause();
    Resources.sounds.lose.play(0.75);
  }
}
