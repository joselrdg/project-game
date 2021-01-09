class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.liveBar = document.getElementById("livebar")

        this.interfacePlayer = new InerfacePlayer(this.ctx, 0, cameraHeight, canvasWidth, canvasHeight - cameraHeight)
        this.background = new Background(this.ctx, mapHouse, 'casa')
        this.player = new Player(mapHouse, 400, 400, this.canvas) // x e y -------------> 
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

        // this.portal = false;

        this.digit = 1;

        this.manaaTime = true;
        this.vidaTime = true;

        this.finalBoss = false;

        const theme = new Audio('./assets/sound/LordMavras.ogg')
        theme.volume = ambientVol;
        theme.loop
        const theme2 = new Audio('./assets/sound/biggestDiscovery.ogg')
        theme2.volume = ambientVol
        theme2.loop
        const theme3 = new Audio('./assets/sound/malignChords.ogg')
        theme3.volume = ambientVol
        theme3.loop
        const theme4 = new Audio('./assets/sound/ninthCrewman.ogg')
        theme4.volume = ambientVol
        theme4.loop
        const theme5 = new Audio('./assets/sound/playDemon.ogg')
        theme5.volume = ambientVol
        theme5.loop
        const drink = new Audio('./assets/sound/drinking-woman.wav')
        // theme5.volume = 0.2
        theme5.loop

        this.sounds = {
            theme,
            theme2,
            theme3,
            theme4,
            theme5,
            drink
        }
    }


    start() {
        let pause = true;
        if (!this.drawInterval) {
            this.drawInterval = setInterval(() => {
                this.timer();
                if (Keyboard.isDown(Keyboard.INFO)) {
                    this.interfacePlayer.i = true;
                }
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
                    this.interfacePlayer.i = false;
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
                    if (mapRandon.createMapOn) {
                        createMap(this.finalBoss);
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
        this.background.renderingMap(0, this.frameCount, this.dungeonFire);
        this.background.renderingMap(1, this.frameCount, this.dungeonFire); /// esto estaba en el if de debajo
        this.player.renderPlayer(ctx, this.sxPlayer, this.syPlayer, )
        if (enemyUpdate.length > 0) {
            this.enemies.renderEnemy(this.sxEnemy)
        }
        this.background.renderingMap(2, this.frameCount, this.dungeonFire);
        this.interfacePlayer.renderInterface(this.syIcon, heroAttributes.healthPercentage)
    }

    move() {
        if (heroAttributes.health > 1) {
            this.xp();
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
            if (Keyboard.isDown(Keyboard.VIDA)) {
                if (heroAttributes.items.healthJar > 0 &&
                    heroAttributes.healthTime >= 5 &&
                    this.vidaTime) {
                    this.sounds.drink.play()
                    this.vidaTime = false;
                    heroAttributes.items.healthJar -= 1;
                    heroAttributes.health += 1000;
                    if (heroAttributes.health > heroAttributes.healthTotal) {
                        heroAttributes.health = heroAttributes.healthTotal
                    }

                    heroAttributes.healthPercentage = 100 - (heroAttributes.health * 100) / heroAttributes.healthTotal;
                }
            } else if (Keyboard.isDown(Keyboard.MANA)) {
                if (heroAttributes.items.manaJar > 0 &&
                    heroAttributes.manaTime === 5 &&
                    this.manaaTime) {
                    this.sounds.drink.play()
                    this.manaaTime = false;
                    heroAttributes.items.manaJar -= 1;
                    heroAttributes.mana += 100;
                    if (heroAttributes.mana > heroAttributes.manaTotal) {
                        heroAttributes.mana = heroAttributes.manaTotal
                    }
                    heroAttributes.manaPercentage = 100 - (heroAttributes.mana * 100) / heroAttributes.manaTotal;
                }
            }
            if (heroAttributes.healthTime > 0 && timeFps === 0 && !this.vidaTime) {
                heroAttributes.healthTime--
            } else if (heroAttributes.healthTime <= 0) {
                this.vidaTime = true;
                heroAttributes.healthTime = 5;
            }
            if (heroAttributes.manaTime > 0 && timeFps === 0 && !this.manaaTime) {
                heroAttributes.manaTime--
            } else if (heroAttributes.manaTime <= 0) {
                this.manaaTime = true
                heroAttributes.manaTime = 5;
            }

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
            } else if (!this.animatedShot) {
                this.sxPlayer = 17
            }
            if (this.sxPlayer >= 17) {
                this.sxPlayer = 17
                heroAttributes.die = true;
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
            }
            timeFps = 0;
        }
        if (missions.mision8.finish) {
            if (timeFps === 0) {
                this.background.update = false;
            }
        } else {
            if (timeFps === 0 && // nacen enemigos
                timeSeg === 0 ||
                timeFps === 0 &&
                timeSeg === timeEnemyApar) {
                this.background.update = false;
            }
        }

        this.frameCount++;
        if (this.frameCount % framesSprite === 0) {
            this.frameCount = 0;
        }
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
        if (!missions.mision1.finish &&
            missions.mision1.deadCreatures >= missions.mision1.totalDeadCreatures) {
            mapHouse.layers[1][44] = 61;
            mapHouse.layers[1][82] = 62;
            missions.mision1.finish = true;
        } else if (!missions.mision2.finish &&
            missions.mision2.deadCreatures >= missions.mision2.totalDeadCreatures) {
            mapHouse.layers[1][90] = 61;
            mapHouse.layers[1][120] = 62
            mapHouse.layers[1][125] = 62
            mapHouse.layers[1][105] = 71;
            mapHouse.layers[1][48] = 71;
            missions.mision2.finish = true;
            this.interfacePlayer.key1 = 0;
        } else if (!missions.mision4.finish &&
            missions.mision4.deadCreatures >= missions.mision4.totalDeadCreatures) {
            missions.mision4.finish = true;
        } else if (!missions.mision5.finish &&
            missions.mision5.deadCreatures >= missions.mision5.totalDeadCreatures) {
            this.interfacePlayer.key2 = 0;
            missions.mision5.finish = true;
        } else if (!missions.mision6.finish &&
            missions.mision6.door) {
            missions.mision6.finish = true;
        } else if (!missions.mision7.finish &&
            missions.mision7.Mefisto) {
            this.interfacePlayer.key3 = 0;
            this.finalBoss = true
            missions.mision7.finish = true;
        } else if (!missions.mision8.finish &&
            missions.mision8.Andariel) {
            this.interfacePlayer.key4 = 0;
            missions.mision8.finish = true;
            for (let i = 0; i < mapHouse.layers[1].length; i++) {
                mapHouse.layers[1][i] = 71;
            }
        }
        let xP = 400;
        let yP = 400;
        if (portalM &&
            xCartesian < xP + 32 &&
            xCartesian > xP - 32 &&
            yCartesian < yP + 32 &&
            yCartesian > yP - 32 &&
            !missions.mision9.downAgain) {
            findHome = true;
            this.player.casa2 = true;
            enemyUpdate.length = 0;
            this.player.doorDungeon = false;
            mapRandon.createMapOn = true; //################## portal
            this.player.doorWorld = false;
            enemiesArr[4].num = 1;
        } else if (portalM &&
            xCartesian < xP + 32 &&
            xCartesian > xP - 32 &&
            yCartesian < yP + 32 &&
            yCartesian > yP - 32 &&
            missions.mision9.downAgain) {
            findHome = false;
            this.player.casa2 = false;
            enemyUpdate.length = 0;
            this.player.doorDungeon = false;
            mapRandon.createMapOn = true;
            this.player.doorWorld = true;
            enemiesArr[4].num = 1;
        }
    }

    mapControl() {
        if (this.player.casa2) {
            this.infoM();
            let mapH = mapHouse
            let x = 100;
            let y = 220;
            if (missions.mision8.finish && !missions.mision9.downAgain) {
                mapEntry.layers[1][0] = 71;
                mapEntry.layers[1][13] = 62;
                mapEntry.layers[1][14] = 71;
                mapEntry.layers[1][26] = 61;
                mapEntry.layers[1][27] = 71;
                mapEntry.layers[1][39] = 71;
                mapEntry.layers[1][40] = 71;
                mapEntry.layers[1][52] = 71;
                mapEntry.layers[1][53] = 71;
            }
            if (portalM) {
                x = 400;
                y = 400;
                // this.portal = false;
            }
            portalM = false;
            if (findHome) {
                mapH = mapEntry;
                if (missions.mision2.finish && !missions.mision3.finish) {
                    missions.mision3.finish = true;
                }
            }
            if (missions.mision8.finish) {
                missions.mision9.finish = true
            }
            this.background = new Background(this.ctx, mapH, 'casa')
            this.player = new Player(mapH, x, y, this.canvas)
            if (missions.mision7.finish) {
                this.sounds.theme5.play()
                this.sounds.theme.pause();
                this.sounds.theme.currentTime = 0;
            } else {
                this.sounds.theme4.play()
                this.sounds.theme5.pause();
                this.sounds.theme5.currentTime = 0;
            }
            this.player.doorWorld = false;
            this.player.doorDungeon = false;
        } else if (this.player.doorWorld) {
            if (missions.mision2.finish && !missions.mision3.finish) {
                if (missions.mision3.Doors <= missions.mision3.totalDoors) {
                    missions.mision3.Doors++
                }
            }
            this.infoM();
            let mundo = 'casa'
            if (findHome && !missions.mision7.finish) {
                mundo = 'world';
                this.sounds.theme.play()
                this.sounds.theme4.pause();
                this.sounds.theme4.currentTime = 0;
            } else if (!missions.mision7.finish) {
                this.sounds.theme4.play()
            } else {
                this.sounds.theme5.play()
                this.sounds.theme.pause();
                this.sounds.theme.currentTime = 0;
            }
            let maxRan = mapRandon.cols * mpTsizeWidth
            let x = getRandomInt(1, maxRan)
            let y = getRandomInt(1, maxRan)
            this.background = new Background(this.ctx, mapRandon, mundo) //######### donde nace
            this.player = new Player(mapRandon, 160, 160);
            this.player.casa2 = false;
        } else if (this.player.doorDungeon) {
            this.infoM();
            // this.player.casa1 = false;
            this.dungeonFire = true;
            this.background = new Background(this.ctx, mapDungeon, 'dungeon')
            this.player = new Player(mapDungeon, 160, 160);
            this.sounds.theme5.play()
            this.sounds.theme.pause();
            this.sounds.theme.currentTime = 0;
        }
    }

    infoM() {
        this.interfacePlayer.i = true;
        setTimeout(() => {
            this.interfacePlayer.i = false;
        }, 6000);
    }

    playerShot(digit) {
        if (heroAttributes.health > 0) {
            let x, y = 0;
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
                        heroAttributes.weapon.xTarget = x;
                        heroAttributes.weapon.yTarget = y;
                        if (heroAttributes.mana > 1) {
                            setTimeout(() => {
                                heroAttributes.weapon.shoot = true;
                            }, 500);
                        }
                        if (screenX > x && screenY > y) {
                            this.syPlayer = 36;
                            this.drrShot = 7; // superior izq.
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
                        if (screenX < x && screenY < y) {
                            this.syPlayer = 40;
                            this.drrShot = 3; // inferior drch
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
                        if (screenX < x && screenY > y) {
                            this.syPlayer = 38;
                            this.drrShot = 1; // superior drch
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
                        if (screenX > x && screenY < y) {
                            this.syPlayer = 34; // iferior izq
                            this.drrShot = 5;
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
                        if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                            this.syPlayer = 35;
                            this.drrShot = 6; // izq
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
                        if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                            this.syPlayer = 39;
                            this.drrShot = 2; // drch
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }

                        if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                            this.syPlayer = 33; //inferior
                            this.drrShot = 4;
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
                        if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                            this.syPlayer = 37;
                            this.drrShot = 0; // superior
                            heroAttributes.weapon.drrTarget = this.drrShot;
                        }
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
    }

    xp() {
        let xp = Math.round(heroAttributes.xp)
        xp = xp.toString()
        xp += 'px'
        this.liveBar.style.width = xp;
        if (heroAttributes.xp >= cameraWidth) { // actualiza xp
            heroAttributes.xp = 0
            heroAttributes.level++
            heroAttributes.healthTotal += 50;
            heroAttributes.health = heroAttributes.healthTotal;
            heroAttributes.manaTotal += 5;
            heroAttributes.mana = heroAttributes.manaTotal;
            heroAttributes.strength += 10;
            xpP += xpP;
        }
    }
}