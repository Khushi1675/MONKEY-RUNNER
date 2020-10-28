//making variables for the game
var monkey, monkey_running, monkeyCollide;
var edges;
var ground, invisiGround, groundImg;
var banana, mango, apple, bananaImage, mangoImage, appleImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var energylevel = 20;


//making game states
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {

  //loading images and adding animation 
  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  monkeyCollide = loadAnimation("monkey_1.png");


  groundImg = loadAnimation("ground.jpg")

  bananaImage = loadImage("banana.png");
  mangoImage = loadImage("mango.png");
  appleImage = loadImage("apple.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  //creating background
  createCanvas(600, 300);

  //creating obstacles and bananas group   
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  mangoGroup = createGroup();
  appleGroup = createGroup();

  //modifying monkey sprite
  monkey = createSprite(80, 230, 10, 10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);

  //modifying ground sprite and invisible ground
  ground = createSprite(300, 340, 600, 10);
  ground.scale = 1;

  ground.addAnimation("ground", groundImg);

  invisiGround = createSprite(300, 278, 600, 7);
  invisiGround.visible = false;

  edges = createSprite(1, 200, 1, 300);

}

function draw() {
  //modifying background
  background("white");
  fill("black");

  text("SURVIVAL TIME: " + score, 470, 20);
  text("SCORE: " + bananaScore, 300, 20);
  text("ENERGY LEVEL : " + energylevel, 20, 20)

  //game state play
  if (gameState === PLAY) {

    obstacles();
    bananas();
    mangos();
    apples();

    score = score + Math.round(getFrameRate() / 30);

    ground.velocityX = -(4 + score * 1.5 / 100);

    if (keyDown("space") && monkey.y >= 235) {
      monkey.velocityY = -14;
      energylevel = energylevel - 1;
      monkey.velocityX = -0.25;

    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0)

    {
      ground.x = ground.width / 2;
    }


    if (monkey.isTouching(bananaGroup)) {
      bananaScore++;
      bananaGroup.destroyEach();
      energylevel = energylevel + 1;
      monkey.velocityX = +0.25;
    }

    if (monkey.isTouching(mangoGroup)) {
      bananaScore++;
      mangoGroup.destroyEach();
      energylevel = energylevel + 1;
      monkey.velocityX = +0.25;
    }

    if (monkey.isTouching(appleGroup)) {
      bananaScore++;
      appleGroup.destroyEach();
      energylevel = energylevel + 1;
      monkey.velocityX = +0.25;
    }


    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }

    if (monkey.isTouching(edges)) {

      monkey.x = 60;
    }
    if (energylevel == (0)) {

      gamestate = END;
    }

  }


  //game state end
  if (gameState === END)

  {
    ground.velocityX = 0;


    monkey.velocityX = 0.00000000000001;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    mangoGroup.setVelocityXEach(0);
    appleGroup.setVelocityXEach(0);


    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    mangoGroup.setLifetimeEach(-1);
    appleGroup.setLifetimeEach(-1);

    fill("red")
    stroke("black")
    textSize(30);
    text("GAME OVER!", 225, 170);
    fill("black");
    textSize(16);
    text("Press 'R' to play again", 240, 200);

    if (keyDown("r")) {
      bananaGroup.destroyEach();
      mangoGroup.destroyEach();
      appleGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      energylevel = 20;
      gameState = PLAY;
      monkey.x = 60;
    }
  }



  drawSprites();

  monkey.collide(invisiGround);



}


function bananas() {
  if (frameCount % 100 === 0) {

    banana = createSprite(620, 120, 50, 50)
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + score * 1.5 / 100);
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

  }
}

function mangos() {
  if (frameCount % 255 === 0) {

    mango = createSprite(620, 120, 50, 50)
    mango.addAnimation("mango", mangoImage);
    mango.scale = 0.08;
    mango.velocityX = -(4 + score * 1.5 / 100);
    mango.lifetime = 220;
    mangoGroup.add(mango);
    mangoGroup.add(mango);

  }

}

function apples() {
  if (frameCount % 370 === 0) {

    apple = createSprite(620, 120, 50, 50)
    apple.addAnimation("apple", appleImage);
    apple.scale = 0.15;
    apple.velocityX = -(4 + score * 1.5 / 100);
    apple.lifetime = 220;
    appleGroup.add(apple);
    appleGroup.add(apple);

  }

}

function obstacles() {

  if (frameCount % 200 === 0) {

    obstacle = createSprite(620, 253, 50, 50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4 + score * 1.5 / 100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);

  }

}