/**
 * gameInputDefaults.js
 */


//Default keys for keyboard.

const KEYBOARD_DEFAULT_CODE_SHOOT = 32;
const KEYBOARD_DEFAULT_CODE_LEFT = 37;
const KEYBOARD_DEFAULT_CODE_RIGHT = 39;
const KEYBOARD_DEFAULT_CODE_UP = 38;
const KEYBOARD_DEFAULT_CODE_DOWN = 40;
const KEYBOARD_DEFAULT_CODE_PAUSE = 80;

//Key variables for keyboard. (Using the default codes if not changed.)

var keyboard_code_shoot =  KEYBOARD_DEFAULT_CODE_SHOOT;
var keyboard_code_left =  KEYBOARD_DEFAULT_CODE_LEFT;
var keyboard_code_right =  KEYBOARD_DEFAULT_CODE_RIGHT;
var keyboard_code_up =  KEYBOARD_DEFAULT_CODE_UP;
var keyboard_code_down =  KEYBOARD_DEFAULT_CODE_DOWN;
var keyboard_code_pause = KEYBOARD_DEFAULT_CODE_PAUSE;

//Default gamepad configuration. Every null value means "not set / ask everytime".

var gamepad_device_config = new GameControllerDeviceConfig("default", {isAxis: -1, code: 0 },
    {isAxis: 1, code: 0 }, {isAxis: -1, code: 1 },{isAxis: 1, code: 1 },
    {isAxis: false, button: 9 },{isAxis: false, button: null }, null);
