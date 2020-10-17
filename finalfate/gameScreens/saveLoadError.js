/**
 * saveLoadError.js
 * Contains the rendering cycles the "save game corrupted" and "could not
 * access storage" errors and additional data used for it.
 */

var info_string = "Data Management";
var data_corrupt = ["Saved game corrupted.", "Deletion required.", "Press SPACE on keyboard or any", "key on gamepad to continue."];
var data_load_fail = ["Cannot access local storage.","Either your browser is too old or you disabled","web storage / cookies for this website.","Progress cannot be saved."];
var data_warning_ok = "Confirm";
/**
 * Confirmation prompt 
 * @returns {undefined}
 */
function loadFail() {
    title_and_copyright_render();
    validateReleasedState();
    checkGamepadRemoved(loadFail);
    context.fillStyle = "blue";
    context.fillRect(255, 190, 260, 200);
    context.font = "27px Nonserif";
    context.fillStyle = "white";
    context.fillText(info_string, 255, 220);
    context.font = "14px Nonserif";
    context.fillText(data_load_fail[0], 255, 250);
    context.fillText(data_load_fail[1], 255, 275);
    context.fillText(data_load_fail[2], 255, 290);
    context.fillText(data_load_fail[3], 255, 305);
    if (aniCount === 3) {
        initAllInput();
    }
    if (shoot && shootReleased) {
        simplyPlaySound(sfx4);
        exchangeRenderLoop(skillPrompt);
        shootReleased = false;
    }
    if (aniCount % 5 === aniCount % 10) {
        context.font = "27px Nonserif";
        context.fillStyle = "yellow";
        context.fillText(data_warning_ok, 340, 380);
    }
}


/**
 * Should never be happening. But it can, especially if an explorer plays with the value on their own.
 * @returns {undefined}
 */
function saveCorrupt() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);
    context.fillStyle = "red";
    context.fillRect(290, 190, 260, 200);
    context.font = "27px Nonserif";
    context.fillStyle = "white";
    context.fillText(info_string, 290, 220);
    context.font = "14px Nonserif";
    context.fillText(data_corrupt[0], 290, 250);
    context.fillText(data_corrupt[1], 290, 275);
    context.fillText(data_corrupt[2], 290, 290);
    context.fillText(data_corrupt[3], 290, 305);
    if (aniCount === 3) {
        initAllInput();
    }
    if (keyboard || gamepad !== false) {
        simplyPlaySound(sfx4);
        getLocalStorage().removeItem(gameStorageName);
        initAllInput();
        exchangeRenderLoop(titleScreen);
    }
    if (aniCount % 5 === aniCount % 10) {
        context.font = "27px Nonserif";
        context.fillStyle = "yellow";
        context.fillText(data_warning_ok, 360, 380);
    }
}
