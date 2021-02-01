/* 
 * BlinkyGround.js
 */

class BlinkyGround extends Decoration {
    
    constructor(posY){
        super(0,posY,level4ground_render);
        this.depth = 600 - posY;
        
    }
    
}

function level4ground_render(){
    context.fillStyle = "#116611";
    context.fillRect(0,this.middleY,800,this.depth);
}