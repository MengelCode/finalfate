/**
 * metallicMoon.js
 * 
 * Level 5 - Metallic Moon
 */

function metallicMoonLoader(){
    var enem = new FireBoost(40, 8);
    enem = new Spawn(20, enem, false, true, false, false);
    spawnList.addElement(enem);
    enem = new BulletBoost(40, 8);
    enem = new Spawn(40, enem, false, true, false, false);
    spawnList.addElement(enem);
}