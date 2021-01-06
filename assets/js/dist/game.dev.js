"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(ctx, canvas) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.canvas = canvas; // this.layer = map
    // this.layerWidth = this.layer.tsize
    // this.layerHeight = layer.tsize;
    // this.delta = delta;

    this.interfacePlayer = new InerfacePlayer(this.ctx, 0, cameraHeight, canvasWidth, canvasHeight - cameraHeight);
    this.background = new Background(this.ctx, mapHouse, 'casa');
    this.player = new Player(mapHouse, 160, 160, this.canvas); // x e y -------------> 

    this.camera = new Camera(cameraWidth, cameraHeight); // this.player.sprite

    this.enemies = new Enemy(this.ctx);
    this.drawInterval = undefined;
    this.pause = true;
    this.loaded = false;
    this.currentMap = {};
    this.frameCount = 0;
    this.syIcon = 0;
    this.xPlayerRand = 0;
    this.yPlayerRand = 0;
    this.dungeonFire = false;
    this.sxPlayer = 0;
    this.syPlayer = 8;
    this.sxEnemy = 0;
    this.die = false;
    this.drrShot = 0;
    this.animatedShot = false;
    this.portal = false;
    this.digit = 1;
    this.finalBoss = false;

    window.onload = function () {
      var context = new AudioContext();
    };

    var sound = new Howl({
      src: ['./assets/sound/playDemon.ogg']
    });
    var theme = new Audio('./assets/sound/LordMavras.ogg');
    theme.volume = ambientVol;
    var theme2 = new Audio('./assets/sound/biggestDiscovery.ogg');
    theme2.volume = ambientVol;
    var theme3 = new Audio('./assets/sound/malignChords.ogg');
    theme3.volume = ambientVol;
    var theme4 = new Audio('./assets/sound/ninthCrewman.ogg');
    theme4.volume = ambientVol;
    var theme5 = new Audio('./assets/sound/playDemon.ogg');
    theme5.volume = ambientVol;
    this.sounds = {
      sound: sound // theme,
      // theme2,
      // theme3,
      // theme4,
      // theme5,
      // coin: new Audio('./assets/sound/coin.wav')

    }; //    this.sound = new Howl({
    //         src: ['https://www.youtube.com/watch?v=ZK6BbP-9hGM&ab_channel=PatrickdeArteaga']
    //       });
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      var _this = this;

      var pause = true; // console.log(this.sounds)

      if (!this.drawInterval) {
        this.drawInterval = setInterval(function () {
          _this.timer();

          if (Keyboard.isDown(Keyboard.PAUSE)) {
            console.log('se dio pause');
            _this.interfacePlayer.k = false;
            pause = true;

            _this.sounds.theme3.play();

            _this.sounds.theme.pause();

            _this.sounds.theme.currentTime = 0;

            _this.sounds.theme4.pause();

            _this.sounds.theme4.currentTime = 0;

            _this.sounds.theme5.pause();

            _this.sounds.theme5.currentTime = 0;
          }

          if (Keyboard.isDown(Keyboard.ENTER)) {
            console.log('se dio enter');
            _this.interfacePlayer.k = false;

            _this.sounds.sound.play(); // pause = false;
            // this.sounds.theme4.play()
            // this.sounds.theme3.pause();
            // this.sounds.theme3.currentTime = 0;

          }

          if (Keyboard.isDown(Keyboard.CONTROLES)) {
            console.log('se dio k');
            pause = true;
            _this.interfacePlayer.k = true; // this.sounds.theme2.play()
            // this.sounds.theme3.stop()
          }

          if (!pause) {
            // this.timer()
            if (mapRandon.createMapOn) {
              createMap(colsMap, rowsMap, _this.finalBoss); // this.camera = new Camera(mapRandon, cameraWidth, cameraHeight)
            } else {
              _this.clear();

              _this.move();

              _this.draw();
            }
          } else {
            _this.interfacePlayer.renderInterface(_this.syIcon, heroAttributes.healthPercentage, pause, _this.frameCount);
          }
        }, fps);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }, {
    key: "draw",
    value: function draw() {
      // let place
      // if (this.player.casa) {
      //     place = 0
      // } else if (this.player.doorWorld) {
      //     place = 1;
      // } else if (this.player.doorDungeon) {
      //     place = 2
      // }
      // console.log(this.player.cntDungeon)
      this.background.renderingMap(0, this.frameCount, this.portal, this.dungeonFire);
      this.background.renderingMap(1, this.frameCount, this.portal, this.dungeonFire); /// esto estaba en el if de debajo

      this.player.renderPlayer(ctx, this.sxPlayer, this.syPlayer);

      if (enemyUpdate.length > 0) {
        this.enemies.renderEnemy(this.sxEnemy);
      }

      this.background.renderingMap(2, this.frameCount, this.portal, this.dungeonFire);
      this.interfacePlayer.renderInterface(this.syIcon, heroAttributes.healthPercentage);
    }
  }, {
    key: "move",
    value: function move() {
      if (heroAttributes.health > 1) {
        if (Keyboard.isDown(Keyboard.DIGIT1)) {
          this.digit = 1;
        } else if (Keyboard.isDown(Keyboard.DIGIT2)) {
          this.digit = 2;
        } else if (Keyboard.isDown(Keyboard.DIGIT3)) {
          this.digit = 3;
        } else if (Keyboard.isDown(Keyboard.DIGIT4)) {
          this.digit = 4;
        } else if (Keyboard.isDown(Keyboard.DIGIT5)) {
          this.digit = 5;
        } else if (Keyboard.isDown(Keyboard.DIGIT6)) {
          this.digit = 6;
        } // handle hero


        var dirx = 0;
        var diry = 0;

        if (Keyboard.isDown(Keyboard.UP) && Keyboard.isDown(Keyboard.LEFT)) {
          diry = -0.8;
          dirx = -0.8;
          this.syPlayer = 3;
        } else if (Keyboard.isDown(Keyboard.UP) && Keyboard.isDown(Keyboard.RIGHT)) {
          diry = -0.8;
          dirx = 0.8;
          this.syPlayer = 5;
        } else if (Keyboard.isDown(Keyboard.DOWN) && Keyboard.isDown(Keyboard.LEFT)) {
          diry = 0.8;
          dirx = -0.8;
          this.syPlayer = 1;
        } else if (Keyboard.isDown(Keyboard.DOWN) && Keyboard.isDown(Keyboard.RIGHT)) {
          diry = 0.8;
          dirx = 0.8;
          this.syPlayer = 6;
        } else if (Keyboard.isDown(Keyboard.LEFT)) {
          dirx = -1;
          this.syPlayer = 2;
        } else if (Keyboard.isDown(Keyboard.RIGHT)) {
          dirx = 1;
          this.syPlayer = 7;
        } else if (Keyboard.isDown(Keyboard.UP)) {
          diry = -1;
          this.syPlayer = 4;
        } else if (Keyboard.isDown(Keyboard.DOWN)) {
          diry = 1;
          this.syPlayer = 0;
        }

        this.playerShot(this.digit);
        this.player.heroMove(dirx, diry, this.digit);
        this.camera.update(this.player.map.cols, this.player.map.rows, xCartesian, yCartesian);
        this.enemies.enemyMove(this.animatedShot, this.drrShot, heroAttributes.strength);
        this.mapControl();
        this.keysControl();
      } else {
        if (this.sxPlayer < 9) {
          this.sxPlayer = 8; // this.animatedShot = true
        } else if (!this.animatedShot) {
          this.sxPlayer = 17;
        }

        if (this.sxPlayer >= 17) {
          this.sxPlayer = 17;
          setTimeout(function () {
            location.reload();
          }, 3000);
        }

        this.enemies.enemyMove(this.animatedShot, this.drrShot, heroAttributes.strength);
      }
    }
  }, {
    key: "timer",
    value: function timer() {
      timeFps += fps;

      if (timeFps > 999.999999999999) {
        timeSeg++;

        if (timeSeg === 5) {
          timeSeg = 0; // console.log(heroAttributes)
          // console.log(this.frameCount)
          // console.log(enemyUpdate)
          // timeMin++;
        }

        timeFps = 0;
      }

      if (timeFps === 0 && // nacen enemigos cada 30ds
      timeSeg === 0 || timeFps === 0 && timeSeg === 30) {
        this.background.update = false;
      }

      this.frameCount++;

      if (this.frameCount % framesSprite === 0) {
        this.frameCount = 0;
      } // if (this.canvas) {


      if (Keyboard.isDown(Keyboard.LEFT) || Keyboard.isDown(Keyboard.RIGHT) || Keyboard.isDown(Keyboard.UP) || Keyboard.isDown(Keyboard.DOWN)) {
        this.animatedShot = false;

        if (this.sxPlayer > 6 && heroAttributes.health > 0) {
          //###################### mirar el ultimo
          this.sxPlayer = 0;
        }

        if (this.frameCount === 0) {
          this.sxPlayer++;
        }
      }

      if (this.sxEnemy > 6) {
        this.sxEnemy = 0;
      }

      if (this.frameCount === 0) {
        this.sxEnemy++;
      } // }

    }
  }, {
    key: "keysControl",
    value: function keysControl() {
      this.interfacePlayer.key1 = this.enemies.dropKey.keys[0];
      this.interfacePlayer.key2 = this.enemies.dropKey.keys[1];
      this.interfacePlayer.key3 = this.enemies.dropKey.keys[2];
      this.interfacePlayer.key4 = this.enemies.dropKey.keys[3];

      if (this.enemies.dropKey.keys[3] === 0) {
        this.finalBoss = true;
      }

      this.portal = this.enemies.portalMision;
      var xP = 400;
      var yP = 400;

      if (this.portal && xCartesian < xP + 32 && xCartesian > xP - 32 && yCartesian < yP + 32 && yCartesian > yP - 32) {
        enemyUpdate.length = 0;
        this.player.casa = true;
        this.player.doorDungeon = false;
        mapRandon.createMapOn = false; //################## puertaaaaaaaaaaa

        this.player.doorWorld = true;
        enemiesArr[4].num = 1;
        this.enemies.portalMision = false;
      }
    }
  }, {
    key: "mapControl",
    value: function mapControl() {
      // if (heroAttributes.health<)
      if (this.player.casa) {
        this.background = new Background(this.ctx, mapHouse, 'casa');
        this.player = new Player(mapHouse, 400, 400, this.canvas);
        this.currentMap = mapHouse;
        this.sounds.theme4.play();
        this.sounds.theme5.pause();
        this.sounds.theme5.currentTime = 0;
        this.player.doorWorld = false;
        this.player.doorDungeon = false;
      } else if (this.player.doorWorld) {
        var maxRan = mapRandon.cols * mpTsizeWidth;
        var x = getRandomInt(1, maxRan);
        var y = getRandomInt(1, maxRan);
        this.background = new Background(this.ctx, mapRandon, 'world'); //######### donde nace

        this.player = new Player(mapRandon, 160, 160);
        this.sounds.theme.play();
        this.sounds.theme4.pause();
        this.sounds.theme4.currentTime = 0;
        this.player.casa = false; // this.currentMap = mapRandon;
      } else if (this.player.doorDungeon) {
        this.dungeonFire = true;
        this.background = new Background(this.ctx, mapDungeon, 'dungeon');
        this.player = new Player(mapDungeon, 160, 160);
        this.sounds.theme5.play();
        this.sounds.theme.pause();
        this.sounds.theme.currentTime = 0; // this.player.doorWorld = false;
        // this.currentMap = mapDungeon;
      } // level() {
      //     if (cntLevel === 0 && !this.loaded) {
      //         this.loaded = true;
      //     }

    }
  }, {
    key: "playerShot",
    value: function playerShot(digit) {
      var _this2 = this;

      // if (heroAttributes.health > 0) {
      if (heroAttributes.health > 0) {
        var x,
            y = 0;

        if (heroAttributes.weapon.tTarget === 1) {
          heroAttributes.mana -= heroAttributes.weapon.rest;
          heroAttributes.manaPercentage += heroAttributes.weapon.rest * 100 / heroAttributes.manaTotal;
          this.interfacePlayer.rest = heroAttributes.manaPercentage;
        }

        if (this.digit === 1) {
          this.syIcon = 0;
        } else if (this.digit === 2) {
          this.syIcon = 1;
        } else if (this.digit === 3) {
          this.syIcon = 2;
        }

        if (this.canvas && timeFps === 0) {
          this.canvas.addEventListener('mouseup', function (e) {
            x = e.offsetX;
            y = e.offsetY;

            if (_this2.digit === 2 || _this2.digit === 1) {
              if (screenX > x && screenY > y) {
                _this2.drrShot = 7; // superior izq.

                if (_this2.digit === 1) {
                  _this2.syPlayer = 19;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 27;
                }
              }

              if (screenX < x && screenY < y) {
                _this2.drrShot = 3; // inferior drch

                if (_this2.digit === 1) {
                  _this2.syPlayer = 23;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 32;
                }
              }

              if (screenX < x && screenY > y) {
                _this2.drrShot = 1; // superior drch

                if (_this2.digit === 1) {
                  _this2.syPlayer = 21;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 30;
                }
              }

              if (screenX > x && screenY < y) {
                _this2.drrShot = 5; // iferior izq

                if (_this2.digit === 1) {
                  _this2.syPlayer = 17;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 25;
                }
              }

              if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                _this2.drrShot = 6; // izq

                if (_this2.digit === 1) {
                  _this2.syPlayer = 18;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 26;
                }
              }

              if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                _this2.drrShot = 2; // drch

                if (_this2.digit === 1) {
                  _this2.syPlayer = 22;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 31;
                }
              }

              if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                _this2.drrShot = 4; //inferior

                if (_this2.digit === 1) {
                  _this2.syPlayer = 16;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 24;
                }
              }

              if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                _this2.drrShot = 0; // superior

                if (_this2.digit === 1) {
                  _this2.syPlayer = 20;
                } else if (_this2.digit === 2) {
                  _this2.syPlayer = 29;
                }
              } //    if (screenX > x ){
              //     this.syPlayer = 9}

            } else if (_this2.digit === 3 && !heroAttributes.weapon.shoot) {
              var updateRelease = function updateSpell(drrTarget) {
                heroAttributes.weapon.drrTarget = drrTarget;
                heroAttributes.weapon.xOrigin = screenX - mapTsize / 2;
                heroAttributes.weapon.yOrigin = screenY - mapTsize / 2;
                heroAttributes.weapon.xTarget = x;
                heroAttributes.weapon.yTarget = y; // this.interfacePlayer.rest(heroAttributes.weapon.rest);

                if (heroAttributes.mana > 1) {
                  setTimeout(function () {
                    heroAttributes.weapon.shoot = true;
                  }, 500);
                } // heroAttributes.weapon.shoot = true;

              };

              if (screenX > x && screenY > y) {
                _this2.syPlayer = 36;
                _this2.drrShot = 7; // superior izq.

                updateRelease(_this2.drrShot);
              }

              if (screenX < x && screenY < y) {
                _this2.syPlayer = 40;
                _this2.drrShot = 3; // inferior drch

                updateRelease(_this2.drrShot);
              }

              if (screenX < x && screenY > y) {
                _this2.syPlayer = 38;
                _this2.drrShot = 1; // superior drch

                updateRelease(_this2.drrShot);
              }

              if (screenX > x && screenY < y) {
                _this2.syPlayer = 34; // iferior izq

                _this2.drrShot = 5;
                updateRelease(_this2.drrShot);
              }

              if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                _this2.syPlayer = 35;
                _this2.drrShot = 6; // izq

                updateRelease(_this2.drrShot);
              }

              if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                _this2.syPlayer = 39;
                _this2.drrShot = 2; // drch

                updateRelease(_this2.drrShot);
              }

              if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                _this2.syPlayer = 33; //inferior

                _this2.drrShot = 4;
                updateRelease(_this2.drrShot);
              }

              if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                _this2.syPlayer = 37;
                _this2.drrShot = 0; // superior

                updateRelease(_this2.drrShot);
              } //    if (screenX > x ){
              //     this.syPlayer = 9}

            }

            _this2.animatedShot = true;
            _this2.sxPlayer = 0;
          });
        }
      }

      if (this.animatedShot) {
        if (this.sxPlayer > 10) {
          this.sxPlayer = 0;
          this.animatedShot = false;
        }

        if (this.frameCount === 0) {
          this.sxPlayer++;
        }
      } // }

    } //     else {
    //         if (this.animatedShot) {
    //             this.sxPlayer = 9
    //             if (this.sxPlayer > 19) {
    //                 this.sxPlayer = 0
    //                 this.animatedShot = false
    //             }
    //             if (this.frameCount === 0) {
    //                 this.sxPlayer++
    //             }
    //         }
    //     }
    // }

  }]);

  return Game;
}();