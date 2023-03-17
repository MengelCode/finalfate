/**
 * solarSystemLoader.js
 * Contains the function which does enqueue all enemy objects for the second
 * in-game level.
 */

/**
 * 
 * Level 2 - The Solar System
 */
function solarSystemLoader() {
    try {
        background = new Enemy(0, 0, background_dimension, background1_update, background2_render);
        var enem = null;

        if (boss2_constants.prototype.DebugSpawnInstantly) {
            enem = boss2_factory(boss2_constants.prototype.x, boss2_constants.prototype.y);
            enem = new Spawn(15, enem);
            spawnList.addElement(enem);
            return;
        }
        if (player.checkpoint === 1) {
            player.noHit = false;
            var enem = null;
            enem = new FireBoost(45, 0);
            enem = new Spawn(20, enem, false, true, false, false);
            spawnList.addElement(enem);
            enem = boss2_factory(boss2_constants.prototype.x, boss2_constants.prototype.y);
            enem = new Spawn(180, enem);
            spawnList.addElement(enem);
            return;
        }

        for (var i = 0; i < 58; i++) {
            var rand = getRandomX();
            enem = new Meteor(rand, 0);
            //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
            enem = new Spawn(150 + i * 20, enem);
            spawnList.addElement(enem);
            switch (i) {
                //Series 1, blinkyTracer with bias to the left.
                case 4:
                case 11:
                case 16:
                case 23:
                case 30:
                case 45:
                case 50:
                case 52:
                case 54:
                case 56:
                    enem = new BlinkyTracer(rand - 2, 0);
                    enem = new Spawn(150 + i * 20, enem);
                    spawnList.addElement(enem);
                    break;
                    //Series 2, blinkyTracer with bias to the right. 
                case 8:
                case 14:
                case 28:
                case 36:
                case 44:
                case 51:
                case 53:
                case 55:
                case 57:
                    enem = new BlinkyTracer(rand + 3, 0);
                    enem = new Spawn(150 + i * 20, enem);
                    spawnList.addElement(enem);
                    break;
                    //Spawn 1, health boost.
                case 10:
                    enem = new HealthBoost(30, 0);
                    enem = new Spawn(20, enem, true, true, false, false);
                    spawnList.addElement(enem);
                    break;
                    //Spawn 2, fire boost.
                case 24:
                    enem = new FireBoost(22, 0);
                    enem = new Spawn(20, enem, true, true, false, false);
                    spawnList.addElement(enem);
                    break;
            }
        }
        //Frame: 1290
        enem = airCraft2_factory(65, -6);
        spawnListArrayAdd(enem, 1300);
        enem = airCraft2_factory(50, -6);
        spawnListArrayAdd(enem, 1300);
        enem = airCraft2_factory(10, -6);
        spawnListArrayAdd(enem, 1300);
        //
        enem = airCraft2_factory(30, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(75, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(10, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(44, -6);
        spawnListArrayAdd(enem, 1350);
        enem = airCraft2_factory(0, -6);
        spawnListArrayAdd(enem, 1350);
        //Blinky mania!!!
        for (var i = 0; i < 15; i++) {
            enem = new BlinkyTracer(getRandomX(), 0);
            //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
            enem = new Spawn(1400 + i * 20, enem);
            spawnList.addElement(enem);
            if (i % 5 === 0) {
                var rando = getRandomX() % 2 === 0;
                if (rando) {
                    enem = new BlinkyTracer(78, 28);
                } else
                    enem = new BlinkyTracer(-1, 28);
                enem = new Spawn(1400 + i * 20, enem);
                spawnList.addElement(enem);
            }
        }
        //Frame: 2180 old. 1880 new.
        //A bit more randomness.
        for (var i = 0; i < 120; i++) {
            //window.alert(2217 + 119 * 15);
            // modulo division by 7 will decide the object to spawn.
            // 0 = Blinky Tracer, 1-2 = Meteor, 3-5 = AirCraft 2, 6 = Blinky
            var randon = getRandomX() % 7;
            var enem = null;
            if (i === 20 || i === 77) {
                enem = new HealthBoost(player.middleX, 0);
                enem = new Spawn(1817 + i * 15, enem, false, true, false, false);
                spawnList.addElement(enem);
            }
            //Object generation.
            switch (randon) {
                case 0:
                    enem = new BlinkyTracer(getRandomX(), 0);
                    break;
                case 1:
                case 2:
                    enem = new Meteor(getRandomX(), 0);
                    break;
                case 3:
                case 4:
                case 5:
                    enem = airCraft2_factory(getRandomX(), -5);
                    spawnListArrayAdd(enem, 1817 + i * 15);
                    break;
                case 6:
                    enem = new Blinky(getRandomX(), 0);
                    break;

            }
            if (randon !== 3 && randon !== 4 && randon !== 5) {
                enem = new Spawn(1817 + i * 15, enem);
                spawnList.addElement(enem);
            }
        }
        //Frame: 4002 old. 3702 new.
        //Blinky mania!!!
        for (var i = 0; i < 30; i++) {

            enem = new BlinkyTracer(getRandomX(), 0);
            //enem = new Enemy(Math.random() * (80),0,meteor_dimension, meteor_update, meteor_render, meteor_damage());
            enem = new Spawn(3730 + i * 20, enem);
            spawnList.addElement(enem);
            if (i % 5 === 0) {
                var rando = getRandomX() % 2 === 0;
                if (rando) {
                    enem = new BlinkyTracer(78, 11);
                } else
                    enem = new BlinkyTracer(-1, 11);
                enem = new Spawn(3730 + i * 20, enem);
                spawnList.addElement(enem);
            }
        }
        //Frame: 5410 old. 4310 new.
        enem = boss2_factory(boss2_constants.prototype.x, boss2_constants.prototype.y);
        enem = new Spawn(4310, enem);
        spawnList.addElement(enem);
    } catch (error) {
        loadingException = error;
    }
}