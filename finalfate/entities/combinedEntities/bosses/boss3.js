/* 
 * boss3.js
 * Important file for the third level boss, "Heater Master 9000".
 */

//"Boss 3 hatch" dimension function.
var boss3_hatch_dimension = meteor_dimension;
//"Boss 3 heating unit" dimension function.
var boss3_heating_dimension = meteor_dimension;
//"Boss 3 middle part" dimension function.
var boss3_middle_dimension = meteor_dimension;
//"Laser Ray" global variable.
var laser_ray = null;



function boss3_factory(middleX, middleY) {
    var enemy_array = [];
    //The first tile of the boss.
    enemy_obj = new Enemy(middleX, middleY, boss3_hatch_dimension, boss3_hatch_update, boss3_hatch_render, damage = boss3_hatch_damage, true, 0, func_noOp, 270);
    giant_boss = enemy_obj;
    return enemy_obj;
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

//"Boss 3 arm" rendering function
function boss3_arm_render() {
    if (boss3_middle_constants.prototype.hp > 0) {
        boss3_hatch_render.call(this);
        return;
    }
    context.fillStyle = "yellow";
    simpleSquare_render.call(this);
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

var boss3_hatch_damage = 2000;


//Boss 3 hatch.
function boss3_hatch_update() {
    //Check if this is executed in context of first hatch piece and if there is need
    //for initializiation of the construction.
    if (!boss3_overall_alive())
        this.invalid = true;
    //Init for all the remaining hatch objects.
    if (this.previous === null && this.next === null) {
        //Begin of code: Additional code for #136.
        //Reset their position so that they are definitely not stuck.
        player.middleX = 38;
        player.middleY = 52;
        //TODO in future: Delete all bullets flying around.
        // 1 - Reset bullet list iterator.
        //bulletList.resetIterator();
        //End of #136 code.
        //Restoring HP values of everything.
        boss3_oven_dead = false;
        for (var i = 0; i < boss3_arm_values.prototype.hpValues.length; i++) {
            boss3_arm_values.prototype.hpValues[i] = boss3_arm_values.prototype.hpDefault;
        }
        var tempArray = [];
        //Peer elements in upper row.
        for (var i = 0; i < 6; i++) {
            tempArray.push(new Enemy(this.middleX + 3 + (i * 3), this.middleY, boss3_hatch_dimension, boss3_hatch_update, boss3_hatch_render, damage = boss3_hatch_damage, true, 0, func_noOp, 270));
        }
        //Peer elements in middle row.
        for (var i = 1; i < 6; i++) {
            tempArray.push(new Enemy(this.middleX + (i * 3), this.middleY + 3, boss3_hatch_dimension, boss3_hatch_update, boss3_hatch_render, damage = boss3_hatch_damage, true, 0, func_noOp, 270));
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
            enem[i] = new Enemy(this.middleX + 3 + (i * 3), this.middleY + 6, boss3_heating_dimension, boss3_heating_update, boss3_heating_render, damage = boss3_hatch_damage, true, 12000, boss3_heating_invalidate, 270);
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        combineEnemyBricks(enem);
        //Prototyping one arm, lower left. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(2 + (i * 6), 52 - (i * 4) - 1, boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = boss3_hatch_damage, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 0;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        //Prototyping one arm, lower right. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(74 - (i * 6), 52 - (i * 4) - 1, boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = boss3_hatch_damage, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 1;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        //Prototyping one arm, upper left. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(2 + (i * 6), 2 + (i * 4), boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = boss3_hatch_damage, true, 12000, boss3_arm_not_active_invalidate, 270);
            enem[i].partId = 2;
            displayList.addElement(enem[i], false);
            enemyList.addElement(enem[i], false);
        }
        //Prototyping one arm, upper right. (Take the word "prototype" not too literally!)
        enem = new Array(6);
        for (var i = 0; i < enem.length; i++) {
            enem[i] = new Enemy(74 - (i * 6), 2 + (i * 4), boss3_hatch_dimension, boss3_arm_update, boss3_arm_render, damage = boss3_hatch_damage, true, 12000, boss3_arm_not_active_invalidate, 270);
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
                enem = new Enemy(32 + (i * 3), 25 + (j * 3), boss3_middle_dimension, boss3_middle_update, boss3_hatch_render, damage = boss3_hatch_damage, true, 12000, boss3_middle_invalidate, 270);
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
    simplyPlaySound(sfx5);
    displayList.addElement(new Boom(),false);
    player.health--;
}

/**
 * 
 * @returns {undefined}
 */
function boss3_arm_active_invalidate() {
    boss3_arm_values.prototype.hpValues[this.partId] -= 7;
}

//Boss 3 middle part.

function boss3_middle_constants() { }
//Default hp of middle part.
boss3_middle_constants.prototype.hpDefault = 60;
//Current hp of middle part.
boss3_middle_constants.prototype.hp = boss3_middle_constants.prototype.hpDefault;


//Boss 3 heater unit dead flag.

var boss3_oven_dead = false;

//Boss 3 arms.

function boss3_arm_values() { }
//Default hp of one arm.
boss3_arm_values.prototype.hpDefault = 30;
//HP for each arm. 
boss3_arm_values.prototype.hpValues = new Array(4);
for (var i = 0; i < boss3_arm_values.prototype.hpValues.length; i++) {
    boss3_arm_values.prototype.hpValues[i] = boss3_arm_values.prototype.hpDefault;
}
