const canvas = document.getElementById('canvas')
this.canvas.width = canvasWidth;
this.canvas.height = canvasHeight;
const ctx = canvas.getContext('2d');

const game = new Game(ctx, canvas)
Keyboard.listenForEvents(
    [Keyboard.LEFT,
        Keyboard.PAUSE,
        Keyboard.ENTER,
        Keyboard.CONTROLES,
        Keyboard.RIGHT,
        Keyboard.UP,
        Keyboard.DOWN,
        Keyboard.INFO,
        Keyboard.MENU1,
        Keyboard.BAG,
        Keyboard.VIDA,
        Keyboard.MANA,
        Keyboard.DIGIT1,
        Keyboard.DIGIT2,
        Keyboard.DIGIT3
    ]);
game.start()