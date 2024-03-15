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
        //Absolute world coordinates.
        this.visualX = 400;
        this.visualY = 160;
        
    }
    

}

function metallicMoon_update(){
    if(this.firstUpdate){
        giant_boss = this;
        this.firstUpdate = false;
    }
    //Detect player collision with enemy.
    if(player.middleY < 33 && player.middleX > 22 && player.middleX <57){
        player.health--;
    }
    
}

function metallicMoon_render(){
    var originalX = this.middleX;
    var originalY = this.middleY;
    this.middleX = this.visualX;
    this.middleY = this.visualY;
    meMoOut_render.call(this);
    this.middleX = originalX;
    this.middleY = originalY;

}