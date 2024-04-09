let button_one;
let button_two;
let button_three;
let button_four;
let button_ins;

let isExerciseOne = false;
let exerciseOne;
let isExerciseTwo = false;
let exerciseTwo;
let isExerciseThree = false;
let exerciseThree;
let isExerciseFour = false;
let exerciseFour;
let isInstructions = false;
let instructions;

function setup() {
  createCanvas(1080, 720);
  menu();
}

function draw() {
  if (isExerciseOne) {
    exerciseOne.draw();
  }
  if (isExerciseFour) {
    exerciseFour.draw();
    exerciseFour.mouseClicked();
  }
  if (isExerciseTwo) {
    exerciseTwo.draw();
  }
  if (isExerciseThree) {
    exerciseThree.draw();
  }
  if (isInstructions) {
    instructions.draw();
  }
}

function menu() {
  clear();
  background(220);
  
  button_one = createButton('Exercise 1');
  button_one.position(width/2, 200);
  button_one.mousePressed(beginExerciseOne)
  
  button_two = createButton('Exercise 2');
  button_two.position(width/2, 300);
  button_two.mousePressed(beginExerciseTwo);
  
  button_three = createButton('Exercise 3');
  button_three.position(width/2, 400);
  button_three.mousePressed(beginExerciseThree);
  
  button_four = createButton('Exercise 4');
  button_four.position(width/2, 500);
  button_four.mousePressed(beginExerciseFour);
  
  button_ins = createButton('Instructions');
  button_ins.position(width/2, 600);
  button_ins.mousePressed(beginInstructions);
  
  
  
  textSize(32);
  text('Main Menu', width/2 - 38, 50);
}

function beginExerciseOne() {
  isExerciseOne = true;
  exerciseOne = new ExerciseOne();
  exerciseOne.preload();
  exerciseOne.setup();
}

function beginExerciseTwo() {
  isExerciseTwo = true;
  exerciseTwo = new ExerciseTwo();
  exerciseTwo.setup();
}

function beginExerciseThree() {
  isExerciseThree = true;
  exerciseThree = new ExerciseThree();
  exerciseThree.setup();
}

function beginExerciseFour() {
  
  isExerciseFour = true;
  exerciseFour = new ExerciseFour();
  exerciseFour.setup();
}

function beginInstructions() {
  
  isInstructions = true;
  instructions = new Instructions();
  instructions.setup();
}

function Instructions() {
  clear()
  hideButtons();
  
  this.setup = function() {
    createCanvas(1080, 720);
  }
  
  this.draw = function() {
    background(220);
    let s = 'Exercise 1: click on red circles. Exercise 2: click on bubbles for points. Exercise 3: Drag white square to finish. Exercise 4: type word as it falls to ground correctly';
  text(s, width/2, height/2, 300);
  }
}

function ExerciseOne() {
  clear();
  hideButtons();
  let moles;
  let score;
  let moleimg;
  let lastChar;

  this.preload = function()
  {
    moleimg = loadImage('red2.png');
  }

  this.setup = function() {
    createCanvas(600, 600);
    background(220);
    moles = [];
    score = 0;
    lastChar = 'a';
    let spacing = 25;
    let count = 3;
    let spacingx = width / count - spacing * 2;
    let spacingy = height / count - spacing * 2;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        var x = (i + 1) * spacingx;
        var y = (j + 1) * spacingy;
        let m = new mole();
        m.x = x;
        m.y = y;
        moles.push(m);
      }
    }
    for (let i = 0; i < moles.length; i++)
    {
      moles[i].char = char(i + 65);
    }
  }

  class mole {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.active = false;
      this.activeStart = 0;
      this.char = null;
    }
    draw() {   
      fill(0);
      ellipse(this.x, this.y, 40, 10);
      if (this.active) {
        image(moleimg, this.x-22, this.y-25-35, 60, 60);
      }     
    }
  }

  this.draw = function() {
    background(255);
    textSize(16);
    fill(0);
    textAlign(LEFT);
    text('SCORE: ' + score, 20, 30);
    //text('TEXT : ' + lastChar, 50, 50);
    textAlign(CENTER);
    text('WHACK-A-MOLE!', width/2, 30);
    let t = millis() / 1000;
    let timeOut = 1;
    let activeCount = 0;
    for (let i = 0; i < moles.length; i++) {
      moles[i].draw();
      if (moles[i].active) {
        activeCount++;
        if (t - moles[i].activeStart > timeOut) {
          moles[i].active = false;
        }
      }

    }

    if (int(t) % 2 == 0 && activeCount < 1) {
      let randIndex = int(random(0, moles.length));
      moles[randIndex].active = true;
      moles[randIndex].activeStart = millis() / 1000;
    }
  }

  function keyPressed() {
    let str = key.substring(0, 1);
    print(str);
    lastChar = str;
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].active && str === moles[i].char) {
        score += 10;
        moles[i].active = false;
      }
    }
  }
}

