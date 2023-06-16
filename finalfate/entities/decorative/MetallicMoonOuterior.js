/**
 * MetallicMoonOuterior.js
 */

class MetallicMoonOuterior extends Decoration {
    
    constructor(posX,posY,updateFctNo){
        super(posX,posY,meMoOut_render,meMoOut_update[updateFctNo]);
        this.posZ = 0;
    }
    
}

var meMoOut_update = new Array(3);
meMoOut_update[0] = func_noOp;



function meMoOut_render(){
    //Body of Metallic Moon.
    context.fillStyle = "lightgray";
}