/* 
 * BlinkySky.js
 * The sky used in level 4 of the arcade mode, "Blinky Homeworld".
 */


class BlinkySky extends Decoration {
    
    constructor(depth,movement){
        super(0,0,level4sky_render,level4sky_update);
        this.depth = depth;
        this.movement = movement;
        
    }
    
}
function level4sky_update(){
 this.depth+=this.movement;   
}
function level4sky_render(){
    context.fillStyle = "#443377";
    context.fillRect(0,0,800,this.depth);
}