/**
 * skillPrompt.js
 * Contains the rendering cycle for the difficulty selection and additional
 * data used for it.
 */
//Additional strings for difficulty prompt.
var skillSelections = ["N.A.", "Beginner", "Normal", "Hard", "Master"];
var skillScreenDelta = [-80, -30, 120, 240, 330];
var selectSkill = "Select difficulty level.";
var skillSelection = undefined;

function skillPrompt() {
    title_and_copyright_render();
    validateReleasedState();
    checkGamepadRemoved(skillPrompt);
    volume_prompt_render();
    context.font = "27px Nonserif";
    context.fillStyle = "white";
    context.fillText(selectSkill, 220, 450);
    if (aniCount < 4) {
        skillSelected = undefined;
    } else if (aniCount === 5) {
        skillSelected = 0;
    }
    for (var i = -1; i < skillSelections.length - 2; i++) {
        if (i === -2){
            context.fillStyle = "gray";
        }
        else if (skillSelected === i) {
            context.fillStyle = "yellow";
        } else {
            context.fillStyle = "white";
        }
        context.fillText(skillSelections[i + 2], 200 + skillScreenDelta[i + 2], 500);
    }
    //Selecting around.
    if (right && axisXReleased && skillSelected < 2) {
        simplyPlaySound(sfx4);
        skillSelected++;
        axisXReleased = false;
    } else if (left && axisXReleased && skillSelected > -1) {
        simplyPlaySound(sfx4);
        skillSelected--;
        axisXReleased = false;
    }
    if (shoot && shootReleased) {
        simplyPlaySound(sfx4);
        switch (loadSelected) {
            case 0:
                initGame(gamePlayArcade,skillSelected, Number(savedLevel % 10), Number(savedLevel / 10));
                return;
            case undefined:
            case 1:
                initGame(gamePlayArcade,skillSelected);
                return;
            case 2:
                getLocalStorage().removeItem(gameStorageName);
                initGame(gamePlayArcade,skillSelected);

        }
    }
}
