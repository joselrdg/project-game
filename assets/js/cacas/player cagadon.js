class Player {
    constructor(map, x, y) {
        this.map = map;
        this.x = x;
        this.y = y;
        // this.screenX = x;
        // this.screenY = y;
        this.camX = 0;
        this.camY = 0;
        this.width = this.map.tsize; // es mejor map o this.map o da igua?
        this.height = this.map.tsize;
        this.following = {};
        this.heroSPEED = 256; // pixels per second --------------->

        // this.xCam = 0 // function camera
        // this.minX = 0
        this.maxX = this.map.cols * this.map.tsize - this.width; // canvasWidth / 2; 
        // this.vx = 0
        this.yCam = 0
        this.maxY = this.map.rows * this.map.tsize - this.height; //0  
        // this.vy = 0
        this.maxX = this.map.cols * this.map.tsize - canvasWidth; ///    this.width = 0  
        this.maxY = this.map.rows * this.map.tsize - canvasHeight; ///this.height = 0           canvasWidth

        this.sprite = new Image()
        this.sprite.src = './assets/img/character.png';
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
            this.spriteWidth = this.sprite.frameWidth
            this.spriteHeight = this.sprite.frameHeight
            this.sprite.screenX = this.x;
            this.sprite.screenY = this.x;

            // this.following = this.sprite;
            // this.following.screenX = 0;
            // this.following.screenY = 0;
            // this.following.followX = 0;
            // this.following.followY = 0;
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    getTile(layer, col, row) {
        return this.map.layers[layer][row * this.map.cols + col];
    }

    isSolidTileAtXY(x, y) {
        let col = Math.floor(x / this.map.tsize);
        let row = Math.floor(y / this.map.tsize);

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.map.layers.reduce(function (res, layer, index) { // no lo usa???---------------------------------->
            let tile = this.getTile(index, col, row);
            let isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }.bind(this), false); // .bind???? --------------------------------------------->
    }
    getCol(x) {
        return Math.floor(x / this.map.tsize);
    }
    getRow(y) {
        return Math.floor(y / this.map.tsize);
    }
    getX(col) {
        return col * this.map.tsize;
    }
    getY(row) {
        return row * this.map.tsize;
    }

    cameraUpdate() {
        // assume followed sprite should be placed at the center of the screen
        // whenever possible
        // console.log(this.following.screenX)
     this.following = this.sprite;
        this.following.screenX = this.width / 2;
        this.following.screenY = this.height / 2;
        // console.log(this.following.screenX)
        this.camX = this.sprite.screenX;
        this.camY = this.sprite.screenY;
        // make the camera follow the sprite
        this.camX = this.following.followX - this.width / 2;
        this.camY = this.following.followY - this.height / 2;
        // clamp values
        this.camX = Math.max(0, Math.min(this.camX, this.maxX));
        this.camY = Math.max(0, Math.min(this.camY, this.maxY));

        // in map corners, the sprite cannot be placed in the center of the screen
        // and we have to change its screen coordinates

        // left and right sides
        if (this.following.followX < this.width / 2 ||
            this.following.followX > this.maxX + this.width / 2) {
            this.following.screenX = this.following.followX - this.cameraX;
        }
        // top and bottom sides
        if (this.following.followY < this.height / 2 ||
            this.following.followY > this.maxY + this.height / 2) {
            this.following.screenY = this.following.followY - this.cameraY;
        }
    };

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

    heroMove(delta, dirX, dirY) {
        // move hero
        this.x += dirX * this.heroSPEED * delta;
        this.y += dirY * this.heroSPEED * delta;

        // check if we walked into a non-walkable tile
        this.heroCollide(dirX, dirY);

        // clamp values
        var maxX = this.map.cols * this.map.tsize;
        var maxY = this.map.rows * this.map.tsize;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    };

    renderPlayer(ctx) {
        if (this.isReady()) {
            console.log(this.following.screenX)
            console.log(this.sprite.screenX)
            ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.screenX - this.spriteWidth / 2, // this.x
                this.screenY - this.spriteHeight / 2, // this.y,                
                this.width,
                this.height
            )

            this.sprite.drawCount++
        }
    }
}