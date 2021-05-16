/* 
 * MeteorAlter.js
 * Meteor enemy object, tailored for Party Mode.
 */

class MeteorAlter extends EnemyAlternate {
    /**
     * 
     * @param {type} posX
     * @param {type} posY
     * @param {type} width
     * @param {type} height
     * @returns {MeteorAlter}
     */
    constructor(posX,posY,width = 80, height = 80){
        super(posX,posY,width,height,meteorAlter_update, meteorAlter_render);
    }    
}
/**
 * MeteorAlter update function.
 * @returns {undefined}
 */
function meteorAlter_update(){
    this.posY+=6;
}
/**
 * MeteorAlter rendering function.
 * @returns {undefined}
 */
function meteorAlter_render(){
    context.fillStyle = "brown";
    context.fillRect(this.posX,this.posY,this.width,this.height);
}

/**
 * The variable which is used to determine the chance that an off-screen
 * instance of this EnemyAlternate type will hit your space ship. 
 * @returns {Number}
 */
MeteorAlter.prototype.getChance = function () {
    return 4;
};