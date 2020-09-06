/**
 * SpaceShip.js
 * Contains the Player class along with its functions.
 * Much of the in-game functionality, including moving, will go here.
 */

//Instances of GameObject.
class SpaceShip extends GameObject {
    /**
     * Creates our space ship.
     * @param {integer} middleX
     * @param {integer} middleY
     * @returns {SpaceShip}
     */
    constructor(middleX, middleY) {
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        super.getOccupiedSpace = function () {
            var x = [this.middleX, this.middleX, this.middleX, this.middleX - 1, this.middleX - 2, this.middleX + 1, this.middleX + 2, this.middleX - 2, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1];
            var y = [this.middleY, this.middleY - 1, this.middleY - 2, this.middleY, this.middleY, this.middleY, this.middleY, this.middleY - 1, this.middleY - 1, this.middleY + 1, this.middleY + 1, this.middleY + 1];
            for (var i = 0; i < y.length; i++) {
                y[i] -= 5;
            }
            var x_org_length = x.length;

            for (var i = 0; i < x_org_length; i++) {
                x.push(x[i] - 1);
                y.push(y[i]);
            }
            if (left) {
                for (var i = 0; i < x.length; i++) {
                    x[i] -= 2;
                }
            }
            if (right) {
                for (var i = 0; i < x.length; i++) {
                    x[i] += 2;
                }
            }

            return new Array(x, y);
        };
        //Keyboard thingie released?
        this.keyReleased = true;
        //Quad-fire upgrade collected?
        this.quadfire = false;
        //Auto-fire upgrade collected?
        this.massfire = false;
        //Auto-fire cooldown.
        this.cooldown = 0;
        //Selected difficulty level.
        //-2 Lowest, 0 Middle, +2 Highest.
        this.skill = 0;
        //CHEAT ZONE!!
        this.debugNoHit = false;
        //Not being hit.
        this.noHit = true;
        /**
         * Bullet color.
         * 0 = Normal.
         * 1 = Red-white.
         * 2 = Purple.
         * 3 = Blueish.
         * 4 = Plain yellow.
         */
        this.bulletColor = 0;
        //POTENTIAL CHEAT ZONE.
        //Checkpoint memory. Because levels start to count with zero, I set the default to -1 here.
        this.checkpoint = -1;
        super.updateState = function () {
            //If memorized button here, then poll that from controller.
            //Disabled for now.

            if (false) {
                pollAxisX();
                pollAxisY();
                pollDatButton();
            }
            if (this.score >= this.score_newlife) {
                sfx2.pause();
                sfx2.currentTime = 0;
                sfx2.play();
                this.lifes++;
                if(player.skill === 2){
                this.score_newlife = this.score_newlife + 140000;    
                }
                else if(player.skill === 1){
                this.score_newlife = this.score_newlife + 97000;    
                }
                this.score_newlife = this.score_newlife + 30000;
            }

            if (left && this.middleX > 2) {
                //left = 0;
                this.middleX = this.middleX - 1;
            }
            if (right && this.middleX < 77) {
                //right = 0;
                this.middleX = this.middleX + 1;
            }
            if (up && this.middleY > 28) {
                this.middleY = this.middleY - 1;
            }
            if (down && this.middleY < 53) {
                this.middleY = this.middleY + 1;
            }
            if (!shoot) {
                this.keyReleased = true;
            }
            if ((shoot && this.keyReleased && this.massfire === false) || (shoot && this.massfire === true && this.cooldown === 0) || (this.skill < -1 && this.cooldown === 0)) {
                this.keyReleased = false;
                if (this.skill < -1) {
                    this.massfire = true;
                }
                if (this.massfire === true)
                    this.cooldown = 5;
                sfx0.pause();
                sfx0.currentTime = 0;
                sfx0.play();
                var bullet = new Bullet(this.middleX - 2, this.middleY);
                displayList.addElement(bullet, false);
                bulletList.addElement(bullet, false);
                if (this.skill < 1) {
                    bullet = new Bullet(this.middleX, this.middleY - 2);
                    displayList.addElement(bullet, false);
                    bulletList.addElement(bullet, false);
                }
                bullet = new Bullet(this.middleX + 2, this.middleY);
                displayList.addElement(bullet, false);
                bulletList.addElement(bullet, false);
                if (this.quadfire) {
                    bullet = new Bullet(this.middleX - 1, this.middleY);
                    displayList.addElement(bullet, false);
                    bulletList.addElement(bullet, false);
                    bullet = new Bullet(this.middleX + 1, this.middleY);
                    displayList.addElement(bullet, false);
                    bulletList.addElement(bullet, false);
                }


            }

            //gamepad_mem.buttons[button_mem_index]
            if (!pause) {
                pauseReleased = true;
            }
            if (pause && pauseReleased) {
                bgm.pause();
                pauseReleased = false;
                selectedOption = 0;
                exchangeRenderLoop(gamePause, true);
            }

            if (this.cooldown > 0)
                this.cooldown--;
        };
        super.renderState = function () {
            context.fillStyle = "lightgray";
            context.fillRect((this.middleX - 2) * 10, this.middleY * 10, 50, 10);
            context.fillStyle = "yellow";
            context.fillRect(this.middleX * 10, (this.middleY - 2) * 10, 10, 20);
            context.fillStyle = "orange";
            context.fillRect((this.middleX - 2) * 10, (this.middleY - 1) * 10, 10, 10);
            context.fillRect((this.middleX + 2) * 10, (this.middleY - 1) * 10, 10, 10);
            if (this.quadfire) {
                context.fillRect((this.middleX - 1) * 10, (this.middleY - 1) * 10, 10, 10);
                context.fillRect((this.middleX + 1) * 10, (this.middleY - 1) * 10, 10, 10);
            }
        };
        /**
         * CHEAT ZONE. Default: 100
         * Health Points of the player. If this value goes down to 0(or theoretically less, it costs you a life.
         */
        this.health = 100;
        /**
         * Lives of the player. If this value is zero and you die, it is over with you.
         */
        this.lifes = 3;
        /**
         * Score of the player.
         */
        this.score = 0;
        /**
         * Score required to get a new life.
         */
        this.score_newlife = 20000;

        /**
         * Level the player is in.
         * 
         */
        this.level = 0;
    }
}