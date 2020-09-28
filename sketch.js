var monkey, inGround, survivalTime, play, end, gamestate, banana, rock, Monkey, jungle, Jungle, Banana, bananaGroup, obstacleGroup;

function preload() {
  Monkey = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  Jungle = loadImage("jungle.jpg");
  
  Banana = loadImage("banana.png");
  
  Stone = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  //jungle
  jungle = createSprite(200,200,10,10);
  jungle.addImage(Jungle);
  
  //monkey
  monkey = createSprite(50, 350, 10, 10);
  monkey.addAnimation("gorilla", Monkey);
  monkey.scale = 0.125;
  
  //ground
  inGround= createSprite(200,391,10,10);
  inGround.width=800;
  inGround.velocityX = -6;
  inGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  //score
  survivalTime = 0;
  
  //gamestates
  play= 1;
  end = 0;
  gamestate= play;

  //banana score variable
  bananaCount= 0;
    
}

function draw() {
  background(220);
  
  if(gamestate === play){
    
  //collider
  inGround.setCollider("rectangle",0,0,800,10);
  
  //collision
  monkey.collide(inGround);
  
  //ground regeneration
  if(inGround.x< 0){
    inGround.x=inGround.width/2;
  }
  
   //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 339.5){
      monkey.velocityY = -12 ;
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //bananas
    bananas();
    
    //obstacles
    stones();
    
    //survival time
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime= Math.ceil(World.frameCount/60);
    text("Survival Time:" + survivalTime,100,50);
    
    //banana count
    bananaScore();
    text("Bananas:" + bananaCount,100,100);
    
     //debuug console
    console.log(monkey.y);
    
    //switch to end state
    if(obstaclesGroup.isTouching(monkey)){
      gamestate = end;
    }
  }  
    if(gamestate === end){
      //gameover.visible = true;
      bananaGroup.destroyEach();
      obstaclesGroup.destroyEach();
      inGround.velocityX= 0;
      monkey.setAnimation("gameover");
      monkey.scale=1;
      monkey.x= 200;
      monkey.y= 200;
    }
    
  drawSprites();
}

function bananas(){
  if(frameCount% 80===0){
    banana= createSprite(450,randomNumber(200,280),10,10);
    banana.addImage(Banana);
    banana.scale=0.05;
    banana.velocityX= -6;
    banana.lifetime= 67;
    
    bananaGroup.add(banana);
  }
}

function stones(){
  if(frameCount% 300===0){
    rock= createSprite(450,349,10,10);
    rock.addImage(Stone);
    rock.scale=0.15;
    rock.velocityX= -6;
    rock.lifetime= 67;
    obstaclesGroup.add(rock);
  }
}

  function bananaScore(){
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      bananaCount = bananaCount+1;
    }
  }
