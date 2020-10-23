/* 
 * Checkpoint.js
 * "Enemy object" which sets a checkpoint for the player upon spawning.
 * Destroys itself after setting the params.
 */

class Checkpoint extends Enemy {
    
    /**
     * Creates a custom checkpoint for levels.
     * @returns {Checkpoint}
     */
    constructor(checkpointNo){
    super(0,0,func_noDim,checkpoint_update,func_noOp);
    this.checkpointNo = checkpointNo;
    }
    
}

function checkpoint_update(){
player.checkpoint = this.checkpointNo;
this.savedScore = player.score;
}

