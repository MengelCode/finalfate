/**
 * HealthBoost.js
 * Contains the HealthBoost class along with its functions.
 */

class HealthBoost extends GameObject {
    /**
     * Health boost item.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {HealthBoost}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = healthBoost_dimension;
        super.updateState = healthBoost_update;
        super.renderState = healthBoost_render;
    }
}

//"Health Boost" dimension function.
var healthBoost_dimension = simpleEnemy_dimension;

//"Health Boost" update function.
function healthBoost_update() {
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.health = player.health + 30;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.health = player.health + 30;
    }

}

//"Health Boost" rendering function
function healthBoost_render() {
//Num pad on mobile.
    context.fillStyle = "green";
    simpleSquare_render.call(this);
    context.fillStyle = "white";
    //H
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Middle line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 5, 24, 7);
    //Right line
    context.fillRect((this.middleX * 10) + 8, (this.middleY * 10) - 6, 7, 24);
}