var starImg,bgImg, fairyImg, soniaRun, soniaIdle;
var star, starBody;
var fairy, sonia;
var song;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{

	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starryNight.jpg");

	soniaRun = loadAnimation("images/SR (1).png", "images/SR (2).png", "images/SR (1).png", "images/SR (2).png");
    soniaIdle = loadImage("images/SR (1).png");

    song = loadSound("sound/Play.mp3");

}

function setup() {
	createCanvas(windowWidth, windowHeight);

	edges = createEdgeSprites();

    sonia = createSprite(width / 2, height * 0.75);
	sonia.addImage("Idle", soniaIdle);
	sonia.addAnimation("Run", soniaRun);
	sonia.scale = 0.6;

	star = createSprite(random(0, width), -50);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(random(0,width) , -50, 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);

	ground = Bodies.rectangle(width / 2, height, width, height * 0.2, {isStatic : true});
	World.add(world, ground);

	so = Bodies.rectangle(sonia.x, sonia.y, sonia.height, sonia.width);
	World.add(world, so);

	gr = createSprite(ground.position.x, ground.position.y, width, height * 0.2);
	gr.shapeColor = "green";

	Engine.run(engine);

	song.loop();
	song.setVolume(0.35);

}

function draw() {
  background(bgImg);

  star.x = starBody.position.x;
  star.y = starBody.position.y;

  sonia.y = so.position.y;

  if (keyWentDown("down")){
	  Matter.Body.setStatic(starBody, false);
  }

  if (keyDown("right")){
	  sonia.changeAnimation("Run");
      sonia.mirrorX = 1;
	  sonia.x = sonia.x + 5;
  } else if (keyDown("left")){
	  sonia.changeAnimation("Run");
	  sonia.mirrorX = -1;
	  sonia.x = sonia.x - 5;
  } else {
	  sonia.changeImage("Idle");
  }

  if (star.isTouching(gr) || star.isTouching(sonia)){
	  starBody.position.x = random(0, width);
	  starBody.position.y = -50;

	  Matter.Body.setStatic(starBody, true);
  }

  sonia.collide(edges);

  console.log(star.y);

  drawSprites();

}