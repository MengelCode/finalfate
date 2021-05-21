/* 
 * gamePlayParty.js
 * Rendering cycle and helper functions for the game's Party Mode.
 */
/**
 * The main game loop of the "Party Mode".
 * @returns {undefined}
 */
function gamePlayParty(){  
 try {
  updateGameObjects();
  detectOffScrHit();
  partyModeCollision();
  advanceClock();
  detectEndOfRound();
  deleteDeceased(true);
  window.requestAnimationFrame(renderInGame);   
 }
 catch (error) {
      //Code for title screen.
        crashCauseSet = 1;
        errorObject = error;
       exchangeRenderLoop(crashHandler);  
    }
}

/**
 * Used to determine if a game round is over. Triggers that the users
 * will be sent back to a menu, or, as long as there is none, to the title.
 * Factors which end a game round:
 * 1 --> The ship's HP is zero or below.
 * 2 --> The time is up.
 * @returns {undefined}
 */
function detectEndOfRound(){
    if(player.health<=0 || timeIsUp)exchangeRenderLoop(gameOver);
}
/**
 * Check if a second passed and decreased the timer if so.
 * @returns {undefined}
 */
function advanceClock() {
    var updatedTS = Date.now();
    if (updatedTS > measuredTime + 1000 && player.time > 0) {
        player.time--;
        measuredTime = updatedTS;
    }
    else if (updatedTS > measuredTime + 1000 && player.time === 0) {
        timeIsUp = true;
        measuredTime = updatedTS;
    }
}

/**
 * Detect when an object left the screen and determine if the space ship of
 * all players will take damage.
 * @returns {undefined}
 */
function detectOffScrHit() {
    enemyList.resetIterator();
    while (enemyList.peekNext() !== null) {
        // 1 - Detect if time for decision making has come.
        var enemy_obj = enemyList.getNext();
        if (enemy_obj.posY > partyModeLimit) {
            var chance = getCustomRandom((enemy_obj.getChance()-1)) === 0;
            if (chance) {
                enemy_obj.invalidate();
                player.health-= enemy_obj.damage;
            }
            else {
                enemy_obj.invalid = true;
            }
        }
    }
}

/**
 * Check if any of the laser cannon shots hit an enemy.
 * @returns {undefined}
 */
function partyModeCollision() {
    bulletList.resetIterator();
     while (bulletList.peekNext() !== null) {
        var bullet = bulletList.getNext(); 
        enemyList.resetIterator();
        while (enemyList.peekNext() !== null){
        var enemy = enemyList.getNext();    
        if(bullet.endX > enemy.posX && bullet.endY > enemy.posY && bullet.endX <
                enemy.posX+enemy.width && bullet.endY < enemy.posY+enemy.height){
                enemy.invalidate();
                player.score += enemy.score;
        }    
        }
    }
}
