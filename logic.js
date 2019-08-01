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
           this.invalid = true;
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
        };
        //Adds an element to the list at its end. The reset value is optional and should be set
        //to false when the iterator being reset causes problems.
        this.addElement = function (value,reset = true) {
            if (this.next !== null) {
                this.next.addElement(value);
            } else {
                this.next = new LinkedList();
                this.next.value = value;
            }
            if(reset === true){
            this.iterateState = this.next;}
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
    constructor(middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, killable = true, damage = 10) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.giveOccupiedSpace = dimensionMatrix;
        super.updateState = updateRoutine;
        super.renderState = renderRoutine;
        this.killable = killable;
        this.damage = damage;
    }
}

class Bullet extends GameObject {
    
    constructor(middleX,middleY){
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.giveOccupiedSpace = bullet_dimension;
        super.updateState = bullet_update;
        super.renderState = bullet_render;
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
            var x = [middleX, middleX, middleX, middleX - 1, middleX - 2, middleX + 1, middleX + 2, middleX - 2, middleX + 1];
            var y = [middleY, middleY - 1, middleY - 2, middleY, middleY, middleY, middleY, middleY - 1, middleY - 1];
            return new Array(x,y);
        };

        super.updateState = function () {
            if (left && middleX > 2) {
                //left = 0;
                middleX--;
            }
            if (right && middleX < 77) {
                //right = 0;
                middleX++;
            }
            if (up && middleY > 28) {
                middleY--;
            }
            if (down && middleY < 59) {
                middleY++;
            }
            if(shoot){
               var bullet = new Bullet(middleX-2,middleY);
                displayList.addElement(bullet,false);
               bulletList.addElement(bullet,false);
               bullet = new Bullet(middleX+2,middleY);
                displayList.addElement(bullet,false);
                bulletList.addElement(bullet,false);
                
            }
        };
        super.renderState = function () {
            context.fillStyle = "lightgray";
            context.fillRect((middleX - 2) * 10, middleY * 10, 50, 10);
            context.fillStyle = "yellow";
            context.fillRect(middleX * 10, (middleY - 2) * 10, 10, 20);
            context.fillStyle = "orange";
            context.fillRect((middleX - 2) * 10, (middleY - 1) * 10, 10, 10);
            context.fillRect((middleX + 2) * 10, (middleY - 1) * 10, 10, 10);
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
//Linked List to contain enemies, for collision stuff.
var enemyList = new LinkedList();
//Matrix for enemy positions. Used for bullets.
var enemyMatrix = getEnemyMatrix();
//Linked List to contain bullets, for collision stuff.
var bulletList = new LinkedList();
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
            displayList.addElement(new SpaceShip(38, 55));
            var test_enemy = new Enemy(38, 10, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render); 
            displayList.addElement(test_enemy);
            enemyList.addElement(test_enemy);
            test_enemy = new Enemy(18, 10, stupidEnemy_dimension, stupidEnemy_update, stupidEnemy_render); 
            displayList.addElement(test_enemy);
            enemyList.addElement(test_enemy);
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
function gamePlay() {
    updateGameObjects();
    checkForColli();
    renderInGame();
    deleteDeceased();
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
    checkForEnemyHit();

}
// 2A - Check for collisions of the player with enemies or enemy bullets
function checkForEnemyHit() {
    displayList.resetIterator();
    var playerObj = displayList.giveNext();
    var playerArr = playerObj.giveOccupiedSpace();
    enemyList.resetIterator();
    //For all objects...
    while (enemyList.peekNext() !== null) {
        //...which are enemies
       
            // window.alert("I am entered");
            var enemyObj = enemyList.giveNext();
            var enemyArr = enemyObj.giveOccupiedSpace();
            //....pick X and Y from player...
            for (var i = 0; i < playerArr[0].length; i++) {
                //...and get X and Y from enemy...
                for (var j = 0; j < enemyArr[0].length; j++) {
                    //console.log("Going to compare P (" + playerArr[0][i] + "/" + playerArr[1][i] + ") against" + "Q (" + enemyArr[0][j] + "/" + enemyArr[1][j] + ")....");
                    if (playerArr[0][i] === enemyArr[0][j] && playerArr[1][i] === enemyArr[1][j]) {
                        console.log("Cool!");
                        window.alert("Collision detected");
                    }
                    else{
                      
                    }
                }
            }
        
       
    }
}

// 2B
// 3 -  Render game objects.

function renderInGame() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    displayList.resetIterator();
    while (displayList.peekNext() !== null) {
        displayList.giveNext().renderState();

    }
}

// 4 - Delete all elements which declared themselves as no longer needed.

function deleteDeceased() {
    var lists = [displayList,enemyList,bulletList];
    for(var i = 0; i<lists.length; i++){
    lists[i].resetIterator();
    while (lists[i].peekNext() !== null) {
        var objInQuestion = lists[i].giveNext();
        if (objInQuestion.invalid === true) {
            lists[i].deleteElementByValue(objInQuestion);
        }
    }
}
}

//Enemy functions, per enemy.
//All dimension matrix functions.
//TODO 
//"Bullet" dimension function.
function bullet_dimension(){
    var x = [this.middleX,this.middleX,this.middleX];
    var y = [this.middleY,this.middleY-1,this.middleY-2];
    return new Array(x,y);
}
//"Stupid Enemy" dimension function.
function stupidEnemy_dimension() {
    var x = [this.middleX];
    var y = [this.middleY];
    return new Array(x,y);
}

//All update routines.

//"Bullet" update function.
function bullet_update(){
    this.middleY = this.middleY - 1.8;
    if(this.middleY<3)this.invalid = true;
}

//"Stupid Enemy" update function.
function stupidEnemy_update() {
    this.middleY = this.middleY + 0.5;
}

//All rendering routines.

//"Bullet" rendering function
function bullet_render(){
    context.fillStyle = "yellow";
    context.fillRect(this.middleX * 10, this.middleY * 10, 10, 10);
    context.fillStyle = "orange";
    context.fillRect(this.middleX * 10, (this.middleY -1) * 10, 10,10);
    context.fillStyle = "red";
    context.fillRect(this.middleX *  10,(this.middleY -2) * 10,10,10 );
}


//"Stupid Enemy" rendering function
function stupidEnemy_render() {
    context.fillStyle = "white";
    context.fillRect(this.middleX * 10, this.middleY *10 , 10, 10);
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
 * Get the collision matrix
 * @returns {undefined}
 */
function getEnemyMatrix(){
    var arrayX = new Array(80);
    for(var i = 0; i<arrayX.length; i++){
        arrayX[i] = new Array(60);
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