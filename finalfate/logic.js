/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//CLASSES


class GameObject {
    /**
     * This is the root class in the small class hierarchy of the game.
     * 
     */
    constructor() {
        this.frameCounter = 0;
        /**
         * Is this object still required? Set this value to true (via the invalidate function) to mark it for
         * deletion before the next frame.
         */
        this.invalid = false;
        /**Returns an array of 2 arrays.
         //X positions occupied = array 0.
         Y positions occupied = array 1.
         **/
    }

}

/**
 * Update routine for an object. Every game object should have one.
 */
GameObject.prototype.updateState = func_noOp;

/**
 * Rendering routine for an object. Required to make a game object visible.
 */
GameObject.prototype.renderState = func_noOp;


/**
 * 
 * Mark the object as no longer required.
 * 
 */
GameObject.prototype.invalidate = function () {
    this.invalid = true;
};


/**
 * Get the collision matrix of a specific object. Empty unless it is overriden.
 * @returns {Array}
 */
GameObject.prototype.getOccupiedSpace = function () {
    return new Array({}, {});
};



/**
 * 
 * @param {GameObject} otherObj
 * @returns {boolean} If this object collides with the given object.
 */
GameObject.prototype.collides = function (otherObj) {
    var ownSpace = this.getOccupiedSpace();
    var otherSpace = otherObj.getOccupiedSpace();
    for (var i = 0; i < ownSpace[0].length; i++) {
        for (var j = 0; j < otherSpace.length; j++) {
            if (ownSpace[0][i] === otherSpace[0][j] && ownSpace[1][i] === otherSpace[1][j]) {
                return true;
            }
        }
    }
    return false;
};


class HealthBoost extends GameObject {
    /**
     * Health boost item.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {HealthBoost}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = healthBoost_dimension;
        super.updateState = healthBoost_update;
        super.renderState = healthBoost_render;
    }
}

class FireBoost extends GameObject {
    /**
     * Fire boost item.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {FireBoost}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = fireBoost_dimension;
        super.updateState = fireBoost_update;
        super.renderState = fireBoost_render;
    }
}

class LifeBoost extends GameObject {
    /**
     * Life boost item.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {FireBoost}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = lifeBoost_dimension;
        super.updateState = lifeBoost_update;
        super.renderState = lifeBoost_render;
    }
}

class LinkedList {
    /**
     * This is a linked list which can contain all kind of stuff you desire
     * @param {unknown} value What is the first element in this list? Optional
     * @returns {LinkedList}
     */
    constructor(value = null) {
        //The value of a specific node is saved there. The first node will always be a dummy node.    
        this.value = "HEAD";
        //Next element in list.
        this.next = null;
        //Cursor of which node is the next element to return with giveNext function. Changing the list will reset it.
        this.iterateState = null;
        if (value !== null) {
            this.next = new LinkedList();
            this.next.value = value;
            this.iterateState = this.next;

        }
        //Return the next element in this list. Returns null if there is no next element.
        this.getNext = function () {
            if (this.iterateState === null) {
                return null;
            }
            var returnWhat = this.iterateState.value;
            this.iterateState = this.iterateState.next;
            return returnWhat;
        };
        //Return the next element in this list, but without forwarding the iteration. Returns null if there is no next element.
        this.peekNext = function () {
            if (this.iterateState === null) {
                return null;
            }
            return this.iterateState.value;
        };
        //Reset the iterator.
        this.resetIterator = function () {

            this.iterateState = this.next;
        };
        //Adds an element to the list at its end. The reset value is optional and should be set
        //to false when the iterator being reset causes problems.
        this.addElement = function (value, reset = true) {
            if (this.next !== null) {
                this.next.addElement(value);
            } else {
                this.next = new LinkedList();
                this.next.value = value;
            }
            if (reset === true) {
                this.iterateState = this.next;
        }
        };
        //Add an element at the front of the list.
        this.addElementFront = function (value) {
            var nextesNext = this.next;
            this.next = new LinkedList();
            this.next.next = nextesNext;
            this.next.value = value;
            this.iterateState = this.next;


        };
        //Deletes the entire list.
        this.deleteAll = function () {
            this.next = null;
            this.iterateState = null;
        };
        /**
         Delete the first entry of something based on type-strong comparisons of values.
         Does nothing if an entry did not even exist in the first place.
         Returns a boolean indicating if a deletion took place.
         */
        this.deleteElement = function (value) {
            this.iterateState = this;
            while (this.iterateState.next !== null) {
                if (this.iterateState.next.value === value) {
                    this.iterateState.next = this.iterateState.next.next;
                    this.iterateState = this.next;
                    return true;
                }
                this.iterateState = this.iterateState.next;
            }
            this.iterateState = this.next;
            return false;
        };
    }

}
class Enemy extends GameObject {
    /**
     * Creates an enemy object.
     * @param {integer} middleX
     * @param {integer} middleY
     * @param {function} dimensionMatrix
     * @param {function} updateRoutine
     * @param {function} renderRoutine
     * @param {boolean} killable
     * @param {integer} damage
     * @param {integer} hp
     * @returns {Enemy}
     */
    constructor(middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null, hp = 100) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = dimensionMatrix;
        super.updateState = updateRoutine;
        super.renderState = renderRoutine;
        this.killable = killable;
        this.damage = damage;
        this.score = score;
        //HP value. Can be respected by invalidate() function, but it needs not.
        this.hp = hp;
        //Previous enemy object in a chain.
        this.previous = null;
        //Next enemy object in a chain.
        this.next = null;
        this.linkTogether = function (nextEnemy) {
            this.next = nextEnemy;
            nextEnemy.previous = this;
        };
        if (invalidFunc !== null) {
            super.invalidate = invalidFunc;
        } else {
            super.invalidate = function () {
                this.invalid = true;
                if (this.previous !== null && !this.previous.invalid)
                    this.previous.invalidate();
                if (this.next !== null && !this.next.invalid)
                    this.next.invalidate();
            };
    }
    }
}

class Meteor extends Enemy {
    /**
     * Create a meteor object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Meteor}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    }

}

class SimpleEnemy extends Enemy {

    /**
     * Create a simple enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Meteor}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, simpleEnemy_dimension, simpleEnemy_update, simpleEnemy_render);
    }
}


class Blinky extends Enemy {
    /**
     * Create a blinky enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Blinky}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, blinky_dimension, blinky_update, blinky_render, blinky_damage());
    }
}


class BlinkyTracer extends Enemy {
    /**
     * Create a blinky enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Blinky}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    }
}

class Bullet extends GameObject {

    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = bullet_dimension;
        super.updateSpecial = bullet_update;
        super.updateState = function () {};
        super.renderState = bullet_render;
    }
}
class Spawn {
    /**
     * A data structure containing a game object.
     * @param {type} frameDelta After how many frames should it spawn?
     * @param {type} gameObject The game object in question.
     * @param {}     isRelative Is the frame delta relative to the last spawn
     * @param {type} isForDisplay Add game object to display list?
     * @param {type} isEnemy Add game object to enemy list?
     * @param {type} isBullet Add game object to bullet list?
     * @returns {Spawn}
     */
    constructor(frameDelta, gameObject, isRelative = false, isForDisplay = true, isEnemy = true, isBullet = false) {
        this.frameDelta = frameDelta;
        this.gameObject = gameObject;
        this.isRelative = isRelative;
        this.isForDisplay = isForDisplay;
        this.isEnemy = isEnemy;
        this.isBullet = isBullet;

    }

}

