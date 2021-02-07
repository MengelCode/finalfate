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
        if (player.checkpoint < 3) {
            this.background4_objects.push(new BlinkySky(horizon, velocity));
            this.background4_objects.push(new BlinkyGround(horizon, velocity));
            //Houses in the background.
            for(var i = 0; i<60; i++){
                 this.background4_objects.push(new House
                    (70+i*10,402,4,10,velocity));
            }
            //Houses in the middleground
           for(var i = 0; i<17; i++){
                this.background4_objects.push(new House
                    (0+i*70,410,15,370,velocity*3.5));
           }
            //Houses in the foreground.
           for(var i = 0; i<12; i++){
                this.background4_objects.push(new House
                    (0+i*80,450,60,270,velocity*4));
           }
        }
        else{
            this.background4_objects.push(new BlinkySky(800,0));
        }
        
    } else {
        for (var i = 0; i < this.background4_objects.length; i++) {
            this.background4_objects[i].updateRoutine();

        }
    }
}