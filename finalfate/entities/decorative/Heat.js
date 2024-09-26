/**
 * Heat.js
 * Contains the render logic for the hot heat wave created by level 3 boss.
 */

class Heat extends Decoration {
    /**
     * Creates a Heat decoration object.
     * @returns {Heat}
     */
    constructor() {
        super(0, 0, heat_render);

    }

}

//"Heat" rendering function
function heat_render() {
    context.fillStyle = "#550000";
    context.fillRect(0, 0, 800, 600);

    //Additional code while "heat" is active.

    //Starting with relevant coordinates and data. 
    player_x_real = transformToCanvasCoords(player.middleX);
    player_y_real = transformToCanvasCoords(player.middleY);
    //Positions general array.
    flame_positions = [];
    //Array for first part of loop.
    flame_positions[0] = [];
    flame_positions[0][0] = [player_x_real - 22, player_y_real - 18,"#dd0000"];
    flame_positions[0][1] = [player_x_real - 17, player_y_real - 16,"#dd0000"];



    flame_size = 8;

    //Different displays of "flames".
    if(aniCount%3 == 0){
        for(var i = 0; i<flame_positions[0].length; i++){
            context.fillStyle = flame_positions[0][i][2];
            context.fillRect(flame_positions[0][i][0], flame_positions[0][i][1],flame_size,flame_size);       
        }
        
    }

    else if(aniCount%3 == 1){
 
    }

    else {

    }
}

