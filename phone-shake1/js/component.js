function about()
	{
		document.querySelector(".details").style.display = "none";
		document.querySelector(".game_about").style.display = "block";
    }
	function how_to_play()
	{
		document.querySelector(".details").style.display = "none";
		document.querySelector(".how_to_play").style.display = "block";
	}
	function back()
	{
		document.querySelector(".game_about").style.display = "none";
		document.querySelector(".details").style.display = "flex";
	}
	function back1()
	{
		document.querySelector(".how_to_play").style.display = "none";
		document.querySelector(".details").style.display = "flex";
	}
	function back20()
	{
		document.querySelector(".mini_game").style.display = "none";
		document.querySelector(".details").style.display = "flex";
		
	}
	
	
	function display_score()
        {
            document.querySelector(".details").style.display = "none";
		    document.querySelector(".scoreboard").style.display = "block";
        }
	
        function display_score()
        {
            document.querySelector(".details").style.display = "none";
		    document.querySelector(".scoreboard").style.display = "block";
        }
        function back2()
        {
        document.querySelector(".scoreboard").style.display = "none";
		document.querySelector(".details").style.display = "flex";
        }
        function backToMenu()
        {
            location.href = "end.html";
        }
function game()
{
    document.querySelector(".game_details").style.display = "none";
    document.querySelector(".breakout").style.display = "flex";
}


		// Rotater banner / Advertisement bar
		var bannerStatus = 1;
        var bannerTimer = 4000;

        window.onload = function(){
            // bannerLoop();
        }

        var startBannerLoop = setInterval(function(){
            // bannerLoop();
        }, bannerTimer);

        function bannerLoop()
        {
            if(bannerStatus === 1)
            {
                document.getElementById("imgban2").style.opacity = "0";
                
                setTimeout(function(){
                document.getElementById("imgban1").style.right = "0px";
                document.getElementById("imgban1").style.zIndeX = "1000";
                document.getElementById("imgban2").style.right = "-1200px";
                document.getElementById("imgban2").style.zIndeX = "1500";
                document.getElementById("imgban3").style.right = "1200px";
                document.getElementById("imgban3").style.zIndeX = "500";
                }, 500);

                
                setTimeout(function(){
                document.getElementById("imgban2").style.opacity = "1";
                }, 1000);
                bannerStatus = 2;
            }
            else if(bannerStatus === 2)
            {
                document.getElementById("imgban3").style.opacity = "0";
                
                setTimeout(function(){
                document.getElementById("imgban2").style.right = "0px";
                document.getElementById("imgban2").style.zIndeX = "1000";
                document.getElementById("imgban3").style.right = "-1200px";
                document.getElementById("imgban3").style.zIndeX = "1500";
                document.getElementById("imgban1").style.right = "1200px";
                document.getElementById("imgban1").style.zIndeX = "500";
                }, 500);

                
                setTimeout(function(){
                document.getElementById("imgban3").style.opacity = "1";
                }, 1000);
                bannerStatus = 3;
            }
            else if(bannerStatus === 3)
            {
                document.getElementById("imgban1").style.opacity = "0";
                
                setTimeout(function(){
                document.getElementById("imgban3").style.right = "0px";
                document.getElementById("imgban3").style.zIndeX = "1000";
                document.getElementById("imgban1").style.right = "-1200px";
                document.getElementById("imgban1").style.zIndeX = "1500";
                document.getElementById("imgban2").style.right = "1200px";
                document.getElementById("imgban2").style.zIndeX = "500";
                }, 500);

                
                setTimeout(function(){
                document.getElementById("imgban1").style.opacity = "1";
                }, 1000);
                bannerStatus = 1;
            }
            

        }
        let min = 10;
        let sec = 00;
        // function timer()
        // {   
        //     if(min >= 0)
        //     {
        //         if(sec == 0)
        //         {
        //             sec = 60;
        //             min = min - 1;
        //         }
        //         else if(sec >= 0)
        //         {
        //             sec--;
                
        //             idsec = document.getElementById("sec");
        //             idsec.innerHTML = sec;
        
        //             idmin = document.getElementById("min");
        //             idmin.innerHTML = min;
        //         }
        //     }
        //     else
        //     {
        //         location.href = "end.html";
        //     }
        // }   
        
        // setInterval(timer,1000);