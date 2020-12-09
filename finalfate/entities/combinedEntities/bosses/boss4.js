/* 
 * boss4.js
 * Important file for the fourth level boss, "The Bombing Boom".
 */

//Boss 4 update - This entity itself will never be visible on-screen.
function boss4_update() {
    //Initialization.
    if (this.frameCounter === 0) {
        this.tiles_array = [];
        this.enemies_puffer_array = [];
        this.bombs_placed = [];
        this.current_blinky_outside = undefined;
        this.second_pattern = undefined;
        for (var j = 0; j < 3; j++)
            for (var i = 0; i < 18; i++) {
                var enemy_body_part = undefined;
                var x_param = i * 5;
                var y_param = 3 + j * 5;
                if (j % 2 == 0) {
                    enemy_body_part = new SimplestEnemy(x_param, y_param);
                    enemy_body_part.invalidate = func_noOp;
                    this.tiles_array.push(enemy_body_part);
                } else {
                    enemy_body_part = new SilentBlinky(x_param, y_param);
                    this.enemies_puffer_array.push(enemy_body_part);
                }
                displayList.addElement(enemy_body_part, false);
                enemyList.addElement(enemy_body_part, false);

            }
    }       
    //Check if blinky is destroyed.
    else if (this.current_blinky_outside && this.current_blinky_outside.invalid) {
        this.current_blinky_outside = undefined;
        for (var i = 0; i < this.bombs_placed.length; i++) {
        var bomb = this.bombs_placed.pop();
        bomb.invalidate();
        }
    }
    //Check if bombs are destroyed.
    else if (this.current_blinky_outside) {
        var allInvalid = true;
        for (var i = 0; i< this.bombs_placed.length; i++) {
            var bomb = this.bombs_placed[i];
            if (!bomb.invalid) {
            allInvalid = false;
            break;
            }
        }
        if(allInvalid){
         this.bombs_placed = [];
         this.current_blinky_outside.invalid = true;
         this.current_blinky_outside = undefined;
        }
    }
    //Spawn new batch if the old one is gone.
    else if (this.enemies_puffer_array.length>0 && !this.current_blinky_outside 
            && this.frameCounter % 10 === 0) {
        var blinkyToRemove = this.enemies_puffer_array.pop();
        blinkyToRemove.invalidate();
        var blinkyPosition = getCustomRandom(5, 0);
        var positions = new Array(6);
        for (var i = 0; i < positions.length; i++) {
            positions[i] = [getCustomRandom(30, 50), getCustomRandom(22, 28)];
        }
        for (var j = 0; j < positions.length; j++) {
            if (blinkyPosition === j) {
                enemy_body_part = new SilentBlinky(positions[j][0],
                        positions[j][1]);
                this.current_blinky_outside = enemy_body_part;

            } else {
                enemy_body_part = new ShipBuster(positions[j][0],
                        positions[j][1]);
                this.bombs_placed.push(enemy_body_part);

            }
            Spawn.createAndAddSpawn(aniCount + 35, enemy_body_part);
        }
    } else if (this.enemies_puffer_array.length>0 && !this.second_pattern){
        this.frameCounter = -1;
        this.second_pattern = 0;
    }

    this.frameCounter++;
}


/**
 * Factory function for the boss.
 * @returns {Enemy}
 */
function boss4_factory() {
    var first_element = new Enemy(0, 0, func_noDim, boss4_update, func_noOp);
    giant_boss = first_element;
    player.checkpoint = 4;
    return first_element;
}


