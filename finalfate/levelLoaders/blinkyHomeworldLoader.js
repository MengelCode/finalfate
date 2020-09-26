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
            Spawn.createAndAddSpawn(90 + 10 * i, enem);
            if (i === 5) {
                enem = new ShipBuster(70, 20);
                Spawn.createAndAddSpawn(145, enem);
            }
        }
        enem = new ShipBuster(25, 20);
        Spawn.createAndAddSpawn(164, enem);
    } catch (error) {
        loadingException = error;
    }
}


