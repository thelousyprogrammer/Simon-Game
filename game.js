gameStart = false
gamePattern = []
userClickedPattern = []
var level = 0;

$("body").keydown(function() {
  if (gameStart === false) {
    gameStart = true;
    nextSequence();
  }
  else {}
})

var buttonColours = ["red", "blue", "green", "yellow"]

function nextSequence() {
  $("#level-title").text("Level " + level)
  level += 1;
  userClickedPattern = []
  randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100)
  $("#" + randomChosenColour).fadeIn(100)
  playSound(randomChosenColour)
  if (level>8) {shuffle()}
}

function playSound(name) {

  switch (name) {
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case "wrong":
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      break;
    default:
      console.log(randomChosenColour)
  }
}


$(".btn").click(function() {
  var userChosenColour = event.target.id
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkLine = (userClickedPattern.lastIndexOf(userChosenColour))
  checkAnswer(checkLine)
})

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(checkLine) {
  if (userClickedPattern[checkLine]===gamePattern[checkLine] && userClickedPattern.length===gamePattern.length) {
    setTimeout(function() {nextSequence()}, 1000);
  }
  else if (userClickedPattern[checkLine]!==gamePattern[checkLine]) {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}

function shuffle() {
  myShuffleOrder = Math.random()
  if (myShuffleOrder>0.5) {$("#row1").before($("#row2"));
}
  else if(myShuffleOrder<0.5) {$("#row2").before($("#row1"));
}
}
