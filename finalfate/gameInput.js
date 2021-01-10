/**
 * gameInput.js
 * Contains a collection of variables and functions related to user input.
 */

//"booleans" if certain keys are pressed.
var shoot = 0;
var up = 0;
var down = 0;
var left = 0;
var right = 0;
var pause = 0;
//"Boolean" for specific input source.
//"Keyboard" boolean.
var keyboard = false;
//"Gamepad" boolean.
var gamepad = false;
//"Gamepad removed" boolean
var gamepad_removed = false;
//Gamepad index. ( false = no button assigned)
var gamepad_button = false;
//Gamepad event handle.
var gamepad_handle = null;



/**
 * Resets all knowledge about used devices
 * and makes sure every input device is checked.
 * @returns {undefined}
 */
function initAllInput() {
    if (!keyboard) {
        //Keyboard input catching.
        window.addEventListener("keydown", getKeyPress);
        window.addEventListener("keyup", getKeyRelease);
        //Mouse movement catching.
        window.addEventListener("mousemove", getMouseMovement);
    }
    if (gamepad_handle !== null) {
        //Terminate polling of specific (?) gamepad.
        clearInterval(gamepad_handle);
    }//Gamepad input catching.
    gamepad_handle = setInterval(gamepadAskAnyButton, FRAME_RATE);
    //Reset used state.
    keyboard = false;
    gamepad = false;
    gamepad_removed = false;
}

var speed = 0.5;
//animating without floor/ceil will cause the ship coord, to be float values and introducing a bug where the ship is invulnerable
//but floor/ceil will cause data loss on the movement the lower the speed of the animation is set to.
//without animation or speed==1 the movement is very snappy and quick - maybe its even too good makes the game easy.
function animateShip(mouseX,mouseY){
    let distX = mouseX - player.middleX;
    let distY = mouseY - player.middleY;
    let dist = Math.sqrt(distX*distX + distY*distY);

    let boundX = Math.ceil(player.middleX + (distX * speed));
    let boundY = Math.ceil(player.middleY + (distY * speed));

    if(dist > 1){
        if(boundX > 2 && boundX < 77)
            player.middleX = boundX;
        if(boundY > 28 && boundY < 53)
            player.middleY = boundY;
    }
}
//here you can view the version that makes the ship invulnerable
function animateShipSmooth(mouseX,mouseY){
    let distX = mouseX - player.middleX;
    let distY = mouseY - player.middleY;
    let dist = Math.sqrt(distX*distX + distY*distY);

    let boundX = player.middleX + (distX * 0.12);
    let boundY = player.middleY + (distY * 0.12); //hardcoded speed for this example

    if(dist > 1){
        if(boundX > 2 && boundX < 77)
            player.middleX = boundX;
        if(boundY > 28 && boundY < 53)
            player.middleY = boundY;
    }
}

function getMouseMovement(event){
    //keyboard = 1; //also keyboard = 1 causes the title screen to skip instantly? thinks its gamepad?
    if(!(background==null || renderFunction === gamePause)){ //during pause the game can be cheated with snap movements, smooth animation would prob solve that
        var newMouseX = event.pageX;
        var newMouseY = event.pageY;
        var w = canvas.getAttribute("width");
        var h = canvas.getAttribute("height");
        var scaleW = 800/w;
        var scaleH = 600/h;
        newMouseX = Math.floor(newMouseX*scaleW/10);
        newMouseY = Math.floor(newMouseY*scaleH/10); // /10 Because in spaceship render function the middlex and middley is getting multiplied by 10.

        animateShip(newMouseX,newMouseY);
        //animateShipSmooth(newMouseX,newMouseY);
    }
}

//Event receiver for key presses.
function getKeyPress(event) {
//Keyboard press detected!
    keyboard = 1;
    //window.alert("It works....");
    //window.alert(event.keyCode);
    //Key Codes supported?
    if (event.keyCode !== undefined) {
// window.alert(event.which);
        if (event.keyCode === 32) {
            shoot = 5;
        } else if (event.keyCode === 37) {
            left = 5;
        } else if (event.keyCode === 39) {
            right = 5;
        } else if (event.keyCode === 38) {
            up = 5;
        } else if (event.keyCode === 40) {
            down = 5;
        } else if (event.keyCode === 80) {
            pause = 5;
        }
    }
}

