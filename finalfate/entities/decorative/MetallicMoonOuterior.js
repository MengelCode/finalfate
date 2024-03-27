/**
 * MetallicMoonOuterior.js
 */

class MetallicMoonOuterior extends Decoration {

    constructor(posX, posY, updateFctNo) {
        super(posX, posY, meMoOut_render, meMoOut_update[updateFctNo]);
        this.posZ = 0;
        //Iteration of animation.
        this.firstIter = true;
    }

}

var meMoOut_update = new Array(3);
meMoOut_update[0] = func_noOp;



function meMoOut_render() {
    //Body of Metallic Moon.
    //Head.
    if(!BOSS5_DEBUG_HEAD){
        context.fillStyle = "gray";
        context.fillRect(this.middleX-150,this.middleY-150,300,300);
    }
    //Eyes.
    context.fillStyle = "red";
    context.fillRect(this.middleX - 65, this.middleY - 65, 40, 40);
    context.fillRect(this.middleX + 35, this.middleY - 65, 40, 40);
    //Nose.
    context.fillRect(this.middleX - 10, this.middleY + 10, 40, 40);
    //Mouth.
    var whichWay = aniCount % 60 > 30;
    this.firstIter = !whichWay;
        for (var i = -120; i < 80; i += 40) {
            if (whichWay && i % 80 === 0) {
                context.fillStyle = "red";
            } else if (!whichWay && i % 80 === 0) {
                context.fillStyle = "yellow";
            } else if (whichWay) {
                context.fillStyle = "yellow";
            } else {
                context.fillStyle = "red";
            }
            context.fillRect(this.middleX + i + 20, this.middleY + 80, 40, 40);
        }
    
}