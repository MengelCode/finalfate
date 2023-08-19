const staticFinalFate = "finalfate-v4";

const assets = [
  "index.html",
  //MUSIC FILES
  "title-0.wav",
  "game-over.wav",
  "shot.wav",
  "explosion.wav",
  "item.wav",
  "lose-life.wav",
  "select.wav",
  // MISC - MAIN SYSTEMS
  "misc.js",
  "serviceWorkerLoader.js",
  "gameStorage.js",
  "gameInput.js",
  "LinkedList.js",
  // LEVEL GENERATOR FILES
  "levelLoaders/earthLoader.js",
  "levelLoaders/solarSystemLoader.js",
  "levelLoaders/universeLoader.js",
  "levelLoaders/blinkyHomeworldLoader.js",
  // GAME SCREENS
  "gameScreens/gameOver.js",
  "gameScreens/gamePause.js",
  "gameScreens/gameNoController.js",
  "gameScreens/gamePlay.js",
  "gameScreens/skillPrompt.js",
  "gameScreens/loadPrompt.js",
  "gameScreens/titleScreen.js",
  "gameScreens/bonusGame.js",
  "gameScreens/saveLoadError.js",
  "gameScreens/crash.js",
  "gameScreens/touchOverlay.js",
  "gameScreens/badEnding.js",
  "gameScreens/comingSoon.js",
  // ENTITIES
  // General
  "entities/GameObject.js",
  "entities/Spawn.js",
  "entities/Enemy.js",
  "entities/Bullet.js",
  "entities/SpaceShip.js",
  "entities/Checkpoint.js",
  "entities/decorative/Decoration.js",
  // Enemies
  "entities/SimpleEnemy.js",
  "entities/SimplestEnemy.js",
  "entities/Meteor.js",
  "entities/Blinky.js",
  "entities/BlinkyTracer.js",
  "entities/BlinkyTracerInv.js",
  "entities/SilentBlinky.js",
  "entities/Bomb.js",
  "entities/FogBomb.js",
  "entities/ShipBuster.js",
  "entities/SingleLaserBeam.js",
  // Bosses
  "entities/combinedEntities/bosses/boss_general.js",
  "entities/combinedEntities/bosses/boss1.js",
  "entities/combinedEntities/bosses/boss2.js",
  "entities/combinedEntities/bosses/boss3.js",
  "entities/combinedEntities/bosses/boss4.js",
  "entities/combinedEntities/bosses/boss4b.js",
  // Types of explosion
  "entities/decorative/Fog.js",
  "entities/decorative/Boom.js",
  // Decorative objects
  "entities/decorative/Star.js",
  "entities/decorative/Heat.js",
  "entities/decorative/Box.js",
  "entities/decorative/BGBox.js",
  "entities/decorative/House.js",
  "entities/decorative/BlinkySky.js",
  "entities/decorative/BlinkyGround.js",
  "entities/decorative/MetallicMoonOuterior.js",
  // Background files.
  "entities/lvl_backgrounds/level4_background.js",
  // Boosts.
  "entities/HealthBoost.js",
  "entities/FireBoost.js",
  "entities/LifeBoost.js",
  // ACTUAL BEGIN OF EXECUTION
  "main.js"
  
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticFinalFate).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return fetch(fetchEvent.request) || res;
    })
  );
});

