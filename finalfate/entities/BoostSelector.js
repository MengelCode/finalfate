/**
 * BoostSelector.js
 * Invisible enemy object serving the purpose to either spawn Fire Boost or
 * Bullet Boost.
 */

class BoostSelector extends Enemy {
    
    constructor(){
        super(0,0,func_noDim,boostSelector_update,func_noOp,0);
    }
    
}


function boostSelector_update(){
    if(player.massfire){
        var boost = new BulletBoost(player.middleX,player.middleY-5);
        enemyList.addElement(boost, false);
        displayList.addElement(boost, false);
    }
    else {
        var boost = new FireBoost(player.middleX, player.middleY - 5);
        enemyList.addElement(boost, false);
        displayList.addElement(boost, false); 
    }
    this.invalid = true;
}
