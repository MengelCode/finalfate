/* 
 * ComingSoon.js
 * Contains the code for the good placeholder ending until
 * level 5 does start to exist.
 */


function comingSoonScene(){
    clearScreen();
    context.font = "36px sans-serif";
    context.fillStyle = "pink";
    context.fillText("COMING ASAP!",250,280);
    context.font = "24px sans-serif";
    context.fillStyle = "gold";
    context.fillText("YOUR SCORE: " + player.score, 180, 560);
    context.font = "12px sans-serif";
    context.fillStyle = "white";
    context.fillText("Play on hard/master again once level 5 is out.",275,450);
}