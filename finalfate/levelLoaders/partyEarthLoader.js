/* 
 * partyEarthLoader.js
 * The generator for the first true party mode level, "The Earth".
 */

function partyEarthLoader(){
    player.time = 180;
    eventController = new TimeQueue();
    var enemyObj = new SimpleEnemyAlter(300, 20,46,46);
    eventController.internalQueue.addElement(new Spawn(175, enemyObj, false, true, true), true);
    var counterRel = 168;
    for(var i = 0; i<7; i++){
      enemyObj = new SimpleEnemyAlter(209+i*37, 20,46,46);
      eventController.internalQueue.addElement(new Spawn(counterRel, enemyObj, false, true, true), true);
      counterRel-=5;
    }
}

