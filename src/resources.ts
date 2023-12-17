import * as ex from "excalibur";

const buttonSound = require("../res/soundFX/button.wav");
const jumpSound = require("../res/soundFX/jump.wav");
const loseSound = require("../res/soundFX/lose.wav");
const ornamentSound = require("../res/soundFX/ornament.wav");
const waterSound = require("../res/soundFX/water.wav");
const winSound = require("../res/soundFX/win.wav");
const woodDropSound = require("../res/soundFX/woodDrop.mp3");
const woodPickupSound = require("../res/soundFX/woodPickup.wav");
const soundtrackSound = require("../res/soundFX/soundtrack.wav");

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
const campfireWoodFile = require("../res/fire/wood.png");
const campfireFire1File = require("../res/fire/fire1.png");
const campfireFire2File = require("../res/fire/fire2.png");
const campfireFire3File = require("../res/fire/fire3.png");

const Resources = {
  sounds: {
    button: new ex.Sound(buttonSound),
    jump: new ex.Sound(jumpSound),
    lose: new ex.Sound(loseSound),
    ornament: new ex.Sound(ornamentSound),
    water: new ex.Sound(waterSound),
    win: new ex.Sound(winSound),
    woodDrop: new ex.Sound(woodDropSound),
    woodPickup: new ex.Sound(woodPickupSound),
    soundtrack: new ex.Sound(soundtrackSound),
  },

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
  campfireWood: new ex.ImageSource(campfireWoodFile),
  campfireFire1: new ex.ImageSource(campfireFire1File),
  campfireFire2: new ex.ImageSource(campfireFire2File),
  campfireFire3: new ex.ImageSource(campfireFire3File),
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

const campfireWoodSprite = Resources.campfireWood.toSprite();
const campfireFire1Sprite = Resources.campfireFire1.toSprite();
const campfireFire2Sprite = Resources.campfireFire2.toSprite();
const campfireFire3Sprite = Resources.campfireFire3.toSprite();

for (const res in Resources) {
  if (res !== "sounds") {
    loader.addResource((Resources as any)[res]);
    continue;
  }
  for (const sound in (Resources as any).sounds) {
    loader.addResource((Resources as any).sounds[sound]);
  }
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
  campfireWoodSprite,
  campfireFire1Sprite,
  campfireFire2Sprite,
  campfireFire3Sprite,
};
