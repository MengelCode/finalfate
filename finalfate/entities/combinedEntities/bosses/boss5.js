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
        //Eye damaged counter.
        this.leftDamaged = 0;
        this.rightDamaged = 0;
        //Nose damaged?
        this.noseDamaged = false;
    }
    

}

//CHEAT ZONE.
const BOSS5_DEBUG_HEAD = true;


function metallicMoon_update(){
    if(this.firstUpdate){
        giant_boss = this;
        this.firstUpdate = false;
    }
    //Detect player collision with enemy.
    if(player.middleY < 33 && player.middleX > 22 && player.middleX <57){
        player.health--;
    }

    //Heal eyes automatically.
    if(this.leftDamaged){
        this.leftDamaged--;
    }
    if(this.rightDamaged){
        this.rightDamaged--;
    }
    //Detect bullets collision.
    //Boundary complete mouth: Y < 30. X1 < 50. X0 > 29.
    
    
}

function metallicMoon_render(){
    //Exchange coordinates system. ("Collision grid" to "Real life")
    var originalX = this.middleX;
    var originalY = this.middleY;
    this.middleX = this.visualX;
    this.middleY = this.visualY;
    //Render base object.
    meMoOut_render.call(this);
    //Render "dead eyes".
    context.fillStyle = "#383e42";
    if(this.leftDamaged){
        context.fillRect(this.middleX - 65, this.middleY - 65, 40, 40);
    }
    if(this.rightDamaged){
        context.fillRect(this.middleX + 35, this.middleY - 65, 40, 40);
    }
    if(this.noseDamaged){
        context.fillRect(this.middleX - 10, this.middleY + 10, 40, 40);
    }
    //Swap system back.
    this.middleX = originalX;
    this.middleY = originalY;

}