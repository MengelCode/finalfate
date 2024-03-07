/**
 * boss5.js
 * Source code of the final boss.
 */


class MetallicMoon extends Enemy {


    constructor(middleX,middleY){
        super(middleX,middleY, func_noDim, metallicMoon_update, metallicMoon_render);
        this.middleX = middleX*10;
        this.middleY = middleY*10;
        
    }
    

}

function metallicMoon_update(){
    giant_boss = this;
}

function metallicMoon_render(){
    meMoOut_render.call(this);
}