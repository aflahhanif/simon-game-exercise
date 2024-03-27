var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(".btn").on("mousedown", function(buttonClicked){
    var button = buttonClicked.target.id;
    userClickedPattern.push(button);

    playSound(button);
    animatePress(button);

    checkAnswer(userClickedPattern.length-1);

});

$(document).on("keydown", function(){
    if (started === true){
        console.log("game has been started");
    }
    else{
        nextSequence();
        started = true;
        userClickedPattern = [];
    }
});

function nextSequence() {
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(buttonColors[randomNumber]);

    $("#level-title").text("Level "+ level);

    return randomNumber;
}

function playSound(name){
    var buttonAudio = new Audio("sounds/" + name + ".mp3")
    buttonAudio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentStep){
    if(started === true){
        if(userClickedPattern[currentStep] === gamePattern[currentStep]){
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){nextSequence()}, 1000);
                userClickedPattern = [];
            }
        }
        else{
            playSound("wrong");
            level = 0;
            started = false;
            gamePattern = [];
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            }, 200);
            $("#level-title").text("Game over! Press a key to start");
        }
    }
}