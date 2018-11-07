class Heart {
  constructor(ctx, img) {
    this.ctx = ctx;
    this.img = img;
    this.x = 0;
    this.lifes = 3;
  }
  loseLife() {
    this.lifes--;
  }
  update() {}
  draw() {
    for (let i = 0; i < this.lifes; i++) {
      this.ctx.drawImage(this.img, 1025 + i * 50, 7, 50, 50);
    }
  }
}

heartImg = new Image();
heartImg.src = "../game-einstein-run/images/heart.png";
