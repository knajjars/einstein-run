class Obstacle {
  constructor(ctx, math, img) {
    this.ctx = ctx;
    this.speed = 7;
    this.x = this.ctx.canvas.width;
    this.y = 145;
    this.img = img;
    this.math = math;
    this.wrong = [];
    this.answer = "";
    this.eq = "";
    this.obstacles = [];
  }

  generateEquation() {
    var eq = this.math.getEquation();
    this.wrong = eq.wrongAnswers;
    this.answer = eq.answer;
    this.eq = eq.eq;
    this.obstacles = [
      { value: this.answer, answer: true, position: "" },
      { value: this.wrong[0], answer: false, position: "" },
      { value: this.wrong[1], answer: false, position: "" }
    ];
  }

  randomPos() {
    var currentIndex = this.obstacles.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.obstacles[currentIndex];
      this.obstacles[currentIndex] = this.obstacles[randomIndex];
      this.obstacles[randomIndex] = temporaryValue;

      //sets position so we can reference later when checking collision
      this.obstacles[0].position = "high";
      this.obstacles[1].position = "medium";
      this.obstacles[2].position = "low";
    }
  }

  generateObstacles() {
    this.generateEquation();
    this.randomPos();
    this.x = this.ctx.canvas.width + 200;
  }

  update() {
    // temporary
    this.x -= 3;
  }
  draw() {
    for (let i = 0; i < 3; i++) {
      this.ctx.save();
      this.ctx.drawImage(
        this.img,
        this.x - 70,
        this.y - 45 + i * 150,
        176 * 0.8,
        112 * 0.8
      );
      this.ctx.font = "40px helvetica";
      this.ctx.fillStyle = "#7bcfe9";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        this.obstacles[i].value,
        this.x,
        this.y + 15 + i * 150,
        70,
        70
      );
      this.ctx.restore();
    }
  }
}

var brainImg = new Image();
brainImg.src = "../images/brain.png";
