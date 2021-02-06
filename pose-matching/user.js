
/*when submit button click the data will be set and store at local*/
document.getElementById("pass").addEventListener("click", function(){

	let	userName = document.getElementById("yourName").value;
	let userid = document.getElementById("yourID").value;
	localStorage.setItem("Username", userName);
	localStorage.setItem("Usergmail", userid);
	return false;
});
   