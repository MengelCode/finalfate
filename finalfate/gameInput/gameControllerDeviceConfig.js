/**
 * gameControllerDeviceConfig.js
 * 
 */

class GameControllerDeviceConfig{

    constructor(name, left, right, up, down, pause, shoot, enableFefo){
        this.name = name;
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
        this.pause = pause;
        this.shoot = shoot;
        this.enableFefo = enableFefo;
    }
}

//TODO Add comfort functionality and save & load stuff.