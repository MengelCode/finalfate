/**
 * touchOverlay.js
 * Contains the graphical overlaw for touch controls.
 */

function touchOverlay(){
    context.strokeStyle = "white";
    context.fillStyle = "white";
    //Up button.
    if(!up){
        context.strokeRect(TOUCH_UP_X,TOUCH_UP_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);   
    }
    else {
        context.fillRect(TOUCH_UP_X,TOUCH_UP_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);  
    }
    //Down button.
    if(!down){
        context.strokeRect(TOUCH_DOWN_X,TOUCH_DOWN_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);   
    }
    else {
        context.fillRect(TOUCH_DOWN_X,TOUCH_DOWN_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);  
    }
    //Left button.
    if(!left){
        context.strokeRect(TOUCH_LEFT_X,TOUCH_LEFT_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);   
    }
    else {
        context.fillRect(TOUCH_LEFT_X,TOUCH_LEFT_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);  
    }
    //Right button.
    if(!right){
        context.strokeRect(TOUCH_RIGHT_X,TOUCH_RIGHT_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);   
    }
    else {
        context.fillRect(TOUCH_RIGHT_X,TOUCH_RIGHT_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);  
    }
    //Shoot button (technically not here, but for convenience...)
    context.strokeStyle = "red";
    context.fillStyle = "red";
    if(!shoot){
        context.strokeRect(TOUCH_SHOOT_X,TOUCH_SHOOT_Y,TOUCH_SHOOT_S,TOUCH_SHOOT_S);   
    }
    else {
        context.fillRect(TOUCH_SHOOT_X,TOUCH_SHOOT_Y,TOUCH_SHOOT_S,TOUCH_SHOOT_S);  
    }
    //Pause button (technically not here, but for convenience...)
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    if(!pause){
        context.strokeRect(TOUCH_PAUSE_X,TOUCH_PAUSE_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);   
    }
    else {
        context.fillRect(TOUCH_PAUSE_X,TOUCH_PAUSE_Y,TOUCH_NORMAL_S,TOUCH_NORMAL_S);  
    }
}