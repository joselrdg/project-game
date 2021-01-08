class Player {
    constructor(mapp, x, y, canvas) {
        this.map = mapp;
        this.canvas = canvas;
        this.x = x;
        this.y = y;

        this.maxX = this.map.cols * mpTsizeWidth;
        this.maxY = this.map.rows * mpTsizeHeight;
        // this.healthPercentage = 0;
        //  this.screenX = x;
        //  this.screenY = y;
        // this.healthHero = 10000;

        // this.healthHeroPer = heroAttributes.health;
        // this.strengthHero = heroAttributes.strength;
        // this.armorHero = heroAttributes.armor;
        // this.shot = false;

        this.sx = 0;
        // this.syPlayer = 8;

        this.width = 64; // es mejor map o this.map o da igua?
        this.height = 64;

        this.heroSPEED = heroSPEED // 256; // pixels per second --------------->

        this.casa2 = false;
        this.doorWorld = false;
        this.doorDungeon = false;
        this.cntDungeon = false;
        // this.xCam = 0 // function camera
        // this.minX = 0
        // this.maxX = this.map.cols * this.map.tsize - this.width; // canvasWidth / 2; 
        // this.vx = 0
        // this.yCam = 0
        // this.maxY = this.map.rows * this.map.tsize - this.height; //0  
        // this.vy = 0
        // this.maxX = this.map.cols * this.map.tsize - canvasWidth; ///    this.width = 0  
        // this.maxY = this.map.rows * this.map.tsize - canvasHeight; ///this.height = 0           canvasWidth

        this.sprite = new Image()
        this.sprite.src = './assets/img/player1.png';
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 18;
        this.sprite.verticalFrames = 48;
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            // this.spriteWidth = this.sprite.frameWidth
            // this.spriteHeight = this.sprite.frameHeight
        }

        const scream = new Audio('./assets/sound/woman-scream.wav')
        scream.volume = fightVol
        const die = new Audio('./assets/sound/i-m-gonna-die.wav')
        die.volume = fightVol
        const defeated = new Audio('./assets/sound/player-defeated.wav')
        defeated.volume = fightVol

        this.sounds = {
            scream,
            die,
            defeated
        }
    }



    isReady() {
        return this.sprite.isReady
    }

    getTile(layer, col, row) {
        return this.map.layers[layer][row * this.map.cols + col];
    }

    isSolidTileAtXY(x, y) {
        let col = Math.floor(x / mpTsizeWidth);
        let row = Math.floor(y / mpTsizeHeight);
        for (let index = 0; index < enemyUpdate.length; index++) {
            for (let i = 0; i < enemyUpdate[index].length; i++) {
                if (!enemyUpdate[index][i].dead &&
                    xCartesian < enemyUpdate[index][i].x + mapTsize &&
                    xCartesian > enemyUpdate[index][i].x - mapTsize &&
                    yCartesian < enemyUpdate[index][i].y + mapTsize &&
                    yCartesian > enemyUpdate[index][i].y - mapTsize &&
                    timeFps === 0) {
                    this.sounds.defeated.play()
                    heroAttributes.health -= enemyUpdate[index][i].damage
                    heroAttributes.healthPercentage = 100 - (heroAttributes.health * 100) / heroAttributes.healthTotal;
                }
            }
            if (heroAttributes.health < 1) {
                this.sounds.die.play()
            }
        }

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.map.layers.reduce(function (res, layer, index) { // no lo usa???---------------------------------->
            let tile = this.getTile(index, col, row);
            if (tile === 1 || tile === 2 || tile === 3 || tile === 20) {
                this.y += 5
            } else if (tile === 11) {
                this.y -= 5
            }
            if (tile === 61 || tile === 62 || tile === 71 || tile === 72) { // fuego
                this.sounds.scream.play()
                heroAttributes.health -= 100;
                heroAttributes.healthPercentage = 100 - (heroAttributes.health * 100) / heroAttributes.healthTotal;
            }
            if (tile === 49) {
                heroAttributes.health = heroAttributes.healthTotal;
                heroAttributes.healthPercentage = 0;
            } else if (tile === 50) {
                heroAttributes.mana = heroAttributes.manaTotal;
                heroAttributes.manaPercentage = 0;
            }
            if (tile === 50) {
                heroAttributes.mana = heroAttributes.manaTotal;
            }

            if (tile === 91) {
                if (missions.mision8.finish &&
                    !missions.mision9.downAgain) {
                    missions.mision9.downAgain = true;
                }
                enemyUpdate.length = 0;
                this.casa2 = false;
                home1 = false;
                this.doorDungeon = false;
                // this.cntDungeon = false;
                enemyUpdate.length = 0;
                mapRandon.createMapOn = true; //################## puertaaaaaaaaaaa
                this.doorWorld = true;
            } else if (tile === 92) {
                if (!missions.mision6.finish) {
                    missions.mision6.door = true;
                }
                enemyUpdate.length = 0;
                mapRandon.createMapOn = true;
                this.doorWorld = false;
                this.casa2 = false;
                home1 = false;
                this.doorDungeon = true;
                this.cntDungeon = true;
            } else if (tile === 93) {
                enemyUpdate.length = 0;
                this.doorWorld = false;
                this.casa2 = true;
                this.doorDungeon = false;
                findHome = false;
                home1 = true;
            } else if (tile === 94) {
                // if (missions.mision3.finish){

                // }
                enemyUpdate.length = 0;
                this.doorWorld = false;
                this.casa2 = true;
                this.doorDungeon = false;
                findHome = true;
                home1 = false;
            } else if (tile === 95) {
                enemyUpdate.length = 0;
                this.doorWorld = true;
                this.casa2 = false;
                this.doorDungeon = false;
                findHome = false;
                home1 = false;
            }
            // }else if (tile === 94){
            //     enemyUpdate.length = 0;
            //     this.doorWorld = false;
            //     this.casa1 = false;
            //     this.casa2 = true;
            //     this.doorDungeon = false;
            //     // this.cntDungeon = true;
            // } 
            // else {
            //     if (tile === 91) {
            //         enemyUpdate.length = 0;
            //         this.casa = true;
            //         this.doorDungeon = false;
            //         // this.cntDungeon = false;
            //         mapRandon.createMapOn = true; //################## puertaaaaaaaaaaa
            //         this.doorWorld = false;
            //     } else if (tile === 92) {
            //         enemyUpdate.length = 0;
            //         this.doorWorld = true;
            //         this.casa = true;
            //         this.doorDungeon = false;// no se xq estaba en true+
            //         this.cntDungeon = false;
            //         findHome = true
            //     }
            // }
            let isSolid = tile < 30 && tile > 0 //tile === 3 || tile === 5; ################################################ is solid
            return res || isSolid;
        }.bind(this), false); //  --------------------------------------------->
    }
    getCol(x) {
        return Math.floor(x / mpTsizeWidth);
    }
    getRow(y) {
        return Math.floor(y / mpTsizeHeight);
    }
    getX(col) {
        return col * mpTsizeWidth;
    }
    d
    getY(row) {
        return row * mpTsizeHeight;
    }

    heroCollide(dirx, diry) {
        let row, col;
        let left = this.x - this.width / 2;
        let right = this.x + this.width / 2 - 1;
        let top = this.y - this.height / 2;
        let bottom = this.y + this.height / 2 - 1;

        // check for collisions on sprite sides

        let collision =
            this.isSolidTileAtXY(left, top) ||
            this.isSolidTileAtXY(right, top) ||
            this.isSolidTileAtXY(right, bottom) ||
            this.isSolidTileAtXY(left, bottom);
        if (!collision) {
            return;
        }
        let l = 5;
        collision = this.isSolidTileAtXY(left, left);
        if (collision) {
            this.x += l
            this.y -= 0
            return;
        }
        collision = this.isSolidTileAtXY(right, right);
        if (collision) {
            this.x -= l
            this.y += 0
            return;
        }

        if (diry > 0) {
            row = this.getRow(bottom);
            this.y = -this.height / 2 + this.getY(row);
        } else if (diry < 0) {
            row = this.getRow(top);
            this.y = this.height / 2 + this.getY(row + 1);
        } else if (dirx > 0) {
            col = this.getCol(right);
            this.x = -this.width / 2 + this.getX(col);
        } else if (dirx < 0) {
            col = this.getCol(left);
            this.x = this.width / 2 + this.getX(col + 1);
        }


    };

    heroMove(dirX, dirY, items) {

        this.x += dirX * this.heroSPEED * delta;
        this.y += dirY * this.heroSPEED * delta;
        this.heroCollide(dirX, dirY);
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
        xCartesian = this.x;
        yCartesian = this.y;
    };

    cast() {
        if (heroAttributes.weapon.shoot) {
            let speed = heroAttributes.weapon.speed;
            let drrTarget = heroAttributes.weapon.drrTarget;
            if (heroAttributes.weapon.tTarget === 0) {
                heroAttributes.mana -= heroAttributes.weapon.restmana;
                heroAttributes.manaPercentage += (heroAttributes.weapon.restmana * 100) / heroAttributes.manaTotal;
                heroAttributes.weapon.xOrigin = (screenX - mapTsize / 2);
                heroAttributes.weapon.yOrigin = (screenY - mapTsize / 2);
            }

            if (heroAttributes.weapon.tTarget < 50) { // tiempo de la magia
                heroAttributes.weapon.tTarget++
                if (drrTarget === 0) {
                    heroAttributes.weapon.yOrigin -= speed + 3;
                } else if (drrTarget === 1) {
                    heroAttributes.weapon.xOrigin += speed;
                    heroAttributes.weapon.yOrigin -= speed;
                } else if (drrTarget === 2) {
                    heroAttributes.weapon.xOrigin += speed + 3;
                } else if (drrTarget === 3) {
                    heroAttributes.weapon.yOrigin += speed;
                    heroAttributes.weapon.xOrigin += speed;
                } else if (drrTarget === 4) {
                    heroAttributes.weapon.yOrigin += speed + 3;
                } else if (drrTarget === 5) {
                    heroAttributes.weapon.yOrigin += speed;
                    heroAttributes.weapon.xOrigin -= speed;
                } else if (drrTarget === 6) {
                    heroAttributes.weapon.xOrigin -= speed + 3;
                } else if (drrTarget === 7) {
                    heroAttributes.weapon.yOrigin -= speed;
                    heroAttributes.weapon.xOrigin -= speed;
                }
            } else {
                heroAttributes.weapon.tTarget = 0;
                heroAttributes.weapon.shoot = false;
            }

        }
    }

    renderPlayer(ctx, sx, sy) {
        this.cast();
        if (this.isReady()) {
            ctx.drawImage(
                this.sprite,
                // 8*mpTsizeWidth,
                // 0*mpTsizeWidth,
                // mpTsizeWidth,
                // mpTsizeWidth,
                // screenX - mpTsizeWidth / 2, // this.x
                // screenY - mpTsizeWidth / 2,
                // mpTsizeWidth,
                // mpTsizeWidth

                sx * 75,
                sy * 75,
                75,
                75,
                screenX - 75 / 2, // this.x
                screenY - 75 / 2, // this.y,                
                75,
                75
            )
            // this.sprite.drawCount++
            if (heroAttributes.weapon.shoot) {
                ctx.drawImage(
                    this.sprite,
                    heroAttributes.weapon.sxWeapon,
                    49 * this.sprite.frameWidth,
                    this.sprite.frameWidth,
                    this.sprite.frameHeight,
                    heroAttributes.weapon.xOrigin,
                    heroAttributes.weapon.yOrigin,
                    this.sprite.frameWidth,
                    this.sprite.frameHeight

                )
            }


        }
    }
}