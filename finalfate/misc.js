/**
 * misc.js
 * Contains game-relevant functions which do not belong to another place 
 * in the code or data / code which is multi-purpose.
 */
/**
 * (Re-)Play sound with just one call instead of three.
 * @param {type} object
 * @returns {undefined}
 */
function simplyPlaySound(soundObject) {
    soundObject.pause();
    soundObject.currentTime = 0;
    soundObject.play();
}

/**
 * Function which does nothing. Sometimes useful.
 * @returns {undefined}
 */
function func_noOp() {}


/**
 * Exchange the rendering loop with another function.
 * Takes care of necessary cleanup and resets frame counter.
 * @param {function} func Function which will be executed as rendering loop.
 * @param {boolean} preserveCounters Do not reset counters. Default: false
 * @returns {undefined}
 */
function exchangeRenderLoop(func, preserveCounters = false) {
    if (renderTimer !== null)
        clearInterval(renderTimer);
    if (!preserveCounters) {
        aniCount = renderReset;
        aniCountRelative = 0;
    }
    testStorageState();
    if (storageStatus === "CORRUPT") {
        renderFunction = saveCorrupt;
    } else {
        renderFunction = func;
    }
    renderTimer = setInterval(renderFunction, FRAME_RATE);
}

//General-purpose dialogue options and text.
var youSure = ["No", "Yes"];
var youSureQuestion = ["Are you sure?"];

// General variables for the game.
//CHEAT ZONE - default 30. Frame rate of game.
var FRAME_RATE = 30;