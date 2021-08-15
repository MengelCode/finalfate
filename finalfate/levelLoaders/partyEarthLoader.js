/* 
 * partyEarthLoader.js
 * The generator for the first true party mode level, "The Earth".
 */

function partyEarthLoader(){
    player.time = 180;
    eventController = new TimeQueue();
     var enemyObj = new MeteorAlter(300, 20,46,46);
     eventController.internalQueue.addElement(new Spawn(170, enemyObj, false, true, true), true);
}

