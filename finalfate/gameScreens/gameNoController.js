
/**
 * gameNoController.js
 * Contains the rendering cycle for the notification screen when the gamepad is
 * removed.
 */

var notifyText = ["Gamepad removed.", "Please reconnect it or use another"
    , "device and then press space", "or the fire key."];

//Remember the last screen.
var renderingCycle = undefined;
 /* Entry point for gamepad warning.
 * @returns {undefined}
 */
function gameNoController() {
    initAllInput();
    exchangeRenderLoop(_gameNoController,true);
}

function _gameNoController(){
    //Check for an unpausing condition.
    if (keyboard) {
        clearInterval(gamepad_handle);
        shootReleased = false;
        simplyPlaySound(sfx4);
        exchangeRenderLoop(renderingCycle);
    }
    if (gamepad !== false) {
        window.removeEventListener("keydown", getKeyPress);
        window.removeEventListener("keyup", getKeyRelease);
        clearInterval(gamepad_handle);
        gamepad_handle = setInterval(gamepadPoll, FRAME_RATE);
        shootReleased = false;
        simplyPlaySound(sfx4);
        exchangeRenderLoop(renderingCycle, true);
    }
    context.fillStyle = "#111111";
    context.fillRect(290, 190, 260, 170);
    context.font = "26px Nonserif";
    context.fillStyle = "white";
    context.fillText(notifyText[0], 290, 250);
    context.font = "14px Nonserif";
    context.fillText(notifyText[1], 290, 280);
    context.fillText(notifyText[2], 290, 310);
    context.fillText(notifyText[3], 290, 340);
    
       
}