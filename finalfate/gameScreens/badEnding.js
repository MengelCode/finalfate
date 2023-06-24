/**
 * badEnding.js
 * Contains the code for the bad ending of the game.
 * Possible ending after level 4.
 */


var badEndingScene_moon = null;
var badEndingScene_text = new Array();
badEndingScene_text[0] = "Haha, these fools! They thought they got us.";
badEndingScene_text[1] = "But their surprise is yet to come. Universe will";
badEndingScene_text[2] = "belong to us, once and forevermore...";

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
    var text_x = 275;
    var text_y = 450;
    context.font = "12px sans-serif";
    context.fillStyle = "crimson";
    context.fillText(badEndingScene_text[0],text_x,text_y);
    context.fillText(badEndingScene_text[1],text_x,text_y + 20);
    context.fillText(badEndingScene_text[2],text_x,text_y + 40);
    if(aniCount>400){
        exchangeRenderLoop(gameOver);
    }
    
}