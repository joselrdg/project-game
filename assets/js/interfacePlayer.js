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


        this.sprite = new Image()
        this.sprite.src = './assets/img/gargola.png';
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 5;
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        // this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            // this.spriteWidth = this.sprite.frameWidth
            // this.spriteHeight = this.sprite.frameHeight
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
    }

    isReady() {
        if (this.sprite.isReady && this.spriteFlower) {
            return true
        };

    }

    renderInterface(health) {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.x, this.y, this.whidth, this.heigth);
        this.renderflower()
        this.drawHealth(health);
        this.drawMana();
        // this.ctx.save();
        this.renderKeys();
        this.renderGargola();

        // this.ctx.restore();
    }

    renderflower() {
        if (this.xFlor === canvasWidth){
            this.xFlor = 0
        }
        let syt = canvasWidth / 32;
        let sx = 0
        let x = 0;
        for (let i = 0; i < syt; i++) { 
            if (i===0){
                sx = 0;
            } else if (i=== syt-1){
                sx = 2
            }   else {
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
                cameraHeight - 64, // this.y,                
                80,
                80);
            this.ctx.drawImage(
                this.sprite,
                this.key2 * this.sprite.frameWidth,
                3 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                60,
                cameraHeight - 64, // this.y,                
                80,
                80);
            this.ctx.drawImage(
                this.sprite,
                this.key3 * this.sprite.frameWidth,
                2 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                cameraWidth - 158,
                cameraHeight - 68, // this.y,                
                78,
                78);
            this.ctx.drawImage(
                this.sprite,
                this.key4 * this.sprite.frameWidth,
                1 * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                cameraWidth - 90,
                cameraHeight - 73, // this.y,                
                78,
                78);
        }

    }

    drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
        this.ctx.restore();
    }

    drawHealth(health) {
        let x = this.xInfo * 15
        let y = this.yInfo;
        var radgrad = ctx.createRadialGradient(x + 65, y + 35, 10, x + 52, y + 50, 47);
        radgrad.addColorStop(0, '#ff66fa');
        radgrad.addColorStop(0.9, '#9f0158');
        radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');
        ctx.fillStyle = radgrad;
        ctx.fillRect(x, y + health, 150, 150); // y a 75 esta casi vacia
    }

    drawMana() {
        let x = this.xInfo * 40; // derch e izquierda
        let y = this.yInfo + 1; // sube o baja 
        var radgrad = ctx.createRadialGradient(x + 35, y + 35, 10, x + 52, y + 50, 47);
        radgrad.addColorStop(0, '#6ddde9');
        radgrad.addColorStop(0.9, '#298ef8');
        radgrad.addColorStop(1, 'rgba(18, 1, 159, 0)');
        ctx.fillStyle = radgrad;
        ctx.fillRect(x, y, 150, 150); // y a 80df esta casi vacia
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