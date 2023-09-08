/**
 * 
 * This is the entry point of the game.
 */

//Fit canvas and context to actual screen size.
sizeChanged();
//Level Loaders.
var loaders = new Array(7);
loaders[0] = earthLoader;
loaders[1] = solarSystemLoader;
loaders[2] = universeLoader;
loaders[3] = blinkyHomeworldLoader;
//Level names.
var level_names = new Array(7);
level_names[0] = "Earth";
level_names[1] = "Solar System";
level_names[2] = "Universe";
level_names[3] = "Blinky Homeworld";
//Level name display timer.
var level_timer = 0;
clearScreen();
//Render function assigning.
renderFunction = boot;
//Make keys unpressed over time.
//setInterval(keyInvalidator, FRAME_RATE);
//Count all the frames.
setInterval(increaseCount, FRAME_RATE);
//Level background
var background = null;
//Last score after boss defeat.
var savedScore = -9999;
//TODO Other constanv values.
var x_dimension = 10;
y_dimension = 33;
x_dimension = 20;
//Enter rendering cycle.
var renderTimer = null;
exchangeRenderLoop(renderFunction);
initAllInput();
//Changed window size.
window.addEventListener("resize", sizeChanged);
//Invalidate keyboard input when window focus is lost.
window.addEventListener("blur",focusLost);



//"STATIC" PROTOTYPES
//FUNCTIONS

//Auxillary functions for level transitions.



/**
 * 
 * @returns 
 */


//Game Screens



//Enemy functions, per enemy.
//TODO 

//All "invalidate" functions. Mostly required for bosses.

//All "Score" functions. Not always required.

//All "damage" functions. Not always required.




//All dimension matrix functions.

//All update routines.



