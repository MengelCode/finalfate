/**
 * FireBoost.js
 * Contains the FireBoost class along with its functions.
 */

class FireBoost extends GameObject {
    /**
     * Fire boost item.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {FireBoost}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = fireBoost_dimension;
        super.updateState = fireBoost_update;
        super.renderState = fireBoost_render;
    }
}
//"Fire Boost" dimension function.
var fireBoost_dimension = healthBoost_dimension;

//"Fire Boost" update function
function fireBoost_update() {
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        if (player.massfire) {
            player.health = player.health + 120;
        }
        player.massfire = true;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        if (player.massfire) {
            player.health = player.health + 120;
        }
        player.massfire = true;
    }

}

//"Fire Boost" rendering function
function fireBoost_render() {
//Num pad on mobile.
    context.fillStyle = "red";
    simpleSquare_render.call(this);
    context.fillStyle = "white";
    //F
    //Upper line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 24, 7);
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Middle line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 5, 24, 7);
}