function ExerciseTwo() {
  clear();
  hideButtons();
  let bush;
  let input = '';
  let score = 0;
  let lives = 3;
  let isGameOver = false;
  let inputElement;
  let startButton;
  let endButton;
  let timerButton;
  let startTime;
  let endTime;
  let speedMultiplier = 0.0001;
  let level = 1;
  let powerUps = [];
  let obstacles = [];
  let isBonusRound = false;

  this.setup = function() {
    createCanvas(1080, 720);
    initializeUI();
  }

  this.draw = function() {
    background(220);

    if (!isGameOver) {
      if (bush) {
        handleBush();
      }
      if (!isBonusRound) {
        handlePowerUps();
        handleObstacles();
      }
      displayGameInfo();
    } else {
      displayGameOver();
    }
  }

  function initializeUI() {
    inputElement = createInput('');
    inputElement.position(width / 2 - 200, height - 60);
    inputElement.size(400, 40);
    inputElement.elt.placeholder = '';
    inputElement.elt.style.fontSize = '24px';
    inputElement.input(handleInput);
    inputElement.elt.style.textAlign = 'center';

    startButton = createButton('Start');
    startButton.position(width - 210, 10);
    startButton.style('font-size', '18px');
    startButton.size(80, 40);
    startButton.mousePressed(startGame);

    endButton = createButton('End');
    endButton.position(width - 110, 10);
    endButton.mousePressed(endGame);
    endButton.size(80, 40);
    endButton.elt.disabled = true;

    timerButton = createButton('Timer');
    timerButton.position(width - 100, height - 70);
    timerButton.size(80, 40);
    timerButton.mousePressed(function() {});
    timerButton.elt.disabled = true;
  }

  function handleBush() {
    bush.move();
    bush.display();

    if (bush.y > height) {
      if (lives > 0) {
        // Player made a spelling mistake, decrement lives
        lives--;
        newBush();
      } else {
        // Player is out of lives, end the game
        endGame();
      }
    }
  }

  function handlePowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
      powerUps[i].move();
      powerUps[i].display();

      if (dist(powerUps[i].x, powerUps[i].y, inputElement.position().x, inputElement.position().y) < 20) {
        activatePowerUp(powerUps[i].type);
        powerUps.splice(i, 1);
      }
    }
  }

  function handleObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].move();
      obstacles[i].display();

      if (dist(obstacles[i].x, obstacles[i].y, inputElement.position().x, inputElement.position().y) < 20) {
        collideWithObstacle(obstacles[i].type);
        obstacles.splice(i, 1);
      }
    }
  }

  function displayGameInfo() {
    textSize(36);
    text("Score: " + score, width / 2, 50);
    text("Lives: " + lives, width / 2, 90); // Display remaining lives
    text("Level: " + level, width / 2, 130);
    updateTimer();
  }

  function displayGameOver() {
    textSize(48);
    text("Game Over", width / 2, height / 2 - 50);
    text("Score: " + score, width / 2, height / 2 + 50);
    startButton.elt.disabled = false;
  }

  function handleInput() {
    input = inputElement.value().toLowerCase();
    if (bush) {
      let correctWord = bush.word.word.toLowerCase();
      if (input === correctWord) {
        score++;
        newBush();
        inputElement.value('');
      } else if (correctWord.startsWith(input)) {
        // Incomplete word
      } else {
        // Incorrect word
        lives--; // Decrement lives for spelling mistake
        if (lives <= 0) {
          // Player is out of lives, end the game
          endGame();
        } else {
          // Player has more chances, reset the input and continue
          displayIncorrectMessage();
          inputElement.value('');
        }
      }
    }
  }

  function displayIncorrectMessage() {
    fill(255, 0, 0);
    textSize(24);
    text("Incorrect word! Lives remaining: " + lives, width / 2, height - 20);
    fill(0);
  }

  function newBush() {
    let wordObject = randomWord();
    bush = new Bush(wordObject);
    inputElement.elt.disabled = false;
    inputElement.elt.placeholder = '';
  }

  function startGame() {
    isGameOver = false;
    startButton.elt.disabled = true;
    endButton.elt.disabled = false;
    timerButton.elt.disabled = false;
    inputElement.elt.disabled = false;
    inputElement.elt.placeholder = '';
    inputElement.value('');
    score = 0;
    lives = 3; // Reset lives when starting a new game
    level = 1; // Reset level
    powerUps = [];
    obstacles = [];
    newBush();
    startTime = millis();
  }

  function endGame() {
    isGameOver = true;
    startButton.elt.disabled = false;
    endButton.elt.disabled = true;
    timerButton.elt.disabled = true;
    inputElement.elt.disabled = true;
  }

  function updateTimer() {
    if (startTime) {
      let currentTime = millis() - startTime;
      let minutes = Math.floor(currentTime / (60 * 1000));
      let seconds = Math.floor((currentTime % (60 * 1000)) / 1000);
      let timerString = nf(minutes, 2) + ":" + nf(seconds, 2);
      timerButton.html("Timer: " + timerString);
    }
  }

  function activatePowerUp(type) {
    switch (type) {
      case "scoreMultiplier":
        score *= 2; // Double the score
        break;
      case "slowDown":
        speedMultiplier /= 2; // Halve the speed
        break;
      case "extraLife":
        lives++; // Add an extra life
        break;
      // Add more power-ups and their effects as needed
    }
  }

  function collideWithObstacle(type) {
    switch (type) {
      case "bomb":
        score -= 10; // Deduct 10 points
        break;
      case "barrier":
        lives--; // Lose a life
        break;
      // Add more obstacles and their effects as needed
    }
  }

  class Bush {
    constructor(wordObject) {
      this.word = wordObject;
      this.baseSpeed = 2;
      this.startTime = millis();
      this.width = 0; // Initialize width
      this.height = 40; // Fixed height for the ellipse
      this.calculateEllipseSize(); // Calculate ellipse size based on word length
    }

    move() {
      let elapsed = millis() - this.startTime;
      this.y += this.baseSpeed + elapsed * speedMultiplier;
    }

    display() {
      // Draw a rectangular ellipse
      fill(255);
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);

      // Display the word inside the ellipse
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(24);
      text(this.word.word, this.x, this.y);
    }

    calculateEllipseSize() {
      // Calculate text width within the draw function
      this.width = textWidth(this.word.word) + 40; // Add padding
      this.x = random(this.width / 2, width - this.width / 2); // Randomize x position
      this.y = -this.height / 2; // Start above the canvas
    }
  }

  // Object representing a word
  class WordObject {
    constructor(word) {
      this.word = word;
    }
  }

  function randomWord() {
    let words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "watermelon", "blueberry", "blackberry", "pomegranate", "pineapple", "apricot", "cranberry", "grapefruit", "guava", "kiwifruit", "lime", "papaya", "passionfruit", "plum", "rhubarb", "starfruit", "soursop", "boysenberry", "dragonfruit", "kumquat", "lychee", "persimmon", "mulberry", "apricot", "coconut", "tamarind", "plantain", "acai", "loganberry", "mangosteen", "pawpaw"];
    let randomIndex = floor(random(0, words.length));
    let word = words[randomIndex];
    return new WordObject(word);
  }

  class PowerUp {
    constructor(type) {
      this.type = type;
      this.x = random(width);
      this.y = -50;
      this.speed = 2;
    }

    move() {
      this.y += this.speed;
    }

    display() {
      fill(0, 255, 0);
      ellipse(this.x, this.y, 20, 20);
    }
  }

  class Obstacle {
    constructor(type) {
      this.type = type;
      this.x = random(width);
      this.y = -50;
      this.speed = 2;
    }

    move() {
      this.y += this.speed;
    }

    display() {
      fill(255, 0, 0);
      rect(this.x, this.y, 30, 30);
    }
  }
}

