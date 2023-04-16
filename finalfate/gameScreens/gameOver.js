/**
 * gameOver.js
 * Contains the game over rendering cycle.
 */

/**
 * Prevent that from happening!!
 * @returns {undefined}
 */
function gameOver() {
    clearScreen();
    if (aniCount < 30)
        return;
    if (aniCount === 44) {
        bgm.pause();
        simplyPlaySound(game_over);
    }
    context.font = "60px sans-serif";
    context.fillStyle = "yellow";
    context.fillText("GAME OVER", 180, 320);
    if (aniCount === 90) {
        title_objects = [];
        initAllInput();
        exchangeRenderLoop(titleScreen);
    }
}