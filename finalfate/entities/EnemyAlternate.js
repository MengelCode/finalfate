/* 
 * EnemyAlternate.js
 * Alternative root class for enemy objects. This one will be here for all
 * enemies which are introduced for the Party Mode.
 */

class EnemyAlternate extends Enemy {
    constructor(posX,posY,height, width, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score()){
    super(posX,posY,func_noDim,updateRoutine,renderRoutine,damage,killable,score);
    this.height = height;
    this.width = width;
    }
}


