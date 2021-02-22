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
//Black background.
context.fillRect(0, 0, 800, 600);
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



//Boss 3 middle part.

function boss3_middle_constants() {}
//Default hp of middle part.
boss3_middle_constants.prototype.hpDefault = 60;
//Current hp of middle part.
boss3_middle_constants.prototype.hp = boss3_middle_constants.prototype.hpDefault;


//Boss 3 heater unit dead flag.

var boss3_oven_dead = false;

//Boss 3 arms.

function boss3_arm_values() {}
//Default hp of one arm.
boss3_arm_values.prototype.hpDefault = 30;
//HP for each arm. 
boss3_arm_values.prototype.hpValues = new Array(4);
for (var i = 0; i < boss3_arm_values.prototype.hpValues.length; i++) {
    boss3_arm_values.prototype.hpValues[i] = boss3_arm_values.prototype.hpDefault;
}


//FUNCTIONS

//Auxillary functions for level transitions.



/**
 * Adds an array of either linked or unlinked enemy objects to the spawn list.
 * @param enemy_array Array with enemies.
 * @param spawn_time Frame when all enemies should spawn.
 */
function spawnListArrayAdd(enemy_array, spawn_time, relative = false) {
    var sp = null;
    for (var i = 0; i < enemy_array.length; i++) {
        if (!relative) {
            sp = new Spawn(spawn_time, enemy_array[i], false);
        } else if (i === 0) {
            sp = new Spawn(spawn_time, enemy_array[i], true);
        } else {
            sp = new Spawn(0, enemy_array[i], false);
        }
        spawnList.addElement(sp);
}

}

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
//Call the function for boss 3 heating unit and add to additional flag.
function boss3_heating_invalidate() {
    boss_invalidate.call(this);
    if (this.invalid)
        boss3_oven_dead = true;
}




/**
 * Boss 3 middle part invalidation.
 * @returns {undefined}
 */
function boss3_middle_invalidate() {
    boss3_middle_constants.prototype.hp -= 7;
}

/**
 * Shooting the arms when they are not triggered will be bad for you. 
 * @returns {undefined}
 */
function boss3_arm_not_active_invalidate() {
    player.health--;
}

/**
 * 
 * @returns {undefined}
 */
function boss3_arm_active_invalidate() {
    boss3_arm_values.prototype.hpValues[this.partId] -= 7;
}

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

//"Boss 3 hatch" dimension function.
var boss3_hatch_dimension = meteor_dimension;
//"Boss 3 heating unit" dimension function.
var boss3_heating_dimension = meteor_dimension;
//"Boss 3 middle part" dimension function.
var boss3_middle_dimension = meteor_dimension;
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


