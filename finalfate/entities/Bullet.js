/**
 * Bullet.js
 * Contains the class for shot bullets and functions belonging to it.
 */

class Bullet extends GameObject {

    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = bullet_dimension;
        super.updateSpecial = bullet_update;
        super.updateState = function () {};
        super.renderState = bullet_render;
    }
}

//"Bullet" dimension function.
function bullet_dimension() {
    var x = [this.middleX, this.middleX, this.middleX, this.middleX, this.middleX - 1, this.middleX - 1, this.middleX - 1, this.middleX - 1];
    var y = [this.middleY, this.middleY - 1, this.middleY - 2, this.middleY - 3, this.middleY, this.middleY - 1, this.middleY - 2, this.middleY - 3];
    return new Array(x, y);
}

//"Bullet" update function.
function bullet_update() {
    this.middleY = this.middleY - 1;
    if (this.middleY < 3)
        this.invalid = true;
}

//"Bullet" rendering function
function bullet_render(wayToDecide = player.bulletColor, bulletX = this.middleX, bulletY = this.middleY) {
            /**
         * Bullet color.
         * 0 = Normal.
         * 1 = Red-white.
         * 2 = Purple.
         * 3 = Blueish.
         * 4 = Yellow.
         */
     var colorToUse = new Array(4);   
    switch (wayToDecide) {
        default:
            colorToUse[0] = "yellow";
            colorToUse[1] = "orange";
            colorToUse[2] = "red";
            colorToUse[3] = "#220000";
            break;
        case 1:
            colorToUse[0] = "white";
            colorToUse[1] = "red";
            colorToUse[2] = colorToUse[0];
            colorToUse[3] = colorToUse[1];
            break;
        case 2:
            colorToUse[0] = "#FF1493";
            colorToUse[1] = "#FF00FF";
            colorToUse[2] = "";
            colorToUse[3] = "#9400D3";
            break;
        case 3:
             colorToUse[0] = "#0000DD";
             colorToUse[1] = "#0000CC";
             colorToUse[2] = "#0000BB"; 
             colorToUse[3] = "#0000AA";
             break;
         case 4:
             colorToUse[0] = "yellow";
             colorToUse[1] = colorToUse[0];
             colorToUse[2] = colorToUse[0];
             colorToUse[3] = colorToUse[0];
              
    }
    for(var i = 0; i<colorToUse.length; i++){
        context.fillStyle = colorToUse[i];
        context.fillRect(bulletX * 10, (bulletY - i) * 10, 10, 10);
    }
}