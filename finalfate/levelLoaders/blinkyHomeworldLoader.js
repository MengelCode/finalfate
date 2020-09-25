/**
 * blinkyHomeworldLoader.js
 * Contains the function which does enqueue all enemy objects for the fourth
 * and most likely last regular in-game level.
 */
/**
 * Level 4 - Blinky Homeworld
 * 
 */
function blinkyHomeworldLoader(){
 try{
 var enem = null;
 enem = new Meteor(38,3);
 enem = new Spawn(0, enem);
 spawnList.addElement(enem);
 enem = new FireBoost(38,3);
 enem = new Spawn(1, enem, false, true, false, false);
 spawnList.addElement(enem);
 enem = new HealthBoost(38,3);
 enem = new Spawn(40, enem, false, true, false, false);
 spawnList.addElement(enem);
 enem = new FogBomb(40,20);
 enem = new Spawn(90, enem);
 spawnList.addElement(enem);
 enem = new ShipBuster(40,20);
 enem = new Spawn(160, enem);
 spawnList.addElement(enem);
 enem = new SilentBlinky(40,20);
 enem = new Spawn(300,enem);
 spawnList.addElement(enem);
 }   
 catch(error){
     loadingException  = error;
 }   
}


