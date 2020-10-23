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
        var lastValue = 0;
        if (player.checkpoint < 3) {
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
            for (var i = 0; i < 10; i++) {
                var randObj = getCustomRandom(9, 0);
                if (randObj === 6) {
                    enem = airCraft1_factory(getCustomRandom(25, 5), -10);
                } else if (randObj === 2 || randObj === 3) {
                    enem = airCraft3_factory(getCustomRandom(25, 5), -10);
                } else {
                    enem = airCraft2_factory(getCustomRandom(25, 5), -10);
                }

                lastValue = 330 + i * 15;
                spawnListArrayAdd(enem, lastValue);
                if (i === 4) {
                    enem = new FogBomb(6, 4);
                    Spawn.createAndAddSpawn(330 + i * 21, enem);
                }
            }

            for (var i = 0; i < 30; i++) {
                var randObj = getCustomRandom(3, 0);
                lastValue += 36;
                if (randObj === 0) {
                    enem = airCraft3_factory(getCustomRandom(78, 24), -10);
                } else {
                    enem = airCraft2_factory(getCustomRandom(78, 24), -10);
                }
                spawnListArrayAdd(enem, lastValue);
                if (i === 7) {
                    enem = new ShipBuster(6, 40);
                    Spawn.createAndAddSpawn(lastValue + 10, enem);
                } else if (i === 11) {
                    enem = new BlinkyTracer(45, 29);
                    Spawn.createAndAddSpawn(lastValue + 10, enem);
                } else if (i === 14) {
                    enem = new BlinkyTracer(20, 29);
                    Spawn.createAndAddSpawn(lastValue + 10, enem);
                } else if (i === 15) {
                    enem = new BlinkyTracer(57, 29);
                    Spawn.createAndAddSpawn(lastValue + 10, enem);
                }
            }
            enem = new LifeBoost(10, 4);
            lastValue += 20;
            Spawn.createAndAddBoostSpawn(lastValue, enem);
            lastValue += 80;

            for (var i = 0; i < 150; i++) {
                enem = new Blinky(getRandomX(), 28);
                Spawn.createAndAddSpawn(lastValue, enem);
                lastValue += 10;
                if (i % 5 === 4) {
                    var randomSeed = getCustomRandom(4, 0);
                    switch (randomSeed) {
                        case 0:
                            enem = airCraft3_factory(getCustomRandom(78, 24), -10);
                            spawnListArrayAdd(enem, lastValue);
                            break;
                        case 1:
                            for (var j = 1; j < 7; j++) {
                                enem = new BlinkyTracer(10 * j, 3);
                                Spawn.createAndAddSpawn(lastValue, enem);
                            }
                            break;
                        case 2:
                            for (var j = 1; j < 7; j++) {
                                enem = new SimpleEnemy(10 * i, -5);
                                enem.addMultiHealth(2);
                                Spawn.createAndAddSpawn(lastValue, enem);
                            }
                            break;
                        case 3:
                            enem = airCraft3_factory(10, -10);
                            spawnListArrayAdd(enem, lastValue);
                            enem = airCraft3_factory(58, -10);
                            spawnListArrayAdd(enem, lastValue);
                            break;
                        case 4:
                            enem = new FogBomb(getRandomX(), getRandomCustom(50, 25));
                            Spawn.createAndAddSpawn(lastValue, enem);
                            break;
                    }
                }
            }
            lastValue += 79;
            enem = new HealthBoost(40, 8);
            Spawn.createAndAddBoostSpawn(lastValue, enem);
            enem = new HealthBoost(40, -5);
            Spawn.createAndAddBoostSpawn(lastValue, enem);
            enem = new HealthBoost(40, -17);
            Spawn.createAndAddBoostSpawn(lastValue, enem);
            if (player.health < 160) {
                player.health = 160;
            }
        } else if (player.checkpoint === 3) {
            enem = new FireBoost(40, -5);
            Spawn.createAndAddBoostSpawn(lastValue, enem);
            enem = new HealthBoost(40, -17);
            Spawn.createAndAddBoostSpawn(lastValue, enem);
        }
            lastValue+=20;
            enem = new Checkpoint(3);
            Spawn.createAndAddSpawn(lastValue, enem);
            lastValue+=30;
            for(var i = 0; i<70; i++){
            if(i % 10 === 0){
            enem = new ShipBuster(i,20);
            Spawn.createAndAddSpawn(lastValue, enem);
            }    
            enem = new Blinky(getRandomX(),-3);
            enem.addMultiHealth(3);
            Spawn.createAndAddSpawn(lastValue, enem);
            enem = airCraft2_factory(getCustomRandom(78, 24), -10);
            spawnListArrayAdd(enem, lastValue);
            lastValue += 40;
            if (i % 7 === 0) {
                enem = new BlinkyTracer(getRandomX(), -5);
                Spawn.createAndAddSpawn(lastValue, enem);
            }
        }

        lastValue += 25;

        for (var i = 0; i < 50; i++) {
            var rand = getCustomRandom(3, 0);
            switch (rand) {
                case 0:
                   enem = airCraft1_factory(getRandomX(), -10);
                break;
                case 1:
                   enem = airCraft2_factory(getRandomX(), -10);
                break;
                case 2:
                   enem = airCraft3_factory(getRandomX(), -10);
                break;
            }
            spawnListArrayAdd(enem, lastValue);
            lastValue+=22;
        }

    } catch (error) {
        loadingException = error;
    }
}


