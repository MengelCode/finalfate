/**
 * FogBomb.js
 * Contains the FogBomb class which creates Fog if not shot down.
 */


class FogBomb extends Bomb {
    /**
     * Create a fog bomb.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {FogBomb}
     */
    constructor(middleX,middleY){
        super(middleX,middleY,fogBomb_dimension,fogBomb_update,fogBomb_render,fogBomb_invalidateSpecial,100);
    }
        
}
//"Fog Bomb" update function. (Does nothing, as I think it should be.)
var fogBomb_update = func_noOp;

//"Fog Bomb" dimension function.
var fogBomb_dimension = meteor_dimension;

//Fog Bomb rendering function.
function fogBomb_render (){
    performFadeIn.call(this,3,13);
    meteor_render.call(this);
    context.globalAlpha = 1.0;
}
//"Special Invalidate" functions. First use: Bomb detonation in-game.
//"Fog Bomb" special invalidation function.
function fogBomb_invalidateSpecial(){
    simplyPlaySound(sfx1);
    displayList.addElement(new Fog(),false);
}