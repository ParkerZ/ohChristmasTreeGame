import * as ex from "excalibur";

const jumpSound = require("../res/jump.wav");
const bloopSound = require("../res/bloop.wav");
const playerFile = require("../res/spritesheet_players.png");
const envFile = require("../res/spritesheet_environment.png");
const canFile = require("../res/can.png");
const ornamentFile = require("../res/ornament.png");
const woodFile = require("../res/wood.png");
const bgMenuFile = require("../res/bgWithTree.png");
const bgLevelFile = require("../res/bgWithoutTree.png");
const buttonIdleFile = require("../res/buttons/buttonIdle.png");
const buttonPressFile = require("../res/buttons/buttonPress.png");
const buttonHoverFile = require("../res/buttons/buttonHover.png");
const buttonTextFile = require("../res/buttons/buttonText.png");

const Resources = {
  player: new ex.ImageSource(playerFile),
  env: new ex.ImageSource(envFile),
  can: new ex.ImageSource(canFile),
  wood: new ex.ImageSource(woodFile),
  ornament: new ex.ImageSource(ornamentFile),
  backgroundMenu: new ex.ImageSource(bgMenuFile),
  backgroundLevel: new ex.ImageSource(bgLevelFile),
  buttonIdle: new ex.ImageSource(buttonIdleFile),
  buttonPress: new ex.ImageSource(buttonPressFile),
  buttonHover: new ex.ImageSource(buttonHoverFile),
  buttonText: new ex.ImageSource(buttonTextFile),
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

const backgroundMenuSprite = Resources.backgroundMenu.toSprite();
const backgroundLevelSprite = Resources.backgroundLevel.toSprite();

const buttonIdleSprite = Resources.buttonIdle.toSprite();
const buttonPressSprite = Resources.buttonPress.toSprite();
const buttonHoverSprite = Resources.buttonHover.toSprite();
const buttonTextSprite = Resources.buttonText.toSprite();

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
  backgroundMenuSprite,
  backgroundLevelSprite,
  buttonIdleSprite,
  buttonPressSprite,
  buttonHoverSprite,
  buttonTextSprite,
};
