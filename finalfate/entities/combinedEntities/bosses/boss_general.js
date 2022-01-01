/**
 * boss_general.js
 * Overall functions required by boss enemies.
 */
  /**
   * General invalidation function.
   */
 function boss_invalidate() {
    if (this.hp > 0)
        this.hp = this.hp - 7;
    //Don't die if HP higher than 
    if (this.hp > 0) {
        //TODO Add graphical effect?
    } else {
        this.invalid = true;
    }
    invalidate_Badjacent.call(this);
}