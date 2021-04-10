
/**
 * gamePlayArcade.js
 * Contains the rendering cycle for the Arcade Mode gameplay and its helper functions.
 */

/**
 * 
 * Actual game loop.
 */
function gamePlayArcade() {
    if (aniCount === 5 && !musicAlreadyPlayed) {
        simplyPlaySound(bgm);
        musicAlreadyPlayed = true;
    }
    try {
        //  throw new Error("Test exception.");
        if(gamepad_removed){
            //Could theoretically be left out with little more refactoring.
            renderingCycle = gamePlayArcade;
            exchangeRenderLoop(gameNoController,true);
            return;
        }
        updateBullets();
        checkForColli();
        deleteDeceased();
        updateGameObjects();
        checkForColli();
        deleteDeceased();
        checkLeaveLevel();
        window.requestAnimationFrame(renderInGame);
    } catch (error) {
      //Code for title screen.
        crashCauseSet = 1;
        errorObject = error;
       exchangeRenderLoop(crashHandler);  
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
        if(player.skill>-1 && player.noHit){
        shootReleased = false;     
        exchangeRenderLoop(bonusGame);
        }
        else{
        loadLevel();
    }
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
            if(!player.debugNoHit){
            player.noHit = false;
            }
            enemyImminent.invalidate();
            simplyPlaySound(sfx1);
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
                        simplyPlaySound(sfx1);
                        switch (player.skill) {
                            case -2:
                                player.score = player.score + enemy.score / 4;
                                break;
                            case -1:
                                player.score = player.score + enemy.score / 2;
                                break;
                            case 1:
                                player.score = player.score + enemy.score * 2;
                                break;
                            case 2:
                                player.score = player.score + enemy.score * 3;
                                break;
                            default:
                                player.score = player.score + enemy.score;
                        }



                    }
                    bullet.invalidate();
                    //window.alert("Shot the enemy.");

                }
            }
        }
    }
}





/**
 * Lose a life.
 *
 */
function loseLife() {
    player.massfire = false;
    player.quadfire = false;
    player.score = this.savedScore;
    simplyPlaySound(sfx3);
    if (player.lifes > 0) {
        player.lifes--;
        loadLevel();
    } else {
            exchangeRenderLoop(gameOver);
    }
}

/**
 * Prepares an object to be ready for the new collision detection.
 * 
 * @param {type} object
 * @param {type} isShape
 * @param {type} hasPointsArray
 * @param {type} removeOldCD
 * @returns {undefined}
 */
function applyNewCollisionToObject(object,isShape,hasPointsArray){
if(isShape && (!object.width || !object.height || !object.posX || object.posY)){
    throw new Error("This object is no shape.");
}
if(hasPointsArray && (!object.points instanceof Array || object.points.length < 1  
                   || !object.points[0] instanceof Array || object.points[0].length < 2)){
    throw new Error("This object has no collision points.");
}
object.isShape = isShape;
object.hasPointsArray = hasPointsArray;
object.oldCollides = object.collides;
object.collides = newCollides;
}


function newCollides(object){
var shapeObject = null;
var pointsObject = null;
if(this.isShape && object.hasPointsArray){
shapeObject = this;
pointsObject = object;
}
else if(object.isShape && this.hasPointsArray){
shapeObject = object;
pointsObject = this;    
}
if(shapeObject === null){
return this.oldCollides(object);    
}
for(var i = 0; pointsObject.points.length; i++){
if(newCollidesShapePoint(shapeObject.posX,shapeObject.posY,shapeObject.width,
   shapeObject.height,pointsObject[i][0],pointsObject[i][1]))return true;   
}
return false;
}

/**
 * Test if a shape does collide with a point.
 * @param {type} shape_x
 * @param {type} shape_y
 * @param {type} width
 * @param {type} height
 * @param {type} point_x
 * @param {type} point_y
 * @returns {Boolean}
 */
function newCollidesShapePoint(shape_x,shape_y,width,height,point_x,point_y){
var max_x = shape_x + width;
var max_y = shape_y + height;
const debugInput = false;
if(debugInput)window.alert("--New collision debug--\n" +
              "Pos X shape:" + shape_x + "\n" +
              "Pos Y shape:" + shape_y + "\n" +
              "Width shape:" + width + "\n" +
              "Height shape:" + height + "\n" +
              "Pos X point:" + point_x + "\n" +
              "Pos Y point:" + point_y + "\n" );
return ((shape_x <= point_x && point_x <= max_x) && (shape_y <= point_y && point_y <= max_y));
    
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
