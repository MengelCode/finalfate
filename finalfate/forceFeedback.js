/**
 * forceFeedback.js
 * Utility functions and variables for the force feedback (rumble/vibration) function for supported devices.
 */
//Functionality turned on? (Should be forced to false at the title screen)
var fofe_enabled = false;
//Respective gamepad, unless it is a mobile device.
var fofe_device = null;


/**
 * TODO: Test both on mobile and on PC (using a gamepad)
 * Try an educated guess whether force feedback will be available.
 * Test the following:
 * 1.) Is either the touch overlay on (global variable "touchs" is true) or a gamepad (global variable "gamepad" contains device) used? If no, return false.
 * 2.) A: If the touch overlay is enabled, probe for the availability of navigator.vibrate. Directly return result of this test.
 * 2.) B: If a gamepad is used, test if gamepad...
 * * * I. Has an attribute called hapticActuators, that being an array longer than 0.
 * * * II. if an instance of that has a pulse attribute.
 */

function probeFofe(){
    try{
        // Check 1.
        if(!touchs && !gamepad){
            //Check failed (default).
            return false;
        }
        //Check 2A.
        if(touchs){
            //Check either failed or passed for mobile phone.
            return navigator.vibrate;
        }
        //Check 2B.
        if(!gamepad.hapticAcutators || !gamepad.hapticAcutators.length || gamepad.hapticAcutators.length < 1 || !gamepad.hapticAcutators[0] || !gamepad.hapticAcutators[0].pulse){
            //Check failed for gamepad.
            return false;
        }
        //Check passed for gamepad.
        return true;
    }
    catch(error){
        console.error(error);
        //Assume functionality is not available if browser is bugging around.
        return false;
    }


}

/**
 * TODO: Fill function body.
 * Enable or disable force feedback.
 */

function setFofe(enabled){

}

/**
 * TODO: Fill function body.
 * Attempt to use the force feedback functionality.
 * Does nothing or to a limited ability if disabled, (partially) not supported or not applicable. 
 * @param {*} value The strength of the vibration
 * @param {*} duration The duration of the vibration
 */
function attemptFofe(value, duration){

}
