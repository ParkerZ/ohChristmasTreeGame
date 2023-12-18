import * as ex from "excalibur";
import { StartButton } from "../ui/startButton";
import { MenuBackground } from "../ui/menuBackground";
import { Resources, backgroundWinSprite } from "../resources";
import { OrnamentBar } from "../ui/ornamentBar";

export class WinMenu extends ex.Scene {
  ornamentBar: OrnamentBar | undefined;

  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    const bg = new MenuBackground(backgroundWinSprite);
    const button = new StartButton(
      engine.halfDrawWidth,
      (engine.halfDrawHeight * 4) / 3
    );

    this.ornamentBar = new OrnamentBar();

    engine.add(bg);
    engine.add(button);
    engine.add(this.ornamentBar);
  }

  onActivate(context: ex.SceneActivationContext<number>): void {
    Resources.sounds.soundtrack.pause();
    Resources.sounds.win.play(0.75);

    this.ornamentBar?.setNumOrnaments(context.data ?? 0);
  }
}
