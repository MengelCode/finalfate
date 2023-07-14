/**
 * LifeBoost.js
 * Contains the FireBoost class along with its functions.
 */

class LifeBoost extends GameObject {
    /**
     * Life boost item.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {FireBoost}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = lifeBoost_dimension;
        super.updateState = lifeBoost_update;
        super.renderState = lifeBoost_render;
        super.damage = 0;
    }
}

//"Life Boost" dimension function.
var lifeBoost_dimension = healthBoost_dimension;

//"Life Boost" update function.
function lifeBoost_update() {
    if (player.collides(this)) {
        this.invalid = true;
        simplyPlaySound(sfx2);
        player.lifes = player.lifes + 1;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        simplyPlaySound(sfx2);
        player.lifes = player.lifes + 1;
    }

}

//"Life Boost" rendering function
function lifeBoost_render() {
//Num pad on mobile.
    context.fillStyle = "blue";
    simpleSquare_render.call(this);
    context.fillStyle = "white";
    //F
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Lower line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 11, 24, 7);
}