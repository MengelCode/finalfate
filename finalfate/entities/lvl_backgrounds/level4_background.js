/* 
 * level4_background.js
 * 
 * This file does implement the methods of the background in the fourth
 * level of the game.
 */

function background4_render(){
    if(!this.background4_objects) return;
    for(var i = 0; i<this.background4_objects.length; i++ )
        this.background4_objects[i].renderRoutine();
    
}

function background4_update() {
    if (!this.background4_objects) {
        this.background4_objects = new Array(0);
        //Y coordinate where the limit between ground and sky is.
        var horizon = 400;
        //Speed of movement of the horizon
        var velocity = 0.12;
        this.background4_objects.push(new BlinkySky(horizon, velocity));
        this.background4_objects.push(new BlinkyGround(horizon, velocity));
        
    } else {
        for (var i = 0; i < this.background4_objects.length; i++) {
            this.background4_objects[i].updateRoutine();

        }
    }
}