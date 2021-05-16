/* 
 * EnemyAlternate.js
 * Alternative root class for enemy objects. This one will be here for all
 * enemies which are introduced for the Party Mode.
 */

class EnemyAlternate extends Enemy {
    constructor(posX,posY,height, width, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score()){
    super(posX,posY,func_noDim,updateRoutine,renderRoutine,damage,killable,score);
    this.posX = this.middleX;
    this.posY = this.middleY;
    this.height = height;
    this.width = width;
    this.invalidate = EnemyAlternate.prototype.invalidate;
    }
}
/**
 * New invalidation function. Plays the second itself.
 * @returns {undefined}
 */
EnemyAlternate.prototype.invalidate = function(){
simplyPlaySound(sfx1);
this.invalid = true;
};
//This decides the mathematical chance that the enemy will hit you once
//it left the shooting range. Chance: 1 / x  
EnemyAlternate.prototype.getChance = function () {
    return 3;
};