function ExerciseThree() {
  clear();
  
  let draggableElement;
  let obstacles = [];
  
  this.setup = function() {
    hideButtons();
    createCanvas(1080, 720);
    background(220);
    
    draggableElement = new draggable(100, 100, 50, 50);
    
    for (let i = 0; i < 4; i++) {
      obstacles[i] = new obstacle(random(150, 800), random(150, 600), 100, 100);
    }
    
  }
  
  this.draw = function() {
    background(220);
    
    draggableElement.display();
    draggableElement.draggable();
    
    for (let i = 0; i < 4; i++) {
      obstacles[i].display();
    }
    
    if (draggableElement.getX() + draggableElement.getW() > obstacles[0].getX() - obstacles[0].getW() / 2 &&
    draggableElement.getX() - draggableElement.getW() / 2 < obstacles[0].getX() + obstacles[0].getW() / 2 &&
    draggableElement.getY() + draggableElement.getH() / 2 > obstacles[0].getY() - obstacles[0].getH() / 2 &&
    draggableElement.getY() - draggableElement.getH() / 2 < obstacles[0].getY() + obstacles[0].getH() / 2) {
      //print('works');
  }
    if (draggableElement.getX() + draggableElement.getW() > obstacles[1].getX() - obstacles[1].getW() / 2 &&
    draggableElement.getX() - draggableElement.getW() / 2 < obstacles[1].getX() + obstacles[1].getW() / 2 &&
    draggableElement.getY() + draggableElement.getH() / 2 > obstacles[1].getY() - obstacles[1].getH() / 2 &&
    draggableElement.getY() - draggableElement.getH() / 2 < obstacles[1].getY() + obstacles[1].getH() / 2) {
      //print('works');
  }
    if (draggableElement.getX() + draggableElement.getW() > obstacles[2].getX() - obstacles[2].getW() / 2 &&
    draggableElement.getX() - draggableElement.getW() / 2 < obstacles[2].getX() + obstacles[2].getW() / 2 &&
    draggableElement.getY() + draggableElement.getH() / 2 > obstacles[2].getY() - obstacles[2].getH() / 2 &&
    draggableElement.getY() - draggableElement.getH() / 2 < obstacles[2].getY() + obstacles[2].getH() / 2) {
      //print('works');
  }
    if (draggableElement.getX() + draggableElement.getW() > obstacles[3].getX() - obstacles[3].getW() / 2 &&
    draggableElement.getX() - draggableElement.getW()  / 2 < obstacles[3].getX() + obstacles[3].getW() / 2 &&
    draggableElement.getY() + draggableElement.getH()  / 2 > obstacles[3].getY() - obstacles[3].getH() / 2 &&
    draggableElement.getY() - draggableElement.getH()  / 2 < obstacles[3].getY() + obstacles[3].getH() / 2) {
      print('works');
  }
    
    
  }
  
  class draggable {
    constructor(tempX, tempY, tempW, tempH) {
      this.x = tempX;
      this.y = tempY;
      this.width = tempW;
      this.height = tempH;
    }

    display() {
      fill(255);
      rect(this.x, this.y, this.width, this.height);
    }

    draggable() {
      if (
        mouseX >= this.x && 
        mouseX <= this.x + this.width && 
        mouseY >= this.y && 
        mouseY <= this.y + this.height 
      ) {

        cursor("grab");

        if (mouseIsPressed) {

          this.x = mouseX - this.width / 2;
          this.y = mouseY - this.height / 2;
        }
      } else {
        cursor(ARROW);
      }
    }
    
        getX() {
      return this.x;
    }
    
    getY() {
      return this.y;
    }
    
    getW() {
      return this.width;
    }
    
    getH() {
      return this.height;
    }
  }
  
  class obstacle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    
    display() {
      fill(255, 0, 0);
      rect(this.x, this.y, this.w, this.h);
    }
    
    getX() {
      return this.x;
    }
    
    getY() {
      return this.y;
    }
    
    getW() {
      return this.w;
    }
    
    getH() {
      return this.h;
    }
  }
}

