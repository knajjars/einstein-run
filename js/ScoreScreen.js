class ScoreScreen {
  constructor(ctx, imgSuccess, imgFailure, playerName, score, hardMode) {
    this.ctx = ctx;
    this.imgSuccess = imgSuccess;
    this.imgFailure = imgFailure;
    this.img = this.imgFailure;
    this.playerName = playerName;
    this.score = score;
    this.height = this.ctx.canvas.height;
    this.width = (this.height * this.img.width) / this.img.height;
    this.hardMode = hardMode;
    this.message =
      "After all... Einstein was right, maybe in a few more years we'll be able to colonize the Moon.";
  }

  checkIfSuccess() {
    if (this.score >= 1000) {
      this.img = this.imgSuccess;
      this.message =
        "Einstein proved he is still a great physicist, humanity went on to colonize the Moon.";
    }
  }

  setHighscore() {
    var localHighScores =
      localStorage.getItem("storageHighscores") === null
        ? []
        : JSON.parse(localStorage.getItem("storageHighscores"));
    var currentScore = {
      name: this.playerName,
      score: this.score
    };

    localHighScores.push(currentScore);
    if (localHighScores.length > 1) {
      localHighScores.sort(function(a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
      });
    }
    localStorage.setItem("storageHighscores", JSON.stringify(localHighScores));

    //set new Hard Mode score
    if (this.hardMode) {
      var localHardMoseScore =
        localStorage.getItem("storageHighscoresHM") === null
          ? { name: this.playerName, score: this.score }
          : JSON.parse(localStorage.getItem("storageHighscoresHM"));

      if (localHardMoseScore.score <= this.score) {
        localStorage.setItem(
          "storageHighscoresHM",
          JSON.stringify({
            name: this.playerName,
            score: this.score
          })
        );
      }
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "#dbdbdb";
    this.ctx.font = "40px helvetica";
    this.ctx.save();
    this.ctx.drawImage(this.img, 100, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(0,0,0,0.4)";
    this.ctx.fillRect(170, this.height - 83, 900, 45);
    this.ctx.fillStyle = "#f4fcfc";
    this.ctx.fillText(this.message, 200, this.height - 50, 850);
    this.ctx.fillStyle = "#7bcfe9";
    this.ctx.font = "80px helvetica";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Your Score: " + this.score,
      this.ctx.canvas.width / 2,
      100
    );

    var highscores = JSON.parse(localStorage.getItem("storageHighscores"));

    this.ctx.fillStyle = "#f4fcfc";
    this.ctx.font = "50px helvetica";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Cool kids of the block:",
      this.ctx.canvas.width / 2,
      150
    );
    this.ctx.font = "40px helvetica";
    this.ctx.save();
    this.ctx.fillStyle = "#fcf40a";
    var hardModeScore = JSON.parse(
      localStorage.getItem("storageHighscoresHM")
    ) || { name: "No king yet! ", score: "(" };
    this.ctx.fillText(
      "Hard Mode King --> " + hardModeScore.name + ": " + hardModeScore.score,
      this.ctx.canvas.width / 2,
      200
    );
    this.ctx.restore();
    var top = highscores.length < 5 ? highscores.length : 5;
    for (let i = 0; i < top; i++) {
      if (
        this.score === highscores[i].score &&
        this.playerName === highscores[i].name
      ) {
        this.ctx.fillStyle = "#fba004";
      } else {
        this.ctx.fillStyle = "#f4fcfc";
      }
      this.ctx.fillText(
        highscores[i].name + ": " + highscores[i].score,
        this.ctx.canvas.width / 2,
        245 + i * 50
      );
    }
    this.ctx.restore();
    this.ctx.fillStyle = "rgba(0,0,0,0.7)";
    this.ctx.rect(420, this.height - 150, 410, 40);
    this.ctx.fill();
    this.ctx.font = "25px helvetica";
    this.ctx.fillStyle = "#3491ee";
    this.ctx.fillText(
      "Press the space bar to play again!",
      this.width - 630,
      this.height - 120
    );
  }
}

var imgSuccess = new Image();
imgSuccess.src = "../game-einstein-run/images/score-screen.jpg";

var imgFailure = new Image();
imgFailure.src = "../game-einstein-run/images/score-screen-lose.png";
