let color = ["red", "yellow", "green", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

// TO START THE GAME //

$(".hidden").click(function () {
    if (!started) {
        setTimeout(() => {
            next();
        }, 500);
        started = true;
        $(".hidden").fadeOut(200);
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
    
    $("#"+currentKey).fadeIn(100).fadeOut(100).fadeIn(100);

    setTimeout( function () {
        $("#"+currentKey).removeClass("pressed");
    }, 300);
}

// TO CHECK ANSWER //

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                next();
            }, 1000);
            var win = new Audio("./sounds/win.wav");
            win.play();
            $("body").addClass("right");
            setTimeout( function () {
                $("body").removeClass("right");
            }, 200);
        }
    } else{
        $("h1").text("Game Over, Tap To Restart");

        $("body").addClass("wrong");
        
        $(".hidden").fadeIn(300);

        setTimeout( function () {
            $("body").removeClass("wrong");
        }, 200);
        startover();
        playSound("wrong");
    }
}

//  IF YOU RESTART THE GAME //

function startover () {
    level = 0;
    started = false;
    gamePattern = [];
}