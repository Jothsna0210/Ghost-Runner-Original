var gameState="play";
var tower, ghost, door, climber, edge1, edge2, edge3,iblock,gameover;
var towerImage, ghostImage, doorImage, climberImage,gameoverimg;
var doors,climbers,iblocks;

function preload() {
  towerImage = loadImage("tower.png");
  ghostImage = loadAnimation("ghost-standing.png","ghost-jumping.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  gameoverimg = loadImage("game_over.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 0, 600, 600);
  tower.addImage(towerImage);

  ghost = createSprite(300, 200, 10, 10);
  ghost.addAnimation("running",ghostImage);
  ghost.scale = 0.4;
  ghost.setCollider("rectangle",-20,30,150,240);
  
  edge1 = createSprite(0, 300, 5, 600);
  edge1.visible = false;
  edge2 = createSprite(600, 300, 5, 600);
  edge2.visible = false;
  edge3 = createSprite(300, 0, 600, 5);
  edge3.visible=false;
  
  gameover = createSprite(300,300,10,10);
  gameover.addImage(gameoverimg);
  gameover.scale=0.1;
  gameover.visible=false;
  
  tower.velocityY = 4;
  
  doors = new Group();
  climbers = new Group();
  iblocks = new Group();

}

function draw() {
  background("white");

  
  if(gameState==="play"){
    
  ghost.collide(edge1);
  ghost.collide(edge2);
  //ghost.collide(edge3);

  if (keyDown("space") && ghost.y < 600) {
    ghost.velocityY = -10;
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  /*if(keyReleased("up")){
    ghost.velocityY=0;
  }*/

  if (keyDown("right")) {
    ghost.x = ghost.x+3;
  }
  /*if(keyReleased("right")){
    ghost.velocityX=0;
  }*/

  if (keyDown("left")) {
    ghost.x=ghost.x-3;
  }
  /*if(keyReleased("left")){
    ghost.velocityX=0;
  }*/

  if (tower.y > 500) {
    tower.y = tower.y / 2;
  }
  
  if(climbers.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(iblocks.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    tower.velocityY=0;
    gameState="end";
  }

  spawnObstacle();

  }
  
  if(gameState==="end"){
    gameover.visible=true;
    
  }
  
  drawSprites();
}

function spawnObstacle() {
  if (frameCount % 90 === 0) {
    var door = createSprite(Math.round(random(120, 480)), 0, 20, 40);
    door.addImage(doorImage);
    door.velocityY = 5;
    doors.add(door);
    door.lifetime=300;
    
    var climber = createSprite(door.x, 55, 20, 20);
    climber.addImage(climberImage);
    climber.velocityY = 5;
    climbers.add(climber);
    climber.lifetime=300;  
    
    var iblock = createSprite(door.x,58,climber.width,10);
    iblock.velocityY = 5;
    iblock.visible=false;
    iblocks.add(iblock);
    
    
    ghost.depth=door.depth;
    ghost.depth+=1;
  }
}