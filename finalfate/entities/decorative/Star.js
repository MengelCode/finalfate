/**
 * Star.js
 * Contains the Star logic used for the background in level 2.
 */

class Star extends Decoration {
    /**
     * Creates a Star decoration object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Star}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, star_render);

    }

}

//Star Rendering function
function star_render() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (i === 1 && j === 1)
                context.fillStyle = "#CCCCCC";
            else
                context.fillStyle = "#666666";
            context.fillRect((this.middleX * 10 - 2 + (i * 2)), (this.middleY * 
                    10 - 2 + (j * 2)), 2, 2);
        }
    }


}

//Star factory function.
function star_factory(offsetX = 0,offsetY = 0) {
    var starList = new LinkedList();
//Decide where to place stars.
    for (var i = 0; i < 80; i++) {
        for (var j = 0; j < 60; j++) {
            var randomNumber = Math.random();
            //Chance of star appearance 1/n.
            var chance = 230;
            randomNumber = Math.floor(randomNumber * chance);
            if (randomNumber % chance === 0) {
                starList.addElement(new Star(i + offsetX, j + offsetY));
            }
        }
    }
    return starList;
}