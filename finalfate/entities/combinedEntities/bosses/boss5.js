/**
 * boss5.js
 * Source code of the final boss.
 */


class MetallicMoon extends Enemy {


    constructor(middleX,middleY){
        super(middleX,middleY, func_noDim, metallicMoon_update, metallicMoon_render);
        this.middleX = middleX*10;
        this.middleY = middleY*10;
        //Collision grid coordinates.
        this.originalX = this.middleX;
        this.originalY = this.middleY;
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
        //Defeated?
        this.defeated = false;
        //Defeated frame counter.
        this.defeatedFrame = 0;
    }
    

}

//CHEAT ZONE.
const BOSS5_DEBUG_HEAD = false;


function metallicMoon_update(){
    if(this.defeated){
        if(aniCount%13 === 0){
            simplyPlaySound(sfx1);
            displayList.addElement(new Fog(),false);
        }
        if(aniCount%37 === 0){
            simplyPlaySound(sfx1);
            displayList.addElement(new Boom(),false);
        }
        if(this.defeatedFrame>150){
            //TODO: Screen / scene to actually jump to. This just freezes the game.
            exchangeRenderLoop(goodEndingScene);
        }
        this.defeatedFrame++;
        return;
    }
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
    var mouthStillHere = this.mouthHp > 0;
    while(bulletList.peekNext()){
        var bullet = bulletList.getNext();

        // A - Detect mouth hit.
        //Boundary complete mouth: Y < 30. X1 < 50. X0 > 29
        if(mouthStillHere && bullet.middleY < 30 && bullet.middleX >29 && bullet.middleX < 50){
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
                    simplyPlaySound(sfx1);
                    displayList.addElement(new Boom(),false);
                }
                else{
                    simplyPlaySound(sfx1);
                    displayList.addElement(new Boom(),false);
                    player.health=0;
                }
            }

        }

        // B - Detect nose hit.
        else if(!this.noseDamaged && bullet.middleY < 24 && bullet.middleX > 38 && bullet.middleX < 43){
            bullet.middleX = -80;
            bullet.middleY = -80;
            // A - The right time for hitting the nose is here.
            if(this.leftDamaged && this.rightDamaged){
                bullet.middleX = -80;
                bullet.middleY = -80;
                this.noseDamaged = true;
                this.defeated = true;
                player.score = player.skill < 2? player.score+=200000 : player.score+=270000;
                simplyPlaySound(sfx1);
                displayList.addElement(new Fog(),false);
            }
            // B - Wrong timing, Hard mode.
            else if(player.skill < 2){
                displayList.addElement(new Boom(), false);
                simplyPlaySound(sfx2);
                this.mouthHp = 85;
            }
            // C - Wrong timing, Master mode.
            else{
                displayList.addElement(new Boom(), false);
                simplyPlaySound(sfx1);
                player.health = 0;
            }
        }

        // C - Detect left eye hit.
        else if(!this.leftDamaged && bullet.middleY < 17 && bullet.middleX > 32 && bullet.middleX < 38){
            bullet.middleX = -80;
            bullet.middleY = -80;
            this.leftDamaged = 200;
            simplyPlaySound(sfx1);
        }

        // D - Detect right eye hit.
        else if(!this.rightDamaged && bullet.middleY < 17 && bullet.middleX > 42 && bullet.middleX < 48){
            bullet.middleX = -80;
            bullet.middleY = -80;
            this.rightDamaged = 200;
            simplyPlaySound(sfx1);
        }
    }

    //Ocassionally fire bullets from eye.
    var randomChance = player.skill < 2 ? 120 : 78;
    if(!this.leftDamaged && getCustomRandom(randomChance) === 7){
        var blinky = new BlinkyInv(34, 12);
        enemyList.addElement(blinky, false);
        displayList.addElement(blinky, false);
    }
    if(!this.rightDamaged && getCustomRandom(randomChance) === 7){
        var blinky = new BlinkyInv(45,12);
        enemyList.addElement(blinky, false);
        displayList.addElement(blinky, false);
    }
    
}


function transformToReal(){
        //Exchange coordinates system. ("Collision grid" to "Real life")
        this.middleX = this.visualX;
        this.middleY = this.visualY;
}

function transformToCollision(){
        //Exchange coordinates system. ("Real life" to "Collision")
        this.middleX = this.originalX;
        this.middleY = this.originalY;
}


function metallicMoon_render(){
    transformToReal.call(this);
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
    transformToCollision.call(this);

}