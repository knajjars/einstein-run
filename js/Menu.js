$("#play-btn").hover(
  () => {
    $("#play-btn-text").text("Play!");
  },
  () => {
    $("#play-btn-text").html("Einstein <br> Run!");
  }
);

var $menuTabs = $(".menu-tabs");
var $highscoreList = $("#highscores");

//check if localStorage exists
if (!localStorage.getItem("storageHighscores")) {
  localStorage.setItem("storageHighscores", JSON.stringify([]));
}

//check if hardmode localStorage exists
var localHardMoseScore =
  localStorage.getItem("storageHighscoresHM") === null
    ? { name: "No king yet ", score: "(" }
    : JSON.parse(localStorage.getItem("storageHighscoresHM"));
var hs = localHardMoseScore.name + ": " + localHardMoseScore.score;
$("#hard-mode-highscore").append("<strong>King -> " + hs + "</strong>");

var highscoresStorage = JSON.parse(localStorage.getItem("storageHighscores"));
var num = highscoresStorage.length < 5 ? highscoresStorage.length : 5;
for (let i = 0; i < num; i++) {
  var hs = highscoresStorage[i].name + ": " + highscoresStorage[i].score;
  $highscoreList.append("<li>" + hs + "</li>");
}

// story menu hover effects
var $storyContainer = $(".story-container");
var $gameStory = $("#game-story");

$storyContainer.mouseover(function() {
  $gameStory.css("display", "block");
  $gameStory.css("opacity", "1");
});
$storyContainer.mouseout(function() {
  $gameStory.css("display", "none");
  $gameStory.css("opacity", "0");
});

// highscore menu hover effects
var $highscoresContainer = $(".highscores-container");

$highscoresContainer.mouseover(function() {
  $highscoreList.css("display", "block");
  $highscoreList.css("opacity", "1");
});
$highscoresContainer.mouseout(function() {
  $highscoreList.css("display", "none");
  $highscoreList.css("opacity", "0");
});

// controls menu hover effects
var $controlsContainer = $(".controls-container");
var $controls = $("#controls");

$controlsContainer.mouseover(function() {
  $controls.css("display", "block");
  $controls.css("opacity", "1");
});
$controlsContainer.mouseout(function() {
  $controls.css("display", "none");
  $controls.css("opacity", "0");
});

var playBtn = $("#play-btn");
var form = $(".input-name-field");

playBtn.click(() => {
  playBtn.css("display", "none");
  form.css("display", "flex");
  document.getElementById("name-input").focus();
});

// hard mode
var hardMode = $(".hard-mode");

hardMode.click(function() {
  hardMode.toggleClass("active-hard-mode");
  if ($(".tick").text() === "off") {
    $(".tick").text("on");
  } else {
    $(".tick").text("off");
  }
});
