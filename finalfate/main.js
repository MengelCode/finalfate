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

//"Wingman" update function.
function wingman_update() {
    this.middleY = this.middleY + 1;
}

//"Background 1" update function.
function background1_update() {
    this.middleY = this.middleY + 0.1;
}

//"Slow movement" update function. To be called by everything that wants to move slowly!!!

function slowMove_update() {
    this.frameCounter++;
    // this.frameCounter = this.frameCounter % 2;
    if (this.frameCounter % 2 === 1) {
        this.middleY = this.middleY + 1;
    }
}

//"Aircraft 2 -  shooting cannon" update function

function aircraft2sc_update() {
    slowMove_update.call(this);
    if (this.frameCounter % 20 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, blinkyTracer_dimension, meteor2_update, meteor_render);
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }

}

//Aircraft 3- shooting cannon update function
function aircraft3sc_update() {
    slowMove_update.call(this);
    if (this.frameCounter % 20 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }

}

//"Meteor 2" update function.
function meteor2_update() {

    this.middleY = this.middleY + 1;
}

//All rendering routines.


//Level 1 - The Earth rendering function
function background1_render() {
    context.fillStyle = "#0000BB";
    context.fillRect(this.middleX, this.middleY - 350, 800, 280);
    context.fillStyle = "#0000DD";
    context.fillRect(this.middleX, this.middleY - 150, 800, 180);
    context.fillStyle = "#0000FF";
    context.fillRect(this.middleX, this.middleY, 800, 600);
}

//Level 2 - The Solar System rendering function
function background2_render() {
    if (this.next === null) {
        this.next = star_factory(this.middleX,this.middleY);
    }

    this.next.resetIterator();
    while (this.next.peekNext() !== null) {
        var star = this.next.getNext();
        star.renderRoutine();
    }
}



//"Wingman" rendering function
function wingman_render() {
    context.fillStyle = "white";
    var arrayS = this.getOccupiedSpace();
    for (var i = 0; i < arrayS[0].length; i++) {
        context.fillRect(arrayS[0][i] * 10, arrayS[1][i] * 10, 10, 10);
    }
}

//"Simple Square" rendering function. To be called by every 3x3 object!!!
function simpleSquare_render(usingMiddleX = this.middleX, usingMiddleY = this.middleY) {
    context.fillRect((usingMiddleX - 1) * 10, (usingMiddleY - 1) * 10, 10, 10);
    context.fillRect(usingMiddleX * 10, (usingMiddleY - 1) * 10, 10, 10);
    context.fillRect((usingMiddleX + 1) * 10, (usingMiddleY - 1) * 10, 10, 10);
    //Middle row.
    context.fillRect((usingMiddleX - 1) * 10, usingMiddleY * 10, 10, 10);
    context.fillRect(usingMiddleX * 10, usingMiddleY * 10, 10, 10);
    context.fillRect((usingMiddleX + 1) * 10, usingMiddleY * 10, 10, 10);
    //Upper row.
    context.fillRect((usingMiddleX - 1) * 10, (usingMiddleY + 1) * 10, 10, 10);
    context.fillRect(usingMiddleX * 10, (usingMiddleY + 1) * 10, 10, 10);
    context.fillRect((usingMiddleX + 1) * 10, (usingMiddleY + 1) * 10, 10, 10);
}

//Factory Functions.

//Air Craft 1
function airCraft1_factory(middleX, middleY) {
    var enemy_array = [];
    var enem_obj = new Enemy(middleX - 3, middleY + 2, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX - 2, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 2, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 3, middleY + 2, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    combineEnemyBricks(enemy_array);
    return enemy_array;
}

//Air Craft 2
function airCraft2_factory(middleX, middleY) {
    var enemy_array = [];
    var enem_obj = new Enemy(middleX - 3, middleY + 2, meteor_dimension, aircraft2sc_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX - 2, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 2, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 3, middleY + 2, meteor_dimension, aircraft2sc_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    combineEnemyBricks(enemy_array);
    return enemy_array;
}


//Air Craft 3
function airCraft3_factory(middleX, middleY) {
    var enemy_array = [];
    var enem_obj = new Enemy(middleX - 3, middleY + 2, meteor_dimension, aircraft3sc_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX - 2, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 2, middleY, meteor_dimension, meteor_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 3, middleY + 2, meteor_dimension, aircraft3sc_update, simpleEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    combineEnemyBricks(enemy_array);
    return enemy_array;
}