function ExerciseFour() {
  clear();
  hideButtons();
  let circles = [];
  let score = 0;
  let timeLeft = 0;
  let timer;
  let canvasWidth = 1080;
  let canvasHeight = 720;
  let difficulty = ""; // Difficulty chosen by the player
  let circleSpeed; // Speed of circle creation

  let easyButton, mediumButton, hardButton;

  this.setup = function() {
    createCanvas(canvasWidth, canvasHeight);
    textAlign(CENTER, CENTER);
    textSize(36);
    noStroke();

    // Centering buttons on the canvas
    let buttonWidth = 200;
    let buttonHeight = 60;
    let buttonX = (width - buttonWidth * 3) / 2;
    let buttonY = height / 2 - buttonHeight / 2;

    // Create buttons for difficulty levels
    easyButton = createButton('Easy');
    easyButton.position(buttonX, buttonY);
    easyButton.size(buttonWidth, buttonHeight);
    easyButton.style('background-color', color(0, 200, 0)); // Green color
    easyButton.mousePressed(function() {
      startGame("easy");
    });

    mediumButton = createButton('Medium');
    mediumButton.position(buttonX + buttonWidth, buttonY);
    mediumButton.size(buttonWidth, buttonHeight);
    mediumButton.style('background-color', color(200, 200, 0)); // Yellow color
    mediumButton.mousePressed(function() {
      startGame("medium");
    });

    hardButton = createButton('Hard');
    hardButton.position(buttonX + buttonWidth * 2, buttonY);
    hardButton.size(buttonWidth, buttonHeight);
    hardButton.style('background-color', color(200, 0, 0)); // Red color
    hardButton.mousePressed(function() {
      startGame("hard");
    });
  }

  this.draw = function() {
    background(220);
    // Display circles
    for (let i = circles.length - 1; i >= 0; i--) {
      circles[i].display();
      circles[i].update();
      if (circles[i].isOutOfBounds()) {
        circles.splice(i, 1);
        timeLeft -= 5; // Decrease time when circle goes out of bounds
      }
    }
    // Display score and time left
    fill(0);
    text(`Score: ${score}`, width / 2, 100);
    text(`Time Left: ${timeLeft}`, width / 2, 150);
  }

  function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    updateDifficulty(difficulty);
    easyButton.hide();
    mediumButton.hide();
    hardButton.hide();
    timer = setInterval(countdown, 1000);
    // Start creating circles
    createCircle(); // Create the first circle immediately
  }

  function createCircle() {
    let diameter = random(20, 50);
    let x = random(diameter, width - diameter);
    let y = random(diameter, height - diameter);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    let fillColor = color(random(255), random(255), random(255));
    circles.push(new Circle(x, y, diameter, speedX, speedY, fillColor));
    // Adjust circle creation speed based on difficulty
    switch (difficulty) {
      case "easy":
        circleSpeed = 2000; // 2 seconds
        break;
      case "medium":
        circleSpeed = 1500; // 1.5 seconds
        break;
      case "hard":
        circleSpeed = 1000; // 1 second
        break;
      default:
        circleSpeed = 2000; // Default to easy
    }
    setTimeout(createCircle, circleSpeed);
  }

  function countdown() {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      noLoop();
      alert(`Game Over! Your score is ${score}`);
    }
  }

  class Circle {
    constructor(x, y, diameter, speedX, speedY, fillColor) {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.speedX = speedX;
      this.speedY = speedY;
      this.fillColor = fillColor;
    }

    display() {
      fill(this.fillColor);
      ellipse(this.x, this.y, this.diameter);
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off the walls
      if (this.x <= 0 || this.x >= width) {
        this.speedX *= -1;
      }
      if (this.y <= 0 || this.y >= height) {
        this.speedY *= -1;
      }
    }

    contains(px, py) {
      let d = dist(px, py, this.x, this.y);
      return d < this.diameter / 2;
    }

    isOutOfBounds() {
      return (
        this.x + this.diameter / 2 < 0 ||
        this.x - this.diameter / 2 > width ||
        this.y + this.diameter / 2 < 0 ||
        this.y - this.diameter / 2 > height
      );
    }
  }

  function updateDifficulty(difficulty) {
    switch (difficulty) {
      case "easy":
        timeLeft = 60;
        break;
      case "medium":
        timeLeft = 45;
        break;
      case "hard":
        timeLeft = 30;
        break;
      default:
        timeLeft = 60;
    }
  }

  this.mouseClicked = function() {
    // Check if mouse click is inside any circle
    for (let i = circles.length - 1; i >= 0; i--) {
      if (circles[i].contains(mouseX, mouseY)) {
        score++; // Increase score
        circles.splice(i, 1); // Remove clicked circle
        break; // Exit loop after finding the first clicked circle
      }
    }
  }

}

function hideButtons() {
  button_one.hide();
  button_two.hide();
  button_three.hide();
  button_four.hide();
  button_ins.hide();
}











