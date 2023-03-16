/**
 * misc.js
 * Contains game-relevant functions which do not belong to another place 
 * in the code or data / code which is multi-purpose.
 */

/**
 * Volume value for the SFX / music.
 * @type Number
 */
var masterVolume = 100;

/**
 * Flag if bgm already played.
 * @type Boolean
 */
var musicAlreadyPlayed = false;

/**
 * (Re-)Play sound with just one call instead of three.
 * @param {type} object
 * @returns {undefined}
 */
function simplyPlaySound(soundObject) {
    soundObject.pause();
    soundObject.volume = masterVolume / 100;
    soundObject.currentTime = 0;
    soundObject.play();
}

/**
 * Event handler triggered when windows size changes.
 * @returns {undefined}
 */
function sizeChanged() {
    newWidth = window.innerWidth;
    newHeight = window.innerHeight;
    canvas.setAttribute("width", newWidth);
    canvas.setAttribute("height", newHeight);
    //context.scale(newWidth / oldWidth, newHeight / oldHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(newWidth / oldestWidth, newHeight / oldestHeight);
    oldWidth = newWidth;
    oldHeight = newHeight;
//window.alert("New canvas resolution: " + newWidth + "x" + newHeight + "<br> New inner window size: " + window.innerWidth + "x" + window.innerHeight);
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

/**
 * 
 * @returns random X coordinate.
 */
function getRandomX() {
    return getCustomRandom(80,0);
}

/**
 * 
 * @returns random Y coordinate.
 */
function getRandomY() {
    return getCustomRandom(60,0);
}
/**
 * Returns any random integer between min and max inclusive.
 * @param {integer} maxValue Biggest integer which is in range.
 * @param {integer} minValue Optional, smallest integer which is in range.
 * @returns {integer} 
 */
function getCustomRandom(maxValue,minValue = 0){
    var rand = Math.random();
    maxValue = maxValue - minValue;
    var generated = Math.floor(rand * maxValue) + minValue;
    return generated;
    
}

//Make sure that frame counter always continues.
function increaseCount() {
    if (renderFunction === gamePause || renderFunction === gameNoController 
            || renderFunction === _gameNoController) {
        pauseCount++;
        return;
    }
    aniCount++;
    aniCountRelative++;
}

/**
 * Function in order to make a nice looking fade in via transparency.
 * Do not call directly, only via its call function, because the calling enemy
 * object is required.
 * @param {type} startValue Frame in lifecycle of object when the effect should start.
 * @param {type} endValue Frame in lifecycle of object when the effect should end.
 * @returns {undefined}
 */
function performFadeIn(startValue = 0,endValue = startValue + 10){
 if(this.frameCounter < startValue){
        context.globalAlpha = 0.0;
    }
    else if(this.frameCounter <= endValue-startValue){
        context.globalAlpha = (this.frameCounter-startValue) * 0.1; 
    }    
    
}
/**
 * Function in order to make a nice looking fade out via transparency.
 * Do not call directly, only via its call function, because the calling enemy
 * object is required. 
 * @param {type} startValue Frame in lifecycle of object when the effect should start.
 * @param {type} endValue Frame in lifecycle of object when the effect should end.
 * @returns {undefined}
 * @deprecated Using it cannot be recommended due to malfunction.
 */
function performFadeOut(startValue = 0,endValue = startValue + 10){
    //window.alert("I am called.");
 if(this.frameCounter < startValue){
        context.globalAlpha = 1.0;
    }  
//  Did not work. Most likely rounding errors in JavaScript engine.    
    else if(this.frameCounter <= endValue-startValue){
           var inverter = (this.frameCounter-startValue) * 0.1;
           context.globalAlpha = 1 - inverter; 
    }    
} 

/**
 * The Canvas 2D fillText implementation does not allow multi-line drawing.
 * This function is capable of this.
 * @param {type} string String to draw on screen.
 * @param {type} x X coordinate of all lines.
 * @param {type} y Y coordinate of first line.
 * @param {type} offset Offset between the lines of text.
 * @param {type} delimiter Custom delimiter if "\n" is not applicable.
 * @returns {undefined}
 */
function fillTextMultiLine(string,x,y,offset, delimiter = "\n") {
    var stringArray = string.split(delimiter);
    for (var i = 0; i < stringArray.length; i++) {
    context.fillText(stringArray[i],x,y + (i*offset));
    }
}

/**
 * Overdraws the entire Canvas content with a black background.
 * @returns {undefined}
 */
function clearScreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0, oldestWidth, oldestHeight);
}

/**
 * Function for registering touch input.
 * @param {type} event
 * @returns {undefined}
 */
function registerTouch(event){
    touchs = true;
    keyboard = 1;
    shoot = 5;
}

/**
 * Function for unregistering touch input.
 * @param {type} event
 * @returns {undefined}
 */
function unregisterTouch(event){
    shoot = 0;
}

//General-purpose dialogue options and text.
var youSure = ["No", "Yes"];
var youSureQuestion = ["Are you sure?"];

// General variables for the game.
//CHEAT ZONE - default 30. Frame rate of game.
var FRAME_RATE = 30;

//Linked List to use for all kinds of things to display.
var displayList = null;
//Linked List to contain enemies, for collision stuff.
var enemyList = null;
//Linked List to contain bullets, for collision stuff.
var bulletList = null;
//Linked List for spawners.
var spawnList = null;
//Player instance.
var player = null;
//Major boss. Death of it indicates that the next level should come.
var giant_boss = null;

//Level background rendering functions.
//var backgroundRenderers = new Array(6);
//Animation counter. Absolute
var aniCount = 0;
//Animation counter. Relative
var aniCountRelative = 0;
//Animation counter for pause.
var pauseCount = 0;

//HTML Canvas
var canvas = document.getElementById("screen");
const oldestWidth = 800;
const oldestHeight = 600;
var oldWidth = oldestWidth;
var oldHeight = oldestHeight;
var newWidth = null;
var newHeight = null;
//Context
var context = canvas.getContext("2d");
