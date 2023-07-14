/**
 * BulletBoost.js
 * The Bullet Boost class.
 */

class BulletBoost extends FireBoost {
    
    constructor(middleX, middleY){
        super(middleX, middleY);
        this.renderState = bulletBoost_render;
        this.updateState = bulletBoost_update;
        super.damage = 0;
        
    }
    
}

function decideBoost(middleX, middleY){
    if(player.massfire){
        return new BulletBoost(middleX,middleY);
    }
    return new FireBoost(middleX,middleY);
}


// "Bullet Boost" update function.
function bulletBoost_update(){
    if (player.collides(this)) {
        this.invalid = true;
        simplyPlaySound(sfx2);
        player.quadfire = true;
        player.quadfireAmmo = 20;
        return;
    }
    this.middleY = this.middleY + 1;
    if (player.collides(this)) {
        this.invalid = true;
        simplyPlaySound(sfx2);
        player.quadfire = true;
        player.quadfireAmmo = 20;
    }
}


// "Bullet Boost" render function.

function bulletBoost_render(){
//Num pad on mobile.
    context.fillStyle = "gray";
    simpleSquare_render.call(this);
    context.fillStyle = "gold";
    //F
    //Upper line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 24, 7);
    //Left line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) - 6, 7, 24);
    //Middle line
    context.fillRect((this.middleX * 10) - 10, (this.middleY * 10) + 5, 24, 7);
}