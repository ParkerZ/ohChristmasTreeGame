import * as ex from "excalibur";

const jumpSound = require("../res/jump.wav");
const bloopSound = require("../res/bloop.wav");
const playerFile = require("../res/spritesheet_players.png");
const envFile = require("../res/spritesheet_environment.png");
const canFile = require("../res/can.png");
const ornamentFile = require("../res/ornament.png");
const woodFile = require("../res/wood.png");

const Resources = {
  player: new ex.ImageSource(playerFile),
  env: new ex.ImageSource(envFile),
  can: new ex.ImageSource(canFile),
  wood: new ex.ImageSource(woodFile),
  ornament: new ex.ImageSource(ornamentFile),
  jump: new ex.Sound(jumpSound),
  bloop: new ex.Sound(bloopSound),
};

const loader = new ex.Loader();

const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.player,
  grid: {
    columns: 8,
    rows: 8,
    spriteWidth: 120,
    spriteHeight: 200,
  },
  spacing: {
    originOffset: { y: 80 },
    margin: { x: 8, y: 56 },
  },
});

const envSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.env,
  grid: {
    columns: 14,
    rows: 7,
    spriteWidth: 70,
    spriteHeight: 70,
  },
});

const canSprite = Resources.can.toSprite();
const woodSprite = Resources.wood.toSprite();
const ornamentSprite = Resources.ornament.toSprite();

for (const res in Resources) {
  loader.addResource((Resources as any)[res]);
}

export {
  Resources,
  loader,
  playerSpriteSheet,
  envSpriteSheet,
  canSprite,
  woodSprite,
  ornamentSprite,
};
