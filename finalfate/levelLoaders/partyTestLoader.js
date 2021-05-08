/**
 * partyTestLoader.js
 * Test loader (generator) for the party mode.
 */

function partyTestLoader() {
    var enemyObj = new MeteorAlter(300, 20);
    spawnList.addElement(new Spawn(89, enemyObj, false, true, true), true);
}
