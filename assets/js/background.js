class Background {
    constructor(ctx, mapr, place) {
        this.ctx = ctx

        // this.exterior = false;
        this.crtMap = true;

        this.tile = 0;

        this.map = mapr;
        this.update = false;
        this.radar = false;
        this.type = 0;
        this.time = 0;

        this.place = place;

        // this.casa1 = casa1

        // this.portalMision = true;

        this.sy = 0;
        this.sxBack = 0;

        this.spriteBackground = new Image()
        this.spriteBackground.src = './assets/img/ook.png';
        this.spriteBackground.isReady = false
        this.spriteBackground.horizontalFrames = 9;
        this.spriteBackground.verticalFrames = 9;
        this.spriteBackground.horizontalFrameIndex = 0
        this.spriteBackground.verticalFrameIndex = 0
        this.spriteBackground.drawCount = 0
        this.spriteBackground.onload = () => {
            this.spriteBackground.isReady = true
            this.spriteBackground.frameWidth = Math.floor(this.spriteBackground.width / this.spriteBackground.horizontalFrames)
            this.spriteBackground.frameHeight = Math.floor(this.spriteBackground.height / this.spriteBackground.verticalFrames)
            // this.width = this.spriteBackground.frameWidth
            // this.height = this.spriteBackground.frameHeight
        }
        this.spriteBackgroundHome = new Image()
        this.spriteBackgroundHome.src = './assets/img/tileset1.png';
        this.spriteBackgroundHome.isReady = false
        this.spriteBackgroundHome.horizontalFrames = 9;
        this.spriteBackgroundHome.verticalFrames = 9;
        this.spriteBackgroundHome.horizontalFrameIndex = 0
        this.spriteBackgroundHome.verticalFrameIndex = 0
        this.spriteBackgroundHome.drawCount = 0
        this.spriteBackgroundHome.onload = () => {
            this.spriteBackgroundHome.isReady = true
            this.spriteBackgroundHome.frameWidth = Math.floor(this.spriteBackgroundHome.width / this.spriteBackgroundHome.horizontalFrames)
            this.spriteBackgroundHome.frameHeight = Math.floor(this.spriteBackgroundHome.height / this.spriteBackgroundHome.verticalFrames)
            // this.width = this.spriteBackground.frameWidth
            // this.height = this.spriteBackground.frameHeight
        }
        this.spritePortal = new Image()
        this.spritePortal.src = './assets/img/portal.png';
        this.spritePortal.isReady = false
        this.spritePortal.horizontalFrames = 8;
        this.spritePortal.verticalFrames = 8;
        this.spritePortal.horizontalFrameIndex = 0
        this.spritePortal.verticalFrameIndex = 0
        this.spritePortal.drawCount = 0
        this.spritePortal.onload = () => {
            this.spritePortal.isReady = true
            this.spritePortal.frameWidth = Math.floor(this.spritePortal.width / this.spritePortal.horizontalFrames)
            this.spritePortal.frameHeight = Math.floor(this.spritePortal.height / this.spritePortal.verticalFrames)
            // this.width = this.spriteBackground.frameWidth
            // this.height = this.spriteBackground.frameHeight
        }
        this.spriteFire = new Image();
        this.spriteFire.src = './assets/img/fire.png';
        this.spriteFire.isReady = false;
        this.spriteFire.horizontalFrames = 38;
        this.spriteFire.verticalFrames = 4;
        this.spriteFire.horizontalFrameIndex = 0
        this.spriteFire.verticalFrameIndex = 0
        this.spriteFire.drawCount = 0
        this.spriteFire.onload = () => {
            this.spriteFire.isReady = true
            this.spriteFire.frameWidth = 71;
            this.spriteFire.frameHeight = 104
        }
        this.spriteFireB = new Image();
        this.spriteFireB.src = './assets/img/fireB.png';
        this.spriteFireB.isReady = false;
        this.spriteFireB.horizontalFrames = 38;
        this.spriteFireB.verticalFrames = 4;
        this.spriteFireB.horizontalFrameIndex = 0
        this.spriteFireB.verticalFrameIndex = 0
        this.spriteFireB.drawCount = 0
        this.spriteFireB.onload = () => {
            this.spriteFireB.isReady = true
            this.spriteFireB.frameWidth = 140;
            this.spriteFireB.frameHeight = 190;
        }
    }

    isReady() {
        if (this.spriteBackground.isReady &&
            this.spritePortal.isReady &&
            this.spriteFire.isReady &&
            this.spriteFireB.isReady &&
            this.spriteBackgroundHome.isReady) {
            return true
        }
    }


    getTile(layer, col, row) {
        return this.map.layers[layer][row * this.map.cols + col];
    }

    renderingMap(layer, sx, place) {
        if (sx === 0) {
            this.sxBack++
        }
        if (this.sxBack > 19) {
            this.sxBack = 0;
        }
        if (this.isReady()) {
            let spriteBackg = this.spriteBackground
            if (!findHome && home1) {
                spriteBackg = this.spriteBackgroundHome;
            }
            let startCol = Math.floor((cameraX / mpTsizeWidth));
            let endCol = startCol + (cameraWidth / mpTsizeWidth);
            let startRow = Math.floor(cameraY / mpTsizeHeight);
            let endRow = startRow + (cameraHeight / mpTsizeHeight);
            offsetX = -cameraX + startCol * mpTsizeWidth;
            offsetY = -cameraY + startRow * mpTsizeHeight;
            for (let c = startCol; c <= endCol; c++) {
                for (let r = startRow; r <= endRow; r++) {
                    // if (this.radar) {
                    //     this.update = true;
                    // }
                    this.tile = this.getTile(layer, c, r);
                    this.tileSy()
                    let x = (c - startCol) * mpTsizeWidth + offsetX;
                    let y = (r - startRow) * mpTsizeHeight + offsetY;
                    // let x =c*mpTsizeWidth/2+r*mpTsizeWidth/2+offsetX; // pasar a isometrico
                    // let y =r*mpTsizeHeight/2-c*mpTsizeHeight/2+offsetY

                    x = Math.round(x);
                    y = Math.round(y);


                    if (this.tile !== 0 || this.tile < 50) { // 0 => empty tile
                        this.ctx.drawImage( // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                            spriteBackg, // image
                            // (this.tile - 1) * mpTsizeWidth, //this.spriteBackground.frameWidth, // source x // sx La coordenada X de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.
                            // this.sy * mpTsizeHeight, // source y  // sy  La coordenada Y de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.                                         
                            (this.tile - 1) * mpTsizeWidth,
                            this.sy * mpTsizeHeight,
                            mpTsizeWidth, //this.spriteBackground.frameWidth, //  map.tsize, // source width  // sWidth El ancho del sub-rectangulo de la imagen origen a dibujar en el contexto de destino. Si no se especifica, se utiliza todo el rectangulo entero desde las coordenadas especificadas por sx y sy hasta la esquina inferior derecha de la imagen.                               
                            mpTsizeHeight, // this.spriteBackground.frameHeight, // source height //sHeight  La altura del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.                             
                            x, // target x  // dx La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.                               
                            y, // target y  // dy La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
                            mpTsizeWidth, //this.width,  // target width // dWidth El ancho para dibujar la imagen en el canvas destino.
                            mpTsizeHeight //this.height //  target height // dHeight El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de  la imagen no se escala al dibujar.
                        );
                    }
                    if (this.tile > 60 && this.tile <= 70) {
                        this.tile = this.tile - 60;
                        this.ctx.drawImage(
                            this.spriteFire,
                            this.sxBack * this.spriteFire.frameWidth,
                            (this.tile - 1) * this.spriteFire.frameHeight,
                            this.spriteFire.frameWidth, //this.spriteBackground.frameWidth, //  map.tsize, // source width  // sWidth El ancho del sub-rectangulo de la imagen origen a dibujar en el contexto de destino. Si no se especifica, se utiliza todo el rectangulo entero desde las coordenadas especificadas por sx y sy hasta la esquina inferior derecha de la imagen.                               
                            this.spriteFire.frameHeight, // this.spriteBackground.frameHeight, // source height //sHeight  La altura del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.                             
                            x, // target x  // dx La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.                               
                            y, // target y  // dy La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
                            this.spriteFire.frameWidth, //this.width,  // target width // dWidth El ancho para dibujar la imagen en el canvas destino.
                            this.spriteFire.frameHeight //this.height //  target height // dHeight El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de  la imagen no se escala al dibujar.
                        );
                    } else if (this.tile > 70 && this.tile <= 80) {
                        this.tile = this.tile - 70;
                        this.ctx.drawImage(
                            this.spriteFireB,
                            this.sxBack * this.spriteFireB.frameWidth,
                            (this.tile - 1) * this.spriteFireB.frameHeight,
                            this.spriteFireB.frameWidth, //this.spriteBackground.frameWidth, //  map.tsize, // source width  // sWidth El ancho del sub-rectangulo de la imagen origen a dibujar en el contexto de destino. Si no se especifica, se utiliza todo el rectangulo entero desde las coordenadas especificadas por sx y sy hasta la esquina inferior derecha de la imagen.                               
                            this.spriteFireB.frameHeight, // this.spriteBackground.frameHeight, // source height //sHeight  La altura del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.                             
                            x, // target x  // dx La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.                               
                            y, // target y  // dy La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
                            this.spriteFireB.frameWidth, //this.width,  // target width // dWidth El ancho para dibujar la imagen en el canvas destino.
                            this.spriteFireB.frameHeight //this.height //  target height // dHeight El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de  la imagen no se escala al dibujar.
                        );

                    }

                    if (this.tile > 50 && this.tile < 60 &&
                        !this.update) {

                        // this.radar = true;
                        this.timeEn = timeMin;
                        this.type = this.tile - 51;

                        this.createEnemy(this.type, this.timeEn)
                        this.update = true;
                        // this.radar = false;


                        // this.createEnemy()
                        // this.timeEnemy();

                    }
                }
            }
            let xP = 300
            let yP = 300
            if (portalM) {
                this.ctx.drawImage(
                    this.spritePortal,
                    sx * this.spritePortal.frameWidth,
                    0 * this.spritePortal.frameHeight,
                    this.spritePortal.frameWidth,
                    this.spritePortal.frameHeight,
                    xP - cameraX,
                    yP - cameraY, // this.y,                
                    180,
                    180);
            }
            if (findHome) {
                this.ctx.drawImage(
                    this.spritePortal,
                    0 * this.spritePortal.frameWidth,
                    1 * this.spritePortal.frameHeight,
                    this.spritePortal.frameWidth,
                    this.spritePortal.frameHeight,
                    (xP + 8) - cameraX,
                    yP - cameraY, // this.y,                
                    180,
                    180);
            }
        }

    }

    tileSy() {
        if (this.tile === 66) {

        }
        if (this.place === 'casa') {
            if (this.tile <= 10) {
                this.sy = 9
            } else if (this.tile > 10 && this.tile <= 20) {
                this.sy = 8;
                this.tile = this.tile - 10;
            } else if (this.tile > 20 && this.tile <= 30) {
                this.sy = 7;
                this.tile = this.tile - 20;
            } else if (this.tile > 30 && this.tile <= 40) {
                if (!home1) {
                    if (this.tile >= 32) {
                        this.tile = 32
                    }
                }
                this.sy = 6;
                this.tile = this.tile - 30;
            } else if (this.tile > 40 && this.tile <= 50) {
                this.sy = 6;
                this.tile = this.tile - 40;
            }
        } else if (this.place === 'dungeon') {

            if (this.tile < 10) {
                this.sy = 9
            } else if (this.tile > 10 && this.tile <= 20) {
                this.sy = 1;
                this.tile = this.tile - 10;
            } else if (this.tile > 20 && this.tile <= 30) {
                this.sy = 3;
                this.tile = this.tile - 20;
            } else if (this.tile > 30 && this.tile <= 40) {
                this.sy = 0;
                this.tile = this.tile - 30;
            } else if (this.tile > 40 && this.tile <= 50) {
                this.sy = 2;
                this.tile = this.tile - 40;
            }

        } else {
            if (this.tile < 10) {
                this.sy = 9
            } else if (this.tile > 10 && this.tile <= 20) {
                this.sy = 1;
                this.tile = this.tile - 10;
            } else if (this.tile > 20 && this.tile <= 30) {
                this.sy = 3;
                this.tile = this.tile - 20;
            } else if (this.tile > 30 && this.tile <= 40) {
                this.sy = 0;
                this.tile = this.tile - 30;
            } else if (this.tile > 40 && this.tile <= 50) {
                this.sy = 2;
                this.tile = this.tile - 40;
            }
        }


    }

    createEnemy(type, timeEn) {
        this.update = true;
        let add = 64;
        let index = enemyUpdate.length
        enemyUpdate[index] = []
        for (let i = 0; i < enemiesArr[this.type].num; i++) {
            enemyUpdate[index].push(JSON.parse(JSON.stringify(enemiesArr[this.type])));
            if (i == 0) {
                enemyUpdate[index][i].x = Math.round(xCartesian) + cameraWidth / 2;
                enemyUpdate[index][i].y = Math.round(yCartesian);
                enemyUpdate[index][i].timeEn = timeEn
            } else if (i == 1) {
                enemyUpdate[index][i].x = Math.round(xCartesian) - cameraWidth / 2;
                enemyUpdate[index][i].y = Math.round(yCartesian);
                enemyUpdate[index][i].timeEn = timeEn
            } else if (i == 2) {
                enemyUpdate[index][i].x = Math.round(xCartesian);
                enemyUpdate[index][i].y = Math.round(yCartesian) + cameraHeight / 2;
                enemyUpdate[index][i].timeEn = timeEn
            } else {
                enemyUpdate[index][i].x = Math.round(xCartesian);
                enemyUpdate[index][i].y = Math.round(yCartesian) - cameraHeight / 2;
                enemyUpdate[index][i].timeEn = timeEn
            }


            // if (enemyUpdate[index][i].type === 'mefisto') { //##########pone llave la llave
            //     let ran = getRandomInt(1, 3)
            //     if (ran === 1) {}
            //     enemyUpdate[index][i].key = true;
            //     // enemiesArr[4].num = 0;
            // }
        }
    }

    // timeEnemy() {
    //     setTimeout(() => {
    //         this.update = false;
    //         this.radar = false;
    //     }, 30000);
    //}
}