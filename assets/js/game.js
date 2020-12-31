class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        // this.layer = map
        // this.layerWidth = this.layer.tsize
        // this.layerHeight = layer.tsize;
        // this.delta = delta;
        this.interfacePlayer = new InerfacePlayer(this.ctx, 0, cameraHeight, canvasWidth, canvasHeight - cameraHeight)
        this.background = new Background(this.ctx, mapHouse, 'casa')
        this.player = new Player(mapHouse, 160, 160, this.canvas) // x e y -------------> 
        this.camera = new Camera(cameraWidth, cameraHeight) // this.player.sprite
        this.enemies = new Enemy(this.ctx)

        this.drawInterval = undefined
        this.pause = false;
        this.loaded = false;
        this.currentMap = {};

        this.frameCount = 0;


        this.xPlayerRand = 0;
        this.yPlayerRand = 0;

        this.sxPlayer = 0;
        this.syPlayer = 8;
        this.sxEnemy = 0;

        this.drrShot = 0;
        this.animatedShot = false;

        this.portal = false;

        this.digit = 1;
        //     this.keyPressed = Keyboard.isDown(Keyboard.LEFT)||
        //     Keyboard.isDown(Keyboard.RIGHT)||
        //     Keyboard.isDown(Keyboard.UP)||
        //     Keyboard.isDown(Keyboard.DOWN)
    }

    start() {
        let pause = false;
        if (!this.drawInterval) {
            this.drawInterval = setInterval(() => {
                if (Keyboard.isDown(Keyboard.PAUSE)) {
                    console.log('se dio pause')
                    pause = true;
                    // clearInterval(this.drawInterval);
                }
                if (Keyboard.isDown(Keyboard.ENTER)) {
                    console.log('se dio enter')
                    pause = false;
                }
                if (!pause) {
                    this.timer()
                    if (mapRandon.createMapOn) {
                        createMap(colsMap, rowsMap);
                        // this.camera = new Camera(mapRandon, cameraWidth, cameraHeight)
                    } else {
                        this.clear()
                        this.move()
                        this.draw()
                    }
                }
            }, fps);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }

    draw() {
        let place
        if (this.player.casa) {
            place = 0
        } else if (this.player.doorWorld) {
            place = 1;
        } else if (this.player.doorDungeon) {
            palce = 2
        }
        this.background.renderingMap(0, this.frameCount, this.portal);
        this.background.renderingMap(1, this.frameCount, this.portal); /// esto estaba en el if de debajo
        this.player.renderPlayer(ctx, this.sxPlayer, this.syPlayer)
        if (enemyUpdate.length > 0) {
            this.enemies.renderEnemy(this.sxEnemy)
        }
        // if (
        //     // this.background.radar 
        //     // && this.background.update && 
        //     enemyUpdate.length < 2 
        //     && timeFps === 0
        //     && timeSeg === 1 
        //     || timeSeg === 30 ) {
        //     this.background.radar = true;
        //     // this.background.update = false;
        //     // this.background.createEnemy();
        // }
        this.background.renderingMap(2, this.frameCount, this.portal);
        this.interfacePlayer.renderInterface(heroAttributes.healthPercentage)
        // this.interfacePlayer.drawBocata()
    }

    move() {
        if (Keyboard.isDown(Keyboard.DIGIT1)) {
            console.log('se diooo 1')
            this.digit = 1;
        } else if (Keyboard.isDown(Keyboard.DIGIT2)) {
            console.log('se diooo 2')
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
        // handle hero
        let dirx = 0;
        let diry = 0;
        if (Keyboard.isDown(Keyboard.UP) && Keyboard.isDown(Keyboard.LEFT)) {
            diry = -0.8;
            dirx = -0.8;
            this.syPlayer = 16;
        } else if (Keyboard.isDown(Keyboard.UP) && Keyboard.isDown(Keyboard.RIGHT)) {
            diry = -0.8;
            dirx = 0.8;
            this.syPlayer = 12;
        } else if (Keyboard.isDown(Keyboard.DOWN) && Keyboard.isDown(Keyboard.LEFT)) {
            diry = 0.8;
            dirx = -0.8;
            this.syPlayer = 18;
        } else if (Keyboard.isDown(Keyboard.DOWN) && Keyboard.isDown(Keyboard.RIGHT)) {
            diry = 0.8;
            dirx = 0.8;
            this.syPlayer = 13;
        } else
        if (Keyboard.isDown(Keyboard.LEFT)) {
            dirx = -1;
            this.syPlayer = 17;
        } else if (Keyboard.isDown(Keyboard.RIGHT)) {
            dirx = 1;
            this.syPlayer = 14;
        } else if (Keyboard.isDown(Keyboard.UP)) {
            diry = -1;
            this.syPlayer = 15;
        } else if (Keyboard.isDown(Keyboard.DOWN)) {
            diry = 1;
            this.syPlayer = 19;
        }

        this.playerShot(this.digit);
        this.player.heroMove(dirx, diry, this.digit);
        this.camera.update(this.player.map.cols, this.player.map.rows, xCartesian, yCartesian);
        this.enemies.enemyMove(this.animatedShot, this.drrShot, heroAttributes.strength);
        this.mapControl();
        this.keysControl();
    }

    timer() {
        timeFps += fps;
        if (timeFps > 999.999999999999) {
            timeSeg++;
            if (timeSeg === 59) {
                timeSeg = 0;
                timeMin++;
            }
            timeFps = 0;
        }
        if (timeFps === 0 && // nacen enemigos cada 30ds
            timeSeg === 0 ||
            timeFps === 0 &&
            timeSeg === 29) {
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
            if (this.sxPlayer > 6) {
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
        this.portal = this.enemies.portalMision;
        let xP = 400;
        let yP = 400;
        if (this.portal &&
            xCartesian < xP + 32 &&
            xCartesian > xP - 32 &&
            yCartesian < yP + 32 &&
            yCartesian > yP - 32) {
            console.log('esta kesys control')
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
        if (this.player.casa) {
            this.background = new Background(this.ctx, mapHouse, 'casa')
            this.player = new Player(mapHouse, 400, 400, this.canvas)
            this.currentMap = mapHouse
            this.player.doorWorld = false;
            this.player.doorDungeon = false;
        } else
        if (this.player.doorWorld) {
            let maxRan = mapRandon.cols * mpTsizeWidth
            let x = getRandomInt(1, maxRan)
            let y = getRandomInt(1, maxRan)
            this.background = new Background(this.ctx, mapRandon, 'world') //######### donde nace
            this.player = new Player(mapRandon, 160, 160);
            this.player.casa = false;
            // this.currentMap = mapRandon;
        } else if (this.player.doorDungeon) {
            this.background = new Background(this.ctx, mapDungeon, 'dungeon')
            this.player = new Player(mapDungeon, 160, 160);
            // this.player.doorWorld = false;
            // this.currentMap = mapDungeon;

        }

        // level() {
        //     if (cntLevel === 0 && !this.loaded) {
        //         this.loaded = true;
        //     }
    }

    playerShot(digit) {
        let x, y = 0;

        if (this.canvas && timeFps === 0) {
            this.canvas.addEventListener('mouseup', e => {
                x = e.offsetX;
                y = e.offsetY;
                if (this.digit === 1) {
                    if (screenX > x && screenY > y) {
                        this.syPlayer = 8;
                        this.drrShot = 7; // superior izq.
                    }
                    if (screenX < x && screenY < y) {
                        this.syPlayer = 3;
                        this.drrShot = 3; // inferior drch
                    }
                    if (screenX < x && screenY > y) {
                        this.syPlayer = 6;
                        this.drrShot = 1; // superior drch
                    }
                    if (screenX > x && screenY < y) {
                        this.syPlayer = 10;
                        this.drrShot = 5;
                    }
                    if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                        this.syPlayer = 9;
                        this.drrShot = 6; // izq
                    }
                    if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                        this.syPlayer = 4;
                        this.drrShot = 2; // drch
                    }

                    if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                        this.syPlayer = 11;
                        this.drrShot = 4;
                    }
                    if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                        this.syPlayer = 7;
                        this.drrShot = 0; // superior
                    }
                    //    if (screenX > x ){
                    //     this.syPlayer = 9}
                } else if (this.digit === 2) {
                    console.log(heroAttributes.weapon)
                    let updateRelease = function updateSpell() {
                        heroAttributes.weapon.xOrigin = xCartesian;
                        heroAttributes.weapon.yOrigin = yCartesian;
                        heroAttributes.weapon.xTarget = x;
                        heroAttributes.weapon.yTarget = y;
                        heroAttributes.weapon.shoot = true;
                    }

                    if (screenX > x && screenY > y) {
                        console.log('yeaaaaaaaa')
                        this.syPlayer = 8;
                        this.drrShot = 7; // superior izq.
                        updateRelease();
                    }
                    if (screenX < x && screenY < y) {
                        this.syPlayer = 3;
                        this.drrShot = 3; // inferior drch
                        updateRelease();
                    }
                    if (screenX < x && screenY > y) {
                        this.syPlayer = 6;
                        this.drrShot = 1; // superior drch
                        updateRelease();
                    }
                    if (screenX > x && screenY < y) {
                        this.syPlayer = 10;
                        this.drrShot = 5;
                        updateRelease();
                    }
                    if (screenX > x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                        this.syPlayer = 9;
                        this.drrShot = 6; // izq
                        updateRelease();
                    }
                    if (screenX < x && screenY < y + mapTsize / 2 && screenY > y - mapTsize / 2) {
                        this.syPlayer = 4;
                        this.drrShot = 2; // drch
                        updateRelease();
                    }

                    if (screenY < y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                        this.syPlayer = 11;
                        this.drrShot = 4;
                        updateRelease();
                    }
                    if (screenY > y && screenX < x + mapTsize / 2 && screenX > x - mapTsize / 2) {
                        this.syPlayer = 7;
                        this.drrShot = 0; // superior
                        updateRelease();
                    }
                    //    if (screenX > x ){
                    //     this.syPlayer = 9}
                }
                this.animatedShot = true;
                this.sxPlayer = 0
            });
        }

        if (this.animatedShot) {
            if (this.sxPlayer > 9) {
                this.sxPlayer = 0
                this.animatedShot = false
            }
            if (this.frameCount === 0) {
                this.sxPlayer++
            }
        }
    }
}