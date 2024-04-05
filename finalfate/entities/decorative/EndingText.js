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
    "Test 1",
    "Test 2",
    "",
    "",
    "Test 3",
    "",
    "",
    "",
    "",
    "",
    "",
    "Test 4",
    "\0",
];


function endingText_render(){
    context.fillStyle = "gray";
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
        element.pos_y-=1;
    });

    if(endingTextMoving[i] && endingTextMoving[i].pos_y < -28){
        endingTextMoving.shift();
    }
    
    this.frameCounter++;
}