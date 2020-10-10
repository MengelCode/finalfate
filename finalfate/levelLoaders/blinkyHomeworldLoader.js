/**
 * blinkyHomeworldLoader.js
 * Contains the function which does enqueue all enemy objects for the fourth
 * and most likely last regular in-game level.
 */

const DEBUG_COMPLETE_RANDOM = false;

/**
 * Level 4 - Blinky Homeworld
 * 
 */
function blinkyHomeworldLoader() {
    while (DEBUG_COMPLETE_RANDOM) {
        window.alert("Random X normal:" + getRandomX());
        window.alert("Random X custom:" + getCustomRandom(80, 0));
        window.alert("Random custom 20 to 40:" + getCustomRandom(40, 20));
    }
    try {
        var enem = null;
        for (var i = 0; i < 6; i++) {
            enem = new FogBomb(20 + i * 8, 20 + i * 5);
            Spawn.createAndAddSpawn(90 + 10 * i, enem);
            if (i === 5) {
                enem = new ShipBuster(70, 20);
                Spawn.createAndAddSpawn(145, enem);
            }
        }
        enem = new ShipBuster(25, 20);
        Spawn.createAndAddSpawn(164, enem);
        enem = new ShipBuster(54, 20);
        Spawn.createAndAddSpawn(170, enem);
        enem = new FireBoost(40, 8);
        Spawn.createAndAddBoostSpawn(260, enem);
        enem = airCraft2_factory(30, -6);
        spawnListArrayAdd(enem, 290);
        enem = airCraft2_factory(70, -6);
        spawnListArrayAdd(enem, 290);
        enem = airCraft2_factory(50, -6);
        spawnListArrayAdd(enem, 290);
        enem = airCraft2_factory(35, -6);
        spawnListArrayAdd(enem, 300);
        enem = airCraft2_factory(60, -6);
        spawnListArrayAdd(enem, 300);
        enem = airCraft2_factory(10, -6);
        spawnListArrayAdd(enem, 300);
        var lastValue = 0;
        for (var i = 0; i < 10; i++) {
            var randObj = getCustomRandom(9, 0);
            if (randObj === 6) {
                enem = airCraft1_factory(getCustomRandom(25, 5), -10);
            }
            else if (randObj === 2 || randObj === 3) {
                enem = airCraft3_factory(getCustomRandom(25, 5), -10);
            }
            else{
                enem = airCraft2_factory(getCustomRandom(25, 5), -10);
            }
            
            lastValue = 330 + i * 15;
            spawnListArrayAdd(enem, lastValue);
            if (i === 4) {
                 enem = new FogBomb(6, 4);
                Spawn.createAndAddSpawn(330 + i * 21, enem);
            }
        }

        for (var i = 0; i < 40; i++) {
            var randObj = getCustomRandom(3, 0);
            lastValue += 16;
            if (randObj === 0) {
                enem = airCraft3_factory(getCustomRandom(78, 24), -10);
            } else {
                enem = airCraft2_factory(getCustomRandom(78, 24), -10);
            }
             spawnListArrayAdd(enem, lastValue);
              if (i === 7) {
                 enem = new ShipBuster(6, 40);
                Spawn.createAndAddSpawn(lastValue + 10, enem);
            }
             else if (i === 11) {
                 enem = new BlinkyTracer(45, 29);
                Spawn.createAndAddSpawn(lastValue + 10, enem);
            }
            else if (i === 14) {
                 enem = new BlinkyTracer(20, 29);
                Spawn.createAndAddSpawn(lastValue + 10, enem);
            }
            else if (i === 15) {
                 enem = new BlinkyTracer(57, 29);
                Spawn.createAndAddSpawn(lastValue + 10, enem);
            }
        }
        enem = new LifeBoost(10,4);
        lastValue+= 20;
        Spawn.createAndAddBoostSpawn(lastValue,enem);
        

    } catch (error) {
        loadingException = error;
    }
}


