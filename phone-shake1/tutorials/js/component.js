function goToMain()
{
    location.href = "./game.php";
}

//timer

let min = 5;
let sec = 01;
function timer()
{   
    if(min >= 0)
    {
        if(sec == 0)
        {
            sec = 60;
            min = min - 1;
        }
        else if(sec >= 0)
        {
            sec--;
        
            idsec = document.getElementById("sec");
            idsec.innerHTML = sec;

            idmin = document.getElementById("min");
            idmin.innerHTML = min;
        }
    }
    else
    {
        location.href = "./game.php";
    }
}   

setInterval(timer,1000);