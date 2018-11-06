class Score {
  constructor(ctx, hardMode) {
    this.ctx = ctx;
    this.x = 400;
    this.y = 40;
    this.score = 0;
    this.hardMode = hardMode;
  }

  increaseScore(points, bonus) {
    var bonusConversion = Math.floor(bonus / 20);
    this.score += points + bonusConversion;
  }

  decreaseScore() {
    this.score = Math.floor(this.score / 2 - 100);
  }

  draw() {
    this.ctx.save();
    this.ctx.font = "30px helvetica";
    this.ctx.fillStyle = "#ffff99";
    this.ctx.fillText("Score: " + this.score, this.x, this.y);
    if (this.hardMode) {
      this.ctx.fillStyle = "#ff6666";
      this.ctx.fillText("Hard mode", this.x + 240, this.y);
    }
    this.ctx.restore();
  }
}
