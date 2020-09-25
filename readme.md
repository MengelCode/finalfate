# The Final Fate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/mengel38/finalfate.svg?label=%22Githubissues%22)](https://github.com/mengel38/finalfate/issues)
[![GitHub stars](https://img.shields.io/github/stars/mengel38/finalfate.svg?style=social&label=Star)](https://github.com/mengel38/finalfate/)

[![Docker Build Type](https://img.shields.io/docker/cloud/automated/mengel38/finalfate.svg)](https://hub.docker.com/r/mengel38/finalfate/)
[![Docker Build Status](https://img.shields.io/docker/cloud/build/mengel38/finalfate.svg)](https://hub.docker.com/r/mengel38/finalfate/)
[![Docker Stars](https://img.shields.io/docker/stars/mengel38/finalfate.svg)](https://hub.docker.com/r/mengel38/finalfate/)
[![Docker Pulls](https://img.shields.io/docker/pulls/mengel38/finalfate.svg)](https://hub.docker.com/r/mengel38/finalfate/)

## The Project

I decided to train JavaScript in my spare-time. I am in the creation of a HTML 5 space game. Your goal is it to successfully win all levels by shooting the bad guys down and challenging the level bosses. You can control the game with the arrow keys and the space key on your keyboard or go ahead and use a GamePad with an analogue stick and a designated fire button (chosen by pressing it on the title screen). Keep in mind that this feature is experimental.

## The Goal

The goal is to be fully compatible with modern Firefox and Chromium/Chrome browsers, while featuring a playable and fun space game with five levels.

## Play the current version

Test players are needed! Feel free to give feedback via the Issues function. Available content : approx. 40 % out of the informally planned scope.

### Epilepsy warning

Some people tend to epilepsy triggered by (flashing) light effects. Theoretically, everyone can encounter this for
their first time. If you are known for this type of epilepsy or notice that something is off, immediately stop to play the game.

## Ways to prepare the game

There are severals for you to play the game. Decide which one you like to use. \
**1) Give it a quick look on my server** \
If you do not want any big setup, but simply a quick round of action, you should definitely look [here](https://manuel-engel.de/finalfate/finalfate). \
\
**2) Locally storing the files and directly opening the html file** \
Clone the repository, or, if Git is not your tool of choice (How did you find me in this case? Let me know.), you can manually download the respective files. Mandatory downloads are index.html and logic.js in the finalfate directory, the sound files are optional. Please include a copy of the license file when making the game available to others. \
\
**3) Serving the game's files over a webserver** \
Do what listed in 2) and either host the game on your computer or a web hosting provider you trust.
This way needs a bit more technical knowledge, but the advantage is that your family at home or possibly the entire world can enjoy a cool space ship adventure!
Please make sure the users are able to review the license, e.g. mentioning it on your homepage when you link to the game. \
\
**4) Setting up a docker container as server** \
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
