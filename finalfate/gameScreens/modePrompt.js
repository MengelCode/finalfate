/* 
 * modePrompt.js
 * Game Mode selection screen.
 */
// 0 = Arcade Mode, 1 = Party Mode, 2 = Input Change
var modeSelected = 0;
// Game mode selection names.
var modeNames = ["ARCADE MODE", "PARTY MODE", "INPUT CHANGE"];
var modeDescriptions = [];
modeDescriptions[0] = 
        ["Let the 80's begin!",
         "Only you and your space ship against the enemy forces.",
         "Will you succeed in saving humanity?"];
modeDescriptions[1] =
        ["One space ship, several cannons!",
         "Who will destroy the most enemies?",
         ""];
modeDescriptions[2] =
        ["Change the input device you are using for the game.",
         "You can either use the keyboard or a gamepad.",
         ""];
 
function renderGameModeHeading(modeSelected){
    context.font = "26px Nonserif";
    context.fillStyle = "gold";
    context.fillText(modeNames[modeSelected],270,440);    
}

function modePrompt(){
    title_and_copyright_render();
    validateReleasedState();
    checkGamepadRemoved(modePrompt);
    volume_prompt_render();
    renderGameModeHeading(modeSelected);
     //Selecting around.
    if (right && axisXReleased && modeSelected < 2) {
        simplyPlaySound(sfx4);
        modeSelected++;
        axisXReleased = false;
    } else if (left && axisXReleased && modeSelected > 0) {
        simplyPlaySound(sfx4);
        modeSelected--;
        axisXReleased = false;
    }
    if (shootReleased && shoot) {
        shootReleased = false;
        if (modeSelected === 0) {
            if (storageStatus === false) {
                simplyPlaySound(sfx4);
                exchangeRenderLoop(skillPrompt);
            } else if (storageStatus === null) {
                simplyPlaySound(sfx4);
                exchangeRenderLoop(loadFail);
            } else {
                simplyPlaySound(sfx4);
                exchangeRenderLoop(loadPrompt);
            }
        }
        else if (modeSelected === 1){
            initGame(gamePlayParty);
        }
    }
}
//