/* 
 * Spawn.js
 * This file contains the Spawn data structure which can hold a GameObject.
 */

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
/**
 * Create and add spawn event for enemy object.
 * @returns {undefined}
 */
Spawn.createAndAddSpawn = function(frameDelta,gameObject,isRelative = false
, isForDisplay = true, isEnemy = true, isBullet = false){
var newSpawn = new Spawn(frameDelta,gameObject,isRelative,isForDisplay,isEnemy,isBullet);
spawnList.addElement(newSpawn);
};


/**
 * Spawns boosts correctly.
 * @returns {undefined}
 */
Spawn.createAndAddBoostSpawn = function(frameDelta,gameObject, isRelative = false){
    Spawn.createAndAddSpawn(frameDelta, gameObject, isRelative, true, false, false);
          
}