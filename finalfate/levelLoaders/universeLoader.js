/**
 * universeLoader.js
 * Contains the function which does enqueue all enemy objects for the third
 * in-game level.
 */

/**
 * 
 * Level 3 - The Universe
 */
function universeLoader() {
    try {
        var enem = null;
        //4000 frames for part A
        enem = new FireBoost(20, 3);
        enem = new Spawn(0, enem, true, true, false, false);
        spawnList.addElement(enem);
        if (player.checkpoint === 2) {
            var enem = null;
            enem = new HealthBoost(45, 0);
            enem = new Spawn(20, enem, false, true, false, false);
            spawnList.addElement(enem);
            spawnList.addElement(new Spawn(80, boss3_factory(30, 0), true));
            return;
        }
        //3980 frames left.
        for (var i = 0; i < 308; i++) {
            var rando = getRandomX() % 16;
            switch (rando) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    enem = airCraft2_factory(getRandomX(), -6);
                    spawnListArrayAdd(enem, 10, true);
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    enem = new Meteor(getRandomX(), 0);
                    enem = new Spawn(10, enem, true);
                    spawnList.addElement(enem);
                    break;
                case 10:
                case 11:
                case 12:
                case 13:
                    enem = new Blinky(getRandomX(), 0);
                    enem = new Spawn(10, enem, true);
                    spawnList.addElement(enem);
                    break;
                case 14:
                case 15:
                    enem = airCraft3_factory(getRandomX(), -6);
                    spawnListArrayAdd(enem, 10, true);
                    break;
            }
            if (i % 100 === 0) {
                enem = new HealthBoost(getRandomX(), 0);
                enem = new Spawn(0, enem, true, true, false, false);
                spawnList.addElement(enem);
            } else if (i % 180 === 0) {
                enem = new LifeBoost(getRandomX(), 0);
                enem = new Spawn(0, enem, true, true, false, false);
                spawnList.addElement(enem);
            }
        }
        spawnList.addElement(new Spawn(80, boss3_factory(30, 0), true));
    } catch (error) {
        loadingException = error;
    }
}

