class Camera {
    constructor(map, width, height) { // sprite
        // this.x = 0;
        // this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = map.cols * map.tsize - width;
        this.maxY = map.rows * map.tsize - height;
        this.following = {}; // sprite
        // sprite.screenX = 0;
        // sprite.screenY = 0;
    }


    update(x, y) {
        // assume followed sprite should be placed at the center of the screen
        // // whenever possible
        // screenX = 0;
        // screenY = 0;

        this.following.screenX = cameraWidth / 2;
        this.following.screenY = cameraHeight / 2;
        // console.log(`this.following.screenX ${this.following.screenX}`)

        // make the camera follow the sprite
        cameraX = x - cameraWidth / 2;
        cameraY = y - cameraHeight / 2;
        // clamp values
        cameraX = Math.max(0, Math.min(cameraX, this.maxX));
        cameraY = Math.max(0, Math.min(cameraY, this.maxY));

        // in map corners, the sprite cannot be placed in the center of the screen
        // and we have to change its screen coordinates

        console.log(`this.following.x ${x}`)
        // left and right sides
        if (x < cameraWidth / 2 ||
            x > this.maxX + cameraWidth / 2) {
            this.following.screenX = x - cameraX;
        }
        // top and bottom sides
        if (y < cameraHeight / 2 ||
            y > this.maxY + cameraHeight / 2) {
            this.following.screenY = y - cameraY;
        }
    };
}