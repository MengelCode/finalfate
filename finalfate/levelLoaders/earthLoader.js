/**
 * earthLoader.js
 * Contains the function which does enqueue all enemy objects for the first
 * in-game level.
 */

/**
 * 
 * Level 1 - The Sky
 * Length: 2770 frames.
 */
function earthLoader() {
    try {
        if (player.checkpoint === 0) {
            player.noHit = false;
            var enem = null;
            enem = new FireBoost(45, 0);
            enem = new Spawn(20, enem, false, true, false, false);
            spawnList.addElement(enem);
            enem = boss1_factory(20, 15);
            spawnListArrayAdd(enem, 120);
            return;
        }
        background = new Enemy(0, 0, background_dimension, background1_update, background1_render);
        var enem = null;
//Slow beginning...
        //enem = new Enemy(26, 0, meteor_dimension, meteor_update, meteor_render, meteor_damage());
        enem = new Meteor(26, 0);
        enem = new Spawn(150, enem);
        spawnList.addElement(enem);
        enem = new Meteor(36, 0);
        enem = new Spawn(240, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(72, 0);
        spawnListArrayAdd(enem, 260);
        enem = new SimpleEnemy(9, 0);
        enem = new Spawn(290, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(69, 0);
        enem = new Spawn(310, enem);
        spawnList.addElement(enem);
        //Gets a bit more...hurried.
        enem = airCraft1_factory(44, 0);
        spawnListArrayAdd(enem, 328);
        enem = new Meteor(11, 0);
        enem = new Spawn(370, enem);
        spawnList.addElement(enem);
        enem = new Meteor(40, 0);
        enem = new Spawn(380, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(20, 0);
        spawnListArrayAdd(enem, 400);
        enem = new Meteor(23, 0);
        enem = new Spawn(410, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(55, 0);
        enem = new Spawn(440, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(33, 0);
        enem = new Spawn(460, enem);
        spawnList.addElement(enem);
        enem = new Meteor(40, 0);
        enem = new Spawn(480, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(22, 0);
        spawnListArrayAdd(enem, 500);
        enem = new Meteor(20, 0);
        enem = new Spawn(530, enem);
        spawnList.addElement(enem);
        //Everything rains at you....
        enem = new SimpleEnemy(30, 0);
        enem = new Spawn(540, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(13, 0);
        enem = new Spawn(570, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(79, 0);
        enem = new Spawn(600, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(55, 0);
        enem = new Spawn(630, enem);
        spawnList.addElement(enem);
        enem = new SimpleEnemy(33, 0);
        enem = new Spawn(640, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(28, 0);
        spawnListArrayAdd(enem, 670);
        //New enemy....
        enem = new Blinky(55, 0);
        enem = new Spawn(760, enem);
        spawnList.addElement(enem);
        enem = new Blinky(20, 0);
        enem = new Spawn(870, enem);
        spawnList.addElement(enem);
        enem = new Blinky(70, 0);
        enem = new Spawn(1000, enem);
        spawnList.addElement(enem);
        //Strange wave, 1 out of 2s.
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(10 + i + 2, 0);
            enem = new Spawn(1100 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(40 - (i + 3), 0);
            enem = new Spawn(1300 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        //frameDelta, gameObject, isRelative = false, isForDisplay = true, isEnemy = true, isBullet = false
        enem = new HealthBoost(52, 0);
        enem = new Spawn(20, enem, true, true, false, false);
        spawnList.addElement(enem);
        //1542
        enem = new Meteor(38, 0);
        enem = new Spawn(1580, enem);
        spawnList.addElement(enem);
        enem = new Meteor(25, 0);
        enem = new Spawn(1610, enem);
        spawnList.addElement(enem);
        enem = new Meteor(63, 0);
        enem = new Spawn(1640, enem);
        spawnList.addElement(enem);
        enem = new Meteor(27, 0);
        enem = new Spawn(1650, enem);
        spawnList.addElement(enem);
        enem = new Meteor(44, 0);
        enem = new Spawn(1666, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(11, 0);
        spawnListArrayAdd(enem, 1670);
        enem = airCraft1_factory(37, 0);
        spawnListArrayAdd(enem, 1670);
        enem = airCraft1_factory(68, 0);
        spawnListArrayAdd(enem, 1670);
        enem = airCraft1_factory(31, 0);
        spawnListArrayAdd(enem, 1720);
        enem = airCraft1_factory(58, 0);
        spawnListArrayAdd(enem, 1720);
        enem = airCraft1_factory(70, 0);
        spawnListArrayAdd(enem, 1720);
        enem = airCraft1_factory(11, 0);
        spawnListArrayAdd(enem, 1750);
        enem = new FireBoost(22, 0);
        enem = new Spawn(1750, enem, false, true, false, false);
        spawnList.addElement(enem);
        enem = airCraft1_factory(44, 0);
        spawnListArrayAdd(enem, 1750);
        enem = airCraft1_factory(55, 0);
        spawnListArrayAdd(enem, 1750);
        enem = new BlinkyTracer(70, 0);
        enem = new Spawn(1900, enem);
        spawnList.addElement(enem);
        enem = airCraft1_factory(11, 0);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(11, -6);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(11, -12);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(11, -18);
        spawnListArrayAdd(enem, 1950);
        enem = airCraft1_factory(70, 0);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(70, -6);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(70, -12);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(70, -18);
        spawnListArrayAdd(enem, 1980);
        enem = airCraft1_factory(40, 0);
        spawnListArrayAdd(enem, 2010);
        enem = airCraft1_factory(40, -6);
        spawnListArrayAdd(enem, 2010);
        enem = airCraft1_factory(40, -12);
        spawnListArrayAdd(enem, 2010);
        enem = airCraft1_factory(40, -18);
        spawnListArrayAdd(enem, 2010);
        //
        enem = airCraft1_factory(40, 0);
        spawnListArrayAdd(enem, 2036);
        enem = airCraft1_factory(40, -6);
        spawnListArrayAdd(enem, 2036);
        enem = airCraft1_factory(40, -12);
        spawnListArrayAdd(enem, 2036);
        enem = airCraft1_factory(40, -18);
        spawnListArrayAdd(enem, 2036);
        //
        enem = airCraft1_factory(30, 0);
        spawnListArrayAdd(enem, 2046);
        enem = airCraft1_factory(55, -6);
        spawnListArrayAdd(enem, 2046);
        enem = airCraft1_factory(30, -12);
        spawnListArrayAdd(enem, 2046);
        enem = airCraft1_factory(55, -18);
        spawnListArrayAdd(enem, 2046);
        //
        enem = airCraft1_factory(25, 0);
        spawnListArrayAdd(enem, 2055);
        enem = airCraft1_factory(40, -6);
        spawnListArrayAdd(enem, 2055);
        enem = airCraft1_factory(25, -12);
        spawnListArrayAdd(enem, 2055);
        enem = airCraft1_factory(40, -18);
        spawnListArrayAdd(enem, 2055);
        enem = new BlinkyTracer(10, 0);
        enem = new Spawn(2090, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(40, 0);
        enem = new Spawn(2120, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(50, 0);
        enem = new Spawn(2150, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(36, 0);
        enem = new Spawn(2180, enem);
        spawnList.addElement(enem);
        enem = new BlinkyTracer(19, 0);
        enem = new Spawn(2210, enem);
        spawnList.addElement(enem);
        //Strange wave, 2 out of 2s.
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(10 + i + 7, 0);
            enem = new Spawn(2280 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        for (var i = 0; i < 20; i++) {
            enem = new Meteor(40 - (i + 8), 0);
            enem = new Spawn(2480 + 10 * i, enem);
            spawnList.addElement(enem);
        }
        enem = boss1_factory(20, 15);
        spawnListArrayAdd(enem, 2770);
    } catch (error) {
        loadingException = error;
    }
}