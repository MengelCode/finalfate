/**
 * metallicMoonLoader.js
 * 
 * Level 5 - Metallic Moon
 */

/**
 * Test function for power-up spawns.
 * @returns {undefined}
 */
function metallicMoonLoaderTest(){
    var enem = new FireBoost(40, 8);
    enem = new Spawn(20, enem, false, true, false, false);
    spawnList.addElement(enem);
    enem = new BulletBoost(40, 8);
    enem = new Spawn(40, enem, false, true, false, false);
    spawnList.addElement(enem);
}

/**
 * Test function for power-up spawns.
 * @returns {undefined}
 */
function metallicMoonLoaderTest2(){
    var enem = new BoostSelector();
    enem = new Spawn(20, enem, false, true, false, false);
    spawnList.addElement(enem);
    var enem = new BoostSelector();
    enem = new Spawn(80, enem, false, true, false, false);
    spawnList.addElement(enem);
}

/**
 * First level generator sub-function.
 * Target length: ~2800 frames.
 * @param {type} spawnOffset
 * @returns {integer spawnOffset}
 */
function mmlSection0(spawnOffset){
    var enem = new BoostSelector();
    enem = new Spawn(spawnOffset, enem, false, true, false, false);
    spawnList.addElement(enem);
    //Use 480 frames in this
    while(spawnOffset<480){
        var elemIndi = getRandomY();
        if(elemIndi<7){
            var enem = airCraft1_factory(getRandomX(), 0);
            spawnListArrayAdd(enem, spawnOffset);
        }
        else if (elemIndi<30){
            var enem = new Meteor(getRandomX(),0);
            enem = new Spawn(spawnOffset, enem);
            spawnList.addElement(enem);
        }
        else if (elemIndi<48){
            var enem = new SimpleEnemy(getRandomX(),0);
            enem = new Spawn(spawnOffset, enem);
            spawnList.addElement(enem); 
        }
        spawnOffset+=10;
    }
    spawnOffset+=30;
    //Frame 510:
    while(spawnOffset<1200){
        var elemIndi = getRandomY();
        if(elemIndi<10){
            var enem = new BlinkyTracer(0,40);
            enem = new Spawn(spawnOffset, enem);
            spawnList.addElement(enem);
            enem = new BlinkyTracer(79,40);
            enem = new Spawn(spawnOffset,enem);
            spawnList.addElement(enem);
        }
        else if(elemIndi<15){
            var enem = new BlinkyTracer(30, 40);
            enem = new Spawn(spawnOffset, enem);
            spawnList.addElement(enem);
            enem = new BlinkyTracer(58, 40);
            enem = new Spawn(spawnOffset, enem);
            spawnList.addElement(enem);  
        }
        else if (elemIndi < 35) {
            var enem = airCraft1_factory(getRandomX(), 0);
            spawnListArrayAdd(enem, spawnOffset);
            var enem = airCraft1_factory(getRandomX(), 0);
            spawnListArrayAdd(enem, spawnOffset);
            var enem = airCraft2_factory(getRandomX(), 0);
            spawnListArrayAdd(enem, spawnOffset);
            var enem = airCraft3_factory(getRandomX(), 0);
            spawnListArrayAdd(enem, spawnOffset);
            var enem = airCraft1_factory(getRandomX(), 0);
            spawnListArrayAdd(enem, spawnOffset);
        }
        else {
            var enem = new SimpleEnemy(10,40);
            enem = new Spawn(spawnOffset, enem);
            enem = new SimpleEnemy(30,40);
            enem = new Spawn(spawnOffset, enem);
            enem = new SimpleEnemy(50,40);
            enem = new Spawn(spawnOffset, enem);
            
            enem = new SimpleEnemy(20,46);
            enem = new Spawn(spawnOffset, enem);
            enem = new SimpleEnemy(40,46);
            enem = new Spawn(spawnOffset, enem);
            enem = new SimpleEnemy(60,46);
            enem = new Spawn(spawnOffset, enem);
            
            enem = new SimpleEnemy(10,23);
            enem = new Spawn(spawnOffset, enem);
            enem = new SimpleEnemy(30,23);
            enem = new Spawn(spawnOffset, enem);
            enem = new SimpleEnemy(50,23);
            enem = new Spawn(spawnOffset, enem);
            
        }
      spawnOffset+=10;
      //Frame: 520.
    }
    return spawnOffset;
}

/**
 * Actual level generation function.
 * @returns {undefined}
 */
function metallicMoonLoader(){
    var spawnOffset = 60;
    switch(player.checkpoint){
        case -1:
             spawnOffset = mmlSection0(spawnOffset);     
    }
}