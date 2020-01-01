# The Final Fate

## The Project

I decided to train JavaScript in my spare-time. I am in the creation of a HTML 5 space game. Your goal is it to successfully win all levels by shooting the bad guys down and challenging the level bosses. You can control the game with the arrow keys and the space key on your keyboard or go ahead and use a GamePad with an analogue stick and a designated fire button (chosen by pressing it on the title screen). Keep in mind that this feature is experimental.


## The Goal
The goal is to be fully compatible with modern Firefox and Chromium/Chrome browsers, while featuring a playable and fun space game with six levels.



## Play the current version!
Test players are needed! Feel free to give feedback via the Issues function. Available content : approx. 40 % out of the informally planned scope.

#### Epilepsy warning
Some people tend to epilepsy triggered by (flashing) light effects. Theoretically, everyone can encounter this for
their first time. If you are known for this type of epilepsy or notice that something is off, immediately stop to play the game.


#### Ways to prepare the game
There are severals for you to play the game. Decide which one you like to use. <br>
<b>1) Locally storing the files and directly opening the html file </b> <br>
Clone the repository, or, if Git is not your tool of choice (How did you find me in this case? Let me know.), you can manually download the respective files. Mandatory downloads are index.html and logic.js in the finalfate directory, 
the sound files are optional. Please include a copy of the license file when making the game available to others. <br>
<b>2) Serving the game's files over a webserver </b> <br>
Do what listed in 1) and either host the game on your computer or a web hosting provider you trust. 
This way needs a bit more technical knowledge, but the advantage is that your family at home or possibly the entire world can enjoy a cool space ship adventure!
Please make sure the users are able to review the license, e.g. mentioning it on your homepage when you 
link to the game. <br>
<b>3) Setting up a docker container as server </b> <br>
Thanks to the work of Ludwig Werner Döhnert, docker images (currently only amd64) are available. 
You can review the DockerHub repository of the game at 
https://hub.docker.com/repository/docker/mengel38/finalfate . In order to pull the latest image, 
you can use <i><p> docker pull mengel38/finalfate </p></i> in your terminal. In order to both pull 
(if update available) and run the container, you can use <i><p> docker run -p port:80 -dit mengel38/finalfate </p></i>,
with the word port replaced by the TCP port you want the contained Apache server to use.
Please make sure the users are able to review the license, e.g. mentioning it on your homepage when you 
link to the game.

## Licensing
The software is licensed under the MIT license. Please retain the license notice with all copies you distribute, publish and modify.


## Collaboration
As the nature of this project is personal skill development, collaboration is not (a planned) part of it. But you can pick something from the Issues list, let me know about it and create a Pull Request from your fork to my main repo. Please declare if and how you want to be credited in the request notes.
