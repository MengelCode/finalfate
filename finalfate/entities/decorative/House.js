/* 
 * House.js
 * House object used for the background designing of level 4.
 */


class House extends Decoration {
    constructor(beginX,beginY,width,height,rendering_distance = 0, 
        colorCode = undefined) {
        super(beginX,beginY,house_render);
        this.width = width;
        this.height = height;
        this.rendering_distance = rendering_distance;
        if(!colorCode) this.color = getCustomRandom(3,0);
        else this.color = colorCode;
    }
}

function house_render(){
    switch(this.color){
        case 0:
            context.fillStyle = "#443322";
            break;
        case 1:
            context.fillStyle = "#223344";
            break;
        case 2:
             context.fillStyle = "#777777";
            break;
    }
    context.fillRect(this.middleX,this.middleY,this.width,this.height);
}