//Instances of GameObject.
class SpaceShip extends GameObject {
    /**
     * Creates our space ship.
     * @param {integer} middleX
     * @param {integer} middleY
     * @returns {SpaceShip}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = function () {
            var x = [this.middleX, this.middleX, this.middleX, this.middleX - 1, this.middleX - 2, this.middleX + 1, this.middleX + 2, this.middleX - 2, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1];
            var y = [this.middleY, this.middleY - 1, this.middleY - 2, this.middleY, this.middleY, this.middleY, this.middleY, this.middleY - 1, this.middleY - 1, this.middleY + 1, this.middleY + 1, this.middleY + 1];
            for (var i = 0; i < y.length; i++) {
                y[i] -= 5;
            }
            var x_org_length = x.length;

            for (var i = 0; i < x_org_length; i++) {
                x.push(x[i] - 1);
                y.push(y[i]);
            }
            if (left) {
                for (var i = 0; i < x.length; i++) {
                    x[i] -= 2;
                }
            }
            if (right) {
                for (var i = 0; i < x.length; i++) {
                    x[i] += 2;
                }
            }

            return new Array(x, y);
        };
        //Keyboard thingie released?
        this.keyReleased = true;
        //Quad-fire upgrade collected?
        this.quadfire = false;
        //Auto-fire upgrade collected?
        this.massfire = false;
        //Auto-fire cooldown.
        this.cooldown = 0;
        super.updateState = function () {
            //If memorized button here, then poll that from controller.
            //Disabled for now.
            if (false) {
                pollAxisX();
                pollAxisY();
                pollDatButton();
            }
            if (this.score >= this.score_newlife) {
                sfx2.pause();
                sfx2.currentTime = 0;
                sfx2.play();
                this.lifes++;
                this.score_newlife = this.score_newlife + 30000;
            }

            if (left && this.middleX > 2) {
                //left = 0;
                this.middleX = this.middleX - 1;
            }
            if (right && this.middleX < 77) {
                //right = 0;
                this.middleX = this.middleX + 1;
            }
            if (up && this.middleY > 28) {
                this.middleY = this.middleY - 1;
            }
            if (down && this.middleY < 53) {
                this.middleY = this.middleY + 1;
            }
            if (!shoot) {
                this.keyReleased = true;
            }
            if ((shoot && this.keyReleased && this.massfire === false) || (shoot && this.massfire === true && this.cooldown === 0)) {
                this.keyReleased = false;
                if (this.massfire === true)
                    this.cooldown = 5;
                sfx0.pause();
                sfx0.currentTime = 0;
                sfx0.play();
                var bullet = new Bullet(this.middleX - 2, this.middleY);
                displayList.addElement(bullet, false);
                bulletList.addElement(bullet, false);
                bullet = new Bullet(this.middleX + 2, this.middleY);
                displayList.addElement(bullet, false);
                bulletList.addElement(bullet, false);
                if (this.quadfire) {
                    bullet = new Bullet(this.middleX - 1, this.middleY);
                    displayList.addElement(bullet, false);
                    bulletList.addElement(bullet, false);
                    bullet = new Bullet(this.middleX + 1, this.middleY);
                    displayList.addElement(bullet, false);
                    bulletList.addElement(bullet, false);
                }


            }

            //gamepad_mem.buttons[button_mem_index]
            if (!pause) {
                pauseReleased = true;
            }
            if (pause && pauseReleased) {
                bgm.pause();
                pauseReleased = false;
                selectedOption = 0;
                exchangeRenderLoop(gamePause, true);
            }

            if (this.cooldown > 0)
                this.cooldown--;
        };
        super.renderState = function () {
            context.fillStyle = "lightgray";
            context.fillRect((this.middleX - 2) * 10, this.middleY * 10, 50, 10);
            context.fillStyle = "yellow";
            context.fillRect(this.middleX * 10, (this.middleY - 2) * 10, 10, 20);
            context.fillStyle = "orange";
            context.fillRect((this.middleX - 2) * 10, (this.middleY - 1) * 10, 10, 10);
            context.fillRect((this.middleX + 2) * 10, (this.middleY - 1) * 10, 10, 10);
            if (this.quadfire) {
                context.fillRect((this.middleX - 1) * 10, (this.middleY - 1) * 10, 10, 10);
                context.fillRect((this.middleX + 1) * 10, (this.middleY - 1) * 10, 10, 10);
            }
        };
        /**
         * CHEAT ZONE. Default: 100
         * Health Points of the player. If this value goes down to 0(or theoretically less, it costs you a life.
         */
        this.health = 100;
        /**
         * Lives of the player. If this value is zero and you die, it is over with you.
         */
        this.lifes = 3;
        /**
         * Score of the player.
         */
        this.score = 0;
        /**
         * Score required to get a new life.
         */
        this.score_newlife = 20000;

        /**
         * Level the player is in.
         * 
         */
        this.level = 0;
    }
}

//Decoration element.
class Decoration {
    /**
     * Creates a decoration object without look and function, located at the given coordinates.
     * @param {Integer} middleX
     * @param {Integer} middleY
     * @param {function()} renderRoutine
     * @param {function()} updateRoutine
     * @returns {Decoration}
     */
    constructor(middleX, middleY, renderRoutine = function() {}, updateRoutine = function() {}){
        this.middleX = middleX;
        this.middleY = middleY;
        this.renderRoutine = renderRoutine;
        this.updateRoutine = updateRoutine;
    }

}

class Star extends Decoration {
    /**
     * Creates a Star decoration object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Star}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, star_render);

    }

}

class Heat extends Decoration {
    /**
     * Creates a Heat decoration object.
     * @returns {Heat}
     */
    constructor() {
        super(0, 0, heat_render, func_noOp);

    }

}

//TODO INIT
//try{
//CHEAT ZONE - default 30.
const FRAME_RATE = 30;
//"booleans" if certain keys are pressed.
var shoot = 0;
var up = 0;
var down = 0;
var left = 0;
var right = 0;
var pause = 0;
//"Boolean" for specific input source.
//"Keyboard" boolean.
var keyboard = false;
//"Gamepad" boolean.
var gamepad = false;
//Gamepad index. ( false = no button assigned)
var gamepad_button = false;
//Gamepad event handle.
var gamepad_handle = null;
//HTML Canvas
var canvas = document.getElementById("myScreen");
const oldestWidth = 800;
const oldestHeight = 600;
var oldWidth = oldestWidth;
var oldHeight = oldestHeight;
var newWidth = null;
var newHeight = null;
//Context
var context = canvas.getContext("2d");
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
//Level background rendering functions.
//var backgroundRenderers = new Array(6);
//Animation counter. Absolute
var aniCount = 0;
//Animation counter. Relative
var aniCountRelative = 0;
//Animation counter for pause.
var pauseCount = 0;
//Black background.
context.fillRect(0, 0, 800, 600);
//Render function assigning.
renderFunction = boot;
//Make keys unpressed over time.
//setInterval(keyInvalidator, FRAME_RATE);
//Count all the frames.
setInterval(increaseCount, FRAME_RATE);
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
 * Resets all knowledge about used devices
 * and makes sure every input device is checked.
 * @returns {undefined}
 */
function initAllInput() {
    if (!keyboard) {
        //Keyboard input catching.
        window.addEventListener("keydown", getKeyPress);
        window.addEventListener("keyup", getKeyRelease);
    }
    if (gamepad_handle !== null) {
        //Terminate polling of specific (?) gamepad.
        clearInterval(gamepad_handle);
    }//Gamepad input catching.
    gamepad_handle = setInterval(gamepadAskAnyButton, FRAME_RATE);
    //Reset used state.
    keyboard = false;
    gamepad = false;
}
/**
 * 
 * Define the beginning state of the game, then start with the first level.
 */
function initGame(savedLevel = undefined) {
    player = new SpaceShip(38, 52);
    //CHEAT ZONE!!!
    player.level = savedLevel === undefined ? 0 : savedLevel ;
    savedScore = 0;
    // renderReset = 9000;
    //CHEAT ZONE end.
    loadLevel();

}
/**
 * 
 * Load a level. General Method.
 */
function loadLevel() {
    if (player.health < 100) {
        player.health = 100;
    }
    musicAlreadyPlayed = false;
    savedScore = player.score;
    player.middleX = 38;
    player.middleY = 52;
    giant_boss = null;
    displayList = new LinkedList();
    bulletList = new LinkedList();
    enemyList = new LinkedList();
    spawnList = new LinkedList();
    displayList.addElement(player);

    try {
        //throw new Error("Test");
        if (loaders[player.level] === undefined) {
            window.alert("D.J. Mengel is evil.");
            //Make everything stop.
            exchangeRenderLoop(null);
        } else {
            background = null;
            loaders[player.level]();
            if (loadingException === null) {
                exchangeRenderLoop(gamePlay);
            } else
                throw loadingException;
        }
    } catch (error) {
        window.alert("EXCEPTION OCCURED! Failed to begin level transition. \n" + "Exception name:" + error.name + "\n" + "Exception message:" + error.message + "\n" + "Stack Trace:" + error.stack);
        exchangeRenderLoop(null);
    }
}
/**
 * 
 * Level 3 - The Universe
 */
