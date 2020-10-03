/**
 * blinkyHomeworldLoader.js
 * Contains the function which does enqueue all enemy objects for the fourth
 * and most likely last regular in-game level.
 */
/**
 * Level 4 - Blinky Homeworld
 * 
 */
function blinkyHomeworldLoader() {
    try {
        var enem = null;
        for (var i = 0; i < 7; i++) {
            enem = new FogBomb(20 + i * 8, 20 + i * 5);
            enem.addMultiHealth(2);
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
    } catch (error) {
        loadingException = error;
    }
}


