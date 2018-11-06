class Level {
  constructor(ctx, level) {
    this.ctx = ctx;
    this.x = 650;
    this.y = 40;
    this.level = level;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.font = "30px helvetica";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Level: " + this.level, this.x + 200, this.y);
    this.ctx.restore();
  }
}
