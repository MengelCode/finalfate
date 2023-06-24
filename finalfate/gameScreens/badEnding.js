/**
 * badEnding.js
 * Contains the code for the bad ending of the game.
 * Possible ending after level 4.
 */


var badEndingScene_moon = null;

function badEndingScene() {
    clearScreen();
    if(!badEndingScene_moon){
     badEndingScene_moon = new MetallicMoonOuterior(350,250,0);   
    }
    badEndingScene_moon.updateRoutine();
    badEndingScene_moon.renderRoutine();
    context.font = "26px sans-serif";
    context.fillStyle = "gold";
    context.fillText("YOUR SCORE: " + player.score,180,560);
}