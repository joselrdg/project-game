const fps = 1000 / 60;
let timeFps = 0
let timeSeg = 0;
let timeMin = 0;

const framesSprite = 8;

const canvasWidth = 832;
const canvasHeight = 640 - 32;

const cameraWidth = 832;
const cameraHeight = 576;

let cntLevel = 1

const mapTsize = 64;
const mpTsizeWidth = 64;
const mpTsizeHeight = 64;

let totalColsMap = 28;
// let colsMap = 13;
// let rowsMap = 13;

let createMapOn = true;

let cameraX = 0;
let cameraY = 0;

let screenX = 0;
let screenY = 0;

let xCartesian = 0;
let yCartesian = 0;
let xIsometric = 0;
let yIsometric = 0;

let offsetX = 0;
let offsetY = 0

let ambientVol = 0;
let fightVol = 0;

const delta = 1 / 60; // >> No está en uso, quitar del codigo o dejar 1/50
const heroSPEED = 256;

// const retrasoGolpe = 32;

let levelEnemy = 1;
const timeEnemy = 10; // tiempo en borrar enemigos en min
const collideEnemy = 16;

let xpP = 1;
let findHome = false;
let home1 = true

let enemyUpdate = [
  []
];

let heroAttributes = {
  level: 1,
  healthTotal: 5000,
  healthPercentage: 0,
  health: 5000,
  healthTime: 5,
  manaTotal: 100,
  manaPercentage: 0,
  mana: 100,
  manaTime: 5,
  strength: 100,
  dexterrity: 123,
  intelligent: 111,
  armor: 100,
  xp: 1,
  gold: 0,
  weapon: {
    shoot: false,
    restmana: 10,
    speed: 4,
    damage: 200,
    sxWeapon: 0,
    xOrigin: 0,
    yOrigin: 0,
    tTarget: 0,
    drrTarget: 0
  },
  items: {
    manaJar: 0,
    healthJar: 0,
  }

}

let missions = {
  mision1: {
    finish: false,
    target: 'By killing enough demonic creatures, you will attract the attention of more powerful demons.',
    totalDeadCreatures: 6,
    deadCreatures: 0
  },
  mision2: {
    finish: false,
    target: 'If you manage to steal a key from a creature from the underworld, you will be closer to hell.',
    key1: false,
    totalDeadCreatures: 1,
    deadCreatures: 0
  },
  mision3: {
    finish: false,
    target: 'If you want to go down to hell, you will have to find the entrance.',
    key1: false,
    totalDoors: 1,
    Doors: 0
  },
  mision4: {
    finish: false,
    target: 'By killing enough demonic creatures, you will attract the attention of more powerful demons.',
    totalDeadCreatures: 1,
    deadCreatures: 0
  },
  mision5: {
    finish: false,
    target: 'The keys possessed by the strongest demons will take you deeper.',
    key2: false,
    totalDeadCreatures: 1,
    deadCreatures: 0
  },
  mision6: {
    finish: false,
    target: 'You are getting closer to the bowels of hell, find a way to keep going down.',
    key1: false,
    totalDeadCreatures: 1,
    deadCreatures: 0
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}