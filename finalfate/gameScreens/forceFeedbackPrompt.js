/**
 * forceFeedbackPrompt.js
 * Prompt to decide whether to attempt to enable force feedback or not.
 */

var fefoPrompt_JumpTo = null;
const FEFO_PROMPT_TITLE = "Rumble Function";
const FEFO_PROMPT_DETECTED = "Rumble / Vibration support has been detected.";
const FEFO_PROMPT_GENERAL_TEXT = "Do you want to enable this function";
const FEFO_PROMPT_PHONE = "of your phone?";
const FEFO_PROMPT_GAMEPAD = "of your gamepad?";

function forceFeedbackPrompt(){

    title_and_copyright_render();
    title_animation_render();
    validateReleasedState();
    checkGamepadRemoved(forceFeedbackPrompt);
    volume_prompt_render();

    context.fillStyle = "blue";
    context.fillRect(290, 190, 260, 200);

    context.font = "27px sans-serif";
    context.fillStyle = "white";
    context.fillText(FEFO_PROMPT_TITLE, 290, 220);

    context.font = "14px sans-serif";
    context.fillText(FEFO_PROMPT_DETECTED, 290, 250);
    
    context.fillStyle = "gold";
    context.fillText(FEFO_PROMPT_GENERAL_TEXT, 290, 275);
    context.fillText(touchs ? FEFO_PROMPT_PHONE : FEFO_PROMPT_GAMEPAD, 290, 290);



}