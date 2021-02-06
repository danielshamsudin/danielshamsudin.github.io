Welcome to my project! Our contact are: Yeo Fu Cheng (1181201138@student.mmu.edu.my) , Vivian (1181202878@student.mmu.edu.my)

Hardware requirement:
Smartphone with working mic and touch screen , Signage with working touch screen.

-----------------------------------------------------------------------------------------------------------------------------
SMARTPHONE GAME (USE MOBILE VIEW)
-----------------------------------------------------------------------------------------------------------------------------
1) Access to this URL (http://ad6ea10a.ap.ngrok.io/abc/login.php) to register before starting the game. ( you can skip this first step since its a dummy one only )
2) Once registered , you will need to wait at the waiting room for 5 minutes to accumulate players to play the maze game.
3) While waiting at the waiting room , you can view the video guide for the maze game ,check which user is participating , 
chat with other users that  are participating and also play with our chat bot.
4) View the story of the chat bots to know the story behind playing the maze game.
5) You may interact with the chat bots by giving them commands using your mic as listed.
6) After the timer at the waiting room has finished , you will be redirected to the maze game.
7) Use your mic to control Unifi out of the maze. The time will be recorded once you press on the start button.
8) Once you finish the maze game , you can choose to try again for better time or view the ending of the story.
9) Once you finish viewing the ending of the story , you can play a bonus game which will give you an extra token.
10) Once finishing the bonus game , view the ending session page and this concludes our game.
-----------------------------------------------------------------------------------------------------------------------------
SIGNAGE PAGE (USE NORMAL VIEW)
-----------------------------------------------------------------------------------------------------------------------------
1) There is a page to be displayed at the signage which is signage.php (http://ad6ea10a.ap.ngrok.io/abc/signage.php)
2) The signage page will display the participating users and the video guide for the maze game.
3) Once the timer at the waiting room has finished , the signage page will redirect to the scoreboard.
---------------------------------------
DATABASE STORING
---------------------------------------
-The chat function at waiting room the chat will be stored in chat.txt in the folder (auto stored in folder already so no need database for it)
-The chat bot's user response will need to be submitted to the database once user press on the upload button (need to link the button to
 store in the database).
-The maze game's score is using the variable 'seconds' located in maze.js
-The memory game's score is using the variable 'moves' and 'mistakes' in the 3-memory.js
---------------------------------
Redirection
---------------------------------
Some of the redirection might be wrong because we are using windows.location to locate some of it , but some of it requires an URL , meaning u need to upload it to a website just put the
url in the html file just can redirect to it. Most likely would be the signage.php

Thank you for your patience. We appreciate your time and feedback.