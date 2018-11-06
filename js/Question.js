class Question {
  constructor(ctx, eq) {
    this.ctx = ctx;
    this.x = 15;
    this.y = 40;
    this.eq = eq;
  }

  draw() {
    this.ctx.save();
    this.ctx.font = "30px helvetica";
    this.ctx.fillStyle = "#7bcfe9";
    this.ctx.fillText("What is: ", this.x, this.y);
    this.ctx.font = "bold";
    this.ctx.fillStyle = "orange";
    this.ctx.fillText(this.eq, this.x + 145, this.y);
    this.ctx.restore();
  }
}
