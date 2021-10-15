/**
 * Enemy.js
 * Contains the Enemy class along with its functions.
 * It is the foundation of all in-game enemies.
 */

class Enemy extends GameObject {
    /**
     * Creates an enemy object.
     * @param {integer} middleX
     * @param {integer} middleY
     * @param {function} dimensionMatrix
     * @param {function} updateRoutine
     * @param {function} renderRoutine
     * @param {boolean} killable
     * @param {integer} damage
     * @param {integer} hp
     * @returns {Enemy}
     */
    constructor(middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null, hp = 100) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = dimensionMatrix;
        super.updateState = updateRoutine;
        super.renderState = renderRoutine;
        this.killable = killable;
        if(!player){
           this.damage = 0; 
        }
        else if (player.skill === 2) {
            this.damage = Math.round(damage * 2);
        } else if (player.skill === -1) {
            this.damage = Math.round(damage / 2);
        } else if (player.skill === -2) {
            this.damage = Math.round(damage / 3);
        } else {
            this.damage = damage;
        }
        this.score = score;
        //HP value. Can be respected by invalidate() function, but it needs not.
        this.hp = hp;
        //Previous enemy object in a chain.
        this.previous = null;
        //Next enemy object in a chain.
        this.next = null;
        if (invalidFunc !== null) {
            super.invalidate = invalidFunc;
        } else {
            super.invalidate = function () {
                this.invalid = true;
                if (this.previous !== null && !this.previous.invalid)
                    this.previous.invalidate();
                if (this.next !== null && !this.next.invalid)
                    this.next.invalidate();
            };
    }
    }
}

Enemy.prototype.linkTogether =  function (nextEnemy) {
            this.next = nextEnemy;
            nextEnemy.previous = this;
        };

/**
 * Adds an array of either linked or unlinked enemy objects to the spawn list.
 * @param enemy_array Array with enemies.
 * @param spawn_time Frame when all enemies should spawn.
 */
function spawnListArrayAdd(enemy_array, spawn_time, relative = false) {
    var sp = null;
    for (var i = 0; i < enemy_array.length; i++) {
        if (!relative) {
            sp = new Spawn(spawn_time, enemy_array[i], false);
        } else if (i === 0) {
            sp = new Spawn(spawn_time, enemy_array[i], true);
        } else {
            sp = new Spawn(0, enemy_array[i], false);
        }
        spawnList.addElement(sp);
}

}


/**
 }
 * 
 * @param {type} enemy_array Enemies to link together.
 * @returns {undefined}
 */
function combineEnemyBricks(enemy_array) {
    for (var i = 0; i < enemy_array.length - 1; i++) {
        enemy_array[i].linkTogether(enemy_array[i + 1]);
    }
}
/**
 * Add the concept of HP to an enemy type. All the other enemies
 * will still be instantly dead. (Exception: Bosses)
 * @param {type} hp
 * @returns {undefined}
 */
Enemy.prototype.addMultiHealth = function (hp){
   this.hp = hp * 3;
   this.invalidate = invalidateMultiHP; 
};

/**
 * New gameObject.invalidate() implementation used if "MultiHealth" was applied.
 * @returns {undefined}
 */
function invalidateMultiHP(){
    if(this.hp > 0)this.hp--;
    else this.invalid = true;
}