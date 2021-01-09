let ranColsMap = getRandomInt(14, totalColsMap)
let arrCover = [];

let mapRandon = {
    createMapOn: true,
    cols: ranColsMap,
    rows: ranColsMap,
    tsize: mapTsize,
    layers: [
        []
    ]
};

let mapDungeon = {
    cols: 13,
    rows: 13,
    tsize: mapTsize,
    layers: [
        [],
        [],
        []
    ]
}

let mapEntry = {
    cols: 13,
    rows: 13,
    tsize: mapTsize,
    layers: [
        [
            32, 1, 5, 4, 32, 31, 32, 5, 1, 1, 1, 1, 1,
            32, 3, 1, 2, 32, 32, 32, 3, 1, 1, 1, 1, 1,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 13,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 17,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 17,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 8,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
            12, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 31,
            18, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 13,
            31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 17,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 17,
            11, 11, 11, 12, 32, 31, 32, 13, 11, 11, 11, 11, 14
        ],
        [
            0, 0, 0, 0, 0, 91, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            95, 0, 0, 0, 0, 0, 0, 0, 0, 49, 50, 0, 0,
            95, 0, 0, 0, 0, 0, 0, 61, 0, 0, 0, 0, 0,
            0, 0, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 62, 0, 0, 0, 71, 0, 0, 0, 91,
            0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            91, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 91, 0, 0, 0, 0, 0, 0, 0
        ],
        [ // Enemy Map
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    ]
}

let mapHouse = {
    cols: 13,
    rows: 13,
    tsize: mapTsize,
    layers: [
        [
            31, 31, 31, 31, 35, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31
        ],
        [
            91, 0, 0, 0, 0, 0, 0, 91, 18, 19, 0, 0, 0,
            91, 0, 14, 15, 16, 17, 0, 0, 8, 9, 11, 12, 13,
            0, 0, 4, 5, 6, 37, 0, 0, 0, 0, 1, 2, 3,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            28, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            18, 19, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91,
            8, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            14, 15, 16, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0,
            4, 5, 5, 6, 37, 0, 0, 91, 0, 0, 0, 0, 0
        ],
        [
            0, 0, 34, 35, 36, 36, 0, 0, 0, 0, 32, 32, 33,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 35, 36,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            34, 35, 36, 35, 36, 38, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    ]
}

function createMap(finalBoss) {
    let cols = ranColsMap;
    let rows = ranColsMap;

    mapRandon.cols = cols;
    mapRandon.rows = rows;
    mapRandon.tsize = mapTsize;
    mapRandon.layers = [
        []
    ];
    baseMap(cols, rows);
    enemyMap(cols, rows);
    collideMap(cols, rows)
    coverMap(cols, rows)
    mapDunFun(finalBoss);
    mapRandon.createMapOn = false;
}

function collideMap(cols, rows) {
    let random = 0;
    let mapColli = mapRandon.layers[1]
    let numCollide = ((cols * rows) * 2) / 100;

    for (let index = 0; index < numCollide; index++) { // pone los obstaculos
        let randomy = getRandomInt(cols * 2, cols * rows - 1);
        let randomx = getRandomInt(cols * 2, cols * rows - 1);
        let randomt = getRandomInt(cols * 2, cols * rows - 1);
        let randomf = getRandomInt(cols * 2, cols * rows - 1);
        let r = getRandomInt(1, 4);
        let ranSprite = getRandomInt(1, 8);
        if (missions.mision1.finish) {
            if (r === 1) {
                mapColli[randomf] = 61;
            } else if (r === 2) {
                mapColli[randomf] = 62;
            } else if (missions.mision2.finish) {
                mapColli[randomf] = 71;
            }
        }
        mapColli[randomy] = 20 + ranSprite;
        mapColli[randomx] = 26; // pone arboles grandes
        mapColli[randomt] = 24; // pone arboles pequeños
        mapColli[randomt + 1] = 26;
    }

    for (let index = 0; index < cols; index++) { // limpia obtaculos de abajo
        mapColli[index] = 20;
        // mapColli[index + cols] = 1;
        mapColli[(rows - 1) * cols + index] = 11;
    }
    for (let index = 0; index < rows; index++) {
        mapColli[index * cols + 0] = 16; // lipia obtaculos de los laterales
        mapColli[index * cols + cols - 1] = 17;
    }
    mapColli[(rows - 1) * cols + 0] = 14; // lilmpia esquina inferior derchja
    mapColli[(rows - 1) * cols + (cols - 1)] = 13; // inferior izq
    mapColli[0] = 19; // lilmpia esquina inferior sup
    mapColli[cols - 1] = 19; // sup

    let ranCasa = getRandomInt(0, 5) // para que aparezca la casa
    let puerta = 91;
    if (!findHome && ranCasa === 1) {
        puerta = 93
    }
    if (!findHome && missions.mision2.finish &&
        missions.mision3.Doors >= missions.mision3.totalDoors &&
        !missions.mision9.downAgain) {
        let ranCasa2 = 1 // getRandomInt(0, 3); // para que aparezca la entrada
        if (ranCasa2 === 1) {
            puerta = 94;
        }
    }

    random = getRandomInt(0, 6)
    if (random === 1) {
        exitDown(puerta)
        exitRight(puerta);
        exitTop(puerta)
    } else if (random === 2) {
        exitRight(puerta)
    } else if (random === 3) {
        exitDown(puerta);
        exitRight(puerta)
    } else if (random === 4) {
        exitDown(puerta);
        exitTop(puerta)
    } else if (random === 5) {
        exitRight(puerta);
        exitTop(puerta)
    } else {
        exitTop(puerta)
    }

    wallLeft()


    function exitTop(puerta) {
        random = getRandomInt(5, cols - 1); // menos lo que sumen 
        mapColli[random] = 8; // paso
        mapColli[random - 1] = 32;
        // mapColli[random + cols - 1] = 31;
        mapColli[random - 2] = puerta;
        mapColli[random + cols - 2] = 0;
        mapColli[random - 3] = puerta;
        mapColli[random + cols - 3] = 0;
        mapColli[random - 4] = 18;
        // mapColli[random + cols - 4] = 2;
    }

    function exitDown(puerta) {
        random = getRandomInt(5, cols - 1); // menos lo que sumen
        random = random + ((cols * rows) - (rows + 1))
        mapColli[random] = 13; // paso
        mapColli[random - 1] = 32;
        // mapColli[random + cols - 1] = 31;
        mapColli[random - 2] = puerta;
        mapColli[random + cols - 2] = 0;
        mapColli[random - 3] = puerta;
        mapColli[random + cols - 3] = 0;
        mapColli[random - 4] = 12;
        // mapColli[random + cols - 4] = 2;
    }

    function exitRight() {
        random = getRandomInt(5, cols - 1);
        random = (random * cols) - 1
        mapColli[random] = 13;
        mapColli[random - cols] = puerta;
        mapColli[random - cols * 2] = puerta;
        mapColli[random - cols * 3] = puerta;
        mapColli[random - cols * 4] = 8;
    }

    function wallLeft() {
        let final = rows;
        let ranX = 0;
        let ranY = 0;
        let fijadoCol = 0;
        let down = false;
        let loopDrh = true;
        random = getRandomInt(5, cols - 6)
        // console.log('random 0: ' + random)
        ranY = random;
        random = random * cols + 0;
        fijadoCol = random;
        mapColli[fijadoCol] = 15;
        fijadoCol++;
        ranX++;
        mapColli[fijadoCol] = 11;
        fijadoCol++;
        ranX++;
        mapColli[fijadoCol] = 11;
        fijadoCol++;
        ranX++;
        while (ranY < rows - 6 && loopDrh === true) {
            // for (let i = 0; i < 4; i++) {
            //     console.log('retoRow: ' + restoRow)
            //     console.log('fijacol: ' + fijadoCol)
            obTile()
            // }
        }

        function obTile() {
            let control = true;
            if (ranX > cols / 2) { //
                control = false;
            }
            random = getRandomInt(1, 3)
            // console.log('random 1: ' + random)
            // random = 2
            if (random === 1 && control) {
                mapColli[fijadoCol] = 11;
                // console.log('puso 11 suelo superior')
                fijadoCol++;
                ranX++;
            } else if (random === 2) {
                mapColli[fijadoCol] = 12;
                // console.log('puso 12 suelo sup con esquina derch ')
                fijadoCol += cols
                // console.log('ranY = ' + ranY + ' ranX = ' + ranX)
                ranY++
                ranTileDown()
                while (down) {
                    ranTileDown()
                }
            } else if (random === 3 && control) {
                mapColli[fijadoCol] = 14; //// subiendpooooo
                // console.log('puso 14 mini esquina superior para subir')
                fijadoCol -= cols;
                ranY--

                // console.log('ranY = ' + ranY + ' ranX = ' + ranX)
                if (ranY > 5) {
                    ranTileUp()
                    while (down) {
                        ranTileUp()
                    }

                }
                if (ranY < 5) {
                    mapColli[fijadoCol] = 11;
                    fijadoCol++;
                    ranX++;
                    loopDrh === false;
                }
            }
        }


        function ranTileUp() {
            down = true;
            random = getRandomInt(1, 3);
            // random = 1
            if (random === 1 && ranY > 4) {
                mapColli[fijadoCol] = 17;
                fijadoCol -= rows;
                ranY--
            } else {
                mapColli[fijadoCol] = 13;
                fijadoCol++;
                ranX++
                down = false;
            }
        }

        function ranTileDown() {
            // mapRandon.layers[0][fijadoCol] = 16;
            // console.log('Nooooooooo puso 16 pared')
            // for (let i = 1; i <= ranX; i++) {
            //     mapRandon.layers[0][fijadoCol - i] = 19;
            // }
            // fijadoCol += cols;
            // ranY++
            random = getRandomInt(1, 3);
            // console.log('random down: ' + random)
            // random = 1
            if (random === 1) {
                mapColli[fijadoCol] = 16;
                // console.log('puso 16 pared')
                for (let i = 1; i <= ranX; i++) {
                    mapColli[fijadoCol - i] = 19;
                }
                fijadoCol += cols;
                ranY++
                down = true;

            } else if (random === 2) {
                mapColli[fijadoCol] = 15;
                // console.log('puso 15 esquina')
                for (let i = 1; i <= ranX; i++) {
                    mapColli[fijadoCol - i] = 19;
                }
                fijadoCol++
                ranX++
                mapColli[fijadoCol] = 11;
                // console.log('puso 11 suelo superior')
                fijadoCol++
                ranX++
                down = false;
                // if (ranY < cols - 7) {
                //     down = true
                // } else {
                //     down = false
                // }
            }
            if (ranY > cols - 7) {
                mapColli[fijadoCol] = 18;
                // console.log('puso 18 esquina inf izq')
                for (let i = 1; i <= ranX; i++) {
                    mapColli[fijadoCol - i] = 20;
                    // console.log('puso 20 suelo inferior')
                }
                down = false;
                mapColli[fijadoCol - ranX] = 19;
            }
        }
    }
}

function enemyMap(cols, rows) {
    let ran = 0;
    let ran2 = 0;
    let arrEnemy = [];
    let numEnemy = ((cols * rows) * 1) / 100
    for (let i = 0; i < cols * rows; i++) {
        if (mapRandon.layers[0][i] === 31) {
            arrEnemy.push(92)
        } else {
            arrEnemy.push(0);
        }
    }
    for (let i = 0; i < numEnemy; i++) { // pone enemigos 
        ran = getRandomInt(1, cols * rows);
        ran2 = getRandomInt(1, 3);
        if (i === 1 || i === 2 || i === 3 || i === 4) { // numero del enemigo a crear ###########################################################
            if (ran2 === 1) {
                arrEnemy[ran] = 53
            } else {
                arrEnemy[ran] = 54
            }
        } else {
            if (ran2 === 1) {
                arrEnemy[ran] = 51
            } else {
                arrEnemy[ran] = 52
            }
        }
    }
    mapRandon.layers[1] = arrEnemy;
};

function coverMap(cols, rows) {
    let arrCover = JSON.parse(JSON.stringify(mapRandon.layers[1]))
    for (let i = 0; i < arrCover.length; i++) {
        if (arrCover[i] === 24) {
            arrCover[i - cols] = 44;
        } else if (arrCover[i] === 27) {
            arrCover[i - cols] = 47;
        } else if (arrCover[i] === 26) {
            arrCover[i - cols] = 46
        } else {
            arrCover[i] = 0;
        }
        mapRandon.layers[2] = arrCover;

    }
}

function baseMap(cols, rows) {
    let rand = 0
    let randO = getRandomInt(1, cols * rows)
    let ran = getRandomInt(2, 4) + 30
    for (let x = 0; x < cols * rows; x++) {
        mapRandon.layers[0].push(ran)
    }
    if (missions.mision5.finish) {
        let ranA = getRandomInt(0, 5);
        if (ranA === 1) {
            mapRandon.layers[0][randO] = 31;
        }
        // mapRandon.layers[0][(2 * cols) + 5] = 31; // Sotano ###################
    }
}


function mapDunFun(finalBoss) {
    let maxCol = 52;
    let colRow = getRandomInt(13, maxCol) // tamaño mazmorra
    mapDungeon.cols = colRow;
    mapDungeon.rows = colRow;
    let ran1 = getRandomInt(1, colRow * colRow)
    let ran2 = getRandomInt(1, colRow * colRow)
    let ran3 = getRandomInt(1, colRow * colRow)
    let randO = getRandomInt(1, colRow * colRow)
    let ran = getRandomInt(4, 7) + 30;
    for (let x = 0; x < colRow * colRow - 1; x++) {
        mapDungeon.layers[0].push(ran);
        mapDungeon.layers[1].push(0);
        mapDungeon.layers[2].push(0);
    }
    mapDungeon.layers[1][ran1] = 52
    mapDungeon.layers[1][ran3] = 52
    mapDungeon.layers[1][ran2] = 54
    if (!finalBoss) {
        let ranE = getRandomInt(0, colRow * colRow - 1)
        mapDungeon.layers[0][ranE] = 31;
        mapDungeon.layers[1][ranE] = 92;
        mapDungeon.layers[1][randO] = 55;
    } else {
        mapDungeon.layers[1][randO] = 56;
    }

}



// 38 señal 37 escaleras