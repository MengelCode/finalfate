/**
 * boss4b.js
 * Source code for the second, new version of the
 * fourth level boss.
 */


const B4_ABS_X = 100;
const B4_ABS_Y = 10;
const B4_ABS_WIDTH = 600;
const B4_ABS_HEIGHT = 240;

const B4_REL_X = B4_ABS_X / 10;
const B4_REL_Y = B4_ABS_Y / 10;
const B4_REL_WIDTH = B4_ABS_WIDTH / 10;
const B4_REL_HEIGHT = B4_ABS_HEIGHT / 10;

function boss4b_update() {
    //Init code block.
    if (this.frameCounter === 0) {
        this.subCounterAnimation = 0;
        this.stage = 0;
        //Health points. Per phase.
        this.hp = 510;
        //"Rage" which increases every time the boss loses hp.
        //Will decharge until a specific threshold is reached.
        this.rage = 0;
    }
    this.frameCounter++;
    if (this.frameCounter % 11 === 0) {
        this.subCounterAnimation++;
    }
    if (this.stage === 0) {
        boss4b_firstPhase.call(this);
    }
}

function boss4b_render() {
    //Rendering of the boss body.
    if (this.subCounterAnimation === undefined) return;
    if (this.subCounterAnimation === 6) this.subCounterAnimation = 0;
    
    // switch (this.subCounterAnimation) {
    //     case 5:
    //         context.fillStyle = "red";
    //         break;
    //     case 4:
    //         context.fillStyle = "yellow";
    //         break;           
        
    //     case 3:
    //         context.fillStyle = "magenta";
    //         break;
        
    //     case 2:
    //         context.fillStyle = "white";
    //         break;   
            
    //     default:
    //         context.fillStyle = "green";
    // }
    context.fillStyle = "magenta";
    context.fillRect(B4_ABS_X,B4_ABS_Y,B4_ABS_WIDTH,B4_ABS_HEIGHT);
}

/**
 * Factory function for generating the level boss.
 */
function boss4b_factory() {
    var first_element = new Enemy(0, 0, func_noDim, boss4b_update, boss4b_render);
    giant_boss = first_element;
    return first_element;
}

/**
 * Code related to first phase of boss.
 */
function boss4b_firstPhase() {
    //Shoot objects in direction of player.
    if (this.frameCounter % 77 === 0) {
        boss4b_phase1SpamEnemies1();
    }
    //"Release rage" if hit enough.
    if (this.rage >= 170){
        boss4b_phase1Rage1.call(this);
    }
    //Draw player a bit to the middle once damaged enough.
    if(this.hp <= 320 && this.frameCounter % 5 === 0){
        boss4b_phase1Hazard1.call(this);
    }
    //Release even more rage and that oddly when even more damage is taken.
    if(this.hp <= 270 && this.rage >= 150){
       boss4b_phase1Rage2.call(this);
    }
    boss4b_normalHitDetection.call(this);
    
}

/**
 * Standard hit detection for boss 4.
 * Used in: Phase 1
 * @returns {undefined}
 */
function boss4b_normalHitDetection(){
    //Detect bullets shot.
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        var bullet = bulletList.getNext();
        if (bullet.middleX + 2 > B4_REL_X &&
                bullet.middleX < B4_REL_X + B4_REL_WIDTH &&
                bullet.middleY - 2 > B4_REL_Y &&
                bullet.middleY - 2 < B4_REL_Y + B4_REL_HEIGHT) {
            bullet.middleY = -76;
            this.hp -= 7;
            this.rage += 7;
        }

    }
}



// --- AUXILLARY FUNCTIONS FOR PHASE 1 ---

/**
 * Spam the player with invulnerable Blinkies, hurray!
 * @returns {undefined}
 */
function boss4b_phase1SpamEnemies1(){
    //1st left.
    var blinkyAnnoying = new BlinkyTracerInv(B4_REL_X,B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
    //2nd left.
    blinkyAnnoying = new BlinkyTracerInv(B4_REL_X + 6,B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
    //3nd left.
    blinkyAnnoying = new BlinkyTracerInv(B4_REL_X + 12,B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
    //1st right.
    blinkyAnnoying = new BlinkyTracerInv(B4_REL_X + B4_REL_WIDTH - 2,
    B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
     //2nd right.
    blinkyAnnoying = new BlinkyTracerInv(B4_REL_X + B4_REL_WIDTH - 8,
    B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
    //3rd right.
    blinkyAnnoying = new BlinkyTracerInv(B4_REL_X + B4_REL_WIDTH - 14,
    B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
}


/** First type of reaction the enemy shows in phase 1
 *  if it feels seriously attacked.
 */

function boss4b_phase1Rage1() {
    var blinkyAnnoying = new BlinkyInv(B4_REL_X + B4_REL_WIDTH / 2,
            B4_REL_Y + B4_REL_HEIGHT);
    enemyList.addElement(blinkyAnnoying, false);
    displayList.addElement(blinkyAnnoying, false);
    this.rage -= 5;
}
/**
 * Second type of reacion to the enemy feeling attacked
 * seriously attacked by player in phase 1.
 */
function boss4b_phase1Rage2(){
    if (player.middleX < B4_REL_X + B4_REL_WIDTH / 2) {
        var blinkyAnnoying = new BlinkyInv(B4_REL_X, B4_REL_Y + 4);
        enemyList.addElement(blinkyAnnoying, false);
        displayList.addElement(blinkyAnnoying, false);
        this.rage -= 5;
    } else if (player.middleX > B4_REL_X + B4_REL_WIDTH / 2) {
        var blinkyAnnoying = new BlinkyInv(B4_REL_X +
                B4_REL_WIDTH - 2, B4_REL_Y + 4);
        enemyList.addElement(blinkyAnnoying, false);
        displayList.addElement(blinkyAnnoying, false);
        this.rage -= 5;
    }
}

/** First type of game mechanism hazard in phase 1.
 * 
 */

function boss4b_phase1Hazard1() {
    //If player more left, to draw them to the middle.
    if (player.middleX < B4_REL_X + B4_REL_WIDTH / 2) {
        player.middleX += 1;
    } else if (player.middleX > B4_REL_X + B4_REL_WIDTH / 2) {
        player.middleX -= 1;
    }
}