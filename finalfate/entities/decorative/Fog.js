/**
 * Fog.js
 * Created by Fog Bomb when this detonates.
 */


class Fog extends Enemy{
   /**
    * "Fog" to be constructed by FogBomb when one detonates.
    * @returns {Fog}
    */ 
    constructor(){
        super(0,0,func_noOp,fog_update,fog_render);
    }
    
}

//"Fog" update function.
function fog_update(){
this.frameCounter++;    
if(this.frameCounter === 40)this.invalidate();    
}

//"Fog" rendering function
function fog_render() {
    if (this.frameCounter < 30) {
        performFadeIn.call(this, 0, 10);

    } else {
        //I do not want this solution, but floating point precision limits my way of life.
        switch (this.frameCounter) {
            case 30:
            context.globalAlpha = 0.9;
            break;
            case 31:
            context.globalAlpha = 0.8;
            break;
            case 32:
            context.globalAlpha = 0.7;
            break;
            case 33:
            context.globalAlpha = 0.6;
            break;
            case 34:
            context.globalAlpha = 0.5;
            break;
            case 35:
            context.globalAlpha = 0.4;
            break;
            case 36:
            context.globalAlpha = 0.3;
            break;
            case 37:
            context.globalAlpha = 0.2;
            break;
            case 38:
            context.globalAlpha = 0.1;
            break;
            default:
            context.globalAlpha = 0;
        
        }
    }
    context.fillStyle = "#441111";
    context.fillRect(0,0,800,600);
    //Uncomment this to have the best "Motion blur" ever.
    context.globalAlpha = 1.0;
}
