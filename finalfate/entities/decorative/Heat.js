/**
 * Heat.js
 * Contains the render logic for the hot heat wave created by level 3 boss.
 */

class Heat extends Decoration {
    /**
     * Creates a Heat decoration object.
     * @returns {Heat}
     */
    constructor() {
        super(0, 0, heat_render);

    }

}

//"Heat" rendering function
function heat_render() {
    context.fillStyle = "#550000";
    context.fillRect(0, 0, 800, 600);
}