function universeLoader() {
    try {
        var enem = null;
        //4000 frames for part A
        enem = new FireBoost(20, 3);
        enem = new Spawn(0, enem, true, true, false, false);
        spawnList.addElement(enem);
        //3980 frames left.
        for (var i = 0; i < 308; i++) {
            var rando = getRandomX() % 16;
            switch (rando) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    enem = airCraft2_factory(getRandomX(), -6);
                    spawnListArrayAdd(enem, 10, true);
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    enem = new Meteor(getRandomX(), 0);
                    enem = new Spawn(10, enem, true);
                    spawnList.addElement(enem);
                    break;
                case 10:
                case 11:
                case 12:
                case 13:
                    enem = new Blinky(getRandomX(), 0);
                    enem = new Spawn(10, enem, true);
                    spawnList.addElement(enem);
                    break;
                case 14:
                case 15:
                    enem = airCraft3_factory(getRandomX(), -6);
                    spawnListArrayAdd(enem, 10, true);
                    break;
            }
            if (i % 100 === 0) {
                enem = new HealthBoost(getRandomX(), 0);
                enem = new Spawn(0, enem, true, true, false, false);
                spawnList.addElement(enem);
            } else if (i % 180 === 0) {
                enem = new LifeBoost(getRandomX(), 0);
                enem = new Spawn(0, enem, true, true, false, false);
                spawnList.addElement(enem);
            }
        }
        spawnList.addElement(new Spawn(80, boss3_factory(30, 0), true));
    } catch (error) {
        loadingException = error;
    }
}

/**
 * 
 * Level 2 - The Solar System
 */
