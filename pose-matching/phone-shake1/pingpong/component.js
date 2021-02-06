function start()
{
    document.querySelector("#main").style.display = "none";
    document.querySelector("#pong").style.display = "block";
}


function score()
{
    document.querySelector("#button").style.display = "none";
    document.querySelector(".scoreboard").style.display = "block";
}
function back()
{
    document.querySelector("#button").style.display = "block";
    document.querySelector(".scoreboard").style.display = "none";
}
function how_to_play()
	{
		document.querySelector("#button").style.display = "none";
		document.querySelector(".how_to_play").style.display = "block";
	}
	function back1()
	{
		document.querySelector(".how_to_play").style.display = "none";
		document.querySelector("#button").style.display = "flex";
	}
function backToMenu()
{
    location.href = "../selectgamepage.php";
}