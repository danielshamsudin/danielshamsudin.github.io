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
                "BGM": "Items/bgm/default/backgroundsound.mp3",
                "winAudio": "Items/bgm/default/win.mp3",
                "loseAudio": "Items/bgm/default/lose.mp3",
                "logoImg": "Items/Image/default/dog.png",
                "catchImg": "Items/Image/default/dog.png",
                "catchAudio": "Items/Audio/default/catch dog.mp3",
                "catchNearby": "Items/Audio/default/dog.mp3",
                "trapImg": "Items/Image/default/cat.png",
                "trapAudio": "Items/Audio/default/catch cat.mp3",
                "trapNearby": "Items/Audio/default/cat.mp3",
                "handImg": "Items/Image/handimage/hand.png"
            };
        }
    });
    return result;
}

console.log(itemObj);

var BGM = document.getElementById("BGM");
BGM.src = itemObj.BGM;
BGM.volume = 0.2;

var logoImg = document.querySelector("#logoimg"); // 1:1 ratio recommendedW
logoImg.src = itemObj.logoImg;

var catchImg = document.querySelector("#catchimg"); //aka dog img, 1:1 ratio recommended
catchImg.src = itemObj.catchImg;
var catchAudio = new Audio(itemObj.catchAudio); //aka dog audio
var catchNearby = new Audio(itemObj.catchNearby); //aka dog nearby audio

var trapImg = document.querySelector("#trapimg"); // 1:1 ratio recommended
trapImg.src = itemObj.trapImg;
var trapAudio = new Audio(itemObj.trapAudio);
var trapNearby = new Audio(itemObj.trapNearby);

var winAudio = new Audio(itemObj.winAudio);
var loseAudio = new Audio(itemObj.loseAudio);
winAudio.volume = 0.2;
loseAudio.volume = 0.2;

var handImg = document.querySelector("#handimg"); //1:1 ratio recommended
handImg.src = itemObj.handImg;