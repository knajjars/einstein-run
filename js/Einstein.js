var context, controller, rectangle, loop;

class Einstein {
  constructor(
    ctx,
    level,
    img1,
    img1Running,
    img2,
    img2Running,
    img3,
    img3Running,
    imgRight,
    imgWrong,
    imgTip
  ) {
    this.ctx = ctx;
    this.height = 175; // img size
    this.width = 112; // img size
    this.jumping = true;
    this.x = 200;
    this.x_velocity = 0;
    this.y = 0;
    this.y_velocity = 0;
    this.spriteTtl = 0;
    this.level = level;
    this.img1 = img1;
    this.img1Running = img1Running;
    this.img2 = img2;
    this.img2Running = img2Running;
    this.img3 = img3;
    this.img3Running = img3Running;
    this.einsteinImg;
    this.img = this.img1;
    this.imgRunning = this.img1Running;
    this.imgRight = imgRight;
    this.imgWrong = imgWrong;
    this.bubbleImg = imgTip;
    this.bubbleTtl = 180;
    this.bubbleOptions = {
      right: [
        "Newton who?",
        "Still got it!",
        "Easy Peasy!",
        "Smart cookie!",
        "Real recognize real.",
        "Still the OG.",
        "Oh stop it you!",
        "Unlimited Power!",
        "Kobe!"
      ],
      wrong: [
        "Nein!",
        "Oh snap!",
        "Insanity!",
        "2 + 2 = 5?",
        "Can you not?",
        "E = Potato?",
        "Oops.",
        "Don't like this game.",
        "$H!T!"
      ]
    };
    this.bubbleType = "tip";
    this.bubbleText = "Tip: Jump going forward!";
  }

  update() {
    //set images according to level
    switch (this.level) {
      case 1:
        this.img = this.img1;
        this.imgRunning = this.img1Running;
        break;
      case 2:
        this.img = this.img2;
        this.imgRunning = this.img2Running;
        break;
      case 3:
        this.img = this.img3;
        this.imgRunning = this.img3Running;
        break;
    }

    //do the running effect
    this.spriteTtl++;
    if (this.spriteTtl >= 7) {
      this.einsteinImg = this.img;
      if (this.spriteTtl > 14) {
        this.spriteTtl = 0;
      }
    } else {
      this.einsteinImg = this.imgRunning;
    }

    if (controller.up && this.jumping == false) {
      this.y_velocity -= 60;
      this.jumping = true;
    }

    //change position according to controls

    if (controller.down && this.jumping == false) {
      this.y_velocity -= 40;
      this.jumping = true;
    }

    if (controller.left) {
      this.x_velocity -= 1.5;
      this.spriteTtl -= 0.5;
    }

    if (controller.right) {
      this.x_velocity += 1.5;
      this.spriteTtl++;
    }

    this.y_velocity += 1.5; // gravity
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.x_velocity *= 0.9; // friction
    this.y_velocity *= 0.9; // friction

    // if this is falling below floor line
    if (this.y > this.ctx.canvas.height - this.height - 110) {
      this.jumping = false;
      this.y = this.ctx.canvas.height - this.height - 110;
      this.y_velocity = 0;
    }

    if (this.x + 112 > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - 112;
      this.x_velocity = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.x_velocity = 0;
    }

    // if this is going off the left of the screen
    if (this.x < -this.width) {
      this.x = this.ctx.canvas.width;
    } else if (this.x > this.ctx.canvas.width) {
      // if this goes past right boundary
      this.x = 0;
    }
    // inside update()
    this.bubbleTtl = Math.max(0, this.bubbleTtl - 1);
  }

  draw() {
    //draw einstein
    this.ctx.drawImage(
      this.einsteinImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.bubbleTtl) {
      this.ctx.save();
      this.ctx.fillStyle = this.bubbleType === "right" ? "#5fcc81" : "#3491ee";
      this.ctx.drawImage(this.bubbleImg, this.x + 30, this.y - 130, 50, 50);
      this.ctx.font = "25px helvetica";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.bubbleText, this.x + this.width / 2, this.y - 50);
      this.ctx.restore();
    }
  }

  getRandomBubble(type) {
    var randIndex = Math.floor(Math.random() * 9);
    return this.bubbleOptions[type][randIndex];
  }

  gainingPoints() {
    this.bubbleTtl = 120;
    this.bubbleText = this.getRandomBubble("right");
    this.bubbleType = "right";
    this.bubbleImg = this.imgRight;
  }
  losingPoints() {
    this.bubbleTtl = 120;
    this.bubbleText = this.getRandomBubble("wrong");
    this.bubbleType = "wrong";
    this.bubbleImg = this.imgWrong;
  }
}

controller = {
  left: false,
  right: false,
  up: false,
  down: false,
  keyListener: function(event) {
    // to prevent default of the arrow keys only
    if ([37, 38, 39, 40].includes(event.keyCode)) {
      event.preventDefault();
    }

    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
      case 40: // down key
        controller.down = key_state;
        break;
    }
  }
};

var einstein1 = new Image();
var einstein1Running = new Image();
var einstein2 = new Image();
var einstein2Running = new Image();
var einstein3 = new Image();
var einstein3Running = new Image();
einstein1.src = "../game-einstein-run/images/einstein/einstein1.png";
einstein1Running.src =
  "../game-einstein-run/images/einstein/einsteinRunning1.png";
einstein2.src = "../game-einstein-run/images/einstein/einstein2.png";
einstein2Running.src =
  "../game-einstein-run/images/einstein/einsteinRunning2.png";
einstein3.src = "../game-einstein-run/images/einstein/einstein3.png";
einstein3Running.src =
  "../game-einstein-run/images/einstein/einsteinRunning3.png";

var rightAnswerImg = new Image();
var wrongAnswerImg = new Image();
rightAnswerImg.src = "../game-einstein-run/images/emote_heart.png";
wrongAnswerImg.src = "../game-einstein-run/images/emote_heartBroken.png";

var tipImg = new Image();
tipImg.src = "../game-einstein-run/images/emote_idea.png";

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
