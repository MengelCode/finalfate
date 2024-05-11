/**
 * goodEnding.js
 * Contains the code and good ending cutscene of the game.
 * Does happen after level 5.
 */

var endingTextCode = null;

function goodEndingScene(){
    clearScreen();
    bgm_special.pause();
    // PART 2 - Text coming
    if(aniCount>80){
        if(!endingTextCode){
            endingTextCode = new EndingText();
            simplyPlaySound(bgm_sus);
        }
        endingTextCode.updateRoutine();
        endingTextCode.renderRoutine();
    }
    player.renderState();
    //PART 1 - Final explosion and space ship moving.
    if(aniCount<30){
        if(aniCount===15){
           //earthGlobe = new EarthGlobe(350,250); 
        }
        context.fillStyle = "#441111";
        context.fillRect(0,0,800,600);  
    }
    else if(aniCount<40){
        switch (aniCount) {
            case 30:
            context.globalAlpha = 0.9;
            break;
            case 31:
            context.globalAlpha = 0.8;
            break;
            case 32:
            context.globalAlpha = 0.7;
            break;
            case 33:
            context.globalAlpha = 0.6;
            break;
            case 34:
            context.globalAlpha = 0.5;
            break;
            case 35:
            context.globalAlpha = 0.4;
            break;
            case 36:
            context.globalAlpha = 0.3;
            break;
            case 37:
            context.globalAlpha = 0.2;
            break;
            case 38:
            context.globalAlpha = 0.1;
            break;
        
        }
        context.fillStyle = "#441111";
        context.fillRect(0,0,800,600);

    }
    else{
        if(player.middleX < 38){
            player.middleX++;
        }
        else if(player.middleX > 38){
            player.middleX--;
        }
        if(player.middleY < 46){
            player.middleY++;
        }
        else if(player.middleY > 46){
            player.middleY--;
        }
    }


    
    context.globalAlpha = 1.0;
    context.font = "26px sans-serif";
    context.fillStyle = "gold";
    context.fillText("YOUR SCORE: " + player.score,180,560);
}