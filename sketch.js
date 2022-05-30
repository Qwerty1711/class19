var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2
  doorsGroup = createGroup()
  climbersGroup = createGroup()
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(200);
  if (gameState == "play"){
    ghost.velocityY +=1
  if(tower.y > 400){
      tower.y = 300
  }
  spawnDoors()
  drawSprites()
  if (keyDown("left_arrow")){
    ghost.x -= 5
  }
  if (keyDown("right_arrow")){
    ghost.x += 5
  }
  if (keyDown("space")){
    ghost.velocityY = -10
  }
  if (ghost.isTouching(climbersGroup)){
    if (ghost.velocityY < 0){
      ghost.destroy()
      gameState = "end"
    }else{
      ghost.velocityY = 0
    }
  }
  if (ghost.y > 600){
    ghost.destroy()
    gameState = "end"
  }
  }
  if (gameState == "end"){
    stroke("black")
    fill("red")
    textSize(30)
    text("Game Over",230,250)
  }
}

function spawnDoors(){
  if (frameCount%180== 0) {
    door = createSprite(Math.round(random(120,400)),-50)
    door.addImage(doorImg)
    door.velocityY = 2
    doorsGroup.add(door)
    door.lifetime = 600
    climber = createSprite(door.x,10)
    climber.addImage(climberImg)
    climber.velocityY = 2
    climbersGroup.add(climber)
    climber.lifetime = 600
    ghost.depth = door.depth;
    ghost.depth += 1
  }
}