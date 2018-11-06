window.onload = function() {
  // create canvas element and get button for listening for a click
  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", 1200);
  canvas.setAttribute("height", 640);
  var ctx = canvas.getContext("2d");
  var inputName = $(".group");
  var nameInput = $("#name-input");
  var mainButton = $(".main-button");
  var playerName;
  var intervalId;
  var hardMode;

  inputName.keydown(function(e) {
    var key = e.keyCode;
    if (key === 13) {
      e.preventDefault();
      hardMode = $(".hard-mode").hasClass("active-hard-mode");
      playerName = nameInput[0].value || "Anonymous Nerd";
      nameInput[0].value = "";
      startGame();
      $menuTabs.remove();
      mainButton.remove();
    }
  });

  // generate math variable
  var math;

  //generate canvas variables
  var bg;
  var einstein;
  var heart;
  var obstacle;
  var question;
  var score;
  var level;

  // check for collision
  function checkCollision() {
    //collision in x axis
    var hitRightAnswer;
    if (
      einstein.x + einstein.width / 2 < obstacle.x + 60 &&
      einstein.x + einstein.width / 2 > obstacle.x - 60
    ) {
      //collision in y high axis
      if (
        einstein.y + einstein.height / 2 < obstacle.y + 70 &&
        einstein.y + einstein.height / 2 > obstacle.y - 70
      ) {
        hitRightAnswer = obstacle.obstacles[0].answer === true ? true : false;
      }
      //collision in y medium axis
      if (
        einstein.y + einstein.height / 2 < obstacle.y + 150 + 70 &&
        einstein.y + einstein.height / 2 > obstacle.y + 150 - 70
      ) {
        hitRightAnswer = obstacle.obstacles[1].answer === true ? true : false;
      }
      //collision in y low axis
      if (
        einstein.y + einstein.height / 2 < obstacle.y + 300 + 70 &&
        einstein.y + einstein.height / 2 > obstacle.y + 300 - 70
      ) {
        hitRightAnswer = obstacle.obstacles[2].answer === true ? true : false;
      }
      if (hitRightAnswer) {
        rightAnswerSound.play();
        score.increaseScore(5, einstein.x);
        einstein.gainingPoints();
      } else {
        wrongAnswerSound.play();
        heart.loseLife();
        einstein.losingPoints();
        if (hardMode === true) {
          score.decreaseScore();
        }
      }

      //generates new obstacles
      checkIfLevelUp();
      obstacle.generateObstacles();
      question.eq = obstacle.eq;
    }
  }

  function checkIfLevelUp() {
    if (score.score > 400 && math.level === 1) {
      levelUpSound.play();
      math.increaseLevel();
      einstein.level++;
      level.level++;
    }
    if (score.score > 1000 && math.level === 2) {
      levelUpSound.play();
      math.increaseLevel();
      einstein.level++;
      level.level++;
    }
  }

  function checkIfEndGame() {
    if (heart.lifes === 0) {
      soundTrack.pause();
      scoreScreenSound.play();
      drawScoreScreen();
    }
  }

  //game loop
  function startGame() {
    //generate math class
    math = new MathGenerator();
    // fill canvas classes
    bg = new Background(ctx, backgroundImg, 5);
    einstein = new Einstein(
      ctx,
      math.level,
      einstein1,
      einstein1Running,
      einstein2,
      einstein2Running,
      einstein3,
      einstein3Running,
      rightAnswerImg,
      wrongAnswerImg,
      tipImg
    );
    heart = new Heart(ctx, heartImg);
    obstacle = new Obstacle(ctx, math, brainImg);
    obstacle.generateEquation();
    obstacle.randomPos();
    question = new Question(ctx, obstacle.eq);
    score = new Score(ctx, hardMode);
    level = new Level(ctx, math.level);
    document.getElementById("game-screen").appendChild(canvas);
    soundTrack.currentTime = 0;
    scoreScreenSound.pause();
    scoreScreenSound.currentTime = 0;
    soundTrack.play();
    heart = new Heart(ctx, heartImg);
    intervalId = setInterval(function() {
      update();
      drawEverything();
    }, 1000 / 60);
  }

  //update frame
  function update() {
    checkCollision();
    bg.update();
    einstein.update();
    obstacle.update();
  }

  //draw the updated frame
  function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw();
    heart.draw();
    question.draw();
    obstacle.draw();
    score.draw();
    level.draw();
    einstein.draw();
    checkIfEndGame();
  }

  function drawScoreScreen() {
    clearInterval(intervalId);
    var scoreScreen = new ScoreScreen(
      ctx,
      imgSuccess,
      imgFailure,
      playerName,
      score.score,
      hardMode
    );
    scoreScreen.setHighscore();
    scoreScreen.checkIfSuccess();
    scoreScreen.draw();
  }

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
      if (heart && heart.lifes === 0) {
        startGame();
      }
    }
  });
};
