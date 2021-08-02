/* 
 * TimeQueue.js
 * Queue for elements to place in Party Mode, clock-based.
 * Added to normal "Spawn" queue when a certain number of seconds has passed.
 */


class TimeQueue{
    /**
     * Create a TimeQueue in order to add entities.
     * @returns {TimeQueue}
     */
   constructor(){
     this.internalQueue = new LinkedList();
   } 
    
    
}

TimeQueue.prototype.checkEventQueue = function(){
    var next = this.internalQueue.getNext();
    while(next !== null && next.frameDelta<=player.time){
        spawnList.addElement(next);
        next = this.internalQueue.getNext();
    }
}