/* 
 * Boom.js
 * Contains the explosion caused by the ship buster.
 */


class Boom extends Enemy{
    /**
     * Explosion triggered by Ship Buster.
     * @returns {Boom}
     */
    constructor(){
      super(0,0,func_noOp,boom_update,boom_render);  
    }
}

//"Boom" update function.
function boom_update(){
this.frameCounter++;    
if(this.frameCounter === 3)this.invalidate();
}

//"Boom" rendering function
function boom_render(){
 context.fillStyle = "#EE0033";
 context.fillRect(0,0,800,600);   
}