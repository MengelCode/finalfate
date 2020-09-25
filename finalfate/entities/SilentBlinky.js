/* 
 * SilentBlinky.js
 * In this file the class of the only not disturbing blinky roams.
 * 
 */

class SilentBlinky extends Blinky {
     /**
     * Create a silent blinky enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Blinky}
     */
    constructor(middleX, middleY, expand = false) {
        super(middleX, middleY);
        this.updateState = silentBlinky_update;
    }
    
}

//"Silent Blinky" update function
var silentBlinky_update = func_noOp;
