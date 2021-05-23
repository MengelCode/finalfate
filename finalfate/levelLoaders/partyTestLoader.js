/**
 * partyTestLoader.js
 * Test loader (generator) for the party mode.
 */

function partyTestLoader() {
    //var enemyObj = new MeteorAlter(300, 20,35,35);
    var enemyObj = new MeteorAlter(300, 20,46,46);
    spawnList.addElement(new Spawn(89, enemyObj, false, true, true), true);
    enemyObj = new AlienShipAlt(200,-80,46,77);
    spawnList.addElement(new Spawn(95, enemyObj, false, true, true), true);
    for(var i = 0; i<16; i++){
    enemyObj = new SimpleEnemyAlter(240+i*16, 20,42,42);
    spawnList.addElement(new Spawn(109+i*25, enemyObj, false, true, true), true);    
    }
    for(var i = 0; i<16; i++){
    enemyObj = new BlinkyAlter(100+i*40, 20,42,42);
    spawnList.addElement(new Spawn(370+i*25, enemyObj, false, true, true), true);    
    }
    
}
