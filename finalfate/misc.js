/**
 * misc.js
 * Contains game-relevant functions which do not belong to another place 
 * in the code.
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