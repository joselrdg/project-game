class InerfacePlayer {
    constructor(ctx, x, y, whidth, heigth) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.xInfo = canvasWidth / 64
        this.yInfo = canvasHeight - 100;
        this.whidth = whidth;
        this.heigth = heigth;

        this.key1 = 1;
        this.key2 = 1;
        this.key3 = 1;
        this.key4 = 1;

        this.cnt = false;

        this.i = false;
        this.k = false;
        this.p = false;
        this.b = false;

        this.rest = 0;
        this.syEnter = 0;

        this.spriteEnter = new Image()
        this.spriteEnter.src = './assets/img/enter.png';
        this.spriteEnter.isReady = false
        this.spriteEnter.horizontalFrames = 1;
        this.spriteEnter.verticalFrames = 16;
        this.spriteEnter.horizontalFrameIndex = 0
        this.spriteEnter.verticalFrameIndex = 0
        this.spriteEnter.drawCount = 0
        this.spriteEnter.onload = () => {
            this.spriteEnter.isReady = true
            this.spriteEnter.frameWidth = Math.floor(this.spriteEnter.width / this.spriteEnter.horizontalFrames)
            this.spriteEnter.frameHeight = Math.floor(this.spriteEnter.height / this.spriteEnter.verticalFrames)
        }
        this.sprite = new Image()
        this.sprite.src = './assets/img/gargola.png';
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 5;
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
        }
        this.xFlor = 0;
        this.spriteFlower = new Image()
        this.spriteFlower.src = './assets/img/flor.png';
        this.spriteFlower.isReady = false
        this.spriteFlower.horizontalFrames = 3;
        this.spriteFlower.verticalFrames = 1;
        this.spriteFlower.horizontalFrameIndex = 0
        this.spriteFlower.verticalFrameIndex = 0
        this.spriteFlower.onload = () => {
            this.spriteFlower.isReady = true
            this.spriteFlower.frameWidth = Math.floor(this.spriteFlower.width / this.spriteFlower.horizontalFrames)
            this.spriteFlower.frameHeight = Math.floor(this.spriteFlower.height / this.spriteFlower.verticalFrames)
        }
        this.spriteIcon = new Image()
        this.spriteIcon.src = './assets/img/icon.png';
        this.spriteIcon.isReady = false
        this.spriteIcon.horizontalFrames = 1;
        this.spriteIcon.verticalFrames = 3;
        this.spriteIcon.horizontalFrameIndex = 0
        this.spriteIcon.verticalFrameIndex = 0
        this.spriteIcon.onload = () => {
            this.spriteIcon.isReady = true
            this.spriteIcon.frameWidth = Math.floor(this.spriteIcon.width / this.spriteIcon.horizontalFrames)
            this.spriteIcon.frameHeight = Math.floor(this.spriteIcon.height / this.spriteIcon.verticalFrames)
        }

        this.spriteItems = new Image()
        this.spriteItems.src = './assets/img/items.png';
        this.spriteItems.isReady = false
        this.spriteItems.horizontalFrames = 1;
        this.spriteItems.verticalFrames = 3;
        this.spriteItems.horizontalFrameIndex = 0
        this.spriteItems.verticalFrameIndex = 0
        this.spriteItems.onload = () => {
            this.spriteItems.isReady = true
            this.spriteItems.frameWidth = Math.floor(this.spriteItems.width / this.spriteItems.horizontalFrames)
            this.spriteItems.frameHeight = Math.floor(this.spriteItems.height / this.spriteItems.verticalFrames)
        }

        this.spriteMenu1 = new Image()
        this.spriteMenu1.src = './assets/img/menu1.png';
        this.spriteMenu1.isReady = false
        this.spriteMenu1.horizontalFrameIndex = 0
        this.spriteMenu1.verticalFrameIndex = 0
        this.spriteMenu1.onload = () => {
            this.spriteMenu1.isReady = true
        }
        this.spriteBag = new Image()
        this.spriteBag.src = './assets/img/bag.png';
        this.spriteBag.isReady = false
        this.spriteBag.horizontalFrameIndex = 0
        this.spriteBag.verticalFrameIndex = 0
        this.spriteBag.onload = () => {
            this.spriteBag.isReady = true
        }
    }

    isReady() {
        if (this.sprite.isReady &&
            this.spriteFlower.isReady &&
            this.spriteEnter.isReady &&
            this.spriteIcon.isReady &&
            this.spriteMenu1.isReady &&
            this.spriteBag.isReady &&
            this.spriteItems.isReady) {
            return true
        };

    }

    renderInterface(syIcon, health, pause, frameCount) {
        if (pause) {
            let sy = 0
            if (frameCount === 0) {
                this.syEnter++

                if (this.syEnter > 15) {
                    this.syEnter = 0
                }
            }
            if (this.isReady()) {
                this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
                this.ctx.drawImage(
                    this.spriteEnter,
                    0 * this.spriteEnter.frameWidth,
                    this.syEnter * this.spriteEnter.frameHeight,
                    this.spriteEnter.frameWidth,
                    this.spriteEnter.frameHeight,
                    0,
                    0, // this.y,                
                    cameraWidth,
                    cameraHeight + 32);
                if (!this.k) {
                    this.ctxtextAlign = "center";
                    this.ctx.font = "40px Anton";
                    this.ctx.fillStyle = "white";
                    this.ctx.fillText("Go to hell with...", cameraWidth / 2 - 130, cameraHeight / 2);
                    this.ctx.font = "60px Anton";
                    this.ctx.fillText("Canvas!!!", cameraWidth / 2 - 90, cameraHeight / 2 + 60);
                    this.ctx.font = "30px Anton";
                    this.ctx.fillStyle = "black";
                    this.ctx.fillText("Hit Enter to play", cameraWidth / 2 - 100, cameraHeight / 2 + 200);
                    this.ctx.font = "20px Anton";
                    this.ctx.fillText("Press K to see the controls", cameraWidth / 2 - 110, cameraHeight / 2 + 250);
                } else {
                    this.ctxtextAlign = "center";
                    // this.ctx.fillStyle = "white";
                    this.ctx.font = "40px Anton";
                    this.ctx.fillStyle = "black";
                    this.ctx.fillText("Controls:", 50, 100);
                    this.ctx.font = "30px Anton";
                    this.ctx.fillText("Start ----------- Enter", 50, 140);
                    this.ctx.fillText("Pause --------- P", 50, 180);
                    this.ctx.fillText("Controls ------ K", 50, 220);
                    this.ctx.fillText("Up ------------- W", 50, 260);
                    this.ctx.fillText("Down ---------- S", 50, 300);
                    this.ctx.fillText("Left ------------ A", 50, 340);
                    this.ctx.fillText("Right ---------- D", 50, 380);
                    this.ctx.fillText("Shooting ----- Click Left", 50, 420);
                    this.ctx.fillText("Weapon 1 ---- 1", 50, 460);
                    this.ctx.fillText("Weapon 2 --- 2", 50, 500);
                    this.ctx.fillText("Weapon 3 --- 3", 50, 540);

                }
            }
        } else {
            this.renderKeys();
            if (this.i) {
                this.mision()
            }
            if (this.p) {
                this.menu1()
            }
            if (this.b) {
                this.bag()
            }
            this.misionI();
            // this.xp()
            this.renderIcon(syIcon);
            this.renderflower()
            this.drawHealth(health);
            this.drawMana();
            this.renderGargola();
            this.renderFinal();
        }
    }

    renderFinal() {
        if (heroAttributes.die || heroAttributes.health < 1) {
            this.ctxtextAlign = "center";
            this.ctx.font = "80px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('GAME OVER', cameraWidth / 2 - 170, cameraHeight / 2);
            setTimeout(() => {
                location.reload();
            }, 6000);
            if (missions.mision8.finish) {
                this.ctx.font = "30px Anton";
                this.ctx.fillStyle = "red";
                this.ctx.fillText('Did you think you could escape from hell?', cameraWidth / 2 - 245, cameraHeight / 2 - 100);
            }
        }
    }

    misionI() {
        if (!missions.mision1.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('Dead demons:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision1.deadCreatures, 130, 80)
        } else if (!missions.mision2.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('Underworld key:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision2.key1, 140, 80)
        } else if (!missions.mision3.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('Entry found:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision3.key1, 110, 80)
        } else if (!missions.mision4.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('Dead demons:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision4.deadCreatures, 130, 80)
        } else if (!missions.mision5.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('Underworld key:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision5.key2, 140, 80)
        } else if (!missions.mision6.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('Entry found:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision6.key1, 140, 80)
        } else if (!missions.mision7.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('kill Mephisto:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision7.key3, 140, 80)
        } else if (!missions.mision8.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText('kill Andariel:', 30, 80);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(missions.mision8.key3, 140, 80)
        } else if (!missions.mision9.finish) {
            this.ctxtextAlign = "center";
            this.ctx.font = "16px Anton";
            this.ctx.fillStyle = "red";
            this.ctx.fillText('Go back home!!!', 140, 80)
        } else if (missions.mision9.finish) {
            // this.ctxtextAlign = "center";
            // this.ctx.font = "16px Anton";
            // this.ctx.fillStyle = "red";
            // this.ctx.fillText('Winer', 140, 80)
        }
    }

    mision() {
        let task = '';
        if (!missions.mision1.finish) {
            task = missions.mision1.target;
        } else if (!missions.mision2.finish) {
            task = missions.mision2.target;
        } else if (!missions.mision3.finish) {
            task = missions.mision3.target;
        } else if (!missions.mision4.finish) {
            task = missions.mision4.target;
        } else if (!missions.mision5.finish) {
            task = missions.mision5.target;
        } else if (!missions.mision6.finish) {
            task = missions.mision6.target;
        } else if (!missions.mision7.finish) {
            task = missions.mision7.target;
        } else if (!missions.mision8.finish) {
            task = missions.mision8.target;
        } else if (!missions.mision9.finish) {
            task = missions.mision9.target;
        }
        this.ctxtextAlign = "center";
        this.ctx.font = "16px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(task, 30, 110);
    }

    bag() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.spriteBag,
                0,
                0,
                this.spriteBag.width,
                this.spriteBag.height,
                cameraWidth / 2,
                0, // this.y,                
                this.spriteBag.width,
                this.spriteBag.height);
            this.ctxtextAlign = "center";
            this.ctx.font = "10px Anton";
            this.ctx.fillStyle = "#d0d0d0";
            this.ctx.fillText(heroAttributes.gold, cameraWidth / 2 + 110, this.spriteMenu1.height - 87);
        }
    }

    menu1() {
        let healt = `${heroAttributes.health}`
        if (this.isReady()) {
            this.ctx.drawImage(
                this.spriteMenu1,
                0,
                0,
                this.spriteMenu1.width,
                this.spriteMenu1.height,
                cameraWidth / 2 - this.spriteMenu1.width,
                0, // this.y,                
                this.spriteMenu1.width,
                this.spriteMenu1.height);

        }
        this.ctxtextAlign = "center";
        this.ctx.font = "15px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(heroAttributes.level, cameraWidth / 2 - 194, 100);
        this.ctxtextAlign = "center";
        this.ctx.font = "10px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(heroAttributes.strength, this.spriteMenu1.width / 2 + 60, 366);
        this.ctxtextAlign = "center";
        this.ctx.font = "10px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(heroAttributes.dexterrity, this.spriteMenu1.width / 2 + 60, 390);
        this.ctxtextAlign = "center";
        this.ctx.font = "10px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(heroAttributes.intelligent, this.spriteMenu1.width / 2 + 60, 412);
        this.ctxtextAlign = "center";
        this.ctx.font = "10px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(heroAttributes.healthTotal, this.spriteMenu1.width / 2 + 60, 437);
        this.ctxtextAlign = "center";
        this.ctx.font = "10px Anton";
        this.ctx.fillStyle = "#d0d0d0";
        this.ctx.fillText(heroAttributes.gold, cameraWidth / 2 - 200, this.spriteMenu1.height - 98);
    }

    // xp() {
    //     let xp = Math.round(heroAttributes.xp)
    //     this.ctx.fillStyle = "#ff0";
    //     this.ctx.rect(0, cameraHeight - 5, xp, 5);
    //     this.ctx.fill();
    //     if (heroAttributes.xp > cameraWidth + 1) { // actualiza xp
    //                   this.cnt = true;
    //         setTimeout(() => {
    //             this.cnt = false;
    //         }, 3000);
    //     }
    //     // this.ctx.clearRect(xp, cameraHeight - 5, cameraWidth, 5)
    //     if (this.cnt) {
    //         this.ctxtextAlign = "center";
    //         this.ctx.font = "30px Anton";
    //         this.ctx.fillStyle = "#ff0000";
    //         this.ctx.fillText("Player Up!!!", cameraWidth / 2 - 80, 50);
    //     }
    // }

    renderIcon(syIcon) {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.spriteIcon,
                0 * this.spriteIcon.frameWidth,
                syIcon * this.spriteIcon.frameHeight,
                this.spriteIcon.frameWidth,
                this.spriteIcon.frameHeight,
                cameraWidth - 74,
                10, // this.y,                
                64,
                64);
            ctx.drawImage(
                this.spriteItems,
                0,
                2 * this.spriteItems.frameHeight,
                this.spriteItems.frameWidth,
                this.spriteItems.frameHeight,
                20,
                10,
                this.spriteItems.frameWidth,
                this.spriteItems.frameHeight
            );
            ctx.drawImage(
                this.spriteItems,
                0,
                1 * this.spriteItems.frameHeight,
                this.spriteItems.frameWidth,
                this.spriteItems.frameHeight,
                100,
                10,
                this.spriteItems.frameWidth,
                this.spriteItems.frameHeight
            )
            if (heroAttributes.healthTime < 5) {
                this.ctxtextAlign = "center";
                this.ctx.font = "15px Anton";
                this.ctx.fillStyle = "red";
                this.ctx.fillText(heroAttributes.healthTime, 65, 33);
            } else {
                this.ctxtextAlign = "center";
                this.ctx.font = "15px Anton";
                this.ctx.fillStyle = "#d0d0d0";
                this.ctx.fillText(heroAttributes.items.healthJar, 65, 33);
            }
            if (heroAttributes.manaTime < 5) {
                this.ctxtextAlign = "center";
                this.ctx.font = "15px Anton";
                this.ctx.fillStyle = "red";
                this.ctx.fillText(heroAttributes.manaTime, 145, 33);
            } else {
                this.ctxtextAlign = "center";
                this.ctx.font = "15px Anton";
                this.ctx.fillStyle = "#d0d0d0";
                this.ctx.fillText(heroAttributes.items.manaJar, 145, 33);
            }
        }


    }

    renderflower() {
        if (this.xFlor === canvasWidth) {
            this.xFlor = 0
        }
        let syt = canvasWidth / 32;
        let sx = 0
        let x = 0;
        for (let i = 0; i < syt; i++) {
            if (i === 0) {
                sx = 0;
            } else if (i === syt - 1) {
                sx = 2
            } else {
                sx = 1;
            }
            if (this.isReady()) {
                this.ctx.drawImage(
                    this.spriteFlower,
                    sx * this.spriteFlower.frameWidth,
                    0 * this.spriteFlower.frameHeight,
                    this.spriteFlower.frameWidth,
                    this.spriteFlower.frameHeight,
                    this.xFlor,
                    cameraHeight, // this.y,                
                    32,
                    32);
                this.xFlor += 32
            }
        }
    }

    renderKeys() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.sprite,
                this.key1 * this.sprite.frameWidth,
                4 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                5,
                cameraHeight - 70, // this.y,                
                80,
                80);
            this.ctx.drawImage(
                this.sprite,
                this.key2 * this.sprite.frameWidth,
                3 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                60,
                cameraHeight - 70, // this.y,                
                80,
                80);
            this.ctx.drawImage(
                this.sprite,
                this.key3 * this.sprite.frameWidth,
                2 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                cameraWidth - 158,
                cameraHeight - 74, // this.y,                
                78,
                78);
            this.ctx.drawImage(
                this.sprite,
                this.key4 * this.sprite.frameWidth,
                1 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                cameraWidth - 90,
                cameraHeight - 80, // this.y,                
                78,
                78);
        }

    }

    // rest(r){
    //     this.rest = r
    // }

    drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
        this.ctx.restore();
    }

    drawHealth(health) {
        let healtInter = heroAttributes.health
        let x = this.xInfo * 15
        let y = this.yInfo;
        this.ctxtextAlign = "center";
        this.ctx.font = "10px Anton";
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillText(healtInter, screenX - 10, screenY - 50);
        var radgrad = ctx.createRadialGradient(x + 65, y + 35, 10, x + 52, y + 50, 47);
        radgrad.addColorStop(0, '#ff66fa');
        radgrad.addColorStop(0.9, '#9f0158');
        radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');
        ctx.fillStyle = radgrad;
        ctx.fillRect(x, y + health, 150, 150); // y a 75 esta casi vacia
    }

    drawMana() {
        let x = this.xInfo * 40; // derch e izquierda
        let y = this.yInfo; // sube o baja 
        var radgrad = ctx.createRadialGradient(x + 35, y + 35, 10, x + 52, y + 50, 47);
        radgrad.addColorStop(0, '#6ddde9');
        radgrad.addColorStop(0.9, '#298ef8');
        radgrad.addColorStop(1, 'rgba(18, 1, 159, 0)');
        ctx.fillStyle = radgrad;
        ctx.fillRect(x, y + heroAttributes.manaPercentage, 150, 150); // y a 80df esta casi vacia
    }

    renderGargola() {
        if (this.isReady()) {

            this.ctx.drawImage(
                this.sprite,
                0 * this.sprite.frameWidth,
                0 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.xInfo * 43 - 2,
                this.yInfo - 25, // this.y,                
                this.sprite.frameWidth,
                this.sprite.frameHeight
            )
            this.ctx.translate(this.xInfo * 20, this.yInfo - 25);
            ctx.scale(-1, 1);
            this.ctx.drawImage(this.sprite, 0, 0)
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.sprite.drawCount++
        }
    }

    drawBocata() {
        this.ctx.beginPath();
        this.ctx.moveTo(75, 25);
        this.ctx.quadraticCurveTo(25, 25, 25, 62.5);
        this.ctx.quadraticCurveTo(25, 100, 50, 100);
        this.ctx.quadraticCurveTo(50, 120, 30, 125);
        this.ctx.quadraticCurveTo(60, 120, 65, 100);
        this.ctx.quadraticCurveTo(125, 100, 125, 62.5);
        this.ctx.quadraticCurveTo(125, 25, 75, 25);
        this.ctx.stroke();
    }

}