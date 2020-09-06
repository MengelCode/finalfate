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
        if (player.skill === 2) {
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
        this.linkTogether = function (nextEnemy) {
            this.next = nextEnemy;
            nextEnemy.previous = this;
        };
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
