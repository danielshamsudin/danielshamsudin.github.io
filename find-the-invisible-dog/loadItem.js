var itemObj = getItem();

function getItem() {
    var result = {};
    $.ajax({
        url: "items.json",
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}

//if error = default

console.log(itemObj);

var BGM = document.getElementById("BGM");
BGM.src = itemObj.BGM;
BGM.volume = 0.2;

var logoImg = document.querySelector("#logoimg");
logoImg.src = itemObj.logoImg;

var catchImg = document.querySelector("#catchimg");
catchImg.src = itemObj.catchImg;
var catchAudio = new Audio(itemObj.catchAudio);
var catchNearby = new Audio(itemObj.catchNearby);

var trapImg = document.querySelector("#trapimg");
trapImg.src = itemObj.trapImg;
var trapAudio = new Audio(itemObj.trapAudio);
var trapNearby = new Audio(itemObj.trapNearby);

var winAudio = new Audio(itemObj.winAudio);
var loseAudio = new Audio(itemObj.loseAudio);
winAudio.volume = 0.2;
loseAudio.volume = 0.2;

var handImg = document.querySelector("#handimg"); //1:1 ratio / hand img, easy to know
handImg.src = itemObj.handImg;
