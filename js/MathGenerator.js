// ranges
// a [1,10]
// b [10,20]
// c [1,100]

class MathGenerator {
  constructor() {
    this.oddA = 0;
    this.oddB = 0;
    this.oddC = 0;
    this.evenA = 0;
    this.evenB = 0;
    this.evenC = 0;
    this.multiplier = 0;
    this.level = 1;
    this.equation = {
      eq: "",
      answer: 0,
      wrongAnswers: []
    };
  }
  //increases level of Math Generator
  increaseLevel() {
    this.level++;
  }

  getEquation() {
    this.generateRandomNumbers();
    this.generateEquation();
    return this.equation;
  }
  //generates an equation
  generateOperator() {
    var operators = [];
    if (this.level === 1) {
      operators = ["+", "-"];
    } else if (this.level === 2) {
      operators = ["+", "-", "*", "/"];
    } else {
      operators = ["+*", "-*", "+/", "-/"];
    }
    var randIndex = Math.floor(Math.random() * operators.length);
    return operators[randIndex];
  }

  generateRandomNumbers() {
    //generate random numbers between ranges
    var randEvenA = Math.floor(Math.random() * (9 - 1) + 1);
    var randEvenB = Math.floor(Math.random() * (20 - 10) + 10);
    var randEvenC = Math.floor(Math.random() * (100 - 1) + 1);

    var randOddA = Math.floor(Math.random() * (9 - 1) + 1);
    var randOddB = Math.floor(Math.random() * (20 - 10) + 10);
    var randOddC = Math.floor(Math.random() * (100 - 1) + 1);

    randEvenA % 2 === 0 ? (this.evenA = randEvenA) : (this.evenA = ++randEvenA);
    randEvenB % 2 === 0 ? (this.evenB = randEvenB) : (this.evenB = ++randEvenB);
    randEvenC % 2 === 0 ? (this.evenC = randEvenC) : (this.evenC = ++randEvenC);

    randOddA % 2 === 0 ? (this.oddA = ++randOddA) : (this.oddA = randOddA);
    randOddB % 2 === 0 ? (this.oddB = ++randOddB) : (this.oddB = randOddB);
    randOddC % 2 === 0 ? (this.oddC = ++randOddC) : (this.oddC = randOddC);

    this.multiplier = Math.floor(Math.random() * 4 + 2);
  }

  //get a set of random numbers in an array
  getRandomNumbers() {
    var levelNumbers = [];

    if (this.level === 1) {
      var numbersArray = [this.evenA, this.evenB, this.oddA, this.oddB];
      while (levelNumbers.length < 2) {
        var randIndex = Math.floor(Math.random() * 4);
        levelNumbers.push(numbersArray[randIndex]);
      }
    }

    if (this.level === 2) {
      levelNumbers = [this.evenA, this.evenB, this.oddC];
    }

    if (this.level === 3) {
      levelNumbers = [this.evenA, this.oddB, this.oddC, this.evenC];
    }

    return levelNumbers;
  }

  generateWrongAnswers(answer) {
    var wrongAnswers = [];
    while (wrongAnswers.length < 2) {
      var randomNumber = Math.floor(Math.random() * 3 + 1);
      var randomIndex = Math.floor(Math.random() * 2);
      var positiveOrNegative = ["+", "-"];
      switch (positiveOrNegative[randomIndex]) {
        case "+":
          if (
            wrongAnswers.length === 1 &&
            wrongAnswers[0] === answer + randomNumber
          ) {
            wrongAnswers.push(answer - randomNumber);
          } else {
            wrongAnswers.push(answer + randomNumber);
          }
          break;
        case "-":
          if (
            wrongAnswers.length === 1 &&
            wrongAnswers[0] === answer - randomNumber
          ) {
            wrongAnswers.push(answer + randomNumber);
          } else {
            wrongAnswers.push(answer - randomNumber);
          }
          break;
      }
    }
    this.equation.wrongAnswers = wrongAnswers;
  }

  generateEquation() {
    // generate level 1 equation
    if (this.level === 1) {
      this.levelOneEquation();
    }

    //generate level 2 equation
    if (this.level === 2) {
      this.levelTwoEquation();
    }

    //generate level 3 equation
    if (this.level === 3) {
      this.levelThreeEquation();
    }
  }

  levelOneEquation() {
    var numbers = this.getRandomNumbers();
    switch (this.generateOperator()) {
      case "+":
        this.equation.eq = numbers[0] + " + " + numbers[1];
        this.equation.answer = numbers[0] + numbers[1];
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "-":
        this.equation.eq = numbers[0] + " - " + numbers[1];
        this.equation.answer = numbers[0] - numbers[1];
        this.generateWrongAnswers(this.equation.answer);
        break;
    }
  }

  levelTwoEquation() {
    var numbers = this.getRandomNumbers();
    // [this.evenA, this.evenB, this.oddC]
    switch (this.generateOperator()) {
      case "+":
        this.equation.eq = numbers[1] + " + " + numbers[2];
        this.equation.answer = numbers[1] + numbers[2];
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "-":
        this.equation.eq = numbers[2] + " - " + numbers[1];
        this.equation.answer = numbers[2] - numbers[1];
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "*":
        this.equation.eq = numbers[0] + " * " + this.multiplier;
        this.equation.answer = numbers[0] * this.multiplier;
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "/":
        this.equation.eq = numbers[1] + " / " + "2";
        this.equation.answer = numbers[1] / 2;
        this.generateWrongAnswers(this.equation.answer);
        break;
    }
  }

  levelThreeEquation() {
    var numbers = this.getRandomNumbers();
    // this.evenA, this.oddB, this.oddC, this.evenC
    switch (this.generateOperator()) {
      case "+*":
        this.equation.eq =
          "(" + numbers[0] + " * " + this.multiplier + ")" + " + " + numbers[2];
        this.equation.answer = numbers[0] * this.multiplier + numbers[2];
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "-*":
        this.equation.eq =
          "(" + numbers[0] + " * " + this.multiplier + ")" + " - " + numbers[1];
        this.equation.answer = numbers[0] * this.multiplier - numbers[1];
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "+/":
        this.equation.eq =
          "(" + numbers[0] + " / " + 2 + ")" + " + " + numbers[3];
        this.equation.answer = numbers[0] / 2 + numbers[3];
        this.generateWrongAnswers(this.equation.answer);
        break;
      case "-/":
        this.equation.eq =
          "(" + numbers[0] + " / " + 2 + ")" + " - " + numbers[1];
        this.equation.answer = numbers[0] / 2 - numbers[1];
        this.generateWrongAnswers(this.equation.answer);
        break;
    }
  }
}
