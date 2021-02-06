/* 
 * BlinkyGround.js
 */

class BlinkyGround extends Decoration {
    
    constructor(posY,movement){
        super(0,posY,level4ground_render,level4ground_update);
        this.depth = 600 - posY;
        this.movement = movement;
        
    }
    
}

function level4ground_update(){
    this.middleY+=this.movement;
    this.depth-=this.movement;
}

function level4ground_render(){
    context.fillStyle = "#116611";
    context.fillRect(0,this.middleY,800,this.depth);
}