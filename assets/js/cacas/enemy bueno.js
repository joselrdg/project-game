class Enemy {
    constructor(ctx, map) { //arr, level, type, number, x, y
        // this.enemies = arr enemies[level].type;
        // this.num = number;
        // this.x = x;
        this.ctx = ctx
        this.map = map;
        // this.width = this.map.tsize; // es mejor map o this.map o da igua?
        // this.height = this.map.tsize;
        // this.ctx = ctx;

        this.sprite = new Image();
        this.sprite.src = './assets/img/characterr.png'; //`${this.enemy.img}`
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 1;
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.spriteWidth = this.sprite.frameWidth
            this.spriteHeight = this.sprite.frameHeight
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    enemyMove() {
        let hold = [];
        for (let index = 0; index < enemyUpdate.length; index++) {
            for (let i = 0; i < enemyUpdate[index].length; i++) {
                hold = enemyUpdate.splice(1, 0, 'Feb'
                if (xCartesian < enemyUpdate[index][i].x) {
                    enemyUpdate[index][i].x -= enemyUpdate[index][i].speed;
                } else {
                    enemyUpdate[index][i].x += enemyUpdate[index][i].speed;
                }
                if (yCartesian < enemyUpdate[index][i].y) {
                    enemyUpdate[index][i].y -= enemyUpdate[index][i].speed;
                } else {
                    enemyUpdate[index][i].y += enemyUpdate[index][i].speed;
                }

                let collideX = (element) =>
                console.log(element.x)
                    enemyUpdate[index][i].x < element.x + mapTsize / 2 &&
                    enemyUpdate[index][i].x > element.x  - mapTsize / 2  ||
                    enemyUpdate[index][i].y < element.y + mapTsize / 2 &&
                    enemyUpdate[index][i].y > element.y  - mapTsize / 2;
                if (timeSeg == i && timeFps == 0) {
                    console.log(enemyUpdate[index].some(collideX))
                }
            }
        }

    }




    renderEnemy() {
        if (this.isReady()) {
            for (let i = 0; i < enemyUpdate.length; i++) {
                for (let j = 0; j < enemyUpdate[i].length; j++) {
                    ctx.drawImage(
                        this.sprite,
                        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                        this.sprite.frameWidth,
                        this.sprite.frameHeight,
                        enemyUpdate[i][j].x - cameraX, // screenX - this.spriteWidth / 2, // this.x
                        enemyUpdate[i][j].y - cameraY, // screenY - this.spriteHeight / 2, // this.y,                
                        mapTsize,
                        mapTsize
                    )
                    // console.log('x:' + enemyUpdate[i].x + '  y:' + enemyUpdate[i].y)
                    // console.log(cameraX, cameraY)

                    this.sprite.drawCount++
                }
            }
        }
    }

}