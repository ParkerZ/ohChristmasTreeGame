import * as ex from "excalibur";

const buttonSound = require("../res/soundFX/button.wav");
const jumpSound = require("../res/soundFX/jump.wav");
const loseSound = require("../res/soundFX/lose.wav");
const ornamentSound = require("../res/soundFX/ornament.wav");
const waterSound = require("../res/soundFX/water.wav");
const winSound = require("../res/soundFX/win.wav");
const woodDropSound = require("../res/soundFX/woodDrop.mp3");
const woodPickupSound = require("../res/soundFX/woodPickup.wav");
const pageSound = require("../res/soundFX/page.wav");
const soundtrackSound = require("../res/soundFX/soundtrack.wav");

const playerFile = require("../res/spritesheet_players.png");
const envFile = require("../res/spritesheet_environment.png");
const calendarFile = require("../res/spritesheet_calendar.png");

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
const barBlueLeftFile = require("../res/statusBars/barHorizontal_blue_left.png");
const barBlueMidFile = require("../res/statusBars/barHorizontal_blue_mid.png");
const barBlueRightFile = require("../res/statusBars/barHorizontal_blue_right.png");
const barYellowLeftFile = require("../res/statusBars/barHorizontal_yellow_left.png");
const barYellowMidFile = require("../res/statusBars/barHorizontal_yellow_mid.png");
const barYellowRightFile = require("../res/statusBars/barHorizontal_yellow_right.png");
const barWhiteLeftFile = require("../res/statusBars/barHorizontal_white_left.png");
const barWhiteMidFile = require("../res/statusBars/barHorizontal_white_mid.png");
const barWhiteRightFile = require("../res/statusBars/barHorizontal_white_right.png");
const barCanFile = require("../res/statusBars/canUI.png");
const barWoodFile = require("../res/statusBars/woodUI.png");

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
    page: new ex.Sound(pageSound),
    soundtrack: new ex.Sound(soundtrackSound),
  },

  player: new ex.ImageSource(playerFile),
  env: new ex.ImageSource(envFile),
  calendar: new ex.ImageSource(calendarFile),

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

  barBlueLeft: new ex.ImageSource(barBlueLeftFile),
  barBlueMid: new ex.ImageSource(barBlueMidFile),
  barBlueRight: new ex.ImageSource(barBlueRightFile),
  barYellowLeft: new ex.ImageSource(barYellowLeftFile),
  barYellowMid: new ex.ImageSource(barYellowMidFile),
  barYellowRight: new ex.ImageSource(barYellowRightFile),
  barWhiteLeft: new ex.ImageSource(barWhiteLeftFile),
  barWhiteMid: new ex.ImageSource(barWhiteMidFile),
  barWhiteRight: new ex.ImageSource(barWhiteRightFile),
  barCan: new ex.ImageSource(barCanFile),
  barWood: new ex.ImageSource(barWoodFile),
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

const calendarSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.calendar,
  grid: {
    columns: 5,
    rows: 5,
    spriteWidth: 267,
    spriteHeight: 272,
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

const barBlueLeftSprite = Resources.barBlueLeft.toSprite();
const barBlueMidSprite = Resources.barBlueMid.toSprite();
const barBlueRightSprite = Resources.barBlueRight.toSprite();
const barYellowLeftSprite = Resources.barYellowLeft.toSprite();
const barYellowMidSprite = Resources.barYellowMid.toSprite();
const barYellowRightSprite = Resources.barYellowRight.toSprite();
const barWhiteLeftSprite = Resources.barWhiteLeft.toSprite();
const barWhiteMidSprite = Resources.barWhiteMid.toSprite();
const barWhiteRightSprite = Resources.barWhiteRight.toSprite();
const barCanSprite = Resources.barCan.toSprite();
const barWoodSprite = Resources.barWood.toSprite();

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
  calendarSpriteSheet,
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
  barBlueLeftSprite,
  barBlueMidSprite,
  barBlueRightSprite,
  barYellowLeftSprite,
  barYellowMidSprite,
  barYellowRightSprite,
  barWhiteLeftSprite,
  barWhiteMidSprite,
  barWhiteRightSprite,
  barCanSprite,
  barWoodSprite,
};
