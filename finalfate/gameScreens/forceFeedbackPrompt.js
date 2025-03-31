/**
 * forceFeedbackPrompt.js
 * Prompt to decide whether to attempt to enable force feedback or not.
 */

var fefoPrompt_jumpTo = null;
var fefoPrompt_decision = null;
const FEFO_PROMPT_TITLE = "Rumble Function";
const FEFO_PROMPT_DETECTED = "Rumble / Vibration support detected.";
const FEFO_PROMPT_GENERAL_TEXT = "Do you want to enable this function";
const FEFO_PROMPT_PHONE = "of your phone?";
const FEFO_PROMPT_GAMEPAD = "of your gamepad?";

//TODO Finish screen function.
function forceFeedbackPrompt(){
    if(fefoPrompt_jumpTo === null){
        throw new Error("Screen has not been setup properly!");
    }
    if(fefoPrompt_decision === null){
        fefoPrompt_decision = true;
    }
    title_and_copyright_render();
    title_animation_render();
    validateReleasedState();
    checkGamepadRemoved(forceFeedbackPrompt);
    volume_prompt_render();

    context.fillStyle = "blue";
    context.fillRect(290, 190, 260, 200);
    //Text.
    context.font = "27px sans-serif";
    context.fillStyle = "white";
    context.fillText(FEFO_PROMPT_TITLE, 290, 220);

    context.font = "14px sans-serif";
    context.fillText(FEFO_PROMPT_DETECTED, 290, 250);
    
    context.fillStyle = "gold";
    context.fillText(FEFO_PROMPT_GENERAL_TEXT, 290, 275);
    context.fillText(touchs ? FEFO_PROMPT_PHONE : FEFO_PROMPT_GAMEPAD, 290, 290);
    context.font = "27px sans-serif";
    //Yes / no elements.
    context.fillStyle = fefoPrompt_decision ? "gold" : "white";
    context.fillText(youSure[1], 310, 380);
    context.fillStyle = !fefoPrompt_decision ? "gold" : "white";
    context.fillText(youSure[0], 450, 380);

    //Selecting around.
    if (right && axisXReleased && fefoPrompt_decision) {
        simplyPlaySound(sfx4);
        fefoPrompt_decision = false;
        axisXReleased = false;
    } else if (left && axisXReleased && !fefoPrompt_decision) {
        simplyPlaySound(sfx4);
        fefoPrompt_decision = true;
        axisXReleased = false;
    }
    if (shoot && shootReleased) {
        simplyPlaySound(sfx4);
        setFofe(fefoPrompt_decision);
        exchangeRenderLoop(fefoPrompt_jumpTo);
        shootReleased = false;
    }

}