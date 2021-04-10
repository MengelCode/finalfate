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

// 5 - Delete all elements which declared themselves as no longer needed. Or left the screen.

function deleteDeceased() {
    var lists = [displayList, enemyList, bulletList];
    for (var i = 0; i < lists.length; i++) {
        lists[i].resetIterator();
        while (lists[i].peekNext() !== null) {
            var objInQuestion = lists[i].getNext();
            if (objInQuestion.invalid === true || objInQuestion.middleY > 70) {
                lists[i].deleteElement(objInQuestion);
            }
        }
    }
}

//6 - Render the HUD.

function renderHUD() {
    bulletList.resetIterator();
    if (bulletList.peekNext() !== null) {
        //  context.fillStyle = "#333333";
    }
    context.fillStyle = "#222222";
    context.fillRect(0, 550, 800, 50);
    context.fillStyle = "white";
    context.font = "27px Nonserif";
    context.fillText(player.score, 0, 581);
    context.fillText(player.health, 245, 581);
    context.fillText(player.lifes, 350, 581);
    context.fillText(player.level + 1, 700, 581);
    context.font = "13px Nonserif";
    context.fillText("SCORE", 0, 595);
    context.fillText("HEALTH", 245, 595);
    context.fillText("LIVE", 350, 595);
    context.fillText("LEVEL", 700, 595);
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


//2 - Advance the state of each thing, spawn new things when time arrives. 
function updateGameObjects() {
    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        displayList.getNext().updateState();
    }
    var next = spawnList.peekNext();
    while (next !== null && ((next.isRelative === false && aniCount > next.frameDelta) || (next.isRelative === true && aniCountRelative > next.frameDelta))) {
        aniCountRelative = 0;
        spawnList.getNext();
        if (spawnList.peekNext() === null && giant_boss !== null && !giant_boss.registered && player.skill < 1) {
            this.savedScore = player.score;
            giant_boss.registered = true;
        }
        var subject = next.gameObject;
        if (next.isForDisplay) {
            displayList.addElement(subject);
        }
        if (next.isEnemy) {
            enemyList.addElement(subject);
        } else if (next.isBullet) {
            bulletList.addElement(subject);
        }
        next = spawnList.peekNext();
    }
}

// 4 -  Render game objects.
function renderInGame() {
    try {
        context.fillStyle = "black";
        context.fillRect(0, 0, 800, 600);
        if (background !== null && background instanceof GameObject) {
            if (renderFunction !== gamePause)
                background.updateState();
            background.renderState();
        } else if (background !== null && background instanceof Decoration) {
            if (renderFunction !== gamePause)
                background.updateRoutine();
            background.renderRoutine();
        }

        displayList.resetIterator();
        while (displayList.peekNext() !== null) {
            var v = displayList.getNext();
            if (!v.invalid)
                v.renderState();
        }
        if (renderFunction === gamePlay)
            renderHUD();
        if (renderFunction === gamePause) {
            renderHUD();
            volume_prompt_render();
            context.font = "27px Nonserif";
            //Shared Y,X coordinates
            let y = 245;
            let x = 330;
            //Display the pause menu options. (treat the case selected / not selected)
            for (var i = 0; i < pauseText.length; i++) {
                if (selectedOption === i) {
                    context.fillStyle = "yellow";
                    if (pauseCount % 5 === pauseCount % 10) {
                        context.fillText(pauseText[i], x, y + i * 30);
                    }
                } else {
                    context.fillStyle = "white";
                    context.fillText(pauseText[i], x, y + i * 30);
                }
            }
            //"Are you sure?" options.
            if (selectedOption >= pauseText.length) {
                context.fillStyle = "gray";
                context.fillRect(290, 190, 260, 200);
                context.fillStyle = "black";
                context.fillRect(290, 190, 260, 35);
                context.font = "27px Nonserif";
                context.fillStyle = "white";
                context.fillText(pauseText[selectedOption - 3], 290, 220);
                context.fillText(youSureQuestion, 290, 250);
                if (!selectedSureOption) {
                    if (pauseCount % 5 === pauseCount % 10) {
                        context.fillStyle = "yellow";
                        context.fillText(youSure[0], 290, 385);
                    }
                    context.fillStyle = "white";
                    context.fillText(youSure[1], 420, 385);
                } else {
                    if (pauseCount % 5 === pauseCount % 10) {
                        context.fillStyle = "yellow";
                        context.fillText(youSure[1], 420, 385);
                    }
                    context.fillStyle = "white";
                    context.fillText(youSure[0], 290, 385);
                }

            }
            //Save success notification.
            if (saveCompleteTimer) {
                context.fillStyle = "black";
                context.fillRect(290, 190, 260, 35);
                context.fillStyle = "white";
                context.font = "27px Nonserif";
                context.fillText(saveComplete, 290, 220);
                saveCompleteTimer--;
            } else if (saveFailureTimer) {
                context.fillStyle = "black";
                context.fillRect(290, 190, 260, 35);
                context.fillStyle = "white";
                context.font = "27px Nonserif";
                context.fillText(saveFailure, 290, 220);
                saveFailureTimer--;
            }
        }
    } catch (error) {
//Code for title screen.
        crashCauseSet = 0;
        errorObject = error;
        exchangeRenderLoop(crashHandler);
    }
}