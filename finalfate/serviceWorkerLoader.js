/**
 * serviceWorkerLoader.js
 * Service Worker creation script.
 */



if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("serviceWorker.js");
  });
}
