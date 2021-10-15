/**
 * loadPrompt.js
 * Contains the rendering cycle for the difficulty selection and additional
 * data used for it.
 */

//Additional strings for the loading prompt.
var loadingSelections = ["Load", "New", "Erase"];
var savedGameFound = ["A saved game was detected.", "Resume at level ", "Start anew, delete the saved game?"];
var loadSelected = undefined;
/**
 * Opened when it is detected that there is
 * a saved game. 
 * @returns {undefined}
 */
function loadPrompt() {
    title_and_copyright_render();
    title_animation_render();
    validateReleasedState();
    checkGamepadRemoved(loadPrompt);
    volume_prompt_render();
    context.fillStyle = "blue";
    context.fillRect(290, 190, 260, 200);
    context.font = "27px Nonserif";
    context.fillStyle = "white";
    context.fillText(info_string, 290, 220);
    context.font = "14px Nonserif";
    context.fillText(savedGameFound[0], 290, 250);
    context.fillStyle = "gold";
    var savedLevelUserFriendly = Number(savedLevel) + 1;
    context.fillText(savedGameFound[1] + (savedLevelUserFriendly%10) + "?", 290, 275);
    context.fillText(savedGameFound[2], 290, 290);
    if (aniCount < 4) {
        loadSelected = undefined;
    } else if (aniCount === 5) {
        loadSelected = 0;
    } else {
        context.font = "27px Nonserif";
        context.fillStyle = "white";
        for (var i = 0; i < loadingSelections.length; i++) {
            if (loadSelected === i) {
                context.fillStyle = "yellow";
            } else {
                context.fillStyle = "white";
            }
            context.fillText(loadingSelections[i], 290 + i * 75, 385);
        }
        //Selecting around.
        if (right && axisXReleased && loadSelected < 2) {
            simplyPlaySound(sfx4);
            loadSelected++;
            axisXReleased = false;
        } else if (left && axisXReleased && loadSelected > 0) {
            simplyPlaySound(sfx4);
            loadSelected--;
            axisXReleased = false;
        }
        //Confirmations:
        //loadSelected = 0 --> Load game.
        //loadSelected = 1 --> New game.
        //loadSelected = 2 --> Delete old game and start anew.
        if (shoot && shootReleased) {
            simplyPlaySound(sfx4);
            exchangeRenderLoop(skillPrompt);
            shootReleased = false;
        }
    }
}
