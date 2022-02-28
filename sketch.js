// Criação das variaveis do jogo
var trex ,trex_running;
var ground, groundimg;
var invisibleground;
var nuven, nuvenimg;
var obstaculo1, obstaculo2, obstaculo3,obstaculo4,obstaculo5,obstaculo6
var pontuacao = 0
var grupodenuvens, grupodeobstaculos;
var PLAY=1;
var END=0;
var gameState=PLAY;
var trex_collide
var restart,restartimg;
var gameover,gameoverimg;
var somdemorte, somdepulo, somdepontuacao;
// Carregamento das imagens e animação
function preload(){
  //carregamento animação trex correndo
  trex_collide=loadAnimation("trex_collided.png");
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimg=loadImage("ground2.png");
  nuvenimg=loadImage("cloud.png");
  obstaculo1=loadImage("obstacle1.png");
  obstaculo2=loadImage("obstacle2.png");
  obstaculo3=loadImage("obstacle3.png");
  obstaculo4=loadImage("obstacle4.png");
  obstaculo5=loadImage("obstacle5.png");
  obstaculo6=loadImage("obstacle6.png");
  restartimg=loadImage("restarttrex.png");
  gameoverimg=loadImage("gameOver.png");
  somdemorte=loadSound("die.mp3");
  somdepulo=loadSound("jump.mp3");
  somdepontuacao=loadSound("checkpoint.mp3");
}
// Criando a configuração do jogo
function setup(){
  // Criando a tela do jogo
  createCanvas(windowWidth,windowHeight);
  
  //crie um sprite de trex
  trex = createSprite(50,height-75,20,50);
  // Adicionar a animação
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collide);
  trex.scale=0.5;
  ground=createSprite(width/2,height-90,width,20);
  ground.addImage(groundimg);
  restart=createSprite(width/2,height/2);
  gameover=createSprite(width/2,height/2-50);
  restart.addImage(restartimg);
  gameover.addImage(gameoverimg);
  restart.scale=0.5;
  gameover.scale=0.5;
  invisibleground=createSprite(width/2,height-75,width,20);
  invisibleground.visible=false;
  grupodenuvens=new Group();
  grupodeobstaculos=new Group();
  trex.setCollider("rectangle",0,0,40,trex.height);
  trex.debug=true;
  
}
// Criando os desenhos e tudo que repete ao longo do jogo
function draw(){
  // para criar fundo
  background("white");
  textSize(25)
  text("Pontuação:"+pontuacao,500,50);
  
if(gameState===PLAY){
  pontuacao=pontuacao+Math.round(getFrameRate()/60)
  ground.velocityX=-(2+pontuacao /500);
  gameover.visible=false;
  restart.visible=false;
  if(ground.x<width/3){
    ground.x=ground.width/2;
    
  }
  if(pontuacao+0 && pontuacao % 1000===0){
    somdepontuacao.play();
  }
    //para o salto do trex
    if (touches.length>0||keyDown("space")&& trex.y>=height-120){
      trex.velocityY= -10;
      somdepulo.play();
      touches=[];
    }
    gerarNuvens();
    gerarobstaculos();
  
    // Gravidade do trex.
    trex.velocityY=trex.velocityY+0.5;
if(grupodeobstaculos.isTouching(trex)){
  gameState=END;
  somdemorte.play();
  //trex.velocityY=-12;
}
}
else if(gameState===END){
  ground.velocityX=0;
  grupodeobstaculos.setVelocityXEach(0)
  grupodenuvens.setVelocityXEach(0)
  trex.changeAnimation("trex_collided",trex_collide);
 grupodeobstaculos.setLifetimeEach(-1);
 grupodenuvens.setLifetimeEach(-1);
trex.velocityY=0;
gameover.visible=true;
restart.visible=true;
if(touches.length>0||mousePressedOver(restart)){
  reset();
  touches=[];
  }

}




  
 
  trex.collide(invisibleground);
  
  drawSprites();

}

function gerarNuvens(){
  if(frameCount%60===0){
    nuven=createSprite(width+20,height-300,40,10);
    nuven.velocityX=-3; 
    nuven.addImage(nuvenimg);
    //nuven.scale=0.5;
    nuven.y=Math.round(random(100,220));
    nuven.lifetime=width/3;
    trex.depth=nuven.depth;
  trex.depth=trex.depth+1;
  grupodenuvens.add(nuven);
  }


}
function gerarobstaculos(){
if(frameCount%300===0){
  var obstaculo = createSprite(width+20,height-95,10,40)
  obstaculo.velocityX=-(2+pontuacao /500);
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstaculo.addImage(obstaculo1);
    break;
    case 2: obstaculo.addImage(obstaculo2);
    break;
    case 3: obstaculo.addImage(obstaculo3);
    break;
    case 4: obstaculo.addImage(obstaculo4);
    break;
    case 5: obstaculo.addImage(obstaculo5);
    break;
    case 6: obstaculo.addImage(obstaculo6);
    break;
    default:break;
    
  } 
  obstaculo.scale=0.5;
  obstaculo.lifetime=width/obstaculo.velocityX;
  grupodeobstaculos.add(obstaculo);
}

}

function reset(){
  gameState=PLAY
  grupodenuvens.destroyEach();
  grupodeobstaculos.destroyEach();
  trex.changeAnimation("running",trex_running);
  pontuacao=0;
}