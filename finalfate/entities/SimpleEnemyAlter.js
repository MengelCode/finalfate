/* 
 * SimpleEnemyAlter.js
 * Simple enemy object, tailored for Party Mode.
 */

class SimpleEnemyAlter extends MeteorAlter {
    /**
     * 
     * @param {type} posX
     * @param {type} posY
     * @param {type} width
     * @param {type} height
     * @returns {SimpleEnemyAlter}
     */
    constructor(posX,posY,width = 80, height = 80, damage = 6){
        super(posX,posY,width,height);
        this.damage = damage;
        this.renderState = simpleEnemyAlter_render;
    }    
}

/**
 * SimpleEnemyAlter rendering function.
 * @returns {undefined}
 */
function simpleEnemyAlter_render(){
    context.fillStyle = "white";
    context.fillRect(this.posX,this.posY,this.width,this.height);
}

/**
 * The variable which is used to determine the chance that an off-screen
 * instance of this EnemyAlternate type will hit your space ship. 
 * @returns {Number}
 */
MeteorAlter.prototype.getChance = function () {
    return 7;
};