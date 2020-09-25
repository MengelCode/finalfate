/* 
 * TimedTask.js
 * Contains an attempted implementation of something like a "timed thread".
 * <b> WARNING: THE FOLLOWING CLASS IS KNOWN TO NOT WORK LIKE INTEDED. </b>
 */
class TimedTask {

    /**
     * Create a timed routine based on an initial start delay, a function
     * to execute and an optional follow-up delay, if different from the start
     * delay. Also, the data structure can contain an array (or any other object
     * at your discretion) in order to make this available to the function
     * to be called internally. Adjust this to what kind of param your function
     * wants to accept. If none at all, simply ignore this.
     * @param {type} startDelay
     * @param {type} funct
     * @param {type} repeatInterval
     * @returns {TimedTask}
     */
    constructor(startDelay, funct, repeatInterval = startDelay , argsObject = null ,showErrors = false, debugName = "Unnamed") {
        this.startDelay = startDelay;
        this.repeatInterval = repeatInterval;
        this.funct = funct;
        this.argsObject = argsObject;
        this.showErrors = showErrors;
        this.debugName = debugName;
        this.state = "NEW";
    }
}
/**
 * Start the scheduled task. If already started, nothing will happen.
 * @returns {undefined}
 */
TimedTask.prototype.start = function () {
    if(!this.boundFunction) this.boundFunction = this.functInternal.bind(this);
    if(this.state === "STARTED" && this.state === "PAUSED" && this.state === "DEAD")
        return;
    setInterval(this.boundFunction, this.startDelay);
    this.state = "STARTED";
    
};
/**
 * Stop
 * @returns {undefined}
 */
TimedTask.prototype.stop = function () {
    if(this.state !== "PAUSED" && this.state !== "STARTED")
        return;
    clearInterval(this.boundFunction);
    this.state = "STOPPED";
    
};
TimedTask.prototype.pause = function () {
    if(this.state !== "STARTED")
        return;
    clearInterval(this.boundFunction);
    this.lastTime = new Date().getTime();
    this.state = "PAUSED";

};
//Continue a paused task. If the task runs, nothing will happen.
TimedTask.prototype.continue = function () {
    if(this.state !== "PAUSED")
        return;
    var elapsedTime = new Date().getTime() - this.lastTime;
    var newDelay = this.repeatInterval - elapsedTime;
    if(newDelay < 1){
    setInterval(this.funcInternal.bind(this),1);    
    }
    else{
    setInterval(this.funcInternal.bind(this),newDelay);     
    }
    this.state = "STARTED";
};
//Outer function triggered everytime when the scheduled delay has elapsed.
TimedTask.prototype.functInternal = function () {
    if(this.state === "DEAD")return;
    try{
    this.funct(this.argsObjects);
    }
    catch(error){
        this.receivedError = error;
        this.state = "DEAD";
        if(this.showErrors)
        window.alert("EXCEPTION OCCURED IN SCHEDTASK "+ this.debugName + " !! \n" + "Exception name:" + error.name + "\n" + "Exception message:" + error.message + "\n" + "Stack Trace:" + error.stack);    
        return;
        }
    this.lastTime = new Date().getTime();
    //setInterval(this.boundFunction, this.repeatInterval);
};
//Catched error bei function executor.
TimedTask.prototype.receivedError = null;
//State of the timed task.
TimedTask.prototype.state = "NEW";
//Time when the task was paused or last executed.
TimedTask.prototype.lastTime = 0;

