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
        //Mouth hp.
        this.mouthHp = 200;
        //Iteration of animation.
        this.firstIter = true;
    }
    

}

//CHEAT ZONE.
const BOSS5_DEBUG_HEAD = false;


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
    bulletList.resetIterator();
    while(bulletList.peekNext()){
        var bullet = bulletList.getNext();

        // A - Detect mouth hit.
        //Boundary complete mouth: Y < 30. X1 < 50. X0 > 29
        if(this.mouthHp > 0 && bullet.middleY < 30 && bullet.middleX >29 && bullet.middleX < 50){
            bullet.middleX = -80;
            bullet.middleY = -80;
            simplyPlaySound(sfx1);
            if(this.firstIter){
                this.mouthHp-=8;
                
            }
            else{
                if(player.skill<2){
                    player.health-=7;
                    this.mouthHp-=14;
                    displayList.addElement(new Boom(),false);
                }
                else{
                    player.health=0;
                }
            }

        }

        // B - Detect nose hit.

        // C - Detect left eye hit.

        // D - Detect right eye hit.
    }

    //Ocassionally fire bullets from eye.
    //TODO 1: Bullets are out of place, wrong coordinate system used!
    //TODO 2: It seems the bullets spawn way too often!
    var randomChance = player.skill < 2 ? 27 : 12;
    if(!this.leftDamaged && getCustomRandom(randomChance) === 7){
        var blinky = new BlinkyTracerInv(this.middleX - 65, this.middleY - 65);
        enemyList.addElement(blinky, false);
        displayList.addElement(blinky, false);
    }
    if(!this.rightDamaged && getCustomRandom(randomChance) === 7){
        var blinky = new BlinkyTracerInv(this.middleX + 35, this.middleY - 65);
        enemyList.addElement(blinky, false);
        displayList.addElement(blinky, false);
    }


    
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
    if(this.mouthHp<=0){
        context.fillRect(this.middleX - 100, this.middleY + 80, 200, 40);
    }
    //Swap system back.
    this.middleX = originalX;
    this.middleY = originalY;

}