//Boss 3 middle.
function boss3_middle_update() {
    if (boss3_middle_constants.prototype.hp <= 0 && this.getOccupiedSpace !== func_noDim) {
        simplyPlaySound(sfx1);
        this.getOccupiedSpace = func_noDim;
        this.renderState = func_noOp;
    } else if (boss3_middle_constants.prototype.hp > 0 && this.getOccupiedSpace === func_noDim) {
        this.getOccupiedSpace = boss3_middle_dimension;
        this.renderState = boss3_hatch_render;
    }
    //Only the first block of the middle element should trigger this code.
    if (this.firstElement && boss3_middle_constants.prototype.hp > 0) {
        if (player.skill < 1) {
            player.checkpoint = 2;
        }
        //Use internal counter.
        this.frameCounter++;
        if (this.frameCounter > 30) {
            //Check for possibilities to place enemy objects and reset counter.
            lowLeftX = 2 + (5 * 6);
            lowLeftY = 52 - (5 * 4) - 1;
            lowRightX = 74 - (5 * 6);
            lowRightY = 52 - (5 * 4) - 1;
            upperLeftX = lowLeftX;
            upperLeftY = lowLeftY - 8;
            upperRightX = lowRightX;
            upperRightY = lowRightY - 8;
            //Case 1: All arms present.
            if (boss3_arm_values.prototype.hpValues[0] > 0 && boss3_arm_values.prototype.hpValues[1] > 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn meteor left.
                enem = new Meteor(lowLeftX, lowLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn meteor right.
                enem = new Meteor(lowRightX, lowRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case2A: Left lower arm missing.
            else if (boss3_arm_values.prototype.hpValues[0] <= 0 && boss3_arm_values.prototype.hpValues[1] > 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tracer right.
                enem = new BlinkyTracer(lowRightX, lowRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky left.
                enem = new Blinky(upperLeftX, upperLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky right.
                enem = new Blinky(upperRightX, upperRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case2B: Right lower arm missing.
            else if (boss3_arm_values.prototype.hpValues[0] > 0 && boss3_arm_values.prototype.hpValues[1] <= 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tracer left.
                enem = new BlinkyTracer(lowLeftX, lowLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky left.
                enem = new Blinky(upperLeftX, upperLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky right.
                enem = new Blinky(upperRightX, upperRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case3A: All low arms missing.
            else if (boss3_arm_values.prototype.hpValues[0] <= 0 && boss3_arm_values.prototype.hpValues[1] <= 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tr left.
                enem = new BlinkyTracer(upperLeftX, upperLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky tr right.
                enem = new BlinkyTracer(upperRightX, upperRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case3B: Left side missing.
            else if (boss3_arm_values.prototype.hpValues[0] <= 0 && boss3_arm_values.prototype.hpValues[1] > 0 && boss3_arm_values.prototype.hpValues[2] <= 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tr left.
                enem = new BlinkyTracer(lowRightX, lowRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky tr right.
                enem = new BlinkyTracer(upperRightX, upperRightY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case3C: Right side missing.
            else if (boss3_arm_values.prototype.hpValues[0] > 0 && boss3_arm_values.prototype.hpValues[1] <= 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] <= 0) {
                //Spawn blinky left.
                enem = new BlinkyTracer(upperLeftX, upperLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky right.
                enem = new BlinkyTracer(lowLeftX, lowLeftY);
                enem.score = 0;
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case 4A and 4B: Only one upper arm left.
            else if (boss3_arm_values.prototype.hpValues[2] > 0 || boss3_arm_values.prototype.hpValues[3] > 0) {
                var randomNumber = getRandomX() % 6;
                var upperX = boss3_arm_values.prototype.hpValues[2] > 0 ? upperLeftX : upperRightX;
                var upperY = boss3_arm_values.prototype.hpValues[2] > 0 ? upperLeftY : upperRightY;
                switch (randomNumber) {
                    case 0:
                        enem = new Blinky(upperX, upperY);
                        enem.score = 0;
                        displayList.addElement(enem, false);
                        enemyList.addElement(enem, false);
                        break;
                    case 1:
                        enem = new Meteor(upperX, upperY);
                        enem.score = 0;
                        displayList.addElement(enem, false);
                        enemyList.addElement(enem, false);
                        break;
                    case 2:
                    case 3:
                        enem = new BlinkyTracer(upperX, upperY);
                        enem.score = 0;
                        displayList.addElement(enem, false);
                        enemyList.addElement(enem, false);
                        break;
                }
            }
            this.frameCounter = 0;
        }
    }
}


//Boss 3 hatch.
function boss3_hatch_update() {
//Check if this is executed in context of first hatch piece and if there is need
//for initializiation of the construction.
    if (!boss3_overall_alive())
        this.invalid = true;
//Init for all the remaining hatch objects.
    if (this.previous === null && this.next === null) {
        //Restoring HP values of everything.
        boss3_oven_dead = false;
        for (var i = 0; i < boss3_arm_values.prototype.hpValues.length; i++) {
            boss3_arm_values.prototype.hpValues[i] = boss3_arm_values.prototype.hpDefault;
        }
        var tempArray = [];
        //Peer elements in upper row.
        for (var i = 0; i < 6; i++) {
            tempArray.push(new Enemy(this.middleX + 3 + (i * 3), this.middleY, boss3_hatch_dimension, boss3_hatch_update, boss3_hatch_render, damage = 8, true, 0, func_noOp, 270));
        }
        //Peer elements in middle row.
        for (var i = 1; i < 6; i++) {
            tempArray.push(new Enemy(this.middleX + (i * 3), this.middleY + 3, boss3_hatch_dimension, boss3_hatch_update, boss3_hatch_render, damage = 8, true, 0, func_noOp, 270));
        }
        //Link all remaining pieces together.
        combineEnemyBricks(tempArray);
        //Connect this piece with the second.
        this.linkTogether(tempArray[0]);
        //Add all pieces to display and enemy list.
        for (var i = 0; i < tempArray.length; i++) {
            displayList.addElement(tempArray[i], false);
            enemyList.addElement(tempArray[i], false);
        }
        //Add the heating units.
        var enem = new Array(4);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(this.middleX + 3 + (i * 3), this.middleY + 6, boss3_heating_dimension, boss3_heating_update, boss3_heating_render, damage = 8, true, 12000, boss3_heating_invalidate, 270);
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        combineEnemyBricks(enem);
        //Prototyping one arm, lower left. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(2 + (i * 6), 52 - (i * 4) - 1, boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = 8, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 0;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        //Prototyping one arm, lower right. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(74 - (i * 6), 52 - (i * 4) - 1, boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = 8, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 1;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        //Prototyping one arm, upper left. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(2 + (i * 6), 2 + (i * 4), boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = 8, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 2;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        //Prototyping one arm, upper right. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(74 - (i * 6), 2 + (i * 4), boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = 8, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 3;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        enem = null;
        //Prototyping the thing in the middle. The H is awesome and will be used wisely!
        //Health generation.
        boss3_middle_constants.prototype.hp = boss3_middle_constants.prototype.hpDefault;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 2; j++) {
                enem = new Enemy(32 + (i * 3), 25 + (j * 3), boss3_middle_dimension, boss3_middle_update, boss3_hatch_render, damage = 8, true, 12000, boss3_middle_invalidate, 270);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Mark first element.
                if (i === 0 && j === 0) {
                    enem.firstElement = true;
                }
            }
        }
    }
}
//Boss 3 check if most parts are still alive.

function boss3_overall_alive() {
    return (boss3_arm_values.prototype.hpValues[0] > 0 ||
            boss3_arm_values.prototype.hpValues[1] > 0 ||
            boss3_arm_values.prototype.hpValues[2] > 0 ||
            boss3_arm_values.prototype.hpValues[3] > 0 ||
            boss3_middle_constants.prototype.hp > 0 ||
            !boss3_oven_dead);
}

//Boss 3 laser cannon update function.

function boss3_final_cannon_update() {
//Not do anything if arms and heater are not yet broken.
    if (boss3_overall_alive)
        return;
}

// Boss 3 arms update function.
function boss3_arm_update() {
//Check if arm is dead.
    if (boss3_arm_values.prototype.hpValues[this.partId] <= 0) {
        this.invalid = true;
        return;
    }

//Check if middle thing is away and needs no revival yet.
    if (boss3_middle_constants.prototype.hp <= 0 && this.frameCounter < 100) {
        this.invalidate = boss3_arm_active_invalidate;
        this.frameCounter++;
    }
// Check if middle thing is away and should be revived.
    else if (boss3_middle_constants.prototype.hp <= 0) {
        boss3_middle_constants.prototype.hp = boss3_middle_constants.prototype.hpDefault;
        this.frameCounter = 0;
        this.invalidate = boss3_arm_not_active_invalidate;
    }
//Otherwise reset the revival counter and make arm part invincible.
    else {
        this.frameCounter = 0;
        this.invalidate = boss3_arm_not_active_invalidate;
    }
}

//Counting variable belonging to boss 3 heating unit update function.
var deathCounter = 0;
//Boss 3 heating unit update function.
function boss3_heating_update() {
    this.frameCounter++;
    //Most of the rest should not be run by any brick except the first.
    if (this.previous !== null)
        return;
    //Only remove health every few seconds if HP is more than one.
    if (this.frameCounter > 40 && this.frameCounter % 140 === 0 && player.health !== 1) {
        player.health--;
        deathCounter = 0;
    }
    //Death counter if only one hp left.
    else if (this.frameCounter > 40 && player.health === 1) {
        deathCounter++;
        if (deathCounter > 2400)
            player.health--;
    }
    //Add red background.
    else if (this.frameCounter === 35) {
        background = new Heat();
    }
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
        this.next = star_factory();
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


//"Boss 3 arm" rendering function
function boss3_arm_render() {
    if (boss3_middle_constants.prototype.hp > 0) {
        boss3_hatch_render.call(this);
        return;
    }
    context.fillStyle = "yellow";
    simpleSquare_render.call(this);
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

//Boss 3 hatch rendering function.
function boss3_hatch_render() {
    context.fillStyle = "gray";
    simpleSquare_render.call(this);
}
// Boss 3 heater rendering function.
function boss3_heating_render() {
    if (this.frameCounter % 2 === 0) {
        context.fillStyle = "yellow";
    } else
        context.fillStyle = "red";
    simpleSquare_render.call(this);
}

//Factory Functions.



//Boss 3 - Heater Master 9000

function boss3_factory(middleX, middleY) {
    var enemy_array = [];
//The first tile of the boss.
    enemy_obj = new Enemy(middleX, middleY, boss3_hatch_dimension, boss3_hatch_update, boss3_hatch_render, damage = 8, true, 0, func_noOp, 270);
    giant_boss = enemy_obj;
    return enemy_obj;
}

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



//All other functions.





/**
 }
 * 
 * @param {type} enemy_array Enemies to link together.
 * @returns {undefined}
 */
function combineEnemyBricks(enemy_array) {
    for (var i = 0; i < enemy_array.length - 1; i++) {
        enemy_array[i].linkTogether(enemy_array[i + 1]);
    }
}

/**
 * For use by bosses in order to ease their complete destruction.
 * Do not call directly, but via invalidate_Badjacent.call(enemyObject)
 * @returns {undefined}
 */
function invalidate_Badjacent() {
    if (this.previous !== null && this.hp <= 0 && this.previous.hp > this.hp) {
        this.previous.hp = 0;
        this.previous.invalidate();
        background = null;
    }

    if (this.next !== null && this.hp <= 0 && this.next.hp > this.hp) {
        this.next.hp = 0;
        this.next.invalidate();
    }
}


