let enemiesArr = [{
    type: 'monster',
    x: 0,
    y: 0,
    sy: 0,
    num: 12,
    damage: 40,
    health: 60 * levelEnemy * cntLevel,
    strength: 40 * levelEnemy,
    armor: 100 * levelEnemy,
    speed: 0.5,
    shot: false,
    dead: false,
    endAnimation: 0
}, {
    type: 'devil',
    x: 0,
    y: 0,
    sy: 0,
    num: 6,
    damage: 60,
    health: 80 * levelEnemy * cntLevel,
    strength: 60 * levelEnemy,
    armor: 100 * levelEnemy,
    speed: 0.8,
    shot: false,
    dead: false,
    endAnimation: 0
}, {
    type: 'boss1',
    x: 0,
    y: 0,
    sy: 0,
    num: 4,
    damage: 200,
    health: 300 * levelEnemy * cntLevel,
    strength: 200 * levelEnemy,
    armor: 100 * levelEnemy,
    speed: 0.5,
    shot: false,
    dead: false,
    endAnimation: 0
}, {
    type: 'boss2',
    key: false,
    x: 0,
    y: 0,
    sy: 0,
    num: 2,
    damage: 300,
    health: 400* levelEnemy * cntLevel,
    strength: 300 * levelEnemy,
    armor: 100 * levelEnemy,
    speed: 0.5,
    shot: false,
    dead: false,
    endAnimation: 0
}, {
    type: 'mefisto',
    key: true,
    x: 0,
    y: 0,
    sy: 0,
    num: 1,
    damage: 600,
    health: 1000 * levelEnemy * cntLevel,
    strength: 500 * levelEnemy,
    armor: 100 * levelEnemy,
    speed: 0.5,
    shot: false,
    dead: false,
    endAnimation: 0
}, {
    type: 'andariel',
    key: true,
    x: 0,
    y: 0,
    sy: 0,
    num: 1,
    damage: 1400,
    health: 2000 * levelEnemy * cntLevel,
    strength: 600 * levelEnemy,
    armor: 100 * levelEnemy,
    speed: 0.5,
    shot: false,
    dead: false,
    endAnimation: 0
}]