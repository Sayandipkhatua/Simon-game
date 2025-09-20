var buttonColor = ["green", "red", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level =0;

var started = false;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        sequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animateColor(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                sequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function sequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomcolor = buttonColor[randomNumber];
    gamePattern.push(randomcolor);

    $("#" + randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomcolor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateColor(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}