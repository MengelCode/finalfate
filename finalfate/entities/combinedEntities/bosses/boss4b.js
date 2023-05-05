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
    }
    this.frameCounter++;
    if (this.frameCounter % 11 === 0) {
        this.subCounterAnimation++;
    }
    //Stage 0 code.
    //Shoot objects in direction of player.
    if(this.frameCounter % 77 === 0){
       boss4b_spamEnemies1();
    }
    //END: Stage 0 code.
    //Detect bullets shot.
    bulletList.resetIterator();
    while(bulletList.peekNext() !== null){
        var bullet = bulletList.getNext();
        if(bullet.middleX+2 > B4_REL_X && 
                bullet.middleX < B4_REL_X + B4_REL_WIDTH &&
                bullet.middleY-2 > B4_REL_Y &&
                bullet.middleY-2 < B4_REL_Y + B4_REL_HEIGHT){
            bullet.middleY = -76;
        }
        
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
 * Spam the player with invulnerable Blinkies, hurray!
 * @returns {undefined}
 */
function boss4b_spamEnemies1(){
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