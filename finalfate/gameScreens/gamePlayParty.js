/* 
 * gamePlayParty.js
 * Rendering cycle and helper functions for the game's Party Mode.
 */
/**
 * The main game loop of the "Party Mode".
 * @returns {undefined}
 */
function gamePlayParty(){  
 try {
  updateGameObjects();   
  deleteDeceased();   
  window.requestAnimationFrame(renderInGame);   
 }
 catch (error) {
      //Code for title screen.
        crashCauseSet = 1;
        errorObject = error;
       exchangeRenderLoop(crashHandler);  
    }
}

