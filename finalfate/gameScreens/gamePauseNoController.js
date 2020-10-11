
/**
 * gamePauseNoGamepad.js
 * Contains the rendering cycle for the pause menu when the gamepad is
 * removed.
 */

var notifyText = ["Gamepad was removed.", "Please reconnect it or use another device"
    , "and then press space / the fire key."];

 /* Game Pause.
 * @returns {undefined}
 */
function gamePauseNoController() {
    initAllInput();
    //Check for an unpausing condition.
    if ((keyboard || gamepad !== false)) {
        
        bgm.play();
        exchangeRenderLoop(gamePlay, true);
    }
    
    window.requestAnimationFrame(renderInGame);
}
