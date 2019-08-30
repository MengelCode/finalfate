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
         
         */
        this.getOccupiedSpace = null;

        /**
         * Update the state of this game object.
         * 
         */
        this.updateState = null;
        /**
         * Render this object.
         */
        this.renderState = null;

        /**
         * 
         * Mark the object as no longer required.
         * 
         */
        this.invalidate = function () {
            this.invalid = true;
        };
        this.getOccupiedSpace = function () {
            var x = {};
            var y = {};
            return new Array(x, y);
        };
        /**
         * 
         * @param {type} otherObj
         * @returns {boolean} If this object collides with the given object.
         */
        this.collides = function (otherObj) {
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

    }

}

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
        if (value != null) {
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
     * 
     * @param {integer} middleX
     * @param {integer} middleY
     * @param {function} dimensionMatrix
     * @param {function} updateRoutine
     * @param {function} renderRoutine
     * @param {boolean} killable
     * @param {integer} damage
     * @returns {Enemy}
     */
    constructor(middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null) {
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
        this.hp = 100;
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

//INIT
//try{
const FRAME_RATE = 30;
//"booleans" if certain keys are pressed.
var shoot = 0;
var up = 0;
var down = 0;
var left = 0;
var right = 0;
var pause = 0;
//HTML Canvas
var canvas = document.getElementById("myScreen");
//Context
var context = canvas.getContext("2d");
//Function Pointer to what should happen in the next rendering cycle.
var renderFunction = null;
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
//Level Loaders.
var loaders = new Array(7);
loaders[0] = earthLoader;
loaders[1] = solarSystemLoader;
//Level background rendering functions.
//var backgroundRenderers = new Array(6);
//Animation counter. Absolute
var aniCount = 0;
//Animation counter. Relative
var aniCountRelative = 0;
//Black background.
context.fillRect(0, 0, 800, 600);
//Render function assigning.
renderFunction = titleScreen;
//Make keys unpressed over time.
//setInterval(keyInvalidator, FRAME_RATE);
//Count all the frames.
setInterval(increaseCount, FRAME_RATE);
//Linked List to use for all kinds of things.
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
//Enter rendering cycle.
var renderTimer = setInterval(renderFunction, FRAME_RATE);
window.addEventListener("keydown", getKeyPress);
window.addEventListener("keyup", getKeyRelease);



//FUNCTIONS

//Auxillary functions for level transitions.
/**
 * 
 * Define the beginning state of the game, then start with the first level.
 */
function initGame() {
    player = new SpaceShip(38, 52);
    //CHEAT ZONE!!!
    player.level = 0;
    savedScore = 0;
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
    savedScore = player.score;
    player.middleX = 38;
    player.middleY = 52;
    giant_boss = null;
    displayList = new LinkedList();
    bulletList = new LinkedList();
    enemyList = new LinkedList();
    spawnList = new LinkedList();
    displayList.addElement(player);
    if (loaders[player.level] === undefined) {
        window.alert("More has yet to come. I am already on the way, if I am not sleeping! -Manuel");
        //Make everything stop.
        exchangeRenderLoop(null);
    } else {
        background = null;
        loaders[player.level]();
        exchangeRenderLoop(gamePlay);
    }
}
/**
 * 
 * Level 2 -  The Solar Sytem
 */
function solarSystemLoader() {
    var enem = null;

    for (var i = 0; i < 58; i++) {
        var rand = getRandomX();
        enem = new Enemy(rand, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
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
                enem = new Enemy(rand - 2, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinky_damage());
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
                enem = new Enemy(rand + 3, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinky_damage());
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
    enem = factory_airCraft2(65, -6);
    spawnListArrayAdd(enem, 1300);
    enem = factory_airCraft2(50, -6);
    spawnListArrayAdd(enem, 1300);
    enem = factory_airCraft2(10, -6);
    spawnListArrayAdd(enem, 1300);
    //
    enem = factory_airCraft2(30, -6);
    spawnListArrayAdd(enem, 1350);
    enem = factory_airCraft2(75, -6);
    spawnListArrayAdd(enem, 1350);
    enem = factory_airCraft2(10, -6);
    spawnListArrayAdd(enem, 1350);
    enem = factory_airCraft2(44, -6);
    spawnListArrayAdd(enem, 1350);
    enem = factory_airCraft2(0, -6);
    spawnListArrayAdd(enem, 1350);
    //Blinky mania!!!
    for (var i = 0; i < 40; i++) {
        enem = new Enemy(getRandomX(), 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
        //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Spawn(1400 + i * 20, enem);
        spawnList.addElement(enem);
        if (i % 5 === 0) {
            var rando = getRandomX() % 2 === 0;
            if (rando) {
                enem = new Enemy(78, 28, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
            } else
                enem = new Enemy(-1, 28, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
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
        if(i===20 || i===77){
                enem = new HealthBoost(player.middleX, 0);
                enem = new Spawn(2217 + i * 15, enem, false, true, false, false);
                spawnList.addElement(enem);
        }
        //Object generation.
        switch (randon) {
            case 0:
                enem = new Enemy(getRandomX(), 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
                break;
            case 1:
            case 2:
                enem = new Enemy(getRandomX(), 0, meteor_dimension, meteor_update, meteor_render);
                break;
            case 3:
            case 4:
            case 5:
                enem = factory_airCraft2(getRandomX(), -5);
                spawnListArrayAdd(enem, 2217 + i * 15);
                break;
            case 6:
                enem = new Enemy(getRandomX(), 0, blinky_dimension, blinky_update, blinky_render, blinky_damage());
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
       
        enem = new Enemy(getRandomX(), 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
        //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Spawn(4030 + i * 20, enem);
        spawnList.addElement(enem);
        if (i % 5 === 0) {
            var rando = getRandomX() % 2 === 0;
            if (rando) {
                enem = new Enemy(78, 11, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
            } else
                enem = new Enemy(-1, 11, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
            enem = new Spawn(4030 + i * 20, enem);
            spawnList.addElement(enem);
        }
    }
    //Frame: 5410
}

/**
 * 
 * Level 1 - The Sky
 * Length: 2770 frames.
 */
function earthLoader() {
    background = new Enemy(0, 0, background_dimension, background_update, background1_render);
    var enem = null;
//Slow beginning...
    enem = new Enemy(26, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(150, enem);
    spawnList.addElement(enem);
    enem = new Enemy(36, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(240, enem);
    spawnList.addElement(enem);
    enem = factory_airCraft1(72, 0);
    spawnListArrayAdd(enem, 260);
    enem = new Enemy(9, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(290, enem);
    spawnList.addElement(enem);
    enem = new Enemy(69, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(310, enem);
    spawnList.addElement(enem);
    //Gets a bit more...hurried.
    enem = factory_airCraft1(44, 0);
    spawnListArrayAdd(enem, 328);
    enem = new Enemy(11, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(370, enem);
    spawnList.addElement(enem);
    enem = new Enemy(40, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(380, enem);
    spawnList.addElement(enem);
    enem = factory_airCraft1(20, 0);
    spawnListArrayAdd(enem, 400);
    enem = new Enemy(23, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(410, enem);
    spawnList.addElement(enem);
    enem = new Enemy(55, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(440, enem);
    spawnList.addElement(enem);
    enem = new Enemy(33, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(460, enem);
    spawnList.addElement(enem);
    enem = new Enemy(40, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(480, enem);
    spawnList.addElement(enem);
    enem = factory_airCraft1(22, 0);
    spawnListArrayAdd(enem, 500);
    enem = new Enemy(20, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(530, enem);
    spawnList.addElement(enem);
    //Everything rains at you....
    enem = new Enemy(30, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(540, enem);
    spawnList.addElement(enem);
    enem = new Enemy(13, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(570, enem);
    spawnList.addElement(enem);
    enem = new Enemy(79, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(600, enem);
    spawnList.addElement(enem);
    enem = new Enemy(55, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(630, enem);
    spawnList.addElement(enem);
    enem = new Enemy(33, 0, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render);
    enem = new Spawn(640, enem);
    spawnList.addElement(enem);
    enem = factory_airCraft1(28, 0);
    spawnListArrayAdd(enem, 670);
    //New enemy....
    enem = new Enemy(55, 0, blinky_dimension, blinky_update, blinky_render, blinky_damage());
    enem = new Spawn(760, enem);
    spawnList.addElement(enem);
    enem = new Enemy(20, 0, blinky_dimension, blinky_update, blinky_render, blinky_damage());
    enem = new Spawn(870, enem);
    spawnList.addElement(enem);
    enem = new Enemy(70, 0, blinky_dimension, blinky_update, blinky_render, blinky_damage());
    enem = new Spawn(1000, enem);
    spawnList.addElement(enem);
    //Strange wave, 1 out of 2s.
    for (var i = 0; i < 20; i++) {
        enem = new Enemy(10 + i + 2, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Spawn(1100 + 10 * i, enem);
        spawnList.addElement(enem);
    }
    for (var i = 0; i < 20; i++) {
        enem = new Enemy(40 - (i + 3), 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Spawn(1300 + 10 * i, enem);
        spawnList.addElement(enem);
    }
    //frameDelta, gameObject, isRelative = false, isForDisplay = true, isEnemy = true, isBullet = false
    enem = new HealthBoost(52, 0);
    enem = new Spawn(20, enem, true, true, false, false);
    spawnList.addElement(enem);
    //1542
    enem = new Enemy(38, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(1580, enem);
    spawnList.addElement(enem);
    enem = new Enemy(25, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(1610, enem);
    spawnList.addElement(enem);
    enem = new Enemy(63, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(1640, enem);
    spawnList.addElement(enem);
    enem = new Enemy(27, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(1650, enem);
    spawnList.addElement(enem);
    enem = new Enemy(44, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    enem = new Spawn(1666, enem);
    spawnList.addElement(enem);
    enem = factory_airCraft1(11, 0);
    spawnListArrayAdd(enem, 1670);
    enem = factory_airCraft1(37, 0);
    spawnListArrayAdd(enem, 1670);
    enem = factory_airCraft1(68, 0);
    spawnListArrayAdd(enem, 1670);
    enem = factory_airCraft1(31, 0);
    spawnListArrayAdd(enem, 1720);
    enem = factory_airCraft1(58, 0);
    spawnListArrayAdd(enem, 1720);
    enem = factory_airCraft1(70, 0);
    spawnListArrayAdd(enem, 1720);
    enem = factory_airCraft1(11, 0);
    spawnListArrayAdd(enem, 1750);
    enem = new FireBoost(22, 0);
    enem = new Spawn(1750, enem, false, true, false, false);
    spawnList.addElement(enem);
    enem = factory_airCraft1(44, 0);
    spawnListArrayAdd(enem, 1750);
    enem = factory_airCraft1(55, 0);
    spawnListArrayAdd(enem, 1750);
    enem = new Enemy(70, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    enem = new Spawn(1900, enem);
    spawnList.addElement(enem);
    enem = factory_airCraft1(11, 0);
    spawnListArrayAdd(enem, 1950);
    enem = factory_airCraft1(11, -6);
    spawnListArrayAdd(enem, 1950);
    enem = factory_airCraft1(11, -12);
    spawnListArrayAdd(enem, 1950);
    enem = factory_airCraft1(11, -18);
    spawnListArrayAdd(enem, 1950);
    enem = factory_airCraft1(70, 0);
    spawnListArrayAdd(enem, 1980);
    enem = factory_airCraft1(70, -6);
    spawnListArrayAdd(enem, 1980);
    enem = factory_airCraft1(70, -12);
    spawnListArrayAdd(enem, 1980);
    enem = factory_airCraft1(70, -18);
    spawnListArrayAdd(enem, 1980);
    enem = factory_airCraft1(40, 0);
    spawnListArrayAdd(enem, 2010);
    enem = factory_airCraft1(40, -6);
    spawnListArrayAdd(enem, 2010);
    enem = factory_airCraft1(40, -12);
    spawnListArrayAdd(enem, 2010);
    enem = factory_airCraft1(40, -18);
    spawnListArrayAdd(enem, 2010);
    //
    enem = factory_airCraft1(40, 0);
    spawnListArrayAdd(enem, 2036);
    enem = factory_airCraft1(40, -6);
    spawnListArrayAdd(enem, 2036);
    enem = factory_airCraft1(40, -12);
    spawnListArrayAdd(enem, 2036);
    enem = factory_airCraft1(40, -18);
    spawnListArrayAdd(enem, 2036);
    //
    enem = factory_airCraft1(30, 0);
    spawnListArrayAdd(enem, 2046);
    enem = factory_airCraft1(55, -6);
    spawnListArrayAdd(enem, 2046);
    enem = factory_airCraft1(30, -12);
    spawnListArrayAdd(enem, 2046);
    enem = factory_airCraft1(55, -18);
    spawnListArrayAdd(enem, 2046);
    //
    enem = factory_airCraft1(25, 0);
    spawnListArrayAdd(enem, 2055);
    enem = factory_airCraft1(40, -6);
    spawnListArrayAdd(enem, 2055);
    enem = factory_airCraft1(25, -12);
    spawnListArrayAdd(enem, 2055);
    enem = factory_airCraft1(40, -18);
    spawnListArrayAdd(enem, 2055);
    enem = new Enemy(10, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    enem = new Spawn(2090, enem);
    spawnList.addElement(enem);
    enem = new Enemy(40, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    enem = new Spawn(2120, enem);
    spawnList.addElement(enem);
    enem = new Enemy(50, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    enem = new Spawn(2150, enem);
    spawnList.addElement(enem);
    enem = new Enemy(36, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    enem = new Spawn(2180, enem);
    spawnList.addElement(enem);
    enem = new Enemy(19, 0, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
    enem = new Spawn(2210, enem);
    spawnList.addElement(enem);
    //Strange wave, 2 out of 2s.
    for (var i = 0; i < 20; i++) {
        enem = new Enemy(10 + i + 7, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Spawn(2280 + 10 * i, enem);
        spawnList.addElement(enem);
    }
    for (var i = 0; i < 20; i++) {
        enem = new Enemy(40 - (i + 8), 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Spawn(2480 + 10 * i, enem);
        spawnList.addElement(enem);
    }
    enem = factory_boss1(20, 15);
    spawnListArrayAdd(enem, 2770);
}
/**
 * Adds an array of either linked or unlinked enemy objects to the spawn list.
 * @param enemy_array Array with enemies.
 * @param spawn_time Frame when all enemies should spawn.
 */
function spawnListArrayAdd(enemy_array, spawn_time) {
    for (var i = 0; i < enemy_array.length; i++) {
        var sp = new Spawn(spawn_time, enemy_array[i]);
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
        window.alert("You are pretty dead now. ~~Game Over");
        exchangeRenderLoop(null);
    }
}

/**
 * 
 * @returns 
 */


//Game Screens
/*
 * Render the title screen.
 */
function titleScreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    context.font = "60px Serif";
    context.fillStyle = "red";
    context.fillText("THE FINAL FATE", 120, 150);
    context.font = "17px Nonserif";
    context.fillStyle = "white";
    context.fillText("(C) 2019 Manuel Engel", 270, 580);
    if (aniCount % 5 === aniCount % 10) {
        context.font = "23px Nonserif";
        context.fillStyle = "gold";
        context.fillText("PRESS SPACE TO START", 230, 520);
        //Let the show begin!
        if (shoot === 5) {
            initGame();
        }
    }

}
/**
 Attract mode...
 */
function finalFate() {

}
/**
 * 
 * Actual game loop.
 */
function gamePlay() {
    try {
        // throw new Error("Test exception.");
        updateBullets();
        checkForEnemyHit();
        deleteDeceased();
        updateGameObjects();
        deleteDeceased();
        checkLeaveLevel();
        checkForColli();
        deleteDeceased();
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
    if (player.health === 0) {
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

function renderInGame() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    if (background !== null) {
        background.updateState();
        background.renderState();
    }
    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        var v = displayList.getNext();
        if (!v.invalid)
            v.renderState();

    }
    renderHUD();
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
    context.fillText(player.score, 0, 585);
    context.fillText(player.health, 245, 585);
    context.fillText(player.lifes, 350, 585);
}


//Enemy functions, per enemy.
//TODO 

//All "invalidate" functions. Mostly required for bosses.
function boss1_invalidate() {
    if (this.hp > 0)
        this.hp = this.hp - 7;
    //Don't die if HP higher than 
    if (this.hp > 0) {
        //TODO Add graphical effect?
    } else {
        this.invalid = true;
    }
    if (this.previous !== null && this.hp <= 0 && this.previous.hp > this.hp) {
        this.previous.hp = 0;
        this.previous.invalidate();
    }

    if (this.next !== null && this.hp <= 0 && this.next.hp > this.hp) {
        this.next.hp = 0;
        this.next.invalidate();
    }
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


//"Background" dimension function.
function background_dimension() {
    return null;
}


//"Health Boost" dimension function.
var healthBoost_dimension = meteor_dimension;

//"Fire Boost" dimension function.
var fireBoost_dimension = healthBoost_dimension;

//"Bullet" dimension function.
function bullet_dimension() {
    var x = [this.middleX, this.middleX, this.middleX, this.middleX];
    var y = [this.middleY, this.middleY - 1, this.middleY - 2, this.middleY - 3];
    return new Array(x, y);
}
//"Stupid Enemy" dimension function.
function stupidEnemy_dimension() {
    var x = [this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1];
    var y = [this.middleY - 3, this.middleY - 3, this.middleY - 3, this.middleY - 2, this.middleY - 2, this.middleY - 2, this.middleY - 1, this.middleY - 1, this.middleY - 1, this.middleY, this.middleY, this.middleY, this.middleY + 1, this.middleY + 1, this.middleY + 1];
    return new Array(x, y);
}

//"Meteor" dimension function.
function meteor_dimension() {
    //think of a mobile key pad to understand the coords. 2 shadow layers added.
    var x = [this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1];
    var y = [this.middleY - 3, this.middleY - 3, this.middleY - 3, this.middleY - 2, this.middleY - 2, this.middleY - 2, this.middleY - 1, this.middleY - 1, this.middleY - 1, this.middleY, this.middleY, this.middleY, this.middleY + 1, this.middleY + 1, this.middleY + 1];
    return new Array(x, y);
}
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
//"Background" update function.
function background_update() {
    this.middleY = this.middleY + 0.1;
}

//Boss 2 not attackable part of update function.
function boss2na_update(){}

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


//"Aircraft 2 -  shooting cannon" update funcion

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



//"Stupid Enemy" update function.
function stupidEnemy_update() {
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
    if (this.collides(player)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.health = player.health + 30;
        return;
    }
    this.middleY = this.middleY + 1;
    if (this.collides(player)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        player.health = player.health + 30;
    }

}

//"Fire Boost" update function.
function fireBoost_update() {
    if (this.collides(player)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        if (player.massfire) {
            player.health = player.health * 2 + 120;
        }
        player.massfire = true;
        return;
    }
    this.middleY = this.middleY + 1;
    if (this.collides(player)) {
        this.invalid = true;
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx2.play();
        if (player.massfire) {
            player.health = player.health * 2 + 120;
        }
        player.massfire = true;
    }

}

//All rendering routines.


//Level 1 - The Earth rendering function
function background1_render() {
    context.fillStyle = "blue";
    context.fillRect(0, 0, 800, 600);
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
function stupidEnemy_render() {
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


//"Health Boost" rendering function
function healthBoost_render() {
    //Num pad on mobile.
    context.fillStyle = "green";
    simpleSquare_render.call(this);
}


//"Simple Square" rendering function. To be called by every 3x3 object!!!
function simpleSquare_render() {
    context.fillRect((this.middleX - 1) * 10, (this.middleY - 1) * 10, 10, 10);
    context.fillRect(this.middleX * 10, (this.middleY - 1) * 10, 10, 10);
    context.fillRect((this.middleX + 1) * 10, (this.middleY - 1) * 10, 10, 10);
    //Middle row.
    context.fillRect((this.middleX - 1) * 10, this.middleY * 10, 10, 10);
    context.fillRect(this.middleX * 10, this.middleY * 10, 10, 10);
    context.fillRect((this.middleX + 1) * 10, this.middleY * 10, 10, 10);
    //Upper row.
    context.fillRect((this.middleX - 1) * 10, (this.middleY + 1) * 10, 10, 10);
    context.fillRect(this.middleX * 10, (this.middleY + 1) * 10, 10, 10);
    context.fillRect((this.middleX + 1) * 10, (this.middleY + 1) * 10, 10, 10);
}

//"Fire Boost" rendering function
function fireBoost_render() {
    //Num pad on mobile.
    context.fillStyle = "red";
    simpleSquare_render.call(this);

}

//"Blinky Tracer" rendering function.
var blinkyTracer_render = blinky_render;

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
//Factory Functions.

//Boss 2
function factory_boss2(middleX, middleY){
    var enemy_array = [];
    var enemy_obj = null;
    //Not touchable. Middle point of over
    enemy_obj = new Enemy(middleX, middleY , stupidEnemy_dimension, boss1na_update, stupidEnemy_render, 170, false, 5000, boss1_invalidate);
    giant_boss = enemy_obj;
    enemy_array.push(enemy_obj);
    
    return enemy_array;
}


//Boss 1
function factory_boss1(middleX, middleY) {
    //middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null
    var enemy_array = [];
    var enemy_obj = null;
    middleX = middleX - 2;
    middleY = middleY - 2;
    //Not touchable part.
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 9; j++) {
            enemy_obj = new Enemy(middleX + i, middleY + j, stupidEnemy_dimension, boss1na_update, stupidEnemy_render, 170, false, 5000, boss1_invalidate);
            giant_boss = enemy_obj;
            enemy_array.push(enemy_obj);
        }
    }
    //Left stone-spawner part
    for (var i = 0; i < 3; i++) {
        if (i === 1) {
            enemy_obj = new Enemy(middleX + i, middleY + 9, stupidEnemy_dimension, boss1sa_update, stupidEnemy_render, 170, true, 5000, boss1_invalidate);
        } else
            enemy_obj = new Enemy(middleX + i, middleY + 9, stupidEnemy_dimension, boss1na_update, stupidEnemy_render, 170, true, 5000, boss1_invalidate);
        enemy_array.push(enemy_obj);
    }
    //Middle stone-spawner part
    for (var i = 3; i < 11; i++) {
        if (i === 6 || i === 7) {
            enemy_obj = new Enemy(middleX + i, middleY + 9, stupidEnemy_dimension, boss1a_update, stupidEnemy_render, 170, true, 5000, boss1_invalidate);
        } else
            enemy_obj = new Enemy(middleX + i, middleY + 9, stupidEnemy_dimension, boss1na_update, stupidEnemy_render, 170, true, 5000, boss1_invalidate);
        enemy_array.push(enemy_obj);
    }

    //Right stone-spawner part
    for (var i = 11; i < 14; i++) {
        if (i === 12) {
            enemy_obj = new Enemy(middleX + i, middleY + 9, stupidEnemy_dimension, boss1sa_update, stupidEnemy_render, 170, false, 5000);
        } else
            enemy_obj = new Enemy(middleX + i, middleY + 9, stupidEnemy_dimension, boss1na_update, stupidEnemy_render, 170, false, 5000);
        enemy_array.push(enemy_obj);
    }

    //Linking it all together.
    combineEnemyBricks(enemy_array);
    return enemy_array;

}
//Air Craft 1
function factory_airCraft1(middleX, middleY) {
    var enemy_array = [];
    var enem_obj = new Enemy(middleX - 3, middleY + 2, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX - 2, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 2, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 3, middleY + 2, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    combineEnemyBricks(enemy_array);
    return enemy_array;
}

//Air Craft 2
function factory_airCraft2(middleX, middleY) {
    var enemy_array = [];
    var enem_obj = new Enemy(middleX - 3, middleY + 2, meteor_dimension, aircraft2sc_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX - 2, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 2, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 3, middleY + 2, meteor_dimension, aircraft2sc_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    combineEnemyBricks(enemy_array);
    return enemy_array;
}


//Air Craft 3
function factory_airCraft3(middleX, middleY) {
    var enemy_array = [];
    var enem_obj = new Enemy(middleX - 3, middleY + 2, meteor_dimension, aircraft3sc_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX - 2, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 2, middleY, meteor_dimension, meteor_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    enem_obj = new Enemy(middleX + 3, middleY + 2, meteor_dimension, aircraft3sc_update, stupidEnemy_render, meteor_damage());
    enemy_array.push(enem_obj);
    combineEnemyBricks(enemy_array);
    return enemy_array;
}

//All other functions.

//Make sure that frame counter always continues.
function increaseCount() {
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

    //window.alert("It works....");
    //window.alert(event.keyCode);
    //Firefox based?
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
 * 
 * @returns random X coordinate.
 */
function getRandomX() {
    var rand = Math.random();
    return Math.floor(rand * 80);
}




/**
 * Exchange the rendering loop with another function.
 * Takes care of necessary cleanup and resets frame counter.
 * @param {function} func
 * @returns {undefined}
 */
function exchangeRenderLoop(func) {
    clearInterval(renderTimer);
    renderFunction = func;
    aniCount = 0;
    renderTimer = setInterval(renderFunction, FRAME_RATE);
}