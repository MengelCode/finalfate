/**
 * Bomb.js
 * Contains the Bomb class which every bomb-like enemy inherits
 * along with its functions.
 */


class Bomb extends Enemy {
  
    /**
     * Bomb constructor. For general use. To be inherited from.
     * @param {type} middleX
     * @param {type} middleY
     * @param {type} dimensionMatrix
     * @param {type} updateRoutine
     * @param {type} renderRoutine
     * @param {type} invalidate_special 
     * @param {type} detonation_time
     * @returns {Bomb}
     */
    constructor(middleX,middleY,dimensionMatrix,updateRoutine,renderRoutine,invalidate_special,detonation_time){
//         if(this.frameCounter >= this.detonationTime){
//        this.invalidateSpecial();
//    }
//    this.updateSpecial();
        super(middleX,middleY,dimensionMatrix,bomb_update,renderRoutine);
        this.updateSpecial = updateRoutine;
        this.invalidateSpecial = invalidate_special;
        this.detonationTime = detonation_time;
        
    }
 }
 
 //"Bomb" generalized update function.
function bomb_update(){
    this.frameCounter++;
    if(this.frameCounter >= this.detonationTime) {
        this.invalidateSpecial();
        this.invalidate();
    }
    this.updateSpecial();
    
}