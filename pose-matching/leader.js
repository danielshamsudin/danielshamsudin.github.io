let sec = 2;
let userid = null;
let userName = null;
let totalScore = 0;

/* get data from userform check user whether fill up data if not only show leader board to them if yes then show the game result of player and congratulation him*/
function getresult() {
	userid = localStorage.getItem("Usergmail");
	userName = localStorage.getItem("Username");
	totalScore = localStorage.getItem("Score");
	
	if (userid==null || userName==null) {
		document.getElementById("cong").innerHTML = "Leaderboard Form";
		
		document.getElementById("sco").innerHTML = "&nbsp";


	}
	else {
		document.getElementById("cong").innerHTML = "Congratulation!!!!";
		
		document.getElementById("sco").innerHTML = "Your Score:" + Math.round(totalScore);
    }
	

	

};

/*clean locol data */
function clear(){
	// userid = localStorage.clear();
	// userName = localStorage.clear();
	// totalScore = localStorage.clear();

}
getresult();
/*when home button click all the local data will be clean so if next person change url come to this form only can see leaderboard */
document.getElementById("h").addEventListener("click", function () {
	clear();
	getresult();
});

function timer()
{
	if(sec > 0)
	{
		sec--;
	}
	else{
		location.reload();
	}
}

setInterval(timer,1000);


