var Play = 1;
var End = 2;
var Start = 0;
var gameState = Start;

var player



function preload(){
    startImg = loadImage("new background 2.png")
    playImg = loadImage("background.jpg")
    playerStand = loadAnimation("marcus3.png");
    playerMove = loadAnimation("marcus3.png","marcus4.png","marcus5.png","marcus6.png","marcus1.png","marcus2.png")
    plate1 = loadImage("plate1.png");
    plate2 = loadImage("plate2.png");
    plate3 = loadImage("plate3.png");
    plate4 = loadImage("plate4.png");
    plate5 = loadImage("plate5.png");
    stal = loadImage("fallRock1.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
 startBG = createSprite(windowWidth/2,windowHeight/2);
 startBG.addImage(startImg);
 startBG.scale = 0.45
 playBG = createSprite(windowWidth/2,windowHeight/2);
 playBG.addImage(playImg);
 playBG.visible = false
 player = createSprite(100,200,20,20);
 player.addAnimation("standing", playerStand);
 player.addAnimation("walking", playerMove);
 player.changeAnimation("standing");
 player.visible = false

 platesGroup = new Group();
 invisibleBlockGroup = new Group();
 
//player.debug = true
}

function draw() {
 background(0);
if(gameState === Start){
    if(keyDown("SPACE")){
        gameState = Play
    }
}
if(gameState === Play){
    startBG.visible = false
    playBG.visible = true
    player.visible = true

playBG.velocityY = +3
if(playBG.y > height){
    playBG.y = height/2
}
if(player.isTouching(platesGroup)){
    player.velocityY = 0
}
    
    spawnPlate();

    if(keyDown("A")){
        player.x -= 5;}
     if(keyDown("D")){
        player.x +=5;} 

    if(keyDown("W")){
     player.velocityY = -15;} 
     player.velocityY = player.velocityY+0.8 

if(player.y > height-50 || player.isTouching(invisibleBlockGroup)){
    gameState = End
}
if(gameState === End){
playBG.velocityY = 0
platesGroup.setVelocityYEach(0)
invisibleBlockGroup.setVelocityYEach(0)
player.velocityY = 0
}
}

drawSprites();
}

function spawnPlate(){
    if(frameCount%70 ===0) {
      plate = createSprite(200,-50);
      invisibleBlock = createSprite(200, 5);
      //invisibleBlock.width = plate.width
      //invisibleBlock.height = 2
      //invisibleBlock.visible = false
     // invisibleBlock.debug = true
      plate.x = Math.round(random(120,width-100));
      invisibleBlock.x = plate.x;
      var randPlate = Math.round(random(1,5))
      switch(randPlate){
        case 1: plate.addImage("plate1",plate1)
        break
        case 2: plate.addImage("plate2",plate2)
        break
        case 3: plate.addImage("plate3",plate3)
        break
        case 4: plate.addImage("plate4",plate4)
        break
        case 5: plate.addImage("plate5",plate5)
        break
      }
      invisibleBlock.addImage("stal",stal);
      invisibleBlock.scale = 0.7
      plate.velocityY = +3
      invisibleBlock.velocityY = +3
      plate.lifetime = 600
      invisibleBlock.lifetime = 600
      plate.depth = player.depth
      invisibleBlock.depth = player.depth
      player.depth += 1
      platesGroup.add(plate);
      invisibleBlockGroup.add(invisibleBlock);
      plate.setCollider("rectangle",0,0,plate.width-40,plate.height-20)
      //plate.debug = true
    }}