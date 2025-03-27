/**
 * forceFeedback.js
 * Utility functions and variables for the force feedback (rumble/vibration) function for supported devices.
 */
//Functionality turned on? (Should be forced to false at the title screen)
var fofe_enabled = false;



/**
 * TODO: Test both on mobile (using the touch screen) and on PC (using a gamepad)
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
        if(!touchs && gamepad === false){
            //Check failed (default).
            return false;
        }
        //Check 2A.
        if(touchs){
            //Check either failed or passed for mobile phone.
            return navigator.vibrate;
        }
        var gamepad_handle = navigator.getGamepads()[gamepad];
        //Check 2B.
        if(!gamepad_handle.vibrationActuator || !gamepad_handle.vibrationActuator.playEffect){
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
 * TODO: Test the code.
 * Enable or disable force feedback.
 */

function setFofe(enabled){
    if(!enabled || !probeFofe()){
        fofe_enabled = false;
        return;
    }
    fofe_enabled = enabled;

}

/**
 * TODO: Test the code.
 * Attempt to use the force feedback functionality.
 * Does nothing or to a limited ability if disabled, (partially) not supported or not applicable. 
 * @param {*} value The strength of the vibration
 * @param {*} duration The duration of the vibration
 */
function attemptFofe(value, duration){
    //Immediately return if disabled.
    if(!fofe_enabled){
        return;
    }
    try{
        //Case 1 - Vibrate the mobile device.
        if(touchs){
            navigator.vibrate(duration);
        }
        //Case 2 - Vibrate all devices found in gamepad.
        if(gamepad !== null){
            var gamepad_handle = navigator.getGamepads()[gamepad];
            var motor = gamepad_handle.vibrationActuator;
            motor.playEffect("dual-rumble",{
                startDelay: 0,
                duration: duration,
                weakMagnitude: 0.05,
                strongMagnitude: value, 
                }

            )

        }
        //All other cases: Just do nothing.
    }
    catch(error){
        //In the event the browser is behaving funny, log the error and disable this functionality.
        console.error(error);
        fofe_enabled = false;
    }

}
