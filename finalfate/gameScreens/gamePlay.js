
/**
 * gamePlay.js
 * Contains the rendering cycle for the gameplay and its helper functions.
 */

var musicAlreadyPlayed = false;
/**
 * 
 * Actual game loop.
 */
function gamePlay() {
    if (aniCount === 5 && !musicAlreadyPlayed) {
        bgm.currentTime = 0;
        bgm.pause();
        bgm.play();
        musicAlreadyPlayed = true;
    }
    try {
        //  throw new Error("Test exception.");
        updateBullets();
        checkForColli();
        deleteDeceased();
        updateGameObjects();
        checkForColli();
        deleteDeceased();
        checkLeaveLevel();
        window.requestAnimationFrame(renderInGame);
    } catch (error) {
        window.alert("EXCEPTION OCCURED IN-GAME!! \n" + "Exception name:" + error.name + "\n" + "Exception message:" + error.message + "\n" + "Stack Trace:" + error.stack);
    }
}

//Auxillary functions for levels.

//X - Advance bullets
function updateBullets() {
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        bulletList.getNext().updateSpecial();
    }
}


//1 - Check if one of the end conditions(player dead, boss dead) are met.
function checkLeaveLevel() {
    if (player.health <= 0) {
        loseLife();
    }
    if (giant_boss !== null && giant_boss.invalid) {
        player.level++;
        if(player.skill>-1 && player.noHit){
        shootReleased = false;     
        exchangeRenderLoop(bonusGame);
        }
        else{
        loadLevel();
    }
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
// 3 - Check for collisions.
function checkForColli() {
    checkForEnemyHit();
    bulletOnEnemies();
}
// 3A - Check for collisions of the player with enemies or enemy bullets

function checkForEnemyHit() {
    enemyList.resetIterator();
    while (enemyList.peekNext() !== null) {
        var enemyImminent = enemyList.getNext();
        if (player.collides(enemyImminent)) {
            if(!player.debugNoHit){
            player.noHit = false;
            }
            enemyImminent.invalidate();
            sfx1.pause();
            sfx1.currentTime = 0;
            sfx1.play();
            //window.alert("Enemy collided with player using the new function.");
            player.health = player.health - enemyImminent.damage;
            if (player.health < 0)
                player.health = 0;
        }
    }
}




// 3B Check for bullet hits on the enemies.

// 3B New try...
function bulletOnEnemies() {
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        var bullet = bulletList.getNext();
        if (!bullet.invalid) {
            enemyList.resetIterator();
            while (enemyList.peekNext() !== null) {
                var enemy = enemyList.getNext();
                if (bullet.collides(enemy) && !enemy.invalid && enemy.killable) {
                    enemy.invalidate();
                    if (enemy.invalid) {
                        sfx1.pause();
                        sfx1.currentTime = 0;
                        sfx1.play();
                        switch (player.skill) {
                            case -2:
                                player.score = player.score + enemy.score / 4;
                                break;
                            case -1:
                                player.score = player.score + enemy.score / 2;
                                break;
                            case 1:
                                player.score = player.score + enemy.score * 2;
                                break;
                            case 2:
                                player.score = player.score + enemy.score * 3;
                                break;
                            default:
                                player.score = player.score + enemy.score;
                        }



                    }
                    bullet.invalidate();
                    //window.alert("Shot the enemy.");

                }
            }
        }
    }
}

// 4 -  Render game objects.
function renderInGame() {
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
    renderHUD();
    if (renderFunction === gamePause) {
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
        renderHUD();
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