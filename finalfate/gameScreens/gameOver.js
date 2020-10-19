/**
 * gameOver.js
 * Contains the game over rendering cycle.
 */

/**
 * Prevent that from happening!!
 * @returns {undefined}
 */
function gameOver() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    if (aniCount < 30)
        return;
    if (aniCount === 44) {
        bgm.pause();
        simplyPlaySound(game_over);
    }
    context.font = "60px Nonerif";
    context.fillStyle = "yellow";
    context.fillText("GAME OVER", 180, 320);
    if (aniCount === 90) {
        initAllInput();
        exchangeRenderLoop(titleScreen);
    }
}