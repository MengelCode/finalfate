/**
 * Box.js
 * Contains the render logic for the hot heat wave created by level 3 boss.
 */

class Box extends Decoration {

    /**
     * Draw a rectangle.
     * @param {type} middleX
     * @param {type} middleY
     * @param {type} width
     * @param {type} height
     * @returns {Rectangle}
     */
    constructor(middleX, middleY, width, height, color, visible = false) {
        super(middleX, middleY, box_render);
        this.width = width;
        this.height = height;
        this.color = color;
        this.visible = visible;
        this.setVisible = function (visible) {
            this.visible = visible;
        };
    }
}
//Box rendering function
function box_render() {
    if (!this.visible)
        return;
    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(this.middleX, this.middleY);
    context.lineTo(this.middleX + this.width, this.middleY);
    context.lineTo(this.middleX + this.width, this.middleY + this.height);
    context.lineTo(this.middleX, this.middleY + this.height);
    context.lineTo(this.middleX, this.middleY);
    context.stroke();
}
