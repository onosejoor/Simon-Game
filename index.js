let color = ["red", "yellow", "green", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

// TO START THE GAME //

$("body").keydown(function () {
    if (!started) {
        next();
        started = true;
    }
});

// FOR BUTTON CLICKS //

$(".btn").click(function () {
    let btnId = $(this).attr("id");
    playSound(btnId);
    animatePress(btnId);
    userPattern.push(btnId);
    
    checkAnswer(userPattern.length - 1);
});

// WHEN THE GAME STARTS //

function next () {
    userPattern = [];

    level++;
    $("h1").text("Level "+level);
 
    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = color[randomNumber];
    playSound(randomColor);
    animatePress(randomColor);
    gamePattern.push(randomColor);
}

// TO PLAY SOUNDS //

function playSound (name) {
    let sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
}

// FOR ANIMATON (BUTTON EFFECT) //

function animatePress(currentKey) {
    $("#"+currentKey).addClass("pressed");

    setTimeout( function () {
        $("#"+currentKey).removeClass("pressed");
    }, 200);
}

// TO CHECK ANSWER //

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                next();
            }, 1000);
        }
    } else{
        $("h1").text("Game Over, Tap Any Key To Restart");

        $("body").addClass("wrong");

        setTimeout( function () {
            $("body").removeClass("wrong");
        }, 200);
        startover();
    }
}

//  IF YOU RESTART THE GAME //

function startover () {
    level = 0;
    started = false;
    gamePattern = [];
}