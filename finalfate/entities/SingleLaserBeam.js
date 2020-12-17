/* 
 * SingleLaserBeam.js
 * Laser beam used by boss 4.
 * 
 */
const DEBUG_ELLI = false;
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
    context.fillStyle = "white";
    if (!DEBUG_ELLI) {
        context.strokeStyle = "white";
        context.beginPath();
        for (var i = 0; i < 12; i++) {
            var size_rand = getCustomRandom(7,0);
            var size_modulo = this.frameCounter % 7;
            var size_progressive = this.frameCounter / 14;
            context.arc((this.middleX+i) * 10, this.middleY * 10, 
            8 + size_rand + size_modulo + size_progressive * 4, 0, Math.PI * 2);
        }
        context.fill();
    } else {
        context.fillText("TEST! - THIS FUNCTION IS CALLED...",400,300);
    }
}

function singleLaserBeam_damage(){
return 77;    
}