/**
 * BGBox.js
 * Contains the constructor for the mini-game box.
 */


class BGBox extends Box{
    /**
     * Create a box as used in the mini game.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {BGBox}
     */
    constructor(middleX,middleY,visible = false){
    super(middleX,middleY,150,240,"white",visible);    
    }
    
}


