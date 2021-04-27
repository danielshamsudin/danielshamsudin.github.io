var itemObj = getItem();
function getItem() {
    var result = {};
    $.ajax({
        url: "items.json",
        async: false,
        success: function (data) {
            result = data;
        },
        error: function (xhr, textStatus, errorMessage) { //If error, everything is default
            console.log("Error: " + xhr.status + " " + errorMessage);
            result = {
                "BGM": "Items/bgm/If I Had A Chicken.mp3",
                "winAudio": "Items/bgm/default/win.mp3",
                "loseAudio": "Items/bgm/default/lose.mp3",
                "targetAudio": "Items/Audio/default/catch dog.mp3",
                "targetNearby": "Items/Audio/default/dog.mp3",
                "trapAudio": "Items/Audio/default/catch cat.mp3",
                "trapNearby": "Items/Audio/default/cat.mp3",
                "hintAudio": "Items/doorbell.mp3",
                "handImg": "Assets/img-08.png",
                "timerGUI": "Assets/img-01.png",
                "basketGUI": "Assets/img-02.png",
                "vcanvasGUI": "Assets/img-03.png",
                "fenceGUI": "Assets/bg-041.png",
                "infoBoard": "Assets/img-04.png",
                "hintImg": "Assets/GIF/present.gif",
                "canvasBG": "Assets/bg-051.png",
                "backgroundImg": "Assets/bg-01.png",
                "targetImg": "Assets/img-05.png",
                "trapImg": "Assets/img-06.png",
                "basketDog": "Assets/img-09.png",
                "infoAds": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png",
                "hintAds": "img/tmlogo.png",
                "gameOverUI": "Assets/bg-07.jpg"
            };
        }
    });
    return result;
}

console.log(itemObj);

//Audios
var BGM    = document.getElementById("BGM");
BGM.src    = itemObj.BGM;
BGM.volume = 0.2;
var targetAudio   = new Audio(itemObj.targetAudio); //aka dog audio
var targetNearby  = new Audio(itemObj.tragetNearby); //aka dog nearby audio
var trapAudio     = new Audio(itemObj.trapAudio);
var trapNearby    = new Audio(itemObj.trapNearby);
var winAudio      = new Audio(itemObj.winAudio);
var loseAudio     = new Audio(itemObj.loseAudio);
var hintAudio     = new Audio(itemObj.hintAudio);
hintAudio.volume  = 0.2;
winAudio.volume   = 0.2;
loseAudio.volume  = 0.2;

//GUIs
var handImg                      = document.querySelector("#handimg"); //1:1 ratio recommended
if(handImg) handImg.src          = itemObj.handImg;
var timerGUI                     = document.querySelector("#timergui");
if(timerGUI) timerGUI.src        = itemObj.timerGUI;
var basketGUI                    = document.querySelector("#basketgui");
if(basketGUI) basketGUI.src      = itemObj.basketGUI;
var vcanvasGUI                   = document.querySelector("#vcanvasgui");
if(vcanvasGUI) vcanvasGUI.src    = itemObj.vcanvasGUI;
var fenceGUI                     = document.querySelector(".container-item4");
if(fenceGUI) fenceGUI.style.backgroundImage = "url('" + itemObj.fenceGUI + "')";
var infoBoard                    = document.querySelector("#infoboard");
if(infoBoard) infoBoard.src      = itemObj.infoBoard;
var hintImg                      = document.querySelector("#hintimg");
if(hintImg) hintImg.src          = itemObj.hintImg;
var openingHint                  = document.querySelector("#openinghint");
if (openingHint) openingHint.src = itemObj.openingHint;
var openedHint                   = document.querySelector("#openedhint");
if (openedHint) openedHint.src   = itemObj.openedHint;
var canvasBG                     = document.querySelector("#canvasbg");
if(canvasBG) canvasBG.src        = itemObj.canvasBG;
var backgroundImg                = document.getElementsByTagName("html")[0];
if (backgroundImg) backgroundImg.style.backgroundImage = "url('" + itemObj.backgroundImg + "')";
var targetImg                    = document.querySelector("#targetimg");
if(targetImg) targetImg.src      = itemObj.targetImg;
var trapImg                      = document.querySelector("#trapimg");
if (trapImg) trapImg.src         = itemObj.trapImg;
var gameOverUI                   = document.querySelector("#gameoverui");
if (gameOverUI) gameOverUI.src = itemObj.gameOverUI;
var brocolli = document.querySelector(".brocolli");
var brocolli1 = document.querySelector(".brocolli-1");
if (brocolli && brocolli1) {
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("brocolli")[i].src = itemObj.brocolli2;
    }
    for (let j = 0; j < 3; j++) {
        document.getElementsByClassName("brocolli-1")[j].src = itemObj.brocolli1;
    }
}
var freezeUI = document.querySelector("#freezemessage");
if (freezeUI) freezeUI.src = itemObj.freezeUI;

//================================//
//Ads
//================================//
var infoAds1 = document.querySelector("#infoads1");
if (infoAds1) infoAds1.src = itemObj.infoAds;
var infoAds2 = document.querySelector("#infoads2");
if (infoAds2) infoAds2.src = "https://cdn.wccftech.com/wp-content/uploads/2017/08/iPhone-8-concept-1.png";
var infoAds3 = document.querySelector("#infoads3");
if (infoAds3) infoAds3.src = "https://th.bing.com/th/id/Rb528b6bae86389e84ea29e7147bcf15f?rik=5m50UnO8ZSBrxQ&riu=http%3a%2f%2fwww.douglasphan.com%2fwp-content%2fuploads%2f2015%2f10%2f1280px-Adidas_Logo.svg_.png&ehk=V6rLACztsXZNPgSvgWcUB8omeqxr8yUVAW8vATIua2I%3d&risl=&pid=ImgRaw";
var hintAds = document.querySelector("#hintad");
if (hintAds) hintAds.src = itemObj.hintAds;