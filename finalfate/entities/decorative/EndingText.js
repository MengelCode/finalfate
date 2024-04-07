/**
 * EndingText.js
 * Logic and content for the text of the good ending.
 */

class EndingText extends Decoration {

    constructor(){
        super(0,0,endingText_render,endingText_update);
        this.frameCounter = 0;
        this.endReached = false;
    }


}
//Ending text currently displayed.
var endingTextMoving = new Array();

var endingTextObject = [
    "The fight is over.",
    "",
    "",
    "",
    "The Blinkies have all been defeated",
    "and Metallic Moon has fallen.",
    "Humanity can continue to live on.",
    "",
    "",
    "",
    "It is time to go home and be",
    "recognized as the hero you are!",
    "",
    "",
    "",
    "~THE FINAL FATE ~",
    "",
    "",
    "GitHub Contributors",
    "",
    "Ichbestimmtnicht - Docker / README",
    "VicFinistere - README / Issues / PRs",
    "karakasis - Issues / PRs",
    "gitvitox - PRs",
    "Fibii -  Issues",
    "",
    "",
    "Many, many silent supporters, fans",
    "and contributors... like K and.",
    "Einsamer Wolf.",
    "",
    "And you, for being like one of the few",
    "people ever seeing this.",
    "",
    "",
    "Main Development / Sound / Pixel Art",
    "MengelCode / Manuel Engel",
    "",
    "",
    "",
    "Est. 2019-2024",
    "",
    "",
    "THANK YOU FOR PLAYING!!!",
    "",
    "",
    "",
    "",
    "\0",

];


function endingText_render(){
    context.fillStyle = "white";
    context.font = "28px serif";
    for(var i = 0; i<endingTextMoving.length; i++){
        context.fillText(endingTextMoving[i].text,endingTextMoving[i].pos_x,endingTextMoving[i].pos_y);
    }
}

function endingText_update(){
    // Part 0: Do nothing if scroll is over.
    if(this.endReached){
        return;
    }
    // Part 1: Insert new line every X frames.
    if(this.frameCounter%30==29){
        var textAdd = endingTextObject.shift();
        if(textAdd == "\0"){
            this.endReached=true;
            return;
        }
        endingTextMoving.push({
            text : textAdd,
            pos_x : 250,
            pos_y : 595,
        });
    }
    endingTextMoving.forEach(element => {
        //Part 2: Move text.
        element.pos_y-=3;
    });

    if(endingTextMoving[i] && endingTextMoving[i].pos_y < -28){
        endingTextMoving.shift();
    }
    
    this.frameCounter++;
}