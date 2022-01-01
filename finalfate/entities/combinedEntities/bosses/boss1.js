/**
 * boss1.js
 * Important file for the first level boss, "Mega Aircraft 1"
 */

//Boss 1 - Mega Aircraft 1
function boss1_factory(middleX, middleY) {
    //middleX, middleY, dimensionMatrix, updateRoutine, renderRoutine, damage = 10, killable = true, score = default_score(), invalidFunc = null
        var enemy_array = [];
        var enemy_obj = null;
        middleX = middleX - 2;
        middleY = middleY - 2;
        //Not touchable part.
        for (var i = 0; i < 14; i++) {
            for (var j = 0; j < 9; j++) {
                enemy_obj = new Enemy(middleX + i, middleY + j, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, false, 5000, boss1_invalidate);
                giant_boss = enemy_obj;
                enemy_array.push(enemy_obj);
            }
        }
    //Left stone-spawner part
        for (var i = 0; i < 3; i++) {
            if (i === 1) {
                enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1sa_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
            } else
                enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
            enemy_array.push(enemy_obj);
        }
    //Middle stone-spawner part
        for (var i = 3; i < 11; i++) {
            if (i === 6 || i === 7) {
                enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1a_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
            } else
                enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, true, 5000, boss1_invalidate);
            enemy_array.push(enemy_obj);
        }
    
    //Right stone-spawner part
        for (var i = 11; i < 14; i++) {
            if (i === 12) {
                enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1sa_update, simpleEnemy_render, 170, false, 5000);
            } else
                enemy_obj = new Enemy(middleX + i, middleY + 9, simpleEnemy_dimension, boss1na_update, simpleEnemy_render, 170, false, 5000);
            enemy_array.push(enemy_obj);
        }
    
    //Linking it all together.
        combineEnemyBricks(enemy_array);
        return enemy_array;
    }
    
    //Copy the function for boss 1.
    var boss1_invalidate = boss_invalidate;

    //Boss 1 not attackable part update function.
function boss1na_update() {
    //Make sure the game remembers the player was here.
        if (player.skill < 1) {
            player.checkpoint = 0;
        }
    //Init frame counter of needed.
        if (this.frameCounter === 0)
            this.frameCounter = 1;
        //Moving right...
        if (this.frameCounter > 0) {
            this.frameCounter++;
            //Do actual movement to the right.
            if (this.frameCounter % 1 === 0) {
                this.middleX++;
            }
    //If count exceeded, invert the direction.
            if (this.frameCounter > 60)
                this.frameCounter = -1;
        }
    //Moving left...
        else if (this.frameCounter < 0) {
            this.frameCounter--;
            //Do actual movement to the right.
            if (this.frameCounter % 1 === 0) {
                this.middleX--;
            }
    //If count exceeded, invert the direction.
            if (this.frameCounter < -60)
                this.frameCounter = 1;
        }
    
    }

//Boss 1 attackable and meteors spamming part.
function boss1sa_update() {
    boss1na_update.call(this);
    if (this.frameCounter % 26 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, meteor_dimension, meteor2_update, meteor_render, meteor_damage());
        enemy.score = 0;
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }
}

//Boss 1 attackable and Blinky Tracer spamming part.
function boss1a_update() {
    boss1na_update.call(this);
    if (this.frameCounter % 40 === 0) {
        var enemy = new Enemy(this.middleX, this.middleY, blinkyTracer_dimension, blinkyTracer_update, blinkyTracer_render, blinkyTracer_damage());
        enemy.score = 0;
        enemyList.addElement(enemy, false);
        displayList.addElement(enemy, false);
    }
}
