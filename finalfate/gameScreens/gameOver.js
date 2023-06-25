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
    if(player.score > player.bestScore){
        player.bestScore = player.score;
    }
    if (aniCount < 30)
        return;
    if (aniCount === 44) {
        bgm.pause();
        simplyPlaySound(game_over);
    }
    context.font = "60px sans-serif";
    context.fillStyle = "yellow";
    context.fillText("GAME OVER", 180, 320);
    context.font = "26px sans-serif";
    context.fillStyle = "gold";
    context.fillText("LAST SCORE: " + player.score,180,360);
    context.fillText("BEST SCORE: " + player.bestScore,180,410);
    if (aniCount === 140) {
        title_objects = [];
        initAllInput();
        exchangeRenderLoop(titleScreen);
    }
}