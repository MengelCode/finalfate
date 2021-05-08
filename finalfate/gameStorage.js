/**
 * gameStorage.js
 * Contains the functions and variables related to saving and loading in-game
 * progress.
 */

//Functions and variables, storage-related.

/**
 * Gets the HTML 5 local storage object.
 * 
 * @returns {Storage|Window.localStorage}
 */
function getLocalStorage() {
    try{
        return window.localStorage;
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}
var gameStorageName = "TheFinalFate1ByME_Level";
var savedLevel = 0;
var saveError = false;
/**
 * Save the game.
 * @returns {undefined}
 */
function saveGame() {
    try {
        getLocalStorage().setItem(gameStorageName, (10 * player.bulletColor) + player.level);
        var referenceValue = Number(getLocalStorage().getItem(gameStorageName));
        if (referenceValue % 10 !== player.level) {
            saveError = true;
        } else {
            saveError = false;
        }
    } catch (error) {
        saveError = true;
    }
}
/**
 * Status in regard of the HTML 5 local storage.
 * undefined = Unknown.
 * null = Not usable, general error.
 * "CORRUPT" = Corrupted game save.
 * "UPGRADE" = Upgrade to game version supporting the saved game.
 * false = No data.
 * true =  Data here.
 * @type undefined
 */
var storageStatus = undefined;
function testStorageState() {
//Reset memory about read data.
    savedLevel = 0;
//Test 1 : Check if local storage object does even exist.
//Desired outcome: object !== undefined
//If not fulfilled: storageStatus = null
    var storageTest = getLocalStorage();
    if (storageTest === undefined || storageTest === null) {
        storageStatus = null;
        return;
    }
// Test 2 : Check if game is saved.
    var storageValue = storageTest.getItem(gameStorageName);
    savedLevel = storageValue;
    if (storageValue === null) {
        storageStatus = false;
        return;
    }
// Test 3: Check if saved information is either valid or corrupt.
// Test 3A: Check if data is NaN or in negative range.
    if (isNaN(storageValue) || storageValue < 0) {
        storageStatus = "CORRUPT";
        return;
    }
    // Test 3B: Check if data is invalid in this version, but not necessarily always invalid.
    if (!loaders_arcade[storageValue % 10]) {
        storageStatus = "UPGRADE";
        return;
    }
    storageStatus = true;
}

