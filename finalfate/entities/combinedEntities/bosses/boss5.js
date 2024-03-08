/**
 * boss5.js
 * Source code of the final boss.
 */


class MetallicMoon extends Enemy {


    constructor(middleX,middleY){
        super(middleX,middleY, func_noDim, metallicMoon_update, metallicMoon_render);
        this.middleX = middleX*10;
        this.middleY = middleY*10;
        this.firstUpdate = true;
        this.trueEnemy = true;
        
    }
    

}

function metallicMoon_update(){
    if(this.firstUpdate){
        giant_boss = this;
        this.firstUpdate = false;
    }
    
}

function metallicMoon_render(){
    var originalX = this.middleX;
    var originalY = this.middleY;
    this.middleX = 250;
    this.middleY = 250;
    meMoOut_render.call(this);
    this.middleX = originalX;
    this.middleY = originalY;

}