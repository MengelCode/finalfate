/* 
 * crash.js
 * This file will contain the new crash handler which can be centrally called
 * during the entire application lifecycle.
 */

var crashLocation = new Array(10);

crashLocation[0] = "IN-GAME (main loop - rendering)";
crashLocation[1] = "IN-GAME (main loop - game logic)";
crashLocation[2] = "IN LEVEL TRANSITION";
crashLocation[3] = "AT TITLE SCREEN";
crashLocation[4] = "....NOT";

var crashCauseSet = null;
var errorObject = null;

function crashHandler() {
    if (crashCauseSet === null) {
        crashCauseSet = 4;    
    }
    context.globalAlpha = 0.4;
    context.fillStyle = "#222222";
    context.fillRect(6, 30, 778, 540);
    context.globalAlpha = 1.0;
    context.fillStyle = "white";
    context.font = "14px Serif";
    if (crashCauseSet === 4) {
        try {
            throw new Error("TestError");
        } catch (error) {
            errorObject = error;
        }
    }
 
    context.fillText("ERROR OCCURRED " + crashLocation[crashCauseSet] + " !!",
            10, 50);
    context.fillText("Error type: " + errorObject.name, 10, 80);
    context.fillText("Error message: " + errorObject.message, 10, 95);
    fillTextMultiLine(errorObject.stack, 10, 110,15);
    
}
