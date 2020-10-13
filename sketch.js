
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup;
var score;
var background_img, backface;
var obsticle_1_group, obsticle_1_img, obsticle_2_img;
var Game_over, Game_over_img, restart, restart_img;
var game_state="play";
var score=0;
var points=0;

localStorage["HighestScore"] = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  background_img=loadImage("background.png");
  obsticle_1_img=loadImage("obsticles.png");
  obsticle_2_img=loadImage("obsticle_2.png");
  Game_over_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
}



function setup() {
  createCanvas(400,400);
  
  //background
  backface=createSprite(200,200)
  backface.addImage(background_img);
  backface.scale=1.5;
  backface.velocityX=-2;
  
   monkey=createSprite(100,320);
   monkey.addAnimation("running", monkey_running);
   monkey.scale=0.1;
  // monkey.debug=true;
  monkey.setCollider("circle", 0, 0, 250);
  //ground
  ground=createSprite(200, 390, 400, 20);
  
  //banana
  banana=new Group();
  
  //obsitcle groups
  obsticle_1_group=new Group()
  
  //GameOver
  Game_over=createSprite(200,200);
  Game_over.addImage(Game_over_img);
  Game_over.visible=false;
  
  //Restart Button
  restart=createSprite(200,250);
  restart.addImage(restart_img);
  restart.scale=0.5;
  restart.visible=false;
}


function draw() {
  background(255);
  
  monkey.collide(ground);
  
  if (game_state=="play"){
    if (frameCount % 5 == 0){
    score++;
    }
  if (keyWentDown("space") && monkey.y>=330){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.4;
  
  if (backface.x<=100){
      backface.x=200;
  }
  
  obsticles();
  banana_spawn();
    if(banana.isTouching(monkey)){
      points++;
      banana.destroyEach();
    }
  }
  
  if (game_state=="end"){
    
    obsticle_1_group.setVelocityXEach(0);
    obsticle_1_group.setLifetimeEach(-1);
    Game_over.visible=true;
    restart.visible=true;
    backface.velocityX=0;
    monkey.velocityY=0;
    banana.destroyEach();
    
    if (mousePressedOver(restart)){

      reset();
    
    }
  
  }
  
  if (obsticle_1_group.isTouching(monkey)){

    game_state="end";
  
  }
  
  drawSprites();
  
  fill("white");
  textSize(20);
  text("Score : "+score, 250, 20);
  text("Points : "+points, 50, 20);
  text("High Score : "+ localStorage["HighestScore"], 130, 50)
}

function obsticles(){
  if(frameCount % 120 === 0){
  var ob1=createSprite(400,350, 10, 40);
  var ob_spawn=Math.round(random(1,2));
  // ob1.addImage(obsticle_1_img);
  ob1.scale=0.5;
  ob1.collide(ground);
  ob1.velocityX= -(6 + 3*score/100);
    switch (ob_spawn){
    
      case 1:
        ob1.addImage(obsticle_1_img);
        break;
      
        case 2:
          ob1.addImage(obsticle_2_img);
        break;
        
        default:
        break;
    }
    obsticle_1_group.add(ob1);
  }
}

function banana_spawn(){
  if(frameCount % 105 == 0){
  var banana_1=createSprite(400,200);
  banana_1.addImage(bananaImage);
  banana_1.velocityX=-4;
  banana_1.scale=0.1;
  banana.add(banana_1);
  }
}

function reset(){

  game_state="play";
  Game_over.visible=false;
  restart.visible=false;
  obsticle_1_group.destroyEach();
  backface.velocityX=-2;
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  score=0;
  points=0;
}

