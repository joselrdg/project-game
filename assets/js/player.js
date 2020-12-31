class Player {
    constructor(mapp, x, y, canvas) {
        this.map = mapp;
        this.canvas = canvas;
        this.x = x;
        this.y = y;

        this.maxX = this.map.cols * mpTsizeWidth;
        this.maxY = this.map.rows * mpTsizeHeight;
        this.healthPercentage = 0;
        //  this.screenX = x;
        //  this.screenY = y;
        this.healthHero = 10000;

        // this.healthHeroPer = heroAttributes.health;
        // this.strengthHero = heroAttributes.strength;
        this.armorHero = heroAttributes.armor;
        this.shot = false;

        this.sx = 0;
        // this.syPlayer = 8;

        this.width = 64; // es mejor map o this.map o da igua?
        this.height = 64;

        this.heroSPEED = heroSPEED // 256; // pixels per second --------------->

        this.casa = false;
        this.doorWorld = false;
        this.doorDungeon = false;
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
        this.sprite.src = './assets/img/charact.png';
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 1;
        this.sprite.verticalFrames = 1;
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
                    xCartesian < enemyUpdate[index][i].x + 100 &&
                    xCartesian > enemyUpdate[index][i].x - 100 &&
                    yCartesian < enemyUpdate[index][i].y + 100 &&
                    yCartesian > enemyUpdate[index][i].y - 100 &&
                    timeFps === 0) {
                    heroAttributes.health -= enemyUpdate[index][i].damage
                    console.log(heroAttributes.health)
                    heroAttributes.healthPercentage = 100 - (heroAttributes.health * 100) / heroAttributes.healthTotal;

                    console.log(heroAttributes.healthPercentage)
                }
            }
        }

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.map.layers.reduce(function (res, layer, index) { // no lo usa???---------------------------------->
            let tile = this.getTile(index, col, row);
            if (tile === 91) {
                enemyUpdate.length = 0;
                this.casa = false;
                this.doorDungeon = false;
                mapRandon.createMapOn = true; //################## puertaaaaaaaaaaa
                this.doorWorld = true;
            } else if (tile === 92) {
                enemyUpdate.length = 0;
                this.doorWorld = false;
                this.casa = false;
                this.doorDungeon = true;
            }
            let isSolid = tile < 30 && tile > 0 //tile === 3 || tile === 5; ################################################ is solid
            return res || isSolid;
        }.bind(this), false); // .bind???? --------------------------------------------->
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
        // -1 in right and bottom is because image ranges from 0..63
        // and not up to 64
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
        collision = this.isSolidTileAtXY(left, bottom);
        if (collision) {
            this.x += 5
            this.y -= 15
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

    heroMove(dirX, dirY, digit) {
        // this.playerShot()
        // move hero
        // console.log(rows)

        // let maxX = this.map.cols * mpTsizeWidth;
        // let maxY = this.map.rows * mpTsizeHeight;

        this.x += dirX * this.heroSPEED * delta;
        this.y += dirY * this.heroSPEED * delta;

        // check if we walked into a non-walkable tile
        this.heroCollide(dirX, dirY);

        // clamp values

        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
        xCartesian = this.x;
        yCartesian = this.y;
        // console.log('col x: ' + this.getCol(this.x))
        // console.log('col y: ' + this.getCol(this.y))
        let xCol = this.getCol(this.x);
        let yRow = this.getCol(this.y);
        xIsometric = xCol * mpTsizeWidth / 2 + yRow * mpTsizeWidth / 2 + offsetX;
        yIsometric = yRow * mpTsizeHeight / 2 - xCol * mpTsizeHeight / 2 + offsetY
        // console.log(xIsometric)
    };

    cast() {
        if (heroAttributes.weapon.shoot) {
            // if (heroAttributes.weapon.xTarget > heroAttributes.weapon.xOrigin) {
            //     heroAttributes.weapon.xOrigin += 0.3
            // } else {
            //     heroAttributes.weapon.xOrigin -= 0.3
            // }
            // if (heroAttributes.weapon.yTarget > heroAttributes.weapon.yOrigin) {
            //     heroAttributes.weapon.yOrigin += 0.3
            // } else {
            //     heroAttributes.weapon.yOrigin -= 0.3
            // }
            let oX = heroAttributes.weapon.xOrigin;
            let oY = heroAttributes.weapon.yOrigin;
            let xX = heroAttributes.weapon.xTarget;
            let yY = heroAttributes.weapon.yTarget;
            let speed = heroAttributes.weapon.speed;


            if (xX - mapTsize / 2 < oX && // enemigo abajo drch
                yY - mapTsize / 2 < oY) {
                heroAttributes.weapon.xOrigin -= speed;
                heroAttributes.weapon.yOrigin -= speed;
            }
            if (xX + mapTsize / 2 > oX &&
                yY + mapTsize / 2 > oY) {
                heroAttributes.weapon.xOrigin += speed; // 
                heroAttributes.weapon.yOrigin += speed; // enemigo arriba izq
            }
            if (yY - mapTsize / 2 < oY &&
                xX + mapTsize / 2 > oX) {
                heroAttributes.weapon.xOrigin += speed; // enemigo arriba drch
                heroAttributes.weapon.yOrigin -= speed;
            }
            if (yY + mapTsize / 2 > oY &&
                xX - mapTsize / 2 < oX) {
                heroAttributes.weapon.xOrigin -= speed;
                heroAttributes.weapon.yOrigin += speed; // enemigo abajo izq
            }
            if (oX > xX &&
                oY < yY + 32 && // enemigo izq
                oY > yY - 32) {
                heroAttributes.weapon.xOrigin -= speed;
            }
            if (oX < xX &&
                oY < yY + 32 && // enemigo drch
                oY > yY - 32) {
                heroAttributes.weapon.xOrigin += speed;
            }
            if (oY > yY &&
                oX < xX + 32 &&
                oX > xX - 32) { // enemigo abajo
                    oY -= speed;
            }
            if (oY < yY && // enemigo arriba
                oX < xX + 32 &&
                oX > xX - 32) {
                heroAttributes.weapon.yOrigin += speed;
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

                sx * mapTsize,
                sy * mapTsize,
                mapTsize,
                mapTsize,
                screenX - mapTsize / 2, // this.x
                screenY - mapTsize / 2, // this.y,                
                mapTsize,
                mapTsize
            )
            this.sprite.drawCount++

            if (heroAttributes.weapon.shoot) {
                ctx.drawImage(
                    this.sprite,
                    heroAttributes.weapon.sxWeapon,
                    1 * mapTsize,
                    mapTsize,
                    mapTsize,
                    heroAttributes.weapon.xOrigin,
                    heroAttributes.weapon.yOrigin,
                    mapTsize,
                    mapTsize

                )
            }

        }
    }
}