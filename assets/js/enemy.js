class Enemy {
    constructor(ctx, map) { //arr, level, type, number, x, y
        // this.enemies = arr enemies[level].type;
        // this.num = number;
        // this.x = x;
        this.ctx = ctx
        // this.map = map;
        // this.width = this.map.tsize; // es mejor map o this.map o da igua?
        // this.height = this.map.tsize;
        // this.ctx = ctx;
        this.deadArr = [
            []
        ];

        this.portalMision = false;

        this.dropKey = {
            keys: [1, 1, 1, 1],
            key: true,
            x: 0,
            y: 0,
            cntKey: -1
        };
        // this.cntKey = -1;

        this.sprite = new Image();
        this.sprite.src = './assets/img/diablo.png'; //`${this.enemy.img}`
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 1;
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            // this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            // this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            // this.spriteWidth = this.sprite.frameWidth
            // this.spriteHeight = this.sprite.frameHeight
        }
        this.spriteBoos1 = new Image();
        this.spriteBoos1.src = './assets/img/boss128.png';
        this.spriteBoos1.isReady = false;
        this.spriteBoos1.horizontalFrames = 1;
        this.spriteBoos1.verticalFrames = 1;
        this.spriteBoos1.horizontalFrameIndex = 0
        this.spriteBoos1.verticalFrameIndex = 0
        this.spriteBoos1.drawCount = 0
        this.spriteBoos1.onload = () => {
            this.spriteBoos1.isReady = true
            // this.spriteBoos1.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            // this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            // this.spriteWidth = this.sprite.frameWidth
            // this.spriteHeight = this.sprite.frameHeight
        }
        this.spriteMefisto = new Image();
        this.spriteMefisto.src = './assets/img/mefistoo.png';
        this.spriteMefisto.isReady = false;
        this.spriteMefisto.horizontalFrames = 8;
        this.spriteMefisto.verticalFrames = 9;
        this.spriteMefisto.horizontalFrameIndex = 0
        this.spriteMefisto.verticalFrameIndex = 0
        this.spriteMefisto.drawCount = 0
        this.spriteMefisto.onload = () => {
            this.spriteMefisto.isReady = true
            this.spriteMefisto.frameWidth = Math.floor(this.spriteMefisto.width / this.spriteMefisto.horizontalFrames)
            this.spriteMefisto.frameHeight = Math.floor(this.spriteMefisto.height / this.spriteMefisto.verticalFrames)
            // this.spriteMefisto = this.sprite.frameWidth
            // this.spriteMefisto = this.sprite.frameHeight
        }
        this.spriteKey = new Image();
        this.spriteKey.src = './assets/img/keys.png';
        this.spriteKey.isReady = false;
        this.spriteKey.horizontalFrames = 1;
        this.spriteKey.verticalFrames = 1;
        this.spriteKey.horizontalFrameIndex = 0
        this.spriteKey.verticalFrameIndex = 0
        this.spriteKey.drawCount = 0
        this.spriteKey.onload = () => {
            this.spriteKey.isReady = true
        }
    }

    isReady() {
        if (this.sprite.isReady && this.spriteBoos1.isReady) {
            return true
        }
    }

    enemyMove(animatedShot, drrShot, shot) {
        let retrasoGolpe = 32;

        let indice = 0;
        for (let index = 0; index < enemyUpdate.length; index++) {
            for (let i = 0; i < enemyUpdate[index].length; i++) {
                let hold = enemyUpdate[index].shift();
                if (hold.type === 'mefisto') {
                    retrasoGolpe = 64;
                }
                if (hold.endAnimation < 600) {
                    if (animatedShot &&
                        hold.x < xCartesian + mapTsize / 2 &&
                        hold.x > xCartesian - mapTsize / 2 &&
                        hold.y < yCartesian + mapTsize / 2 &&
                        hold.y > yCartesian - mapTsize / 2) {
                        if (hold.x < xCartesian + mapTsize / 2 &&
                            hold.x >= xCartesian &&
                            hold.y < yCartesian + mapTsize / 2 &&
                            hold.y >= yCartesian) {
                            // rectangulo drx inferior
                            if (drrShot === 2 || drrShot === 3 || drrShot === 4) {
                                hold.health -= shot;
                                hold.x += retrasoGolpe;
                                hold.y += retrasoGolpe;
                            }
                        } else if (hold.x > xCartesian - mapTsize / 2 &&
                            hold.x <= xCartesian &&
                            hold.y < yCartesian + mapTsize / 2 &&
                            hold.y >= yCartesian) {
                            // rectangulo izq inferior
                            if (drrShot === 4 || drrShot === 5 || drrShot === 6) {
                                hold.health -= shot;
                                hold.x -= retrasoGolpe;
                                hold.y += retrasoGolpe;
                            }
                        } else if (hold.x < xCartesian + mapTsize / 2 &&
                            hold.x >= xCartesian &&
                            hold.y > yCartesian - mapTsize / 2 &&
                            hold.y <= yCartesian) {
                            // rectangulo drx superior
                            if (drrShot === 2 || drrShot === 3 || drrShot === 4) {
                                hold.health -= shot;
                                hold.x += retrasoGolpe;
                                hold.y -= retrasoGolpe;
                            }
                        } else if (hold.x > xCartesian - mapTsize / 2 &&
                            hold.x <= xCartesian &&
                            hold.y > yCartesian - mapTsize / 2 &&
                            hold.y <= yCartesian) {
                            // rectangulo izq superior
                            if (drrShot === 4 || drrShot === 5 || drrShot === 6) {
                                hold.health -= shot;
                                hold.x -= retrasoGolpe;
                                hold.y -= retrasoGolpe;
                            }
                        }
                        if (hold.health < 1) {
                            if (hold.type === 'mefisto' && hold.key === true) {
                                this.dropKey.x = hold.x;
                                this.dropKey.y = hold.y;
                                this.dropKey.cntKey++;
                                this.dropKey.keys[this.dropKey.cntKey] = 0;
                                this.dropKey.key = true;
                                this.renderProfit(hold.x, hold.y)
                                this.portalMision = true;
                               hold.sy = 8;
                            } else 
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 17;
                            } else {
                                hold.sy = 8;
                            }
                            hold.dead = true;
                        }
                    }
                    if (hold.health > 0) {
                        let xcoorP = xCartesian;
                        let ycoorP = yCartesian;
                        if (xcoorP - mapTsize / 2 < hold.x && // enemigo abajo drch
                            ycoorP - mapTsize / 2 < hold.y) {
                            hold.x -= hold.speed;
                            hold.y -= hold.speed;
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 16
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 3
                            } else {
                                hold.sy = 7;
                            }
                        }
                        if (xcoorP + mapTsize / 2 > hold.x && yCartesian + mapTsize / 2 > hold.y) {
                            hold.x += hold.speed; // 
                            hold.y += hold.speed; // enemigo arriba izq
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 11
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 7
                            } else {
                                hold.sy = 2;
                            }
                        }
                        if (ycoorP - mapTsize / 2 < hold.y && xCartesian + mapTsize / 2 > hold.x) {
                            hold.x += hold.speed; // enemigo arriba drch
                            hold.y -= hold.speed;
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 10;
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 5
                            } else {
                                hold.sy = 1;
                            }
                        }
                        if (ycoorP + mapTsize / 2 > hold.y && xCartesian - mapTsize / 2 < hold.x) {
                            hold.x -= hold.speed;
                            hold.y += hold.speed; // enemigo abajo izq
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 14;
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 1
                            } else {
                                hold.sy = 5;
                            }
                        }
                        if (hold.x > xcoorP &&
                            hold.y < ycoorP + 32 && // enemigo izq
                            hold.y > ycoorP - 32) {
                            hold.x -= hold.speed;
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 15;
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 2
                            } else {
                                hold.sy = 6;
                            }
                        }
                        if (hold.x < xcoorP &&
                            hold.y < ycoorP + 32 && // enemigo drch
                            hold.y > ycoorP - 32) {
                            hold.x += hold.speed;
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 12;
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 6
                            } else {
                                hold.sy = 3;
                            }
                        }
                        if (hold.y > ycoorP &&
                            hold.x < xcoorP + 32 &&
                            hold.x > xcoorP - 32) { // enemigo abajo
                            hold.y -= hold.speed;
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 9;
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 4
                            } else {
                                hold.sy = 0;
                            }
                        }
                        if (hold.y < ycoorP && // enemigo arriba
                            hold.x < xcoorP + 32 &&
                            hold.x > xcoorP - 32) {
                            hold.y += hold.speed;
                            if (hold.type === 'devil' || hold.type === 'boss2') {
                                hold.sy = 13;
                            } else if (hold.type === 'mefisto') {
                                hold.sy = 0
                            } else {
                                hold.sy = 4;
                            }
                        }
                        let collide = (element) =>
                            hold.x < element.x + mpTsizeWidth &&
                            hold.x > element.x - mpTsizeWidth &&
                            hold.y < element.y + mpTsizeHeight &&
                            hold.y > element.y - mpTsizeHeight;
                        if (enemyUpdate[index].some(collide) && timeFps === 0 || timeFps === 300 || timeFps === 600) {
                            let random = getRandomInt(0, 4);
                            if (random === 0) {
                                hold.x += collideEnemy;
                            } else if (random === 1) {
                                hold.x -= collideEnemy;
                            } else if (random === 2) {
                                hold.y += collideEnemy;
                            } else {
                                hold.y -= collideEnemy;
                            }
                        };
                    }
                    enemyUpdate[index].push(hold)
                }
            }
        }

    }

    renderProfit(x, y) {
        // let sy = 0
        // if (this.dropKey.cntKey === 0){
        //     sy = 4;
        // } else if (this.dropKey.cntKey === 1){
        //     sy = 3;
        // } else if (this.dropKey.cntKey === 2){
        //     sy = 2
        // } else {
        //     sy = 1
        // }
        // console.log('x: '+ x + ' y: ' + y + ' xcart: ' + xCartesian + ' ycart: ' + yCartesian)
        if (this.isReady()) {
            ctx.drawImage(
                this.spriteKey,
                0,
                1 * 128,
                128,
                128,
                xCartesian,
                yCartesian, // enemyUpdate[i][j].x - cameraX, // screenX - this.spriteWidth / 2, // this.x
                // enemyUpdate[i][j].y - cameraY, // screenY - this.spriteHeight / 2, // this.y,                
                64,
                64
            )
            // if (this.cntKey < 3) {
            //     this.cntKey++
            // } else {
            //     this.cntKey = 0;
            // }

        }

    }


    renderEnemy(sx) {
        if (this.dropKey.key) {
            // let ranx = this.dropKey.x;
            // let rany = this.dropKey.y;
            // // this.renderProfit(ranx, rany)
            if (this.dropKey.x < xCartesian + 15 &&
                this.dropKey.x > xCartesian - 15 && /// coge la llave
                this.dropKey.y < yCartesian + 15 &&
                this.dropKey.y > yCartesian - 15) {
                this.dropKey.key = false;
            }
        }

        // let sxt = sx;
        let sxt = sx;
        let syt = 0;
        let Width = 64;
        let height = 64;
        if (this.isReady()) {
            let sprite = this.sprite;
            for (let i = 0; i < enemyUpdate.length; i++) {
                for (let j = 0; j < enemyUpdate[i].length; j++) {

                    if (enemyUpdate[i][j].type === 'boss1') {
                        sprite = this.spriteBoos1
                        Width = 128;
                        height = 128;
                    } else if (enemyUpdate[i][j].type === 'boss2') {
                        sprite = this.spriteBoos1
                        Width = 128;
                        height = 128;
                    } else if (enemyUpdate[i][j].type === 'mefisto') {
                        sprite = this.spriteMefisto;
                        Width = this.spriteMefisto.frameWidth;
                        height = this.spriteMefisto.frameHeight;
                    }
                    if (enemyUpdate[i][j].endAnimation > 0) {
                        sxt = 7;
                        enemyUpdate[i][j].endAnimation++;;
                    }
                    if (enemyUpdate[i][j].dead === true && sxt === 7) {
                        enemyUpdate[i][j].endAnimation++;
                    }
                    ctx.drawImage(
                        sprite,
                        sxt * Width,
                        enemyUpdate[i][j].sy * height,
                        Width,
                        height,
                        enemyUpdate[i][j].x - cameraX, // screenX - this.spriteWidth / 2, // this.x
                        enemyUpdate[i][j].y - cameraY, // screenY - this.spriteHeight / 2, // this.y,                
                        Width,
                        height
                    )
                }
            }
        }
    }
}