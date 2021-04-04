
/**
 * gamePause.js
 * Contains the rendering cycle for the pause menu and additional
 * data used for it.
 */

var selectedOption = 0;
var selectedSureOption = 0;
//String array with pause menu constants.
var pauseText = ["Continue", "Save", "Retry Level", "Return To Title"];
//Rendering of result of saving mechanism is displayed here until counter is zero.
var saveCompleteTimer = 0;
var saveFailureTimer = 0;
var saveComplete = "Saved.";
var saveFailure = "Error. Save failed!";
/**
 * Game Pause.
 * @returns {undefined}
 */
function gamePause() {
    validateReleasedState();
    checkGamepadRemoved(gamePause);
    //Check for an unpausing condition.
    if ((pause && pauseReleased) || (!selectedOption && shoot && shootReleased)) {
        saveCompleteTimer = 0;
        saveFailureTimer = 0;
        simplyPlaySound(sfx4);
        pauseReleased = false;
        bgm.play();
        //Keep in mind this needs to jump to the correct game mode.
        exchangeRenderLoop(gamePlay, true);
    }
    //Check for confirming something that does not mean continue.
    else if (selectedOption && selectedOption < pauseText.length && shoot && shootReleased) {
        simplyPlaySound(sfx4);
        shootReleased = false;
        selectedOption += 3;
        selectedSureOption = 0;
    }
    //Check for selecting an option above.
    else if (up && selectedOption && selectedOption < pauseText.length && axisYReleased) {
        selectedOption--;
        simplyPlaySound(sfx4);
        axisYReleased = false;
    }
    //Check for selecting an option below.
    else if (down && selectedOption < pauseText.length - 1 && axisYReleased) {
        selectedOption++;
        simplyPlaySound(sfx4);
        axisYReleased = false;
    }
    //Checks for "Are you sure?" dialogues.
    //Select "No".
    else if (left && selectedOption >= pauseText.length && selectedSureOption && axisXReleased) {
        selectedSureOption--;
        simplyPlaySound(sfx4);
        axisXReleased = false;
    }
    //Select "Yes".
    else if (right && selectedOption >= pauseText.length && !selectedSureOption && axisXReleased) {
        selectedSureOption++;
        simplyPlaySound(sfx4);
        axisXReleased = false;
    }
    //Confirming "No" when being asked for something.
    else if (shoot && selectedOption >= pauseText.length && !selectedSureOption && shootReleased) {
        selectedOption -= 3;
        simplyPlaySound(sfx4);
        shootReleased = false;
    }
    //Confirm ing "Yes" when being asked to save.
    else if (shoot && selectedOption === pauseText.length && selectedSureOption && shootReleased) {
        saveCompleteTimer = 0;
        saveFailureTimer = 0;
        shootReleased = false;
        selectedOption -= 3;
        simplyPlaySound(sfx4);
        pauseReleased = false;
        saveGame();
        if (saveError) {
            saveFailureTimer = 100;
        } else {
            saveCompleteTimer = 100;
        }
    }
    //Confirm ing "Yes" when being asked to restart level.
    else if (shoot && selectedOption === pauseText.length + 1 && selectedSureOption && shootReleased) {
        simplyPlaySound(sfx4);
        pauseReleased = false;
        exchangeRenderLoop(gamePlayArcade, true);
        player.health = 0;
    }
    //Confirming "Yes" when being asked to return to title.
    else if (shoot && selectedOption === pauseText.length + 2 && selectedSureOption && shootReleased) {
        exchangeRenderLoop(gameOver);
    }
    window.requestAnimationFrame(renderInGame);
}
