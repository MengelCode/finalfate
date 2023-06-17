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
        this.hp = 410;
        //"Rage" which increases every time the boss loses hp.
        //Will decharge until a specific threshold is reached.
        this.rage = 0;
        //Position of weak point and dimensions.
        this.weakX = null;
        this.weakY = null;
        this.weakWidth = null;
        this.weakHeight = null;
    }
    this.frameCounter++;
    if (this.frameCounter % 11 === 0) {
        this.subCounterAnimation++;
    }
    switch (this.stage) {
        case 0:
            boss4b_firstPhase.call(this);
            break;
        case 1:
            boss4b_secondPhase.call(this);
            break;
        case 2:
            if(player.skill === -1){
                this.invalid = true;
                player.score += 15000;
                return;
            }
            else{
                boss4b_thirdPhase.call(this);
            }
            break;
    }
}


const DEBUG_BOSS4B_RENDER_OBJ = false;

function boss4b_render() {
    //Rendering of the boss body.
    if (this.subCounterAnimation === undefined) return;
    if (this.subCounterAnimation === 6) this.subCounterAnimation = 0;
    if(DEBUG_BOSS4B_RENDER_OBJ)window.alert(JSON.stringify(this));
    if(this.stage === 2){
        context.fillStyle = this.vulnerable ? "green" : "red"; 
    }
    else if(this.stage === 1){
            context.fillStyle = "white";
    }
    else {
        context.fillStyle = "magenta";
    }
    context.fillRect(B4_ABS_X,B4_ABS_Y,B4_ABS_WIDTH,B4_ABS_HEIGHT);
    if(this.weakX && this.weakY && this.weakWidth && this.weakHeight){
        context.fillStyle = this.frameCounter % 8 < 3 ? "red" : "goldenrod";
        context.fillRect(this.weakX,this.weakY,this.weakWidth, this.weakHeight);
    }
}

/**
 * Factory function for generating the level boss.
 */
function boss4b_factory() {
    var first_element = new Enemy(0, 0, func_noDim, boss4b_update, boss4b_render);
    first_element.score = 25000;
    giant_boss = first_element;
    return first_element;
}

/**
 * Code related to first phase of boss.
 */
function boss4b_firstPhase() {
    //First phase pretty much over.
    player.checkpoint = 4;
    if(this.hp < 0){
        this.stage = 1;
        return;
    }
    //Shoot objects in direction of player.
    if (this.frameCounter % 77 === 0) {
        boss4b_phase1SpamEnemies1();
    }
    //"Release rage" if hit enough.
    if (this.rage >= 170){
        boss4b_phase1Rage1.call(this);
    }
    //Draw player a bit to the middle once damaged enough.
    if(this.hp <= 220 && this.frameCounter % 5 === 0){
        //UNUSED! Makes game too hard!
        //boss4b_phase1Hazard1.call(this);
    }
    //Release even more rage and that oddly when even more damage is taken.
    if(this.hp <= 170 && this.rage >= 150){
       boss4b_phase1Rage2.call(this);
    }
    boss4b_normalHitDetection.call(this);
    
}

/**
 * 
 * Code related to second phase of boss.
 */
function boss4b_secondPhase(){
    if(this.weakX === null){
        this.hp = 410;
        this.rage = 0;
        this.weakX = B4_ABS_X;
        this.weakY = B4_ABS_Y + B4_ABS_HEIGHT - 100;
        this.weakWidth = 80;
        this.weakHeight = 100;
    }
    if(this.hp < 0){
        this.stage = 2;
        this.hp = 130;
        this.rage = 0;
        this.weakX = null;
        this.weakY = null;
        this.weakWidth = null;
        this.weakHeight = null;
        return;
    }
    if(this.frameCounter % 30 === 0){
        this.weakX+= 20;
        if(this.weakX > 620){
           this.weakX = B4_ABS_X; 
        }
    }
     boss4b_phase2HitDetection.call(this);
}
/**
 * 
 * Code related to third phase of boss.
 */
function boss4b_thirdPhase(){
    if (this.hp < 0) {
        switch(player.skill){
            case 2:
                player.score+=50000;
                break;
            case 1:
                player.score+=40000;
                break;
            case 0:
                player.score+=25000;
        }
        this.invalid = true;
        return;
    }
    this.vulnerable = (this.frameCounter % 80) < 25;
    boss4b_phase3HitDetection.call(this);
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
        var blinkyAnnoying = new BlinkyTracer(B4_REL_X, B4_REL_Y + 4);
        enemyList.addElement(blinkyAnnoying, false);
        displayList.addElement(blinkyAnnoying, false);
        this.rage -= 5;
    } else if (player.middleX > B4_REL_X + B4_REL_WIDTH / 2) {
        var blinkyAnnoying = new BlinkyTracer(B4_REL_X +
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

// --- AUXILLARY FUNCTIONS FOR PHASE 2 ---


/**
 * Standard hit detection for boss 4.
 * Used in: Phase 2
 * @returns {undefined}
 */
function boss4b_phase2HitDetection(){
    //Detect bullets shot.
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        var bullet = bulletList.getNext();
        if (bullet.middleX + 2 > B4_REL_X &&
                bullet.middleX < B4_REL_X + B4_REL_WIDTH &&
                bullet.middleY - 2 > B4_REL_Y &&
                bullet.middleY - 2 < B4_REL_Y + B4_REL_HEIGHT) {
            //Did it hit the weak spot?
            if (bullet.middleX + 2 > this.weakX / 10 &&
                    bullet.middleX < this.weakX / 10 + this.weakWidth / 10 &&
                    bullet.middleY - 2 > this.weakY / 10 &&
                    bullet.middleY - 2 < this.weakY / 10 + this.weakHeight / 10) 
            {
                this.hp -= 20;
            } else {
                if(player.skill === 2){
                    player.health = 0;
                }
                else {
                    player.health-= player.skill > 0 ? 30 : 5;
                    player.noHit = false;
                }
                displayList.addElement(new Fog(), false);
            }
            //Bullet hit in general - is gone.
            bullet.middleY = -76;
        }

    }
}

// --- AUXILLARY FUNCTIONS FOR PHASE 3 ---

function boss4b_phase3HitDetection(){
    //Detect bullets shot.
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        var bullet = bulletList.getNext();
        if (bullet.middleX + 2 > B4_REL_X &&
                bullet.middleX < B4_REL_X + B4_REL_WIDTH &&
                bullet.middleY - 2 > B4_REL_Y &&
                bullet.middleY - 2 < B4_REL_Y + B4_REL_HEIGHT) {
            bullet.middleY = -76;
            if(this.vulnerable){
                this.hp -= 7;
            }
            else {
                if(player.skill > 0){
                    player.health = 0;
                }
                else {
                    player.health -= 9;
                    player.noHit = false;
                }
            }
        }

    }
}