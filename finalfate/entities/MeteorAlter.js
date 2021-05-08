/* 
 * MeteorAlter.js
 * Meteor enemy object, tailored for Party Mode.
 */

class MeteorAlter extends EnemyAlternate {
    /**
     * 
     * @param {type} posX
     * @param {type} posY
     * @param {type} width
     * @param {type} height
     * @returns {MeteorAlter}
     */
    constructor(posX,posY,width = 80, height = 80){
        super(posX,posY,width,height,meteorAlter_update, meteorAlter_render);
    }    
}

function meteorAlter_update(){
    
}

function meteorAlter_render(){
    context.fillStyle = "brown";
    console.log(this.middleY);
    context.fillRect(this.posX,this.posY,this.width,this.height);
}
