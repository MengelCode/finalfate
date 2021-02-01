/* 
 * BlinkySky.js
 * The sky used in level 4 of the arcade mode, "Blinky Homeworld".
 */


class BlinkySky extends Decoration {
    
    constructor(depth){
        super(0,0,level4sky_render);
        this.depth = depth;
        
    }
    
}

function level4sky_render(){
    context.fillStyle = "#443377";
    context.fillRect(0,0,800,this.depth);
}