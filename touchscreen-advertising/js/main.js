"use strict";

(function () {
    var config = window.CONFIG;

    function CountDown() 
    {
        localStorage.setItem("timer", null);
        var duration = 60 * config.minutes;
        var interval = null;
        if (!isNaN(duration)) {
            var timer = duration, minutes, seconds;
            var time_cls = ""

                interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                    
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                if(timer <= 15)
                    time_cls = "text-countdown"
                    
                localStorage.setItem("timer", timer)

                $(`#${config.element}`).html("Left <span class="+ time_cls +">" + minutes +"</span> minutes and <span class="+ time_cls +">" + seconds +"</span> seconds more!");
                if (--timer < 0) {
                    alert("show score "+score.value)

                    window.parent.wsEndGame(score.value)

                    clearInterval(interval)
                }
            }, 1000);
        }
    }

    function setContainerHeight()
    {
        if(window.innerHeight >= 630){
            $('body').addClass("h-100");
        } else {
            $('body').removeClass("h-100");
        }
    }

    $(window).resize(function(){
      setContainerHeight();
    });
    setContainerHeight();
    //CountDown()
})();
