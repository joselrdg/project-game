class Background {
    constructor(ctx, mapr) {
        this.ctx = ctx
        this.startCol = Math.floor(cameraX / map.tsize);
        this.endCol = this.startCol + (canvasWidth / map.tsize);
        this.startRow = Math.floor(cameraY / map.tsize);
        this.endRow = this.startRow + (canvasHeight / map.tsize);

        this.offsetX = -cameraX + this.startCol * map.tsize;
        this.offsetY = -cameraX + this.startRow * map.tsize;
        this.map = mapr;


        this.spriteBackground = new Image()
        this.spriteBackground.src = './assets/img/tiles.png';
        this.spriteBackground.isReady = false
        this.spriteBackground.horizontalFrames = 5;
        this.spriteBackground.verticalFrames = 1;
        this.spriteBackground.horizontalFrameIndex = 0
        this.spriteBackground.verticalFrameIndex = 0
        this.spriteBackground.drawCount = 0
        this.spriteBackground.onload = () => {
            this.spriteBackground.isReady = true
            this.spriteBackground.frameWidth = Math.floor(this.spriteBackground.width / this.spriteBackground.horizontalFrames)
            this.spriteBackground.frameHeight = Math.floor(this.spriteBackground.height / this.spriteBackground.verticalFrames)
            this.width = this.spriteBackground.frameWidth
            this.height = this.spriteBackground.frameHeight
        }


        
    }

    isReady() {
        return this.spriteBackground.isReady
    }


    getTile(layer, col, row) {
        return this.map.layers[layer][row * this.map.cols + col];
    }

    // Camera(map, width, height) {

    // }

    // camerafollow (sprite) {

    // }

    renderingMap(layer) {
        if (this.isReady()) {
            //  console.log(this.spriteBackground.frameHeight,)
            for (let c = this.startCol; c <= this.endCol; c++) {
                for (let r = this.startRow; r <= this.endRow; r++) {
                    let tile = this.getTile(layer, c, r);
                    let x = (c - this.startCol) * map.tsize + this.offsetX;
                    let y = (r - this.startRow) * map.tsize + this.offsetY;
                    if (tile !== 0) { // 0 => empty tile
                        this.ctx.drawImage( // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                            this.spriteBackground, // image
                            (tile - 1) * this.spriteBackground.frameWidth, // source x // sx La coordenada X de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.
                            0, // source y  // sy  La coordenada Y de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.                                         
                            this.spriteBackground.frameWidth, // map.tsize,     // map.tsize, // source width  // sWidth El ancho del sub-rectangulo de la imagen origen a dibujar en el contexto de destino. Si no se especifica, se utiliza todo el rectangulo entero desde las coordenadas especificadas por sx y sy hasta la esquina inferior derecha de la imagen.                               
                            this.spriteBackground.frameHeight, // map.tsize, // source height //sHeight  La altura del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.                             
                            Math.round(x), // target x  // dx La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.                               
                            Math.round(y), // target y  // dy La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
                            map.tsize, //this.width,  // target width // dWidth El ancho para dibujar la imagen en el canvas destino.
                            map.tsize //this.height //  target height // dHeight El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de  la imagen no se escala al dibujar.
                        );
                    }
                }
            }
        }
    }

    // render() {
    //     this.renderingMap(0);
    //     this.renderingMap(1);
    // }
}