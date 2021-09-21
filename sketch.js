
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var score =0;
var PLAY = 1;
var END = 0;
//var gameState = PLAY;
 var gameState = "wait";

var thor1, villan5, strombreaker,gameover, background, powerUp, leader,sword;
var thor1Img,villan5Img, villan4Img, gameoverImg, backgroundImg, powerUpImg,leaderImg,swordImg,sword2Img;
var villan5Group, villan4Group;
var score = 0;

var life =20;
var score=0;
var hearts = []

var v;
var p =1100

life = 20
score = 0

function preload(){
	thor1Img = loadImage("image/thor.png")
	gameoverImg = loadImage("image/gameOver.png")
	villan4Img = loadImage("image/v3.png")
	villan5Img = loadImage("image/villan4.png")
	backgroundImg= loadImage("image/gtaGraphic.png")
	hammerImg = loadImage("image/hammer.png")
	sword1Img = loadImage("image/sword1.png")
	leaderImg = loadImage("image/v.png")
	powerUpImg= loadImage("image/powerUp1.png")
	gameOverSound = loadSound("sound/GAME OVER SOUND.wav") 
	gameWinSound = loadSound("sound/GAME WIN SOUND.wav")
	powerUpSound = loadSound("sound/POWERUP COLLECT SOUND.wav")
	backgroundSound = loadSound("sound/BackGroundSound.wav")
	heartImg = loadImage("image/life.png")
	
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	//bg= createSprite(50, width/2, 100,height);
	//bg.addImage(backgroundImg)
	//bg.scale = 50
	
	thor1= createSprite(100, height/2, 50,50);
	thor1.addImage(thor1Img)
	thor1.scale=1 
	thor1.setCollider("rectangle",0,0,100,100)

	thorCheck = createSprite(100,height/2,10,100);
	thorCheck.shapeColor= "red"

	powerUp= createSprite(100, height/2, 100,50);
	powerUp.addImage(powerUpImg)
	powerUp.scale=0.2

	//creating sprite for villain
	v = createSprite(1200, thor1.y, 20,20);
	v.visible = false
	vCheck = createSprite(1200, thor1.y, 10, 100)
	vCheck.shapeColor="red"

	leader = createSprite(200,thor1.y,20,20);
	leader.addImage(leaderImg);
	leader.scale = 0.3
	leader.visible = false

	//sw = createSprite(21000,-10,-650,50)
	//sw.addImage(sword1Img);
	//sw.scale = 0.5
	 
	//villan5Group = createGroup();   
	powerGroup = createGroup(); 

	angleMode(DEGREES)

	var options = {
		isStatic: true
	}
	hammer = Bodies.rectangle(thor1.x+150, thor1.y-0, 20,20,options);
	World.add(world, hammer)

	hammerCheck = createSprite(thor1.x+120, thor1.y-30, 8,20)
	hammerCheck.shapeColor="red"

	hammer1 = Bodies.rectangle(1200, thor1.y, 20,20,options);
	World.add(world, hammer1)

	hammer1Check = createSprite(1153, thor1.y-85, 8,20)
    hammer1Check.shapeColor="red"

	sword = Bodies.rectangle(22000,thor1.y,550,550,options);
	World.add(world,sword);

   swordCheck = createSprite(22000,thor1.y+500,20,170)
  swordCheck.shapeColor = "blue"

  Visiblity = 0

  for(var i = 0; i < 20; i++){
	  heart = createSprite(camera.position.x-500+65*i,150,10,10)
	  heart.addImage(heartImg)
	  heart.scale = 0.15
	  hearts.push(heart)
  }



	Engine.run(engine);
	thor1.debug = true
	
  
}

