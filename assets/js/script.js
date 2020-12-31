const canvas = document.getElementById('canvas')
this.canvas.width = canvasWidth;
this.canvas.height = canvasHeight;
const ctx = canvas.getContext('2d');

const game = new Game(ctx, canvas)
Keyboard.listenForEvents(
    [Keyboard.LEFT, 
        Keyboard.RIGHT, 
        Keyboard.UP, 
        Keyboard.DOWN,
        Keyboard.DIGIT1,
        Keyboard.DIGIT2, 
        Keyboard.PAUSE, 
        Keyboard.ENTER]);
    game.start()
