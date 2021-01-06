let Keyboard = {};
// const canvas = document.getElementById('canvas')

Keyboard.LEFT = 65; //37;
Keyboard.RIGHT = 68; //39;
Keyboard.UP = 87; //38;
Keyboard.DOWN = 83; //40;
Keyboard.PAUSE = 76;
Keyboard.MENU1 = 80;
Keyboard.BAG =  66;
Keyboard.ENTER = 13;
Keyboard.CONTROLES = 75;
Keyboard.DIGIT1 = 49;
Keyboard.DIGIT2 = 50;
Keyboard.DIGIT3 = 51;
Keyboard.DIGIT4 = 52;
Keyboard.DIGIT5 = 53;
Keyboard.DIGIT6 = 54;

Keyboard._keys = {};

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function (event) {
    let keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    let keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};