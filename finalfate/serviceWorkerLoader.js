/**
 * serviceWorkerLoader.js
 * Service Worker creation script.
 */


if(navigator.serviceWorker){
    window.addEventListener("load", function(){
       navigator.serviceWorker.register("/serviceWorker.js"); 
    });
}
