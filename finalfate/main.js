/**
 * 
 * This is the entry point of the game.
 */

//Fit canvas and context to actual screen size.
sizeChanged();
//Function Pointer to what should happen in the next rendering cycle.
var renderFunction = null;
//Time to reset the frame counter to.
var renderReset = 0;
//For music/sound playback.
var bgm = document.getElementById("mainBGM");
//Shot sound effect.
var sfx0 = document.getElementById("sfx-channel-0");
//Hit SFX.
var sfx1 = document.getElementById("sfx-channel-1");
//Item SFX.
var sfx2 = document.getElementById("sfx-channel-2");
//Die.
var sfx3 = document.getElementById("sfx-channel-3");
//Menu select.
var sfx4 = document.getElementById("sfx-channel-4");
//Game over tune.
var game_over = document.getElementById("game-over");
//Exception occured.
var loadingException = null;
//Level Loaders.
var loaders = new Array(7);
loaders[0] = earthLoader;
loaders[1] = solarSystemLoader;
loaders[2] = universeLoader;
loaders[3] = blinkyHomeworldLoader;
//Black background.
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
var boss2_y_dimension_relative = 16;
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
//Boss 2 constants carrier.
function boss2_constants() {}
boss2_constants.prototype.abs_y_pos = 33;
boss2_constants.prototype.abs_x_pos = 20;
boss2_constants.prototype.x = 35;
boss2_constants.prototype.y = 19;
boss2_constants.prototype.dimension = null;
//CHEAT ZONE!!
boss2_constants.prototype.DebugSpawnInstantly = false;

//FUNCTIONS

//Auxillary functions for level transitions.



/**
 * 
 * @returns 
 */


//Game Screens

/* Boot sequence.
 * 
 * @returns {undefined}
 * 
 */
function boot() {
    exchangeRenderLoop(titleScreen);
}








/**
 Attract mode...
 */
function finalFate() {

}


//Enemy functions, per enemy.
//TODO 

//All "invalidate" functions. Mostly required for bosses.
function boss_invalidate() {
    if (this.hp > 0)
        this.hp = this.hp - 7;
    //Don't die if HP higher than 
    if (this.hp > 0) {
        //TODO Add graphical effect?
    } else {
        this.invalid = true;
    }
    invalidate_Badjacent.call(this);
}

//Copy the function for boss 1.
var boss1_invalidate = boss_invalidate;
//Copy the function for boss 2.
var boss2_invalidate = boss_invalidate;

//All "Score" functions. Not always required.

function default_score() {
    return 100;
}

//All "damage" functions. Not always required.




//All dimension matrix functions.



//"Background" dimension function.
function background_dimension() {
    return null;
}

//"Boss 2 " dimension function.
function boss2_dimension() {
    var x = [];
    var y = [];
    for (var i = 0; i < boss2_constants.prototype.abs_x_pos; i++) {

    }
    return new Array(x, y);
}

//"Boss 2" dimension function.
var boss2_dimension = meteor_dimension;
//All update routines.

//"Wingman" update function.
function wingman_update() {
    this.middleY = this.middleY + 1;
}

//"Background 1" update function.
function background1_update() {
    this.middleY = this.middleY + 0.1;
}



//Boss 1 not attackable part update function.
function boss1na_update() {
//Make sure the game remembers the player was here.
    if (player.skill < 1) {
        player.checkpoint = 0;
    }
//Init frame counter of needed.
    if (this.frameCounter === 0)
        this.frameCounter = 1;
    //Moving right...
    if (this.frameCounter > 0) {
        this.frameCounter++;
        //Do actual movement to the right.
        if (this.frameCounter % 1 === 0) {
            this.middleX++;
        }
//If count exceeded, invert the direction.
        if (this.frameCounter > 60)
            this.frameCounter = -1;
    }
//Moving left...
    else if (this.frameCounter < 0) {
        this.frameCounter--;
        //Do actual movement to the right.
        if (this.frameCounter % 1 === 0) {
            this.middleX--;
        }
//If count exceeded, invert the direction.
        if (this.frameCounter < -60)
            this.frameCounter = 1;
    }

}
//Boss 1 attackable and meteors spamming part.
function boss1sa_update() {
    boss1na_update.call(this);
    if (this.frameCounter % 26 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, meteor_dimension, meteor2_update, meteor_render, meteor_damage());
        enemy.score = 0;
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }
}