/**
 * Poll every button on every gamepad.
 * @returns {Boolean}
 */
function gamepadAskAnyButton() {
    var controllers = navigator.getGamepads();
    for (var i = 0; i < controllers.length && i < 10; i++) {
        var testController = controllers[i];
        if (!testController)
            continue;
        if (!testController.buttons)
            continue;
        for (var j = 0; testController.buttons.length && j < testController.buttons.length; j++) {
//Prevent "Start button" from ever becoming the fire button.
            if (j === 9)
                continue;
            if (testController.connected && testController.buttons[j] && testController.buttons[j].pressed) {
                gamepad = i;
                gamepad_button = j;
            }

        }
    }

}
/**
 * Check for gamepad removal and interrupt current game activity if applicable.
 * @param {type} previousScreen
 * @returns {undefined}
 */
function checkGamepadRemoved(previousScreen){
    if(gamepad_removed){
            renderingCycle = previousScreen;
            exchangeRenderLoop(gameNoController,true);
            return;
        }
}


//Poll gamepad.
function gamepadPoll() {
    var controller = navigator.getGamepads()[gamepad];
    //Error condition: Controller is no object or even null or undefined.
    if (!controller) {
        gamepad_removed = true;
        return;
    }
//Error condition: Controller.buttons is no array or even null or undefined.
    if (!controller.buttons || !controller.buttons.length) {
        gamepad_removed = true;
        return;
    }
//Error condition: Gamepad is disconnected.
    if (!controller.connected) {
        gamepad_removed = true;
        return;
    }
//Error condition: Fire button did magically disappear.
    if (controller.buttons[gamepad_button] === undefined || controller.buttons[gamepad_button] === null) {
        gamepad_removed = true;
        return;
    }
//Is button pressed?
    shoot = controller.buttons[gamepad_button].pressed;
    //Validate axis states.
    left = controller.axes[0] < -0.4;
    right = controller.axes[0] > 0.4;
    up = controller.axes[1] < -0.4;
    down = controller.axes[1] > 0.4;
    //Is pause pressed?
    pause = controller.buttons[9].pressed;
}

//Makes sure keys are not pressed for eternity.
function keyInvalidator() {
    if (shoot) {
        shoot--;
    }
    if (up) {
        up--;
    }
    if (down) {
        down--;
    }
    if (left) {
        left--;
    }
    if (right) {
        right--;
    }
    if (pause) {
        pause--;
    }

}

//Event receiver for key release.
function getKeyRelease(event) {

// window.alert("It works....");

//Firefox based?
    if (event.keyCode !== undefined) {
//  window.alert(event.which);
        if (event.keyCode === 32) {
            shoot = 0;
        } else if (event.keyCode === 37) {
            left = 0;
        } else if (event.keyCode === 39) {
            right = 0;
        } else if (event.keyCode === 38) {
            up = 0;
        } else if (event.keyCode === 40) {
            down = 0;
        } else if (event.keyCode === 80) {
            pause = 0;
        }
    }

}

/**
 * Issue 69: Fix for buttons "held down" when window is onfocused during input.
 * The state is not corrected.
 * By nature, this bug cannot appear with gamepads. They always functions as they
 * should, regardless if the window is still focused.
 * @returns {undefined}
 */
function focusLost(){
if(!keyboard) return;    
shootReleased = true;
pauseReleased = true;
axisXReleased = true;
axisYReleased = true;
shoot = false;
pause = false;
up = false;
down = false;
left = false;
right = false;
}


//Values and function for the released state of (once pressed) keys.

var shootReleased = true;
var pauseReleased = true;
var axisXReleased = true;
var axisYReleased = true;
//Validates if the statements above are still true.
function validateReleasedState() {
    if (!shoot) {
        shootReleased = true;
    }
    if (!pause) {
        pauseReleased = true;
    }
    if (!up && !down) {
        axisYReleased = true;
    }
    if (!left && !right) {
        axisXReleased = true;
    }
}