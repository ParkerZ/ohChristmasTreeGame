import * as ex from "excalibur";
import { envSpriteSheet } from "../resources";
import { ENV_TILE_RATIO } from "../constants";
import { randomBool, randomInt } from "../utils";

const spritePool = [
  envSpriteSheet.getSprite(10, 1) as ex.Sprite,
  envSpriteSheet.getSprite(9, 4) as ex.Sprite,
  envSpriteSheet.getSprite(13, 4) as ex.Sprite,
  envSpriteSheet.getSprite(13, 5) as ex.Sprite,
  envSpriteSheet.getSprite(2, 4) as ex.Sprite,
  envSpriteSheet.getSprite(0, 2) as ex.Sprite,
  envSpriteSheet.getSprite(13, 1) as ex.Sprite,
  envSpriteSheet.getSprite(4, 4) as ex.Sprite,
  envSpriteSheet.getSprite(5, 4) as ex.Sprite,
];

export class Decor extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      name: "Decor",
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      anchor: ex.Vector.Zero,
    });

    const sprite = spritePool[randomInt(9)].clone();
    sprite.scale = new ex.Vector(ENV_TILE_RATIO, ENV_TILE_RATIO);
    sprite.flipHorizontal = randomBool();

    this.graphics.use(sprite, {
      anchor: ex.Vector.Zero,
    });

    this.z = -1;
  }
}
