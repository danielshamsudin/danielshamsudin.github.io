Welcome to my project! 
Our contact number: 0177403288(Seek Ciu Yung)/0164493816(Teng Kai Jun).


--------------------------
Signage's View 
--------------------------

1) Open qrcode.php, the players need to scan the qrcode and will be redirected to firstuser.php for registering.(qr.php)
2) There is a ranking button for result viewing. The status of the game will be showing in realtime.(ranking.php)

--------------------------
Player's View (Smartphone)
--------------------------

1) On player's smartphone, they are required to register by filling their valid information. (firstuser.php)
2) Once the player successfully registered, they are required to login by entering their email. (existinguser.php)
3) At existinguser.php page, they can select whether to "join the game"(waitingsession.php) or "join the chat room"(chatroom.php).
4) If there are not enough players, the players will stuck on the waiting page and show you how many players left the game will begin. (waitingsession.php)
5) The players can chat anything at the chatbox or player some minigame.(chatroom.php)/(extragame/flyswatter/index.html)/(extragame/2048/index.html)
6) When there are enough players, the game will load and jump into flyswattergame (to win extra token) before going to our main game.If the player win the game, 1 extra token will be given to that player.(minigame/index.php)/(minigame/winner.php)/(minigame/gameover.php)
7) Once finished playing the flyswatter game, the matchup game will start. There is countdown timer which represent the time left until the game end.(index.php).
8) The player can enter another player id or scan the player's unique qr code in order to exchange the image. Both method will be jumped into exchange.php page.(index.php)
9) At the bottom of the page, there is swapping image thing which allow you arrange the images' order by selecting 2 images and click swap.(index.php)
10) Once the player entered the player id or scan the qr code, they will go into the exchange image session. The player is required to select his/her own image id, and also another player's image id. The image id can be seen at the top of the image.(exchange.php)
11) Lastly, the player need to comfirm the image to be exchanged. (exchange2.php)
12) The players are required to complete the correct image and make sure the image is correct in order to win the game. The time taken will also be recorded and stored in the database.(gameover.php).

--------------------------
Admin's View (Desktop)
--------------------------

1) The admin is required to login by entering the email and password. (Email: admin@live.com, Password: 999)(admin/alogin.php)
2) Then, the admin can choose whether they want to upload image(admin/uploadimage.php) or view image(admin/adisplay.php).(admin/choice.php)
3) If admin choose upload image, admin will be redirected to (admin/uploadimage.php) page and upload the image. The image size must be 836*580 resolution. Then, you need to click on the .jpg or .png file type to upload the image.
4) After that, the admin needs to named 3 images for the split image.(admin2.php)
5) The 3 images will be stored in the admin file. Admin needs to upload again the images by selecting the 3 images which has been cut to be stored at the database.(admin/imageup.php).
6) Then, the admin can go back to choice.php page and view the image.(choice.php)
7) At the view image page, the admin can set the image from active to inactive.(adisplay.php)
*Admin need to make sure the "Active" image have only 5 groups.
*The image will be randomly distributed to the players from the active image only, not the inactive.

Thank you for your patience. We appreciate your time and feedback.