function solarSystemLoader() {
    try {
        background = new Enemy(0, 0, background_dimension, background1_update, background2_render);
        var enem = null;

        if (boss2_constants.prototype.DebugSpawnInstantly) {
            enem = boss2_factory(boss2_constants.prototype.x, boss2_constants.prototype.y);
            enem = new Spawn(15, enem);
            spawnList.addElement(enem);
            return;
        }

        for (var i = 0; i < 58; i++) {
            var rand = getRandomX();
            enem = new Meteor(rand, 0);
            //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
            enem = new Spawn(150 + i * 20, enem);
            spawnList.addElement(enem);
            switch (i) {
                //Series 1, blinkyTracer with bias to the left.
                case 4:
                case 11:
                case 16:
                case 23:
                case 30:
                case 45:
                case 50:
                case 52:
                case 54:
                case 56:
                    enem = new BlinkyTracer(rand - 2, 0);
                    enem = new Spawn(150 + i * 20, enem);
                    spawnList.addElement(enem);
                    break;
                    //Series 2, blinkyTracer with bias to the right. 
                case 8:
                case 14:
                case 28:
                case 36:
                case 44:
                case 51:
                case 53:
                case 55:
                case 57:
                    enem = new BlinkyTracer(rand + 3, 0);
                    enem = new Spawn(150 + i * 20, enem);
                    spawnList.addElement(enem);
                    break;
                    //Spawn 1, health boost.
                case 10:
                    enem = new HealthBoost(30, 0);
                    enem = new Spawn(20, enem, true, true, false, false);
                    spawnList.addElement(enem);
                    break;
                    //Spawn 2, fire boost.
                case 24:
                    enem = new FireBoost(22, 0);
                    enem = new Spawn(20, enem, true, true, false, false);
                    spawnList.addElement(enem);
                    break;
            }
        }
        //Frame: 1290
        enem = airCraft2_factory(65, -6);
        spawnListArrayAdd(enem, 1300);
        enem = airCraft2_factory(50, -6);
        spawnListArrayAdd(enem, 1300);
        enem = airCraft2_factory(10, -6);
        spawnListArrayAdd(enem, 1300);
        //
        enem = airCraft2_factory(30, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(75, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(10, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(44, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(0, -6);
        spawnListArrayAdd(enem, 1350);
        //Blinky mania!!!
        for (var i = 0; i < 40; i++) {
            enem = new BlinkyTracer(getRandomX(), 0);
            //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
            enem = new Spawn(1400 + i * 20, enem);
            spawnList.addElement(enem);
            if (i % 5 === 0) {
                var rando = getRandomX() % 2 === 0;
                if (rando) {
                    enem = new BlinkyTracer(78, 28);
                } else
                    enem = new BlinkyTracer(-1, 28);
                enem = new Spawn(1400 + i * 20, enem);
                spawnList.addElement(enem);
            }
        }
        //Frame: 2180.
        //A bit more randomness.
        for (var i = 0; i < 120; i++) {
            //window.alert(2217 + 119 * 15);
            // modulo division by 7 will decide the object to spawn.
            // 0 = Blinky Tracer, 1-2 = Meteor, 3-5 = AirCraft 2, 6 = Blinky
            var randon = getRandomX() % 7;
            var enem = null;
            if (i === 20 || i === 77) {
                enem = new HealthBoost(player.middleX, 0);
                enem = new Spawn(2217 + i * 15, enem, false, true, false, false);
                spawnList.addElement(enem);
            }
            //Object generation.
            switch (randon) {
                case 0:
                    enem = new BlinkyTracer(getRandomX(), 0);
                    break;
                case 1:
                case 2:
                    enem = new Meteor(getRandomX(), 0);
                    break;
                case 3:
                case 4:
                case 5:
                    enem = airCraft2_factory(getRandomX(), -5);
                    spawnListArrayAdd(enem, 2217 + i * 15);
                    break;
                case 6:
                    enem = new Blinky(getRandomX(), 0);
                    break;

            }
            if (randon !== 3 && randon !== 4 && randon !== 5) {
                enem = new Spawn(2217 + i * 15, enem);
                spawnList.addElement(enem);
            }
        }
        //Frame: 4002
        //Blinky mania!!!
        for (var i = 0; i < 70; i++) {

            enem = new BlinkyTracer(getRandomX(), 0);
            //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
            enem = new Spawn(4030 + i * 20, enem);
            spawnList.addElement(enem);
            if (i % 5 === 0) {
                var rando = getRandomX() % 2 === 0;
                if (rando) {
                    enem = new BlinkyTracer(78, 11);
                } else
                    enem = new BlinkyTracer(-1, 11);
                enem = new Spawn(4030 + i * 20, enem);
                spawnList.addElement(enem);
            }
        }
        //Frame: 5410
        enem = boss2_factory(boss2_constants.prototype.x, boss2_constants.prototype.y);
        enem = new Spawn(5450, enem);
        spawnList.addElement(enem);
    } catch (error) {
        loadingException = error;
    }
}

/**
 * 
 * Level 1 - The Sky
 * Length: 2770 frames.
 */
function earthLoader() {
    try {
        background = new Enemy(0, 0, background_dimension, background1_update, background1_render);
        var enem = null;
//Slow beginning...
        //enem = new Enemy(26, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Meteor(26, 0);
        enem = new Spawn(150, enem);
        spawnList.addElement(enem);
        enem = new Meteor(36, 0);
        enem = new Spawn(240, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(72, 0);
        spawnListArrayAdd(enem, 260);
        enem = new SimpleEnemy(9, 0);
        enem = new Spawn(290, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(69, 0);
        enem = new Spawn(310, enem);
        spawnList.addElement(enem);
        //Gets a bit more...hurried.
        enem = airCraft1_factory(44, 0);
        spawnListArrayAdd(enem, 328);
        enem = new Meteor(11, 0);
        enem = new Spawn(370, enem);
        spawnList.addElement(enem);
        enem = new Meteor(40, 0);
        enem = new Spawn(380, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(20, 0);
        spawnListArrayAdd(enem, 400);
        enem = new Meteor(23, 0);
        enem = new Spawn(410, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(55, 0);
        enem = new Spawn(440, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(33, 0);
        enem = new Spawn(460, enem);
        spawnList.addElement(enem);
        enem = new Meteor(40, 0);
        enem = new Spawn(480, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(22, 0);
        spawnListArrayAdd(enem, 500);
        enem = new Meteor(20, 0);
        enem = new Spawn(530, enem);
        spawnList.addElement(enem);
        //Everything rains at you....
        enem = new SimpleEnemy(30, 0);
        enem = new Spawn(540, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(13, 0);
        enem = new Spawn(570, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(79, 0);
        enem = new Spawn(600, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(55, 0);
        enem = new Spawn(630, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(33, 0);
        enem = new Spawn(640, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(28, 0);
        spawnListArrayAdd(enem, 670);
        //New enemy....
        enem = new Blinky(55, 0);
        enem = new Spawn(760, enem);
        spawnList.addElement(enem);
        enem = new Blinky(20, 0);
        enem = new Spawn(870, enem);
        spawnList.addElement(enem);
        enem = new Blinky(70, 0);
        enem = new Spawn(1000, enem);
        spawnList.addElement(enem);
        //Strange wave, 1 out of 2s.
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(10 + i + 2, 0);
            enem = new Spawn(1100 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(40 - (i + 3), 0);
            enem = new Spawn(1300 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        //frameDelta, gameObject, isRelative = false, isForDisplay = true, isEnemy = true, isBullet = false
        enem = new HealthBoost(52, 0);
        enem = new Spawn(20, enem, true, true, false, false);
        spawnList.addElement(enem);
        //1542
        enem = new Meteor(38, 0);
        enem = new Spawn(1580, enem);
        spawnList.addElement(enem);
        enem = new Meteor(25, 0);
        enem = new Spawn(1610, enem);
        spawnList.addElement(enem);
        enem = new Meteor(63, 0);
        enem = new Spawn(1640, enem);
        spawnList.addElement(enem);
        enem = new Meteor(27, 0);
        enem = new Spawn(1650, enem);
        spawnList.addElement(enem);
        enem = new Meteor(44, 0);
        enem = new Spawn(1666, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(11, 0);
        spawnListArrayAdd(enem, 1670);
        enem = airCraft1_factory(37, 0);
        spawnListArrayAdd(enem, 1670);
        enem = airCraft1_factory(68, 0);
        spawnListArrayAdd(enem, 1670);
        enem = airCraft1_factory(31, 0);
        spawnListArrayAdd(enem, 1720);
        enem = airCraft1_factory(58, 0);
        spawnListArrayAdd(enem, 1720);
        enem = airCraft1_factory(70, 0);
        spawnListArrayAdd(enem, 1720);
        enem = airCraft1_factory(11, 0);
        spawnListArrayAdd(enem, 1750);
        enem = new FireBoost(22, 0);
        enem = new Spawn(1750, enem, false, true, false, false);
        spawnList.addElement(enem);
        enem = airCraft1_factory(44, 0);
        spawnListArrayAdd(enem, 1750);
        enem = airCraft1_factory(55, 0);
        spawnListArrayAdd(enem, 1750);
        enem = new BlinkyTracer(70, 0);
        enem = new Spawn(1900, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(11, 0);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(11, -6);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(11, -12);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(11, -18);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(70, 0);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(70, -6);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(70, -12);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(70, -18);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(40, 0);
        spawnListArrayAdd(enem, 2010);
        enem = airCraft1_factory(40, -6);
        spawnListArrayAdd(enem, 2010);
        enem = airCraft1_factory(40, -12);
        spawnListArrayAdd(enem, 2010);
        enem = airCraft1_factory(40, -18);
        spawnListArrayAdd(enem, 2010);
        //
        enem = airCraft1_factory(40, 0);
        spawnListArrayAdd(enem, 2036);
        enem = airCraft1_factory(40, -6);
        spawnListArrayAdd(enem, 2036);
        enem = airCraft1_factory(40, -12);
        spawnListArrayAdd(enem, 2036);
        enem = airCraft1_factory(40, -18);
        spawnListArrayAdd(enem, 2036);
        //
        enem = airCraft1_factory(30, 0);
        spawnListArrayAdd(enem, 2046);
        enem = airCraft1_factory(55, -6);
        spawnListArrayAdd(enem, 2046);
        enem = airCraft1_factory(30, -12);
        spawnListArrayAdd(enem, 2046);
        enem = airCraft1_factory(55, -18);
        spawnListArrayAdd(enem, 2046);
        //
        enem = airCraft1_factory(25, 0);
        spawnListArrayAdd(enem, 2055);
        enem = airCraft1_factory(40, -6);
        spawnListArrayAdd(enem, 2055);
        enem = airCraft1_factory(25, -12);
        spawnListArrayAdd(enem, 2055);
        enem = airCraft1_factory(40, -18);
        spawnListArrayAdd(enem, 2055);
        enem = new BlinkyTracer(10, 0);
        enem = new Spawn(2090, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(40, 0);
        enem = new Spawn(2120, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(50, 0);
        enem = new Spawn(2150, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(36, 0);
        enem = new Spawn(2180, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(19, 0);
        enem = new Spawn(2210, enem);
        spawnList.addElement(enem);
        //Strange wave, 2 out of 2s.
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(10 + i + 7, 0);
            enem = new Spawn(2280 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(40 - (i + 8), 0);
            enem = new Spawn(2480 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        enem = boss1_factory(20, 15);
        spawnListArrayAdd(enem, 2770);
    } catch (error) {
        loadingException = error;
    }
}
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
 * @returns {undefined}
 */


/**
 * Lose a life.
 *
 */
function loseLife() {
    player.massfire = false;
    player.quadfire = false;
    player.score = savedScore;
    sfx3.pause();
    sfx3.currentTime = 0;
    sfx3.play();
    if (player.lifes > 0) {
        player.lifes--;
        loadLevel();
    } else {
        //window.alert("You are pretty dead now. ~~Game Over");
        exchangeRenderLoop(gameOver);
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
function boot(){
    exchangeRenderLoop(titleScreen);
}

//Additional strings for the loading prompt.
var loadingSelections = ["Load","New","Erase"];
var savedGameFound = ["A saved game was detected.","Resume at level ", "Start anew, delete the saved game?"];
var loadSelected = undefined;
/**
 * Opened when it is detected that there is
 * a saved game. 
 * @returns {undefined}
 */
function loadPrompt() {
    title_and_copyright_render();
    validateReleasedState();
    if (aniCount > 5) {

    }
    context.fillStyle = "blue";
    context.fillRect(290, 190, 260, 200);
    context.font = "27px Nonserif";
    context.fillStyle = "white";
    context.fillText(info_string, 290, 220);
    context.font = "14px Nonserif";
    context.fillText(savedGameFound[0], 290, 250);
    context.fillStyle = "gold";
    var savedLevelUserFriendly = Number(savedLevel) + 1;
    context.fillText(savedGameFound[1] + savedLevelUserFriendly + "?", 290, 275);
    context.fillText(savedGameFound[2], 290, 290);
    if (aniCount < 4) {
        loadSelected = undefined;
    } else if (aniCount === 5) {
        loadSelected = 0;
    } else {
        context.font = "27px Nonserif";
        context.fillStyle = "white";
        for (var i = 0; i < loadingSelections.length; i++) {
            if (loadSelected === i) {
                context.fillStyle = "yellow";
            } else {
                context.fillStyle = "white";
            }
            context.fillText(loadingSelections[i], 290 + i * 75, 385);
        }
        //Selecting around.
        if (right && axisXReleased && loadSelected < 2) {
            simplyPlaySound(sfx4);
            loadSelected++;
            axisXReleased = false;
        } else if (left && axisXReleased && loadSelected > 0) {
            simplyPlaySound(sfx4);
            loadSelected--;
            axisXReleased = false;
        }
        //Confirmations:
        //loadSelected = 0 --> Load game.
        //loadSelected = 1 --> New game.
        //loadSelected = 2 --> Delete old game and start anew.
        if(shoot && shootReleased){
            switch(loadSelected){
                case 0:
                    initGame(Number(savedLevel));
                    return;
                case 1:
                    initGame();
                    return;
                case 2:
                     getLocalStorage().removeItem(gameStorageName);
                     initGame();
            }
        }
    }
}


/*
 * Render the title screen.
 */
function titleScreen() {
    title_and_copyright_render();
    try {
        if (aniCount % 5 === aniCount % 10) {
            context.font = "23px Nonserif";
            context.fillStyle = "gold";
            context.fillText("PRESS SPACE TO START", 230, 520);
            //Let the show begin!
            //Disabled game pad functionality.
            //if (shoot === 5 || pollButtonMemory()) {
            if (keyboard) {
                clearInterval(gamepad_handle);
                shootReleased = false;
            }
            if (gamepad !== false) {
                window.removeEventListener("keydown", getKeyPress);
                window.removeEventListener("keyup", getKeyRelease);
                clearInterval(gamepad_handle);
                gamepad_handle = setInterval(gamepadPoll, FRAME_RATE);
                shootReleased = false;
            }
            if (keyboard || gamepad !== false) {
                if (storageStatus === false) {
                    initGame();
                }
                else{
                    shootReleased = false;
                    exchangeRenderLoop(loadPrompt);
                }

            }
        }
    } catch (error) {
        window.alert("EXCEPTION OCCURED IN TITLE SCREEN!! \n" + "Exception name:" + error.name + "\n" + "Exception message:" + error.message + "\n" + "Stack Trace:" + error.stack);

    }

}

var info_string = "Data Management";
var data_corrupt = ["Saved game corrupted.","Deletion required.","Press SPACE on keyboard or any", "key on gamepad to continue."];
var data_corrupt_ok = "Confirm";
/**
 * Should never be happening. But it can, especially if an explorer plays with the value on their own.
 * @returns {undefined}
 */
function saveCorrupt() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    context.fillStyle = "red";
    context.fillRect(290, 190, 260, 200);
    context.font = "27px Nonserif";
    context.fillStyle = "white";
    context.fillText(info_string, 290, 220);
    context.font = "14px Nonserif";
    context.fillText(data_corrupt[0], 290, 250);
    context.fillText(data_corrupt[1], 290, 275);
    context.fillText(data_corrupt[2], 290, 290);
    context.fillText(data_corrupt[3], 290, 305);
    if(aniCount === 3){
         initAllInput();
    }
    if(keyboard || gamepad !==false){
    simplyPlaySound(sfx4);
    getLocalStorage().removeItem(gameStorageName);
    initAllInput();
    exchangeRenderLoop(titleScreen);
    }
    if (aniCount % 5 === aniCount % 10) {
        context.font = "27px Nonserif";
        context.fillStyle = "yellow";
        context.fillText(data_corrupt_ok, 360, 380 );
    }
}

/**
 * Prevent that from happening!!
 * @returns {undefined}
 */
function gameOver() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    if (aniCount < 30)
        return;
    if (aniCount === 44) {
        bgm.pause();
        game_over.currentTime = 0;
        game_over.pause();
        game_over.play();
    }
    context.font = "60px Nonerif";
    context.fillStyle = "yellow";
    context.fillText("GAME OVER", 180, 320);
    if (aniCount === 90) {
        initAllInput();
        exchangeRenderLoop(titleScreen);
    }
}


/**
 Attract mode...
 */
function finalFate() {

}


var selectedOption = 0;
var selectedSureOption = 0;
/**
 * Game Pause.
 * @returns {undefined}
 */
function gamePause() {
    validateReleasedState();
    //Check for an unpausing condition.
    if ((pause && pauseReleased) || (!selectedOption && shoot && shootReleased)) {
        saveCompleteTimer = 0;
        saveFailureTimer = 0;
        simplyPlaySound(sfx4);
        pauseReleased = false;
        bgm.play();
        exchangeRenderLoop(gamePlay, true);
    }
    //Check for confirming something that does not mean continue.
    else if (selectedOption && selectedOption < pauseText.length && shoot && shootReleased) {
        simplyPlaySound(sfx4);
        shootReleased = false;
        selectedOption += 3;
        selectedSureOption = 0;
    }
    //Check for selecting an option above.
    else if (up && selectedOption && selectedOption < pauseText.length && axisYReleased) {
        selectedOption--;
        simplyPlaySound(sfx4);
        axisYReleased = false;
    }
    //Check for selecting an option below.
    else if (down && selectedOption < pauseText.length - 1 && axisYReleased) {
        selectedOption++;
        simplyPlaySound(sfx4);
        axisYReleased = false;
    }
    //Checks for "Are you sure?" dialogues.
    //Select "No".
    else if (left && selectedOption >= pauseText.length && selectedSureOption && axisXReleased) {
        selectedSureOption--;
        simplyPlaySound(sfx4);
        axisXReleased = false;
    }
    //Select "Yes".
    else if (right && selectedOption >= pauseText.length && !selectedSureOption && axisXReleased) {
        selectedSureOption++;
        simplyPlaySound(sfx4);
        axisXReleased = false;
    }
    //Confirming "No" when being asked for something.
    else if (shoot && selectedOption >= pauseText.length && !selectedSureOption && shootReleased) {
        selectedOption -= 3;
        simplyPlaySound(sfx4);
        shootReleased = false;
    }
    //Confirm ing "Yes" when being asked to save.
    else if (shoot && selectedOption === pauseText.length && selectedSureOption && shootReleased) {
        saveCompleteTimer = 0;
        saveFailureTimer = 0;
        shootReleased = false;
        selectedOption -= 3;
        simplyPlaySound(sfx4);
        pauseReleased = false;
        saveGame();
        if (saveError) {
            saveFailureTimer = 100;
        } else {
            saveCompleteTimer = 100;
        }
    }
    //Confirm ing "Yes" when being asked to restart level.
    else if (shoot && selectedOption === pauseText.length + 1 && selectedSureOption && shootReleased) {
        simplyPlaySound(sfx4);
        pauseReleased = false;
        exchangeRenderLoop(gamePlay, true);
        player.health = 0;
    }
    //Confirming "Yes" when being asked to return to title.
    else if (shoot && selectedOption === pauseText.length + 2 && selectedSureOption && shootReleased) {
        exchangeRenderLoop(gameOver);
    }
    window.requestAnimationFrame(renderInGame);
}

var musicAlreadyPlayed = false;
/**
 * 
 * Actual game loop.
 */
function gamePlay() {
    if (aniCount === 5 && !musicAlreadyPlayed) {
        bgm.currentTime = 0;
        bgm.pause();
        bgm.play();
        musicAlreadyPlayed = true;
    }
    try {
        //  throw new Error("Test exception.");
        updateBullets();
        checkForColli();
        deleteDeceased();
        updateGameObjects();
        checkForColli();
        deleteDeceased();
        checkLeaveLevel();
        window.requestAnimationFrame(renderInGame);
    } catch (error) {
        window.alert("EXCEPTION OCCURED IN-GAME!! \n" + "Exception name:" + error.name + "\n" + "Exception message:" + error.message + "\n" + "Stack Trace:" + error.stack);
    }
}


//Auxillary functions for levels.

//X - Advance bullets
function updateBullets() {
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        bulletList.getNext().updateSpecial();
    }
}


//1 - Check if one of the end conditions(player dead, boss dead) are met.
function checkLeaveLevel() {
    if (player.health <= 0) {
        loseLife();
    }
    if (giant_boss !== null && giant_boss.invalid) {
        player.level++;
        loadLevel();
    }
}


//2 - Advance the state of each thing, spawn new things when time arrives. 
function updateGameObjects() {
    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        displayList.getNext().updateState();
    }
    var next = spawnList.peekNext();
    while (next !== null && ((next.isRelative === false && aniCount > next.frameDelta) || (next.isRelative === true && aniCountRelative > next.frameDelta))) {
        aniCountRelative = 0;
        spawnList.getNext();
        var subject = next.gameObject;
        if (next.isForDisplay) {
            displayList.addElement(subject);
        }
        if (next.isEnemy) {
            enemyList.addElement(subject);
        } else if (next.isBullet) {
            bulletList.addElement(subject);
        }
        next = spawnList.peekNext();
    }
}
// 3 - Check for collisions.
function checkForColli() {
    checkForEnemyHit();
    bulletOnEnemies();
}
// 3A - Check for collisions of the player with enemies or enemy bullets

function checkForEnemyHit() {
    enemyList.resetIterator();
    while (enemyList.peekNext() !== null) {
        var enemyImminent = enemyList.getNext();
        if (player.collides(enemyImminent)) {
            enemyImminent.invalidate();
            sfx1.pause();
            sfx1.currentTime = 0;
            sfx1.play();
            //window.alert("Enemy collided with player using the new function.");
            player.health = player.health - enemyImminent.damage;
            if (player.health < 0)
                player.health = 0;
        }
    }
}




// 3B Check for bullet hits on the enemies.

// 3B New try...
function bulletOnEnemies() {
    bulletList.resetIterator();
    while (bulletList.peekNext() !== null) {
        var bullet = bulletList.getNext();
        if (!bullet.invalid) {
            enemyList.resetIterator();
            while (enemyList.peekNext() !== null) {
                var enemy = enemyList.getNext();
                if (bullet.collides(enemy) && !enemy.invalid && enemy.killable) {
                    enemy.invalidate();
                    if (enemy.invalid) {
                        sfx1.pause();
                        sfx1.currentTime = 0;
                        sfx1.play();
                        player.score = player.score + enemy.score;
                    }
                    bullet.invalidate();
                    //window.alert("Shot the enemy.");

                }
            }
        }
    }
}




// 4 -  Render game objects.
//String array with pause menu constants.
var pauseText = ["Continue", "Save", "Retry Level", "Return To Title"];
var youSure = ["No", "Yes"];
var youSureQuestion = ["Are you sure?"];
//Rendering of result of saving mechanism is displayed here until counter is zero.
var saveCompleteTimer = 0;
var saveFailureTimer = 0;
var saveComplete = "Saved.";
var saveFailure = "Error. Save failed!";
function renderInGame() {

    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    if (background !== null && background instanceof GameObject) {
        if (renderFunction !== gamePause)
            background.updateState();
        background.renderState();
    } else if (background !== null && background instanceof Decoration) {
        if (renderFunction !== gamePause)
            background.updateRoutine();
        background.renderRoutine();
    }

    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        var v = displayList.getNext();
        if (!v.invalid)
            v.renderState();
    }
    renderHUD();
    if (renderFunction === gamePause) {
        context.font = "27px Nonserif";
        //Shared Y,X coordinates
        let y = 245;
        let x = 330;
        //Display the pause menu options. (treat the case selected / not selected)
        for (var i = 0; i < pauseText.length; i++) {
            if (selectedOption === i) {
                context.fillStyle = "yellow";
                if (pauseCount % 5 === pauseCount % 10) {
                    context.fillText(pauseText[i], x, y + i * 30);
                }
            } else {
                context.fillStyle = "white";
                context.fillText(pauseText[i], x, y + i * 30);
            }
        }
        renderHUD();
        //"Are you sure?" options.
        if (selectedOption >= pauseText.length) {
            context.fillStyle = "gray";
            context.fillRect(290, 190, 260, 200);
            context.fillStyle = "black";
            context.fillRect(290, 190, 260, 35);
            context.font = "27px Nonserif";
            context.fillStyle = "white";
            context.fillText(pauseText[selectedOption - 3], 290, 220);
            context.fillText(youSureQuestion, 290, 250);
            if (!selectedSureOption) {
                if (pauseCount % 5 === pauseCount % 10) {
                    context.fillStyle = "yellow";
                    context.fillText(youSure[0], 290, 385);
                }
                context.fillStyle = "white";
                context.fillText(youSure[1], 420, 385);
            } else {
                if (pauseCount % 5 === pauseCount % 10) {
                    context.fillStyle = "yellow";
                    context.fillText(youSure[1], 420, 385);
                }
                context.fillStyle = "white";
                context.fillText(youSure[0], 290, 385);
            }

        }
        //Save success notification.
        if (saveCompleteTimer) {
            context.fillStyle = "black";
            context.fillRect(290, 190, 260, 35);
            context.fillStyle = "white";
            context.font = "27px Nonserif";
            context.fillText(saveComplete, 290, 220);
            saveCompleteTimer--;
        } else if (saveFailureTimer) {
            context.fillStyle = "black";
            context.fillRect(290, 190, 260, 35);
            context.fillStyle = "white";
            context.font = "27px Nonserif";
            context.fillText(saveFailure, 290, 220);
            saveFailureTimer--;
        }
    }
}

// 5 - Delete all elements which declared themselves as no longer needed. Or left the screen.

function deleteDeceased() {
    var lists = [displayList, enemyList, bulletList];
    for (var i = 0; i < lists.length; i++) {
        lists[i].resetIterator();
        while (lists[i].peekNext() !== null) {
            var objInQuestion = lists[i].getNext();
            if (objInQuestion.invalid === true || objInQuestion.middleY > 70) {
                lists[i].deleteElement(objInQuestion);
            }
        }
    }
}

//6 - Render the HUD.

function renderHUD() {
    bulletList.resetIterator();
    if (bulletList.peekNext() !== null) {
        //  context.fillStyle = "#333333";
    }
    context.fillStyle = "#222222";
    context.fillRect(0, 550, 800, 50);
    context.fillStyle = "white";
    context.font = "27px Nonserif";
    context.fillText(player.score, 0, 581);
    context.fillText(player.health, 245, 581);
    context.fillText(player.lifes, 350, 581);
    context.fillText(player.level + 1, 700, 581);
    context.font = "13px Nonserif";
    context.fillText("SCORE", 0, 595);
    context.fillText("HEALTH", 245, 595);
    context.fillText("LIVE", 350, 595);
    context.fillText("LEVEL", 700, 595);
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

//"Blinky" damage function.
function blinky_damage() {
    return 22;
}

//"Blinky Tracer" damage function.
function blinkyTracer_damage() {
    return 36;
}

//"Meteor" damage function.
function meteor_damage() {
    return 17;
}

//All dimension matrix functions.


//"Stupid Enemy" dimension function.
function simpleEnemy_dimension(dummyX, dummyY) {
    var x = [this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1];
    var y = [this.middleY - 3, this.middleY - 3, this.middleY - 3, this.middleY - 2, this.middleY - 2, this.middleY - 2, this.middleY - 1, this.middleY - 1, this.middleY - 1, this.middleY, this.middleY, this.middleY, this.middleY + 1, this.middleY + 1, this.middleY + 1];
    return new Array(x, y);
}

//"Background" dimension function.
function background_dimension() {
    return null;
}


//"Health Boost" dimension function.
var healthBoost_dimension = simpleEnemy_dimension;
//"Fire Boost" dimension function.
var fireBoost_dimension = healthBoost_dimension;
//"Life Boost" dimension function.
var lifeBoost_dimension = healthBoost_dimension;
//"Boss 2 " dimension function.
function boss2_dimension() {
    var x = [];
    var y = [];
    for (var i = 0; i < boss2_constants.prototype.abs_x_pos; i++) {

    }
    return new Array(x, y);
}

//"Bullet" dimension function.
function bullet_dimension() {
    var x = [this.middleX, this.middleX, this.middleX, this.middleX, this.middleX - 1, this.middleX - 1, this.middleX - 1, this.middleX - 1];
    var y = [this.middleY, this.middleY - 1, this.middleY - 2, this.middleY - 3, this.middleY, this.middleY - 1, this.middleY - 2, this.middleY - 3];
    return new Array(x, y);
}


//"Meteor" dimension function.
var meteor_dimension = simpleEnemy_dimension;
//"Boss 3 hatch" dimension function.
var boss3_hatch_dimension = meteor_dimension;
//"Boss 3 heating unit" dimension function.
var boss3_heating_dimension = meteor_dimension;
//"Boss 3 middle part" dimension function.
var boss3_middle_dimension = meteor_dimension;
//"Boss 2" dimension function.
var boss2_dimension = meteor_dimension;
//"Blinky" dimension function.
var blinky_dimension = meteor_dimension;
//"Blinky Tracer" dimension function.
var blinkyTracer_dimension = blinky_dimension;
//All update routines.

//"Wingman" update function.
function wingman_update() {
    this.middleY = this.middleY + 1;
}

//"Bullet" update function.
function bullet_update() {
    this.middleY = this.middleY - 1;
    if (this.middleY < 3)
        this.invalid = true;
}
//"Background 1" update function.
function background1_update() {
    this.middleY = this.middleY + 0.1;
}


//Boss 3 middle.
function boss3_middle_update() {
    if (boss3_middle_constants.prototype.hp <= 0 && this.getOccupiedSpace !== func_noDim) {
        sfx1.pause();
        sfx1.currentTime = 0;
        sfx1.play();
        this.getOccupiedSpace = func_noDim;
        this.renderState = func_noOp;
    } else if (boss3_middle_constants.prototype.hp > 0 && this.getOccupiedSpace === func_noDim) {
        this.getOccupiedSpace = boss3_middle_dimension;
        this.renderState = boss3_hatch_render;
    }
    //Only the first block of the middle element should trigger this code.
    if (this.firstElement && boss3_middle_constants.prototype.hp > 0) {
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
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn meteor right.
                enem = new Meteor(lowRightX, lowRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case2A: Left lower arm missing.
            else if (boss3_arm_values.prototype.hpValues[0] <= 0 && boss3_arm_values.prototype.hpValues[1] > 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tracer right.
                enem = new BlinkyTracer(lowRightX, lowRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky left.
                enem = new Blinky(upperLeftX, upperLeftY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky right.
                enem = new Blinky(upperRightX, upperRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case2B: Right lower arm missing.
            else if (boss3_arm_values.prototype.hpValues[0] > 0 && boss3_arm_values.prototype.hpValues[1] <= 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tracer left.
                enem = new BlinkyTracer(lowLeftX, lowLeftY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky left.
                enem = new Blinky(upperLeftX, upperLeftY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky right.
                enem = new Blinky(upperRightX, upperRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case3A: All low arms missing.
            else if (boss3_arm_values.prototype.hpValues[0] <= 0 && boss3_arm_values.prototype.hpValues[1] <= 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tr left.
                enem = new BlinkyTracer(upperLeftX, upperLeftY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky tr right.
                enem = new BlinkyTracer(upperRightX, upperRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case3B: Left side missing.
            else if (boss3_arm_values.prototype.hpValues[0] <= 0 && boss3_arm_values.prototype.hpValues[1] > 0 && boss3_arm_values.prototype.hpValues[2] <= 0 && boss3_arm_values.prototype.hpValues[3] > 0) {
                //Spawn blinky tr left.
                enem = new BlinkyTracer(lowRightX, lowRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky tr right.
                enem = new BlinkyTracer(upperRightX, upperRightY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
            }
            //Case3C: Right side missing.
            else if (boss3_arm_values.prototype.hpValues[0] > 0 && boss3_arm_values.prototype.hpValues[1] <= 0 && boss3_arm_values.prototype.hpValues[2] > 0 && boss3_arm_values.prototype.hpValues[3] <= 0) {
                //Spawn blinky left.
                enem = new BlinkyTracer(upperLeftX, upperLeftY);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                //Spawn blinky right.
                enem = new BlinkyTracer(lowLeftX, lowLeftY);
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
                        displayList.addElement(enem, false);
                        enemyList.addElement(enem, false);
                        break;
                    case 1:
                        enem = new Meteor(upperX, upperY);
                        displayList.addElement(enem, false);
                        enemyList.addElement(enem, false);
                        break;
                    case 2:
                    case 3:
                        enem = new BlinkyTracer(upperX, upperY);
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
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }
}

//Boss 1 attackable and meteors spamming part.
function boss1a_update() {
    boss1na_update.call(this);
    if (this.frameCounter % 40 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
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
        displayList.addElement(enema, false);
        enemyList.addElement(enema, false);
        displayList.addElement(enemb, false);
        enemyList.addElement(enemb, false);
    }
//Forcing player back in when he leaves to the left.
    if (player.middleX < this.middleX - 2) {
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

//"Stupid Enemy" update function.
function simpleEnemy_update() {
    this.frameCounter++;
    this.frameCounter = this.frameCounter % 2;
    if (this.frameCounter === 1) {
        this.middleY = this.middleY + 1;
    }
}

//"Blinky" update function.
function blinky_update() {
    this.frameCounter++;
    this.frameCounter = this.frameCounter % 1;
    if (this.frameCounter === 0) {
        this.middleY = this.middleY + 1;
    }
}
//"Blinky Tracer" update function.
function blinkyTracer_update() {
    this.frameCounter++;
    this.middleY++;
    if (player.middleX > this.middleX)
        this.middleX++;
    else if (player.middleX < this.middleX)
        this.middleX--;
}

//"Meteor" update function.
function meteor_update() {
    slowMove_update.call(this);
}

//"Meteor 2" update function.
function meteor2_update() {

    this.middleY = this.middleY + 1;
}


//"Health Boost" update function.
function healthBoost_update() {
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.health = player.health + 30;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.health = player.health + 30;
    }

}

//"Life Boost" update function.
function lifeBoost_update() {
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.lifes = player.lifes + 1;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.lifes = player.lifes + 1;
    }

}

//"Fire Boost" update function
function fireBoost_update() {
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        if (player.massfire) {
            player.health = player.health + 120;
        }
        player.massfire = true;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        if (player.massfire) {
            player.health = player.health + 120;
        }
        player.massfire = true;
    }

}

//All rendering routines.

/**
 * Renders "THE FINAL FATE" and the copyright info.
 * @returns {undefined}
 */
function title_and_copyright_render(){
 context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    context.font = "60px Serif";
    context.fillStyle = "red";
    context.fillText("THE FINAL FATE", 120, 150);
    context.font = "17px Nonserif";
    context.fillStyle = "white";
    context.fillText("GAME (C) 2019-2020 Manuel Engel", 220, 580);   
}

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

//Star Rendering function
function star_render() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (i === 1 && j === 1)
                context.fillStyle = "#CCCCCC";
            else
                context.fillStyle = "#666666";
            context.fillRect((this.middleX * 10 - 2 + (i * 2)), (this.middleY * 10 - 2 + (j * 2)), 2, 2);
        }
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


//"Bullet" rendering function
function bullet_render() {
    context.fillStyle = "yellow";
    context.fillRect(this.middleX * 10, this.middleY * 10, 10, 10);
    context.fillStyle = "orange";
    context.fillRect(this.middleX * 10, (this.middleY - 1) * 10, 10, 10);
    context.fillStyle = "red";
    context.fillRect(this.middleX * 10, (this.middleY - 2) * 10, 10, 10);
    context.fillStyle = "#220000";
    context.fillRect(this.middleX * 10, (this.middleY - 3) * 10, 10, 10);
}


//"Stupid Enemy" rendering function
function simpleEnemy_render() {
//Num pad on mobile.
    context.fillStyle = "white";
    simpleSquare_render.call(this);
}

//"Meteor" rendering function
function meteor_render() {
//Num pad on mobile.
    context.fillStyle = "brown";
    simpleSquare_render.call(this);
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

//"Health Boost" rendering function
function healthBoost_render() {
//Num pad on mobile.
    context.fillStyle = "green";
    simpleSquare_render.call(this);
    context.fillStyle = "white";
    //H
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Middle line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 5, 24, 7);
    //Right line
    context.fillRect((this.middleX * 10) + 8, (this.middleY * 10) - 6, 7, 24);
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

//"Fire Boost" rendering function
function fireBoost_render() {
//Num pad on mobile.
    context.fillStyle = "red";
    simpleSquare_render.call(this);
    context.fillStyle = "white";
    //F
    //Upper line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 24, 7);
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Middle line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 5, 24, 7);
}

//"Life Boost" rendering function
function lifeBoost_render() {
//Num pad on mobile.
    context.fillStyle = "blue";
    simpleSquare_render.call(this);
    context.fillStyle = "white";
    //F
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Lower line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 11, 24, 7);
}


//"Blinky Tracer" rendering function.
var blinkyTracer_render = blinky_render;
//"Boss 2" rendering function.#
function boss2_render() {
    context.fillStyle = "gray";
    context.fillRect(this.middleX * 10, this.middleY * 10, 10 * boss2_constants.prototype.abs_x_pos, 10 * boss2_constants.prototype.abs_y_pos);
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

//"Blinky" rendering function
function blinky_render() {
//Num pad on mobile.
    if (aniCount % 5 === 0) {
        context.fillStyle = "red";
    } else if (aniCount % 4 === 0) {
        context.fillStyle = "yellow";
    } else if (aniCount % 3 === 0) {
        context.fillStyle = "magenta";
    } else if (aniCount % 2 === 0) {
        context.fillStyle = "white";
    } else
        context.fillStyle = "green";
    simpleSquare_render.call(this);
}

//"Heat" rendering function
function heat_render() {
    context.fillStyle = "#550000";
    context.fillRect(0, 0, 800, 600);
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
    enemy_obj = new Enemy(middleX, middleY, boss2_dimension, boss2fb_update, simpleEnemy_render, damage = 8, true, 0, boss2_invalidate, 270);
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

//Star factory function.
function star_factory() {
    var starList = new LinkedList();
//Decide where to place stars.
    for (var i = 0; i < 80; i++) {
        for (var j = 0; j < 60; j++) {
            var randomNumber = Math.random();
            //Chance of star appearance 1/n.
            var chance = 230;
            randomNumber = Math.floor(randomNumber * chance);
            if (randomNumber % chance === 0) {
                starList.addElement(new Star(i, j));
            }
        }
    }
    return starList;
}


//Functions and variables, storage-related.

/**
 * Gets the HTML 5 local storage object.
 * 
 * @returns {Storage|Window.localStorage}
 */
function getLocalStorage() {
    return window.localStorage;
}
var gameStorageName = "TheFinalFate1ByME_Level";
var savedLevel = 0;
var saveError = false;
/**
 * Save the game.
 * @returns {undefined}
 */
function saveGame() {
    try {
        getLocalStorage().setItem(gameStorageName, player.level);
        var referenceValue = Number(getLocalStorage().getItem(gameStorageName));
        if (referenceValue !== player.level) {
            saveError = true;
        } else {
            saveError = false;
        }
    } catch (error) {
        saveError = true;
    }
}
/**
 * Status in regard of the HTML 5 local storage.
 * undefined = Unknown.
 * null = Not usable, general error.
 * "CORRUPT" = Corrupted game save.
 * "UPGRADE" = Upgrade to game version supporting the saved game.
 * false = No data.
 * true =  Data here.
 * @type undefined
 */
var storageStatus = undefined;
function testStorageState() {
//Reset memory about read data.
    savedLevel = 0;
//Test 1 : Check if local storage object does even exist.
//Desired outcome: object !== undefined
//If not fulfilled: storageStatus = null
    var storageTest = getLocalStorage();
    if (storageTest === undefined) {
        storageStatus = null;
        return;
    }
// Test 2 : Check if game is saved.
    var storageValue = storageTest.getItem(gameStorageName);
    savedLevel = storageValue;
    if (storageValue === null) {
        storageStatus = false;
        return;
    }
// Test 3: Check if saved information is eitmher valid or corrupt.
// Test 3A: Check if data is NaN or in negative range.
    if (isNaN(storageValue) || storageValue < 0) {
        storageStatus = "CORRUPT";
        return;
    }
    // Test 3B: Check if data is invalid in this version, but not necessarily always invalid.
    if (!loaders[storageValue]) {
        storageStatus = "UPGRADE";
        return;
    }
    storageStatus = true;
}

//All other functions.

//Make sure that frame counter always continues.
function increaseCount() {
    if (renderFunction === gamePause) {
        pauseCount++;
        return;
    }
    aniCount++;
    aniCountRelative++;
}


//Makes sure keys are not pressed for eternity.
function keyInvalidator() {
    if (shoot) {
        shoot--;
    }
    if (up) {
        up--;
    }
    if (down) {
        down--;
    }
    if (left) {
        left--;
    }
    if (right) {
        right--;
    }
    if (pause) {
        pause--;
    }

}



//Event receiver for key presses.
function getKeyPress(event) {
//Keyboard press detected!
    keyboard = 1;
    //window.alert("It works....");
    //window.alert(event.keyCode);
    //Key Codes supported?
    if (event.keyCode !== undefined) {
// window.alert(event.which);
        if (event.keyCode === 32) {
            shoot = 5;
        } else if (event.keyCode === 37) {
            left = 5;
        } else if (event.keyCode === 39) {
            right = 5;
        } else if (event.keyCode === 38) {
            up = 5;
        } else if (event.keyCode === 40) {
            down = 5;
        } else if (event.keyCode === 80) {
            pause = 5;
        }
    }


}
//Event receiver for key release.
function getKeyRelease(event) {

// window.alert("It works....");

//Firefox based?
    if (event.keyCode !== undefined) {
//  window.alert(event.which);
        if (event.keyCode === 32) {
            shoot = 0;
        } else if (event.keyCode === 37) {
            left = 0;
        } else if (event.keyCode === 39) {
            right = 0;
        } else if (event.keyCode === 38) {
            up = 0;
        } else if (event.keyCode === 40) {
            down = 0;
        } else if (event.keyCode === 80) {
            pause = 0;
        }
    }

}

/**
 * Poll every button on every gamepad.
 * @returns {Boolean}
 */
function gamepadAskAnyButton() {
    var controllers = navigator.getGamepads();
    for (var i = 0; i < controllers.length && i < 10; i++) {
        var testController = controllers[i];
        if (!testController)
            continue;
        if (!testController.buttons)
            continue;
        for (var j = 0; testController.buttons.length && j < testController.buttons.length; j++) {
//Prevent "Start button" from ever becoming the fire button.
            if (j === 9)
                continue;
            if (testController.connected && testController.buttons[j] && testController.buttons[j].pressed) {
                gamepad = i;
                gamepad_button = j;
            }

        }
    }

}



//Poll gamepad.
function gamepadPoll() {
    var controller = navigator.getGamepads()[gamepad];
    //Error condition: Controller is no object or even null or undefined.
    if (!controller) {
        return;
    }
//Error condition: Controller.buttons is no array or even null or undefined.
    if (!controller.buttons || !controller.buttons.length) {
        return;
    }
//Error condition: Gamepad is disconnected.
    if (!controller.connected) {
        return;
    }
//Error condition: Fire button did magically disappear.
    if (controller.buttons[gamepad_button] === undefined || controller.buttons[gamepad_button] === null) {
        return;
    }
//Is button pressed?
    shoot = controller.buttons[gamepad_button].pressed;
    //Validate axis states.
    left = controller.axes[0] < -0.4;
    right = controller.axes[0] > 0.4;
    up = controller.axes[1] < -0.4;
    down = controller.axes[1] > 0.4;
    //Is pause pressed?
    pause = controller.buttons[9].pressed;
}

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

/**
 * 
 * @returns random X coordinate.
 */
function getRandomX() {
    var rand = Math.random();
    return Math.floor(rand * 80);
}

/**
 * 
 * @returns random Y coordinate.
 */
function getRandomY() {
    var rand = Math.random();
    return Math.floor(rand * 60);
}


/**
 * Exchange the rendering loop with another function.
 * Takes care of necessary cleanup and resets frame counter.
 * @param {function} func Function which will be executed as rendering loop.
 * @param {boolean} preserveCounters Do not reset counters. Default: false
 * @returns {undefined}
 */
function exchangeRenderLoop(func, preserveCounters = false) {
    if(renderTimer!==null)clearInterval(renderTimer);
    if (!preserveCounters) {
        aniCount = renderReset;
        aniCountRelative = 0;
    }
    testStorageState();
    if(storageStatus === "CORRUPT"){
   renderFunction = saveCorrupt;
    }
    else{
     renderFunction = func;   
    }
    renderTimer = setInterval(renderFunction, FRAME_RATE);
}



/**
 * Function which does nothing. Sometimes useful.
 * @returns {undefined}
 */
function func_noOp() {}



/**
 * Function which does return an empty collision matrix.
 * Useful to make something not touchable.
 * @returns {Array}
 */
function func_noDim() {
    return [[], []];
}


/**
 * Event handler triggered when windows size changes.
 * @returns {undefined}
 */
function sizeChanged() {
    newWidth = window.innerWidth - (window.innerWidth / 100 * 3);
    newHeight = window.innerHeight - (window.innerHeight / 100 * 3);
    canvas.setAttribute("width", newWidth);
    canvas.setAttribute("height", newHeight);
    //context.scale(newWidth / oldWidth, newHeight / oldHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(newWidth / oldestWidth, newHeight / oldestHeight);
    oldWidth = newWidth;
    oldHeight = newHeight;
//window.alert("New canvas resolution: " + newWidth + "x" + newHeight + "<br> New inner window size: " + window.innerWidth + "x" + window.innerHeight);
}

//Values and function for the released state of (once pressed) keys.

var shootReleased = true;
var pauseReleased = true;
var axisXReleased = true;
var axisYReleased = true;
//Validates if the statements above are still true.
function validateReleasedState() {
    if (!shoot) {
        shootReleased = true;
    }
    if (!pause) {
        pauseReleased = true;
    }
    if (!up && !down) {
        axisYReleased = true;
    }
    if (!left && !right) {
        axisXReleased = true;
    }
}
/**
 * (Re-)Play sound with just one call instead of three.
 * @param {type} object
 * @returns {undefined}
 */
function simplyPlaySound(object) {
    object.pause();
    object.currentTime = 0;
    object.play();
}
