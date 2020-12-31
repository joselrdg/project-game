let mapRandon = {
    createMapOn: true,
    cols: colsMap,
    rows: rowsMap,
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

let arrCover = [];

function createMap(cols, rows) {
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
    mapDunFun();


    // console.log('layer 0: ' + mapRandon.layers[0])
    // console.log('layer 1: ' + mapRandon.layers[1])
    // console.log('layer 2: ' + mapRandon.layers[2])
    mapRandon.createMapOn = false;
    // mapRandon.layers[0].reverse()
}

function collideMap(cols, rows) {
    let random = 0;
    let mapColli = mapRandon.layers[1]
    let numCollide = ((cols * rows) * 2) / 100;

    // for (let x = 0; x < cols; x++) {
    //     for (let y = 0; y < rows; y++) {
    //         if (x === 0 && y === 0) {
    //             mapColli.push(16) // esquina superior izq
    //         } else if (x === 0 && y === rows - 1) {
    //             mapColli.push(17); // esquina superior derecha
    //         } else if (x === cols - 1 && y === 0) {
    //             mapColli.push(15); // esquina inferior izq
    //         } else if (x === cols - 1 && y === rows - 1) {
    //             mapColli.push(14); // esquina inferior drcha
    //         // } else if (x < 1 && y !== 0 && y !== rows - 1) {
    //         //     rand = getRandomInt(1, 2)
    //         //     mapRandon.layers[0].push(rand); // top * 2
    //         } else if (y === 0) {
    //             mapColli.push(16) // izquierda
    //         } else if (y === rows - 1) {
    //             mapColli.push(17) // derecha
    //         } else if (x === cols - 1) {
    //             mapColli.push(11) // button
    //         } else {
    //             mapColli.push(31)
    //         }
    //     }

    // }

    for (let index = 0; index < numCollide; index++) { // pone los obstaculos
        let randomy = getRandomInt(cols * 2, cols * rows - 1);
        let randomx = getRandomInt(cols * 2, cols * rows - 1);
        let randomt = getRandomInt(cols * 2, cols * rows - 1);
        let ranSprite = getRandomInt(1, 8);
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

    // for (let x = 0; x < cols; x++) {
    //     for (let y = 0; y < rows; y++) {
    //     if (x < 1 && y !== 0 && y !== rows - 1) {
    //         // rand = getRandomInt(1, 2)
    //         // mapRandon.layers[0].push(rand); // top * 2
    //     } else 
    //     if (x === 0) {
    //         mapRandon.layers[0][x*cols+y] = 16;// izquierda
    //     } else if (y === rows - 1) {
    //         mapRandon.layers[0][x*cols+y] = 17;// derecha
    //     } else if (x === cols - 1) {
    //         mapRandon.layers[0][x*cols+y] = 11; // button
    //     }
    //     }        
    // }


    exitTop()
    wallLeft()


    // for (let x = 0; x < cols; x++) {
    //     for (let y = 0; y < rows; y++) {

    //     }
    // }
    function exitTop() {
        random = getRandomInt(5, cols - 1); // menos lo que sumen 
        mapColli[random] = 48; // paso
        mapColli[random - 1] = 32;
        // mapColli[random + cols - 1] = 31;
        mapColli[random - 2] = 91;
        mapColli[random + cols - 2] = 0;
        mapColli[random - 3] = 91;
        mapColli[random + cols - 3] = 0;
        mapColli[random - 4] = 18;
        // mapColli[random + cols - 4] = 2;
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
    let numEnemy = ((cols * rows) * 1) / 100 // porcentaje de enemigos  
    for (let i = 0; i < cols * rows; i++) {
        // rellena de 0
        if (mapRandon.layers[0][i] === 31) {
            arrEnemy.push(92)
        } else {
            arrEnemy.push(0);
        }
    }
    for (let i = 0; i < numEnemy; i++) { // pone enemigos 
        ran = getRandomInt(1, cols * rows);
        ran2 = getRandomInt(1, 3);
        if (i === 0) {
            arrEnemy[ran] = 55;
        } else if (i === 1 || i === 2 || i === 3 || i === 4) { // numero del enemigo a crear ###########################################################
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
    // let arrCover = mapRandon.layers[0].slice();
    let arrCover = JSON.parse(JSON.stringify(mapRandon.layers[1]))
    for (let i = 0; i < arrCover.length; i++) {
        if (arrCover[i] === 24) {
            arrCover[i - cols] = 44;
            // arrCover[i - cols + 1] = 35;
            // arrCover[i - cols - 1] = 33;
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
        // for (let y = 0; y < rows; y++) {
        //     if (x === 0 && y === 0) {
        //         mapRandon.layers[0].push(16) // esquina superior izq
        //     } else if (x === 0 && y === rows - 1) {
        //         mapRandon.layers[0].push(17); // esquina superior derecha
        //     } else if (x === cols - 1 && y === 0) {
        //         mapRandon.layers[0].push(15); // esquina inferior izq
        //     } else if (x === cols - 1 && y === rows - 1) {
        //         mapRandon.layers[0].push(14); // esquina inferior drcha
        //     // } else if (x < 1 && y !== 0 && y !== rows - 1) {
        //     //     rand = getRandomInt(1, 2)
        //     //     mapRandon.layers[0].push(rand); // top * 2
        //     } else if (y === 0) {
        //         mapRandon.layers[0].push(16) // izquierda
        //     } else if (y === rows - 1) {
        //         mapRandon.layers[0].push(17) // derecha
        //     } else if (x === cols - 1) {
        //         mapRandon.layers[0].push(11) // button
        //     } else {
        //         mapRandon.layers[0].push(31)
        //     }
        // }

    }
    // mapRandon.layers[0][randO] = 31;
    mapRandon.layers[0][(2 * cols) + 5] = 31;

}


function mapDunFun() {
    let maxCol = 32;
    let colRow = getRandomInt(13, maxCol) // tamaño mazmorra
    mapDungeon.cols = colRow;
    mapDungeon.rows = colRow;
    let randO = getRandomInt(1, colRow * colRow)
    let ran = getRandomInt(4, 7) + 30;
    for (let x = 0; x < colRow * colRow-1; x++) {
        mapDungeon.layers[0].push(ran);
        mapDungeon.layers[1].push(0);
        mapDungeon.layers[2].push(0);
    }
    mapDungeon.layers[1][randO]= 55;

}

let mapHouse = {
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
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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