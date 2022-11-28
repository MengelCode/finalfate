# The Final Fate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/mengelcode/finalfate.svg?label=%22Githubissues%22)](https://github.com/mengelcode/finalfate/issues)
[![GitHub stars](https://img.shields.io/github/stars/mengelcode/finalfate.svg?style=social&label=Star)](https://github.com/mengelcode/finalfate/)

## The Project

This HTML 5 space game's first commit has been made the Jul 4, 2019 by Manuel Engel willing to train in JavaScript during the spare-time.

## The Game
This is a low poly 2D space game with differently colored enemies you will find on your way. You need to survive avoiding spaceships and missiles. The game will have five levels and you can play it as a beginner, as a good player, a hard player or as a master. Your goal is to successfully win all levels by shooting the bad guys down and challenging the level bosses.

## User Interface
When playing the game you can see the value of the score, health, lifes and level written at the bottom of the screen in a black horizontal bar. 

## The player and the ship's missiles
Your player is a low poly gray spaceship with a yellow head and orange sides.

## The controls 
 You can control the game with the arrow keys and the space key on your keyboard or by going ahead and use a gamepad with an analogue stick and a designated fire button (chosen by pressing it on the title screen). 
You can pause the game using the "P" button if you use a keyboard or key 09 (mostly known as "The start button") if you use a gamepad. Keep in mind that the gamepad feature is experimental.

## Game music and sounds effects
The game has music and sounds effects. When you lower the volume of music then the sounds effects are also lowered. 

## Web browser compatibility

This game has to to be fully compatible with modern Firefox and Chromium/Chrome browsers. If you encounter any issues please send us the error you are facing.

## Play the current version

This game needs players! Please give the game a feedback via the Issues function. Available content : approx. 60 % out of the informally planned scope.

### Epilepsy warning

Some people tend to epilepsy triggered by (flashing) light effects. Theoretically, everyone can encounter this 
the first time. If you are known for this type of epilepsy or notice that something is off, immediately stop to play the game.

## HTML 5 Web Storage & Privacy

The progress of the game can be saved if the player wishes so. The technology HTML 5 local storage does save data in a storage
space managed by the used web browser per domain and protocol (i.e HTTP, HTTPS). In contrast to cookies, those data are NOT transferred to the server by default and in the case
of the game, they are not transferred at any given time. Some web browsers manage the usage of this function the same way as they do for
cookies. Some browsers might even state that the game does place cookies, but this is not completely the truth from a technical point of view. The game
progress you can save (this does not happen automatically!) cannot be used to identify you. Also, it is impossible for the hoster of the involved
web server to give you a copy of your game save and your own local storage space.

## Ways to prepare the game

There are severals for you to play the game. Decide which one you like to use. \
**1) Give it a quick look on my server** \
WARNING: The server is no longer reachable as of March 29, 2022, 18:37 CEST.
If you do not want any big setup, but simply a quick round of action, you should definitely look [here](https://manuel-engel.de/finalfate/finalfate). \
\
**2) Locally storing the files and directly opening the html file** \
Clone the repository, or, if Git is not your tool of choice (How did you find me in this case? Let me know.), you can manually download the respective files. Mandatory downloads are index.html and all the .js files in the finalfate directory, the sound files are optional. Please include a copy of the license file when making the game available to others. \
\
**3) Serving the game's files over a webserver** \
Follow the 2nd option "Locally storing the files" and either host the game on your computer or a web hosting provider you trust.
This way needs a bit more technical knowledge, but the advantage is that your family at home or possibly the entire world can enjoy a cool space ship adventure!
Please make sure users are able to review the license, e.g. mentioning it on your homepage when you link to the game. \
\
**4) Setting up a docker container as server (No longer working as it should, refer to issue [121](https://github.com/MengelCode/finalfate/issues/121))** \
Thanks to the [work](https://github.com/ichbestimmtnicht/docker-autobuild-release) of [Ludwig Werner Döhnert](https://github.com/ichbestimmtnicht/), docker images for amd64, arm32v7 and arm64v8 are available. \
You can review the DockerHub repository of the game at [Dockerhub](https://hub.docker.com/repository/docker/mengel38/finalfate). In order to pull the latest image (Regardless of your underlying architecture), you can use

```bash
docker pull mengel38/finalfate
```

in your terminal. In order to both pull (if update available) and run the container, you can use

```bash
docker run -p port:80 -dit mengel38/finalfate
```

with the word port replaced by the TCP port you want the contained Apache server to use. \
Please make sure the users are able to review the license, e.g. mentioning it on your homepage when you link to the game.

## Licensing

The software is licensed under the MIT license. Please retain the license notice with all copies you distribute, publish and modify. \
\
Multiarch Dockerimage automation is based on [Docker Autobuild](https://github.com/ichbestimmtnicht/docker-autobuild-release) by Ludwig Werner Döhnert licensed under Creative Commons Attribution 4.0 International License. To view a copy of this license, visit [http://creativecommons.org/licenses/by/4.0/](http://creativecommons.org/licenses/by/4.0/).

## Collaboration

As the nature of this project is personal skill development, collaboration is not (a planned) part of it. But you can pick something from the Issues list, let me know about it and create a Pull Request from your fork to my main repo. Please declare if and how you want to be credited in the request notes.