function draw() {
	background(backgroundImg);

	imageMode(CENTER);
	image(backgroundImg,width/2,height/2,width*39,height)

     
	fill("white")
	textSize(35)
	text("Score: "+score, camera.position.x-300, 100)
	//text("Life: "+life, camera.position.x-300, 150)
	for(var i = 0; i < hearts.length; i++){
       hearts[i].x = camera.position.x-500+65*i
	}
	
	if(gameState === "wait"){
		text("Press D,W,A,S to move the thor RIGHT UP LEFT & DOWN", 400,400);
		text("Press LEFT & RIGHT ARROW key to fight with enemies & their leader", 400,450);
		text("Collect power currents to increase life ", 400,500);
		text("Press SPACE key to start the game", 400,550);
		if(keyDown("SPACE")){
			gameState = "play";
		}
	}
  
	if(gameState === "play"){
	count =1
	  spawnPower();
	  if(powerGroup.isTouching(thor1)){
		  powerGroup.destroyEach();
		  if(life<20){
		  life = life + 1
		  powerUpSound.play();
		  }
        backgroundSound.loop();
	  }
	  //console.log(frameCount);
  
       camera.position.x = thor1.x 

	  //camera.position.y = thor1.y

      // console.log(thor1.x)

	  thorCheck.x = thor1.x+50;
	  thorCheck.y = thor1.y

	   

	   if(keyDown("d")){
		   thor1.x += 20;
		 }
		 if(keyDown("a")){
			thor1.x -= 20;
		}
		if(keyDown("w") ){
			thor1.y -= 20;
		}
	    if(keyDown("s")){
			thor1.y += 20;
		}
		//if(keyDown("space") && thor1.y >= 159) {
		//	thor1.velocityY = -12;
		 // }
      if(thor1.x===p+600){
		  p = p +1000
	  }

	  console.log(swordCheck.x)
     
      if(thor1.x===p && p<=20200){
		  v.x = p+150
		  vCheck.x = v.x
		  v.addImage(villan4Img)
		  v.scale = 0.3;
		  v.debug = true
		  v.visible = true
		  //console.log(v.x)
           
		  
		  
		  hammer1.position.x = p+200
		  Visiblity = 255
		 
                
		           
	  }

	  if(p >= 22000 && thor1.x === p){
		  leader.x = thor1.x +300
        leader.visible = true
		sword.position.x = p+200
	//	swordCheck.x = sword.position.x+100
		Visiblity = 255
	  }
	  swordCheck.x = sword.position.x+200




   	 

     

			//console.log(hammer.position.x);
			//	console.log(v.x)

	  drawSprites();

     			 // moving hammer of thor
				push()
				translate(hammer.position.x+15, hammer.position.y-15);
				rotate(hammer.angle);
				imageMode(CENTER);
				image(hammerImg, 0,0,100,100)
				pop();

				hammer.position.x = thor1.x+100
				hammer.position.y = thor1.y

				hammerCheck.x = hammer.position.x+20
				//hammerCheck.y = hammer.position.y-30


				//Matter.Body.setStatic(hammer1, true)
                
	  			//moving hammer of villain
				push()
				translate(hammer1.position.x-100, hammer1.position.y-60);
				rotate(hammer1.angle);
				imageMode(CENTER);
				tint(255, Visiblity)
				image(hammerImg, 0,0,100,100)
				pop();
				
                 //hammer1Check.x = hammer1.position.x-140
				 hammer1Check.x = hammer1.position.x-140
                //sword of leader
				push()
				translate(sword.position.x-100, sword.position.y-60);
				rotate(sword.angle);
				imageMode(CENTER);
				tint(255, Visiblity)
				image(sword1Img, 0,0,300,300)
				pop();
				swordCheck.y = sword.position.y	

				//console.log(sword1)

				fight()
				leaderfight()
				if(life <= 0){
					gameState = "over"
					backgroundSound.stop()
					gameOverSound.play()
				}
	    }
		if(gameState === "over"){
			fill("white")
			textSize(35)
			text("GAME OVER !",thor1.x-150,thor1.y)
		}

		if(gameState === "win"){

		fill("white")
		textSize(35)
		text(" YOU WIN",thor1.x-150,thor1.y)
		
		
	}
	

	//console.log(gameState)
			
         }

  function spawnPower(){
	  if(frameCount % 200 === 0 && thor1.x<= 20000 && frameCount !== 0) {
		var power = createSprite(600,120,40,10);
        power.y = random(0,height/2);
		power.x = thor1.x;
		power.addImage(powerUpImg);
		power.scale = 0.1;
		powerGroup.add(power)
	  }
  }

  function getVillain(){

  }

  function fight(){
           
	     //moving thor's hammer
			if(keyDown(RIGHT_ARROW) && hammer.angle<=80){
				hammer.angle += 5
				hammer.position.y +=3

				hammerCheck.rotation = hammer.angle + 6
				hammerCheck.y +=2
				hammerCheck.x += 9
			
					
			}

			if(keyDown(LEFT_ARROW) && hammer.angle>=0){
			hammer.angle -= 5
			hammer.position.y -=2

			hammerCheck.rotation = hammer.angle - 5
				hammerCheck.y -=2
				hammerCheck.x -= 2
		}

         //moving villain's hammer
		if(keyDown(RIGHT_ARROW) && hammer1.angle>=-185){
			hammer1.angle -=5
			//hammer1.position.x -=0.5
			//console.log(hammer1.angle)

			hammer1Check.rotation = hammer.angle - 6
			hammer1Check.y +=1
			//hammer1Check.x += 9


		}


		if(keyDown(LEFT_ARROW) && hammer1.angle<=-45){
			hammer1.angle += 5
			//console.log(hammer1.angle)
			hammer1Check.rotation = hammer.angle + 6
			hammer1Check.y -=1
				
		}

		//destroying villain
		if(hammerCheck.isTouching(vCheck) && v.visible === true){
		//console.log(hammer.position.x);
		//console.log(v.x)
		v.visible = false

		Visiblity = 0
		//console.log(Visiblity)
		score = score + 1

		}

		//destroying thor
		if(hammer1Check.isTouching(thorCheck) && v.visible === true && Visiblity ===255 ){



		life = life-1
		thor1.x = thor1.x +200
		v.visible = false
		Visiblity = 0
		if(hearts[hearts.length-1]!== undefined)
		hearts[hearts.length-1].destroy()
		hearts.pop()

		}



	
  }

  function leaderfight(){
           
	//moving thor's hammer
	   if(keyDown(RIGHT_ARROW) && hammer.angle<=80){
		   hammer.angle += 5
		   hammer.position.y +=3

		   hammerCheck.rotation = hammer.angle + 6
		   hammerCheck.y +=2
		   hammerCheck.x += 9
	   
			   
	   }

	   if(keyDown(LEFT_ARROW) && hammer.angle>=0){
	   hammer.angle -= 5
	   hammer.position.y -=2

	   hammerCheck.rotation = hammer.angle - 5
		   hammerCheck.y -=2
		   hammerCheck.x -= 2
   }

	//moving villain's hammer
	//console.log(sword.angle)
   if(keyDown(RIGHT_ARROW) && sword.angle>=-70){
	   sword.angle -=5
	   //hammer1.position.x -=0.5
	   //console.log(hammer1.angle)

	   swordCheck.rotation = hammer.angle - 6
	   swordCheck.y +=1
	   //hammer1Check.x += 9


   }


   if(keyDown(LEFT_ARROW) && sword.angle<=-55){
	   sword.angle += 5
	   //console.log(hammer1.angle)
	   swordCheck.rotation = hammer.angle + 6
	   swordCheck.y -=1
		   
   }

   //destroying villain
   if(hammerCheck.isTouching(leader) && leader.visible === true){
   //console.log(hammer.position.x);
   //console.log(v.x)
 // v.visible = false

  // Visiblity = 0
  // console.log(Visiblity)
   score = score + 21
   gameState = "win"
   backgroundSound.stop()
   gameWinSound.play()

   }

   //destroying thor
   if(swordCheck.isTouching(thorCheck) && leader.visible === true && Visiblity ===255 ){



   life = life-5
   thor1.x = thor1.x +200
   //leader.visible = false
  // Visiblity = 0
  if(hearts[hearts.length-1]!== undefined)
  hearts[hearts.length-1].destroy()
  hearts.pop()
  if(hearts[hearts.length-1]!== undefined)
  hearts[hearts.length-1].destroy()
  hearts.pop()
  if(hearts[hearts.length-1]!== undefined)
  hearts[hearts.length-1].destroy()
  hearts.pop()
  if(hearts[hearts.length-1]!== undefined)
  hearts[hearts.length-1].destroy()
  hearts.pop()
  if(hearts[hearts.length-1]!== undefined)
  hearts[hearts.length-1].destroy()
  hearts.pop()
   }




}