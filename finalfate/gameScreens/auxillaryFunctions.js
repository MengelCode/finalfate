/* auxillaryFunctions.js
 * Functions used by multiple screens, mostly those of game modes.
 */


/**
 * 
 * Define the beginning state of the game, then start with the first level.
 */
function initGame(gameMode,skillLevel, savedLevel = undefined, bulletColor = 0) {
    gamePlay = gameMode;
    if(gamePlay === gamePlayArcade){
    player = new SpaceShip(38, 52);
    //CHEAT ZONE!!!
    player.level = savedLevel === undefined ? 0 : savedLevel;
    player.skill = skillLevel;
    player.bulletColor = parseInt(bulletColor);
    this.savedScore = 0;
    // renderReset = 9000;
    //CHEAT ZONE end.
    loadLevel();
}
}

/**
 * 
 * Load a level. General Method.
 */
function loadLevel() {
    if (player.health < 100) {
        player.health = 100;
    }
    musicAlreadyPlayed = false;
    savedScore = player.score;
    if(gamePlay === gamePlayArcade){
    player.middleX = 38;
    player.middleY = 52;
    }
    giant_boss = null;
    displayList = new LinkedList();
    bulletList = new LinkedList();
    enemyList = new LinkedList();
    spawnList = new LinkedList();
    //Player always starts "unhit".
    player.noHit = true;
    displayList.addElement(player);

    try {
        //throw new Error("Test");
        if (loaders[player.level] === undefined) {
            window.alert("D.J. Mengel is evil.");
            //Make everything stop.
            exchangeRenderLoop(null);
        } else {
            background = null;
            loaders[player.level]();
            if (loadingException === null) {
                //TODO: Take care of this.
                exchangeRenderLoop(gamePlay);
            } else
                throw loadingException;
        }
    } catch (error) {
//Code for level transition.
        crashCauseSet = 2;
        errorObject = error;
        exchangeRenderLoop(crashHandler);
    }
}