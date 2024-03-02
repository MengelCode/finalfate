/**
 * titleScreen.js
 * Contains the rendering cycle for the difficulty selection and additional
 * data used for it.
 */

/**
 * 
 * In-game objects rendered at the title screen.
 */
var title_objects = [];
/*
 * Render the title screen.
 */
function titleScreen() {
    title_and_copyright_render();
    title_animation_render();
    //Fix for a potential menu glitch.
    loadSelected = undefined;
    try {
        if(title_objects.length === 0 ){
            title_objects.push(new Enemy(0, 20, background_dimension, 
            background1_update, background2_render));
            title_objects.push(new SimplestEnemy(17, 34));
            title_objects.push(new SimplestEnemy(55, 34));
        }
        if (aniCount % 5 === aniCount % 10) {
            context.font = "23px sans-serif";
            if(aniCount % 250 < 150){
                context.fillStyle = "gold";
                context.fillText("PRESS SPACE / GAMEPAD FIRE BUTTON", 130, 520);
            }
            else{
                context.fillStyle = "silver";
                context.fillText("TOUCH CONTROLS - TOUCH TO START", 130, 520);
            }
            //Let the show begin!
            //Disabled game pad functionality.
            //if (shoot === 5 || pollButtonMemory()) {
            if (keyboard) {
                clearInterval(gamepad_handle);
                shootReleased = false;
            }
            if (gamepad !== false) {
                window.removeEventListener("keydown", getKeyPress);
                window.removeEventListener("keyup", getKeyRelease);
                clearInterval(gamepad_handle);
                gamepad_handle = setInterval(gamepadPoll, FRAME_RATE);
                shootReleased = false;
            }
            if (keyboard || gamepad !== false) {
                if (storageStatus === false) {
                    simplyPlaySound(sfx4);
                    exchangeRenderLoop(skillPrompt);
                }
                else if (storageStatus === null){
                    simplyPlaySound(sfx4);
                    exchangeRenderLoop(loadFail);
                }
                else {
                    shootReleased = false;
                    simplyPlaySound(sfx4);
                    exchangeRenderLoop(loadPrompt);
                }

            }
        }
    } catch (error) {
        //Code for title screen.
        crashCauseSet = 3;
        errorObject = error;
       exchangeRenderLoop(crashHandler);
    }

}

/**
 * Volume text.
 * @type String
 */
var volumeText = "VOLUME";
var volumeTitle = "(change with up / down)";
var volumePause = "(change with left / right)";
/**
 * Volume display render.
 * @returns {undefined}
 */
function volume_prompt_render(lockVolume = false){
    context.fillStyle = "white";
    var volumeControls = renderFunction === skillPrompt ||
            renderFunction === loadPrompt;
    if (volumeControls) {
        context.fillText(volumeText + " " + volumeTitle + ": " + masterVolume + " %", 195, 530);
        if (up && masterVolume < 100 && !lockVolume)
            masterVolume = masterVolume + 1;
        else if (down && masterVolume > 0 && !lockVolume)
            masterVolume = masterVolume - 1;
    } else {
        context.fillText(volumeText + " " + volumePause + ": " + masterVolume + " %", 390, 580);
        if (left && masterVolume < 100 && !lockVolume)
            masterVolume = masterVolume + 1;
        else if (right && masterVolume > 0 && !lockVolume)
            masterVolume = masterVolume - 1;
    }
    bgm.volume = masterVolume / 100;
    bgm_special.volume = masterVolume / 100;
}


/**
 * Renders "THE FINAL FATE" and the copyright info.
 * @returns {undefined}
 */
function title_and_copyright_render() {
    clearScreen();
    context.font = "60px Serif";
    context.fillStyle = "red";
    context.fillText("THE FINAL FATE", 120, 150);
    context.font = "17px sans-serif";
    context.fillStyle = "white";
    context.fillText("GAME (C) 2019-2024 Manuel Engel", 220, 580);
}

/**
 * Render the array with the in-game elements.
 * @returns {undefined}
 */
function title_animation_render(){
   for(var i = 0; i<title_objects.length; i++){
       title_objects[i].updateState();
       title_objects[i].renderState();
    }
   
}