class Camera {
    constructor(width, height) { // sprite
        // this.x = 0;
        // this.y = 0;
        this.width = width;
        this.height = height;
        // this.maxX = map.cols * mpTsizeWidth- width;
        // this.maxY = map.rows * mpTsizeHeight - height;
    }


    update(col, row, x, y) {
        // assume followed sprite should be placed at the center of the screen
        // // whenever possible
        

        this.maxX = col * mpTsizeWidth- this.width;
        this.maxY = row * mpTsizeHeight - this.height;

    

        screenX = cameraWidth / 2;
        screenY = cameraHeight / 2;
        // console.log(`this.following.screenX ${this.following.screenX}`)
        // make the camera follow the sprite
        
        // x = col*mpTsizeWidth/2+row*mpTsizeWidth/2 //+offsetX;
        // y = row*mpTsizeHeight/2-col*mpTsizeHeight/2 //+offsetY
        cameraX = x - cameraWidth / 2;
        cameraY = y - cameraHeight / 2;
        
        // cameraX = Math.round(cameraX/mpTsizeWidth-cameraY/mpTsizeHeight);
        // cameraY = Math.round(cameraX/mpTsizeWidth+cameraY/mpTsizeHeight);

        // clamp values
        cameraX = Math.max(0, Math.min(cameraX, this.maxX));
        cameraY = Math.max(0, Math.min(cameraY, this.maxY));
        // in map corners, the sprite cannot be placed in the center of the screen
        // and we have to change its screen coordinates

        // left and right sides
        if (x < cameraWidth / 2 ||
            x > this.maxX + cameraWidth / 2) {
            screenX = x - cameraX;

        }
        // top and bottom sides
        if (y < cameraHeight / 2 ||
            y > this.maxY + cameraHeight / 2) {
            screenY = y - cameraY;
        }
        // screenX = screenX - screenY;
        // screenY = (screenX+screenY)/2;
    };
}