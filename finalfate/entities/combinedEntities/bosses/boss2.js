/**
 * boss2.js
 * File for the boss enemy type "Mega Aircraft 2".
 */

var boss2_y_dimension_relative = 16;

//Boss 2 constants carrier.
function boss2_constants() { }
boss2_constants.prototype.abs_y_pos = 33;
boss2_constants.prototype.abs_x_pos = 20;
boss2_constants.prototype.x = 35;
boss2_constants.prototype.y = 19;
boss2_constants.prototype.dimension = null;
//CHEAT ZONE!!
boss2_constants.prototype.DebugSpawnInstantly = false;

//Copy the function for boss 2.
var boss2_invalidate = boss_invalidate;

//"Boss 2 " dimension function.
function boss2_dimension() {
    var x = [];
    var y = [];
    for (var i = 0; i < boss2_constants.prototype.abs_x_pos; i++) {

    }
    return new Array(x, y);
}

//"Boss 2" dimension function.
var boss2_dimension = meteor_dimension;

//Boss 2 - Mega Aircraft 2
function boss2_factory(middleX, middleY) {
    var enemy_obj = null;
    //middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null
    //Not touchable. Middle point of over
    enemy_obj = new Enemy(middleX, middleY, boss2_dimension, boss2fb_update, boss2_render, damage = 8, true, 0, boss2_invalidate, 270);
    giant_boss = enemy_obj;
    return enemy_obj;
}

//Boss 2 first brick function.
function boss2fb_update() {
    //Create other bricks if they aren't yet created.
    var length = 10;
    var height = 5;
    if (this.next === null) {
        if (player.skill < 1) {
            player.checkpoint = 1;
        }
        var enemArray = [];
        enemArray.push(this);
        for (i = 0; i < length; i++) {
            for (j = 0; j < height; j++) {
                if (i === 0 && j === 0)
                    continue;
                var enem = new Enemy(this.middleX + (2 * i), this.middleY + (1 * j), boss2_dimension, boss2_update, simpleEnemy_render, damage = 8, true, 5000, boss2_invalidate, 270);
                displayList.addElement(enem, false);
                enemyList.addElement(enem, false);
                enemArray.push(enem);
            }
        }
        combineEnemyBricks(enemArray);
    }
    //Increase frame counter.
    this.frameCounter++;
    var enema = null;
    //Spawn right enemy if X modulo 15 == 0
    if (this.frameCounter % 15 === 0) {
        enemb = new Enemy(this.middleX + 3 + 2 * length - 1, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
        enema = new Enemy(this.middleX + 2 * length - 1, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
    }
    //Spawn middle if if X modulo 15 != 0 && X modulo 10 == 0
    else if (this.frameCounter % 10 === 0) {
        enemb = new Enemy(this.middleX + 3 + 2 * length / 2, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
        enema = new Enemy(this.middleX + 2 * length / 2, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
    }
    //Spawn middle if if X modulo 15 != 0 && X modulo 10 != 0 && X mod 5 == 90
    else if (this.frameCounter % 5 === 0) {
        enemb = new Enemy(this.middleX - 3, this.middleY, blinky_dimension, blinkyTracer_update, blinky_render, damage = 8, true);
        enema = new Enemy(this.middleX, this.middleY, blinky_dimension, blinky_update, blinky_render, damage = 8, true);
    }
    //If enem was created, add it.
    if (enema !== null) {
        enema.score = 0;
        enemb.score = 0;
        displayList.addElement(enema, false);
        enemyList.addElement(enema, false);
        displayList.addElement(enemb, false);
        enemyList.addElement(enemb, false);
    }
    //Forcing player back in when he leaves to the left.
    if (player.middleX < this.middleX) {
        player.health = player.health - 12;
        player.middleX = player.middleX + 4;
        player.noHit = false;
    }
    //Uncomment this if you want pinball action.....
    //else if(player.middleX>this.middleX+10){
    else if (player.middleX > this.middleX + 18) {
        player.health = player.health - 12;
        player.middleX = player.middleX - 4;
        player.noHit = false;
    }
}


//Boss 2 update function.
function boss2_update() {

}

//"Boss 2" rendering function.#
function boss2_render() {
    simpleEnemy_render.call(this);
    //Issue 66: Rendering the walls.
    if (this.previous === null) {
        context.fillRect(0, 250, 330, 350);
        context.fillRect(560, 250, 240, 350);
    }
}
