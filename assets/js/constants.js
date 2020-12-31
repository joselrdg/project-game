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
let colsMap = 64;
let rowsMap = 64;

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



const delta = 1 / 50; // >> No está en uso, quitar del codigo o dejar 1/50
const heroSPEED = 256;

// const retrasoGolpe = 32;

let levelEnemy = 1;
const timeEnemy = 10; // tiempo en borrar enemigos en min
const collideEnemy = 30;


let heroAttributes = {
  healthTotal: 10000,
  healthPercentage: 0,
  health: 10000,
  strength: 100,
  armor: 100,
  weapon: {
    shoot: false,
    speed: 0.5,
    damage: 0,
    sxWeapon: 0,
    xOrigin: 0,
    yOrigin: 0,
    xTarget: 0,
    yTarget: 0
  }

}

let castSpell = [];



let enemyUpdate = [
  []
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}