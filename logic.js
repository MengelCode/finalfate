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
        this.invalid = false;
        /**Returns an array of 2 arrays.
         //X positions occupied = array 0.
         Y positions occupied = array 1.
         
         */
        this.giveOccupiedSpace = null;

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
            invalid = true;
        };
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
        this.giveNext = function () {
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
        }
        //Adds an element to the list at its end.
        this.addElement = function (value) {
            if (this.next !== null) {
                this.next.addElement(value);
            } else {
                this.next = new LinkedList();
                this.next.value = value;
            }

            this.iterateState = this.next;
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
        this.deleteElementByValue = function (value) {
            this.iterateState = this;
            while (this.iterateState !== null) {
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

        super.giveOccupiedSpace = function () {
            var x = [middleX, middleX, middleX, middleX - 1, middleX - 2, middleX + 1, middleX + 2,middleX-2,middleX+1];
            var y = [middleY, middleY - 1, middleY - 2, middleY, middleY, middleY, middleY,middleY-1,middleY-1];
            return [x, y];
        };
        
        super.updateState = function () {
            if(left){
                //left = 0;
                middleX--;
            }
            if(right){
                //right = 0;
                middleX++;
            }
            if(up){
                middleY--;
            }
              if(down){
                middleY++;
            }
        };
        super.renderState = function (){
            context.fillStyle = "lightgray";
            context.fillRect((middleX - 2) * 10 ,middleY*10,50,10);
            context.fillStyle = "yellow";
            context.fillRect(middleX * 10, (middleY - 2) *10,10,20);
            context.fillStyle = "orange";
            context.fillRect((middleX-2) * 10, (middleY-1) * 10, 10, 10);
            context.fillRect((middleX+2) * 10, (middleY-1) * 10, 10, 10);
        };
        
    }
}

//INIT
const FRAME_RATE = 35;
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
var shoot = document.getElementById("shoot");
var hit = document.getElementById("hit");
var lose = document.getElementById("lose");
//Animation counter.
var aniCount = 0;
//Black background.
context.fillRect(0, 0, 800, 600);
//Render function assigning.
renderFunction = titleScreen;
//Make keys unpressed over time.
//setInterval(keyInvalidator, FRAME_RATE);
//Count all the frames.
setInterval(increaseCount, FRAME_RATE);
//Linked List to use for all kinds of things.
var displayList = new LinkedList();
//Enter rendering cycle.
var renderTimer = setInterval(renderFunction, FRAME_RATE);
window.addEventListener("keydown", getKeyPress);
window.addEventListener("keyup", getKeyRelease);



//FUNCTIONS

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
        //Only for test purposes....
        if (shoot === 5) {
            displayList = new LinkedList();
            displayList.addElement(new SpaceShip(38,55));
            exchangeRenderLoop(gamePlay);
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
function gamePlay(){
    updateGameObjects();
    renderInGame();
}


//Auxillary functions for levels.

//1 - Advance the state of each thing. The battle ship of the player is the first thing by contract.
function updateGameObjects() {
    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        displayList.giveNext().updateState();

    }
}
// 2 - Check for collisions. Again, the premise is that the player is the first object.
function checkForColli() {

}
// 3 -  Render game objects.

function renderInGame() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        displayList.giveNext().renderState();

    }
}


//All other functions.

//Make sure that frame counter always continues.
function increaseCount() {
    aniCount++;
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

    // window.alert("It works....");



    if (event.keyCode === KeyboardEvent.DOM_VK_SPACE) {
        shoot = 5;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_LEFT) {
        left = 5;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_RIGHT) {
        right = 5;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_UP) {
        up = 5;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_DOWN) {
        down = 5;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_P) {
        pause = 5;
    }

}
//Event receiver for key release.
function getKeyRelease(event) {

    // window.alert("It works....");



    if (event.keyCode === KeyboardEvent.DOM_VK_SPACE) {
        shoot = 0;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_LEFT) {
        left = 0;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_RIGHT) {
        right = 0;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_UP) {
        up = 0;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_DOWN) {
        down = 0;
    } else if (event.keyCode === KeyboardEvent.DOM_VK_P) {
        pause = 0;
    }

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