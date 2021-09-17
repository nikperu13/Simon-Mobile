
//HINT: Var declared in the file can be used inside functions without having
// to pass them into the file. i.e. I can use randomChooseColor inside nextSequence()
// without using nextSequence(randomChooseColor);

var buttonColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var level = 0;
var check = 0;
var count = 0;





/// MOBILE VERSION
$("body").on("touchstart",()=>{
   
    if(check === 0){
        check = 1;
        setTimeout(function(){
            nextSequence();
        },400);
    }
})


$(".btn").on("touchstart", function(){
   
    if(check === 1){
        userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        if(checkAnswer(count) === 1){
            count++;
        }
    }
        if(count === (level+1)){
            level++;
            userClickedPattern = [];
            count = 0;
            setTimeout(function(){
                nextSequence();
            },500);
        }
})




// LIST OF FUNCTIONS

function startOver(){
    userClickedPattern = [];
    count = 0;
    gamePattern = [];
    level = 0;
    check = 0;
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        return 1;
    }
    else{
        gameOver();
        return 0;
    }
    
    
}

function animatePress(currentColor){
    var id = "#"+currentColor;
    // setTimeout() allows me to perform a function() with delay
    // after a set function happens.
    $(id).addClass("pressed");
    setTimeout(function(){
        $(id).removeClass("pressed");
    },100);
}

// plays sound corresponding to the id of the button
function playSound(name){
    var chooseSound = "sounds/"+ name +".mp3";
    var audio = new Audio(chooseSound);
    audio.play();
}

function nextSequence(){
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var choose = "#"+randomChosenColor;
    // simulates "flash"
    $(choose).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

