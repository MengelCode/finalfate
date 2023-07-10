/**
 * metallicMoonLoader.js
 * 
 * Level 5 - Metallic Moon
 */

function metallicMoonLoaderTest(){
    var enem = new FireBoost(40, 8);
    enem = new Spawn(20, enem, false, true, false, false);
    spawnList.addElement(enem);
    enem = new BulletBoost(40, 8);
    enem = new Spawn(40, enem, false, true, false, false);
    spawnList.addElement(enem);
}


function metallicMoonLoaderTest2(){
    var enem = new BoostSelector();
    enem = new Spawn(20, enem, false, true, false, false);
    spawnList.addElement(enem);
    var enem = new BoostSelector();
    enem = new Spawn(40, enem, false, true, false, false);
    spawnList.addElement(enem);
}

function metallicMoonLoader(){
    
}