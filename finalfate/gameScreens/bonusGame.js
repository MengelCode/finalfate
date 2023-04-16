/**
 * skillPrompt.js
 * Contains the rendering cycle for the difficulty selection and additional
 * data used for it.
 */
//Additional strings for difficulty prompt.
//Variables for bonus game.
var bonusgame_box = null;
//var bonusgame_schedTask = null;
var bonusgame_selected = undefined;
var bonusgame_framecounter = undefined;
/**
 * Bullet color bonus game
 * @returns {undefined}
 */
function bonusGame() {
    validateReleasedState();
    checkGamepadRemoved(bonusGame);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, 800, 600);
    context.fillStyle = "cyan";
    context.font = "50px sans-serif";
    context.fillText("BONUS GAME !!", 190, 80);
    if (aniCount < 130)
        return;
    var x_positions = [2, 18, 34, 50, 66];
    if (bonusgame_box === null) {
        bonusgame_box = new Array(5);
        bonusgame_selected = 0;
        bonusgame_framecounter = 0;
    }
    for (var i = 0; i < bonusgame_box.length; i++) {
        bonusgame_box[i] = new BGBox(10 + 160 * i, 160, bonusgame_selected === i ? true : false);
    }

//Args for bullets: color, X coord, Y coord, scalinh
//Bullets in normal color (0)
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            bullet_render(0, x_positions[0] + i * 4, 20 + j * 6, 8.2);
            bullet_render(1, x_positions[1] + i * 4, 20 + j * 6, 8.2);
            bullet_render(2, x_positions[2] + i * 4, 20 + j * 6, 8.2);
            bullet_render(3, x_positions[3] + i * 4, 20 + j * 6, 8.2);
            bullet_render(4, x_positions[4] + i * 4, 20 + j * 6, 8.2);
        }
    }
    for (var i = 0; i < bonusgame_box.length; i++)
        bonusgame_box[i].renderRoutine();
    bonusgame_framecounter = (bonusgame_framecounter + 1) % 18;
    if (bonusgame_framecounter === 17)
        bonusgame_selected = (bonusgame_selected
                + 1) % 5;
    if (shootReleased && shoot) {
        player.bulletColor = bonusgame_selected;
        loadLevel();
    }

}


