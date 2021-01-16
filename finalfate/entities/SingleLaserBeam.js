/* 
 * SingleLaserBeam.js
 * Laser beam used by boss 4.
 * 
 */
class SingleLaserBeam extends Enemy {
     /**
     * Create a silent blinky enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Blinky}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, singleLaserBeam_dimension, singleLaserBeam_update,
        singleLaserBeam_render, singleLaserBeam_damage());
        this.middleX = middleX;
        this.middleY = middleY;
    }
    
}
function singleLaserBeam_dimension(){
    return func_noDim();
}

function singleLaserBeam_update(){
this.frameCounter++;    
}

function singleLaserBeam_render() {
    if (this.frameCounter % 3 === 0 && this.frameCounter < 60) {
        context.fillStyle = "white";
        context.fillRect(this.middleX * 10,this.middleY * 10,30,800);
    }
    else if(this.frameCounter > 86){
        context.fillStyle = "red";
        context.fillRect(this.middleX * 10,this.middleY * 10,30,800);   
    }
}

function singleLaserBeam_damage(){
return 77;    
}