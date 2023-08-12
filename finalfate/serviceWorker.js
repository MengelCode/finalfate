const staticFinalFate = "finalfate-v1";

const assets = [
  "/",
  "/index.html",
  //MUSIC FILES
  "/title-0.wav",
  "/game-over.wav",
  "/shot.wav",
  "/explosion.wav",
  "/item.wav",
  "/lose-life.wav",
  "/select.wav",
  // MISC - MAIN SYSTEMS
  "/misc.js",
  "/gameStorage.js",
  "/gameInput.js",
  "/LinkedList.js",
  // LEVEL GENERATOR FILES
  "/levelLoaders/earthLoader.js",
  "/levelLoaders/solarSystemLoader.js",
  "/levelLoaders/universeLoader.js",
  "/levelLoaders/blinkyHomeworldLoader.js",
  // GAME SCREENS
  "/gameScreens/gameOver.js",
  "/gameScreens/gamePause.js",
  "/gameScreens/gameNoController.js",
  "/gameScreens/gamePlay.js",
  "/gameScreens/skillPrompt.js",
  "/gameScreens/loadPrompt.js",
  "/gameScreens/titleScreen.js",
  "/gameScreens/bonusGame.js",
  "/gameScreens/saveLoadError.js",
  "/gameScreens/crash.js",
  "/gameScreens/touchOverlay.js",
  "/gameScreens/badEnding.js",
  "/gameScreens/comingSoon.js",
  // ENTITIES
  // General
  "/entities/GameObject.js",
  "/entities/Spawn.js",
  "/entities/Enemy.js",
  "/entities/Bullet.js",
  "/entities/SpaceShip.js",
  "/entities/Checkpoint.js",
  "/entities/decorative/Decoration.js",
  // Enemies
  "/entities/SimpleEnemy.js",
  "/entities/SimplestEnemy.js",
  "/entities/Meteor.js",
  //TODO Continue.
  ""
  
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticFinalFate).then(cache => {
      cache.addAll(assets);
    })
  )
});

