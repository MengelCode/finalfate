/* 
 * level5_background.js
 * 
 * This file does implement the methods of the background in the fifth
 * level of the game.
 */


var background5_update = func_noOp;

function background5_render(){
    clearScreen();
    if(aniCount>260 && aniCount<360){
        context.font = "44px sans-serif";
        context.fillStyle = "red";
        context.fillText("GIVE UP!!",300,240);
    }
    else if(aniCount>660 && aniCount<810){
        context.font = "44px sans-serif";
        context.fillStyle = "red";
        context.fillText("I'LL AVENGE THE BLINKIES!",100,240);
    }
    else if(aniCount>900 && aniCount<1050){
        context.font = "44px sans-serif";
        context.fillStyle = "red";
        context.fillText("DIE A LONESOME DEATH!!",130,240);
    }
}