//Boss 1 attackable and meteors spamming part.
function boss1a_update() {
    boss1na_update.call(this);
    if (this.frameCounter % 40 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
        enemy.score = 0;
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }
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

//Boss 2 first brick function.
function boss2fb_update() {
//Create other bricks if they aren't yet created.
    var length = 10;
    var height = 5;
    if (this.next === null) {
        if (player.skill < 1) {
            player.checkpoint = 1;
        }
        var enemArray = [];
        enemArray.push(this);
        for (i = 0; i < length; i++) {
            for (j = 0; j < height; j++) {
                if (i === 0 && j === 0)
                    continue;
                var enem = new Enemy(this.middleX + (2 * i), this.middleY + (1 * j), boss2_dimension, boss2_update, simpleEnemy_render, damage = 8, true, 5000, boss2_invalidate, 270);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                enemArray.push(enem);
            }
        }
        combineEnemyBricks(enemArray);
    }
//Increase frame counter.
    this.frameCounter++;
    var enema = null;
    //Spawn right enemy if X modulo 15 == 0
    if (this.frameCounter % 15 === 0) {
        enemb = new Enemy(this.middleX + 3 + 2 * length - 1, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
        enema = new Enemy(this.middleX + 2 * length - 1, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
    }
//Spawn middle if if X modulo 15 != 0 && X modulo 10 == 0
    else if (this.frameCounter % 10 === 0) {
        enemb = new Enemy(this.middleX + 3 + 2 * length / 2, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
        enema = new Enemy(this.middleX + 2 * length / 2, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
    }
//Spawn middle if if X modulo 15 != 0 && X modulo 10 != 0 && X mod 5 == 90
    else if (this.frameCounter % 5 === 0) {
        enemb = new Enemy(this.middleX - 3, this.middleY, blinky_dimension, blinkyTracer_update, blinky_render, damage = 8, true);
        enema = new Enemy(this.middleX, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
    }
//If enem was created, add it.
    if (enema !== null) {
        enema.score = 0;
        enemb.score = 0;
        displayList.addElement(enema, false);
        enemyList.addElement(enema, false);
        displayList.addElement(enemb, false);
        enemyList.addElement(enemb, false);
    }
//Forcing player back in when he leaves to the left.
    if (player.middleX < this.middleX) {
        player.health = player.health - 12;
        player.middleX = player.middleX + 4;
    }
//Uncomment this if you want pinball action.....
//else if(player.middleX>this.middleX+10){
    else if (player.middleX > this.middleX + 18) {
        player.health = player.health - 12;
        player.middleX = player.middleX - 4;
    }
}


//Boss 2 update function.
function boss2_update() {

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


//"Boss 2" rendering function.#
function boss2_render() {
    simpleEnemy_render.call(this);
    //Issue 66: Rendering the walls.
    if(this.previous === null){
    context.fillRect(0,250,330,350);
    context.fillRect(560,250,240,350);
    }
}

//Factory Functions.

//Boss 2 - Mega Aircraft 2
function boss2_factory(middleX, middleY) {
    var enemy_obj = null;
    //middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null
    //Not touchable. Middle point of over
    enemy_obj = new Enemy(middleX, middleY, boss2_dimension, boss2fb_update, boss2_render, damage = 8, true, 0, boss2_invalidate, 270);
    giant_boss = enemy_obj;
    return enemy_obj;
}


//Boss 1 - Mega Aircraft 1
function boss1_factory(middleX, middleY) {
//middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null
    var enemy_array = [];
    var enemy_obj = null;
    middleX = middleX - 2;
    middleY = middleY - 2;
    //Not touchable part.
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 9; j++) {
            enemy_obj = new Enemy(middleX + i, middleY + j, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, false, 5000, boss1_invalidate);
            giant_boss = enemy_obj;
            enemy_array.push(enemy_obj);
        }
    }
//Left stone-spawner part
    for (var i = 0; i < 3; i++) {
        if (i === 1) {
            enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1sa_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
        } else
            enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
        enemy_array.push(enemy_obj);
    }
//Middle stone-spawner part
    for (var i = 3; i < 11; i++) {
        if (i === 6 || i === 7) {
            enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1a_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
        } else
            enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
        enemy_array.push(enemy_obj);
    }

//Right stone-spawner part
    for (var i = 11; i < 14; i++) {
        if (i === 12) {
            enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1sa_update, simpleEnemy_render, 170, false, 5000);
        } else
            enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, false, 5000);
        enemy_array.push(enemy_obj);
    }

//Linking it all together.
    combineEnemyBricks(enemy_array);
    return enemy_array;
}
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



