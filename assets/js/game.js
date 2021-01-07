class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        // this.layer = map
        // this.layerWidth = this.layer.tsize
        // this.layerHeight = layer.tsize;
        // this.delta = delta;
        this.interfacePlayer = new InerfacePlayer(this.ctx, 0, cameraHeight, canvasWidth, canvasHeight - cameraHeight)
        this.background = new Background(this.ctx, mapRandon, 'casa')
        this.player = new Player(mapRandon, 160, 160, this.canvas) // x e y -------------> 
        this.camera = new Camera(cameraWidth, cameraHeight) // this.player.sprite
        this.enemies = new Enemy(this.ctx)

        this.drawInterval = undefined
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

        const theme = new Audio('./assets/sound/LordMavras.ogg')
        theme.volume = ambientVol;
        theme.volume.loop
        const theme2 = new Audio('./assets/sound/biggestDiscovery.ogg')
        theme2.volume = ambientVol
        theme2.volume.loop
        const theme3 = new Audio('./assets/sound/malignChords.ogg')
        theme3.volume = ambientVol
        theme3.volume.loop
        const theme4 = new Audio('./assets/sound/ninthCrewman.ogg')
        theme4.volume = ambientVol
        theme4.volume.loop
        const theme5 = new Audio('./assets/sound/playDemon.ogg')
        theme5.volume = ambientVol
        theme5.volume.loop

        this.sounds = {
            theme,
            theme2,
            theme3,
            theme4,
            theme5,
            coin: new Audio('./assets/sound/coin.wav')
        }
        //    this.sound = new Howl({
        //         src: ['https://www.youtube.com/watch?v=ZK6BbP-9hGM&ab_channel=PatrickdeArteaga']
        //       });
    }


    start() {
        let pause = true;
        if (!this.drawInterval) {
            this.drawInterval = setInterval(() => {
                this.timer()
                if (Keyboard.isDown(Keyboard.MENU1)) {
                    this.interfacePlayer.p = true;
                }
                if (Keyboard.isDown(Keyboard.BAG)) {
                    this.interfacePlayer.b = true;
                }
                if (Keyboard.isDown(Keyboard.PAUSE)) {
                    this.interfacePlayer.k = false;
                    this.interfacePlayer.b = false;
                    pause = true;
                    this.sounds.theme3.play()
                    this.sounds.theme.pause();
                    this.sounds.theme.currentTime = 0;
                    this.sounds.theme4.pause();
                    this.sounds.theme4.currentTime = 0;
                    this.sounds.theme5.pause();
                    this.sounds.theme5.currentTime = 0;
                }
                if (Keyboard.isDown(Keyboard.ENTER)) {
                    this.interfacePlayer.k = false;
                    this.interfacePlayer.p = false;
                    this.interfacePlayer.b = false;
                    pause = false;
                    this.sounds.theme4.loop = true
                    this.sounds.theme4.play()
                    this.sounds.theme3.pause();
                    this.sounds.theme3.currentTime = 0;
                }
                if (Keyboard.isDown(Keyboard.CONTROLES)) {
                    pause = true;
                    this.interfacePlayer.k = true;
                }
                if (!pause) {
                    // this.timer()
                    if (mapRandon.createMapOn) {
                        createMap(colsMap, rowsMap, this.finalBoss);
                        // this.camera = new Camera(mapRandon, cameraWidth, cameraHeight)
                    } else {
                        this.clear()
                        this.move()
                        this.draw()
                    }
                } else {
                    this.interfacePlayer.renderInterface(this.syIcon, heroAttributes.healthPercentage, pause, this.frameCount)
                }
            }, fps);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }

    draw() {
        // let place
        // if (this.player.casa) {
        //     place = 0
        // } else if (this.player.doorWorld) {
        //     place = 1;
        // } else if (this.player.doorDungeon) {
        //     place = 2
        // }
        this.background.renderingMap(0, this.frameCount, this.portal, this.dungeonFire);
        this.background.renderingMap(1, this.frameCount, this.portal, this.dungeonFire); /// esto estaba en el if de debajo
        this.player.renderPlayer(ctx, this.sxPlayer, this.syPlayer, )
        if (enemyUpdate.length > 0) {
            this.enemies.renderEnemy(this.sxEnemy)
        }
        this.background.renderingMap(2, this.frameCount, this.portal, this.dungeonFire);
        this.interfacePlayer.renderInterface(this.syIcon, heroAttributes.healthPercentage)
    }

    move() {
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
            }
            if (Keyboard.isDown(Keyboard.VIDA )) {
                if (heroAttributes.items.healthJar>0&& timeFps === 0){
                    console.log(`'estro en healt'
                    jarra ${heroAttributes.healthJar}
                    vida ${heroAttributes.health}`)
                    heroAttributes.items.healthJar-=1;
                    heroAttributes.health+= 1000;
                    if (heroAttributes.health>heroAttributes.healthTotal) {
                        heroAttributes.health = heroAttributes.healthTotal
                    }
                }
            } else if (Keyboard.isDown(Keyboard.MANA)) {
                if (heroAttributes.items.manaJar>0 && timeFps === 0){
                    console.log('estro en mana')
                    heroAttributes.items.manaJar-=1;
                    heroAttributes.mana+= 1000;
                    if (heroAttributes.mana>heroAttributes.manaTotal) {
                        heroAttributes.mana = heroAttributes.manaTotal
                    }
                }
                console.log(`jarramana ${heroAttributes.manaJar}
                    mana ${heroAttributes.mana}`)
            }
            // handle hero
            let dirx = 0;
            let diry = 0;
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
            } else
            if (Keyboard.isDown(Keyboard.LEFT)) {
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
            this.player.heroMove(dirx, diry);
            this.camera.update(this.player.map.cols, this.player.map.rows, xCartesian, yCartesian);
            this.enemies.enemyMove(this.animatedShot, this.drrShot, heroAttributes.strength);
            this.mapControl();
            this.keysControl();
        } else {
            if (this.sxPlayer < 9) {
                this.sxPlayer = 8;
                // this.animatedShot = true
            } else if (!this.animatedShot) {
                this.sxPlayer = 17
            }
            if (this.sxPlayer >= 17) {
                this.sxPlayer = 17
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
            this.enemies.enemyMove(this.animatedShot, this.drrShot, heroAttributes.strength);
        }
    }

    timer() {
        timeFps += fps;
        if (timeFps > 999.999999999999) {
            timeSeg++;
            if (timeSeg === 20) {
                timeSeg = 0;
                // timeMin++;
            }
            timeFps = 0;
        }
        if (timeFps === 0 && // nacen enemigos cada 30ds
            timeSeg === 0 ||
            timeFps === 0 &&
            timeSeg === 30) {
            this.background.update = false;
        }
        this.frameCount++;
        if (this.frameCount % framesSprite === 0) {
            this.frameCount = 0;
        }
        // if (this.canvas) {
        if (Keyboard.isDown(Keyboard.LEFT) ||
            Keyboard.isDown(Keyboard.RIGHT) ||
            Keyboard.isDown(Keyboard.UP) ||
            Keyboard.isDown(Keyboard.DOWN)) {
            this.animatedShot = false;
            if (this.sxPlayer > 6 && heroAttributes.health > 0) { //###################### mirar el ultimo
                this.sxPlayer = 0
            }
            if (this.frameCount === 0) {
                this.sxPlayer++
            }
        }

        if (this.sxEnemy > 6) {
            this.sxEnemy = 0
        }
        if (this.frameCount === 0) {
            this.sxEnemy++;
        }

        // }
    }

    keysControl() {
        this.interfacePlayer.key1 = this.enemies.dropKey.keys[0];
        this.interfacePlayer.key2 = this.enemies.dropKey.keys[1];
        this.interfacePlayer.key3 = this.enemies.dropKey.keys[2];
        this.interfacePlayer.key4 = this.enemies.dropKey.keys[3];
        if (this.enemies.dropKey.keys[3] === 0) {
            this.finalBoss = true
        }
        this.portal = this.enemies.portalMision;
        let xP = 400;
        let yP = 400;
        if (this.portal &&
            xCartesian < xP + 32 &&
            xCartesian > xP - 32 &&
            yCartesian < yP + 32 &&
            yCartesian > yP - 32) {
            enemyUpdate.length = 0;
            this.player.casa = true;
            this.player.doorDungeon = false;
            mapRandon.createMapOn = false; //################## puertaaaaaaaaaaa
            this.player.doorWorld = true;
            enemiesArr[4].num = 1;
            this.enemies.portalMision = false;
        }
    }

    mapControl() {
        // if (heroAttributes.health<)
        if (this.player.casa) {
            let mapH = mapHouse
            if (!findHome) {
                mapH = mapRandon
            }
            this.background = new Background(this.ctx, mapH, 'casa')
            this.player = new Player(mapH, 400, 400, this.canvas)
            this.sounds.theme4.play()
            this.sounds.theme5.pause();
            this.sounds.theme5.currentTime = 0;
            this.player.doorWorld = false;
            this.player.doorDungeon = false;
        } else
        if (this.player.doorWorld) {
            let maxRan = mapRandon.cols * mpTsizeWidth
            let x = getRandomInt(1, maxRan)
            let y = getRandomInt(1, maxRan)
            this.background = new Background(this.ctx, mapRandon, 'world') //######### donde nace
            this.player = new Player(mapRandon, 160, 160);
            this.sounds.theme.play()
            this.sounds.theme4.pause();
            this.sounds.theme4.currentTime = 0;
            this.player.casa = false;
            // this.currentMap = mapRandon;
        } else if (this.player.doorDungeon) {
            this.dungeonFire = true;
            this.background = new Background(this.ctx, mapDungeon, 'dungeon')
            this.player = new Player(mapDungeon, 160, 160);
            this.sounds.theme5.play()
            this.sounds.theme.pause();
            this.sounds.theme.currentTime = 0;
            // this.player.doorWorld = false;
            // this.currentMap = mapDungeon;

        }

        // level() {
        //     if (cntLevel === 0 && !this.loaded) {
        //         this.loaded = true;
        //     }
    }

    playerShot(digit) {
        // if (heroAttributes.health > 0) {

        if (heroAttributes.health > 0) {
            let x, y = 0;
            // if (heroAttributes.weapon.tTarget === 1) {
            //     heroAttributes.mana -= heroAttributes.weapon.restmana;
            //     heroAttributes.manaPercentage += (heroAttributes.weapon.restmana * 100) / heroAttributes.manaTotal;
            //     this.interfacePlayer.rest = heroAttributes.manaPercentage;
            // }
            if (this.digit === 1) {
                this.syIcon = 0
            } else if (this.digit === 2) {
                this.syIcon = 1;
            } else if (this.digit === 3) {
                this.syIcon = 2
            }
            if (this.canvas && timeFps === 0) {
                this.canvas.addEventListener('mouseup', e => {
                    x = e.offsetX;
                    y = e.offsetY;
                    if (this.digit === 2 || this.digit === 1) {
                        if (screenX > x && screenY > y) {
                            this.drrShot = 7; // superior izq.
                            if (this.digit === 1) {
                                this.syPlayer = 19;
                            } else if (this.digit === 2) {
                                this.syPlayer = 27;
                            }
                        }
                        if (screenX < x && screenY < y) {
                            this.drrShot = 3; // inferior drch
                            if (this.digit === 1) {
                                this.syPlayer = 23;
                            } else if (this.digit === 2) {
                                this.syPlayer = 32;
                            }
                        }
                        if (screenX < x && screenY > y) {
                            this.drrShot = 1; // superior drch
                            if (this.digit === 1) {
                                this.syPlayer = 21;
                            } else if (this.digit === 2) {
                                this.syPlayer = 30;
                            }
                        }
                        if (screenX > x && screenY < y) {
                            this.drrShot = 5; // iferior izq
                            if (this.digit === 1) {
                                this.syPlayer = 17;
                            } else if (this.digit === 2) {
                                this.syPlayer = 25;
                            }

                        }
                        if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                            this.drrShot = 6; // izq
                            if (this.digit === 1) {
                                this.syPlayer = 18;
                            } else if (this.digit === 2) {
                                this.syPlayer = 26;
                            }

                        }
                        if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                            this.drrShot = 2; // drch
                            if (this.digit === 1) {
                                this.syPlayer = 22;
                            } else if (this.digit === 2) {
                                this.syPlayer = 31;
                            }

                        }

                        if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                            this.drrShot = 4; //inferior
                            if (this.digit === 1) {
                                this.syPlayer = 16;
                            } else if (this.digit === 2) {
                                this.syPlayer = 24;
                            }

                        }
                        if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                            this.drrShot = 0; // superior
                            if (this.digit === 1) {
                                this.syPlayer = 20;
                            } else if (this.digit === 2) {
                                this.syPlayer = 29;
                            }

                        }
                        //    if (screenX > x ){
                        //     this.syPlayer = 9}
                    } else if (this.digit === 3 &&
                        !heroAttributes.weapon.shoot) {

                        // let updateRelease = function updateSpell(drrTarget) {
                        //     heroAttributes.weapon.drrTarget = this.drrShot;
                        // heroAttributes.weapon.xOrigin = (screenX-mapTsize/2);
                        // heroAttributes.weapon.yOrigin = (screenY-mapTsize/2);
                        heroAttributes.weapon.xTarget = x;
                        heroAttributes.weapon.yTarget = y;
                        // this.interfacePlayer.rest(heroAttributes.weapon.rest);
                        if (heroAttributes.mana > 1) {
                            setTimeout(() => {
                                heroAttributes.weapon.shoot = true;
                            }, 500);
                            // }
                            // heroAttributes.weapon.shoot = true;
                        }
                        if (screenX > x && screenY > y) {
                            this.syPlayer = 36;
                            this.drrShot = 7; // superior izq.
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        if (screenX < x && screenY < y) {
                            this.syPlayer = 40;
                            this.drrShot = 3; // inferior drch
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        if (screenX < x && screenY > y) {
                            this.syPlayer = 38;
                            this.drrShot = 1; // superior drch
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        if (screenX > x && screenY < y) {
                            this.syPlayer = 34; // iferior izq
                            this.drrShot = 5;
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                            this.syPlayer = 35;
                            this.drrShot = 6; // izq
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                            this.syPlayer = 39;
                            this.drrShot = 2; // drch
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }

                        if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                            this.syPlayer = 33; //inferior
                            this.drrShot = 4;
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                            this.syPlayer = 37;
                            this.drrShot = 0; // superior
                            heroAttributes.weapon.drrTarget = this.drrShot;
                            // updateRelease(this.drrShot);
                        }
                        //    if (screenX > x ){
                        //     this.syPlayer = 9}
                    }
                    this.animatedShot = true;
                    this.sxPlayer = 0
                });
            }
        }

        if (this.animatedShot) {
            if (this.sxPlayer > 10) {
                this.sxPlayer = 0
                this.animatedShot = false
            }
            if (this.frameCount === 0) {
                this.sxPlayer++
            }
        }
        // }
    }
    //     else {
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
}