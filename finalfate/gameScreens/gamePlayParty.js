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
  deleteDeceased(true);
  partyModeCollision();
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
