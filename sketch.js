// Name       : jiyun_seok
// Assignment : Make a Game
// Course     : CS099
// Spring 2021
let CurrentScreen = MAIN_MENU;
let img1;
let mouseWasPressed = false
let canvas;
let player;
let green;
let red;
let white;
let bgColor;
let shots = []; 
let aliens = []; 
let redAlienUFOThing;
let lasers = [];
let redLaser;
let score = 0;
let highScore = 0;
let alien1_a;
let alien1_b;
let alien2_a;
let alien2_b;
let alien3_a;
let alien3_b;
let alien4; 
let speed = 10; 
let laserSpeed = 10; 
let alienDirection = 'left';
let chanceOfFiringLaser = 50; 
let pauseMode = false;
let pauseTime = 0;
let isThereARedAlien = false;
let thrustSound;
let backgroundSound;
function preload()
{
  thrustSound = loadSound('sound/speed ship.mp3')
  backgroundSound = loadSound('sound/Nine Lives - Unicorn Heads.mp3')
   
}
  
function setup()
{
    createCanvas( 800, 800 );
    angleMode(DEGREES)
    img1 = loadImage("opsion.png")
    alien1_a = loadImage('images/alien1_a.png');
    alien1_b = loadImage('images/alien1_b.png');
    alien2_a = loadImage('images/alien2_a.png');
    alien2_b = loadImage('images/alien2_b.png');
    alien3_a = loadImage('images/alien3_a.png');
    alien3_b = loadImage('images/alien3_b.png');
    alien4 = loadImage('images/alien4.png');
    img2 = loadImage("images/universe-1566159_1280.jpg")
    img3 = loadImage("images/image 2.png")
    img4 = loadImage("images/image 4.png")
    img5 = loadImage("images/Alien _Flatline.png")
    img6 = loadImage("images/Alien_Outline.png")
    img7 = loadImage("images/bad end1.png")
    img8 = loadImage("images/bad end2.png")
    img9 = loadImage("images/happy end.png")
    green = color(51, 255, 0);
    red = color(255, 51, 0);
    white = color(255);
    bgColor = color(50);
    frameRate(10);
    player = new MyShip();
    createAllAliens();
    imageMode(CENTER);
    backgroundSound.play();
    backgroundSound.loop();
    backgroundSound.setVolume(0.55);
    setInterval(createRedAlien, 30000);
   

}

function drawUnpauseInstructions() {
    noStroke();
    fill(0)
    textAlign(CENTER);
    textSize(18);
    text('Are you going to destroy your spaceship?',400,400);
    text('Click quickly to attack the alien',400,500)
  }
  
  function keyPressed() {
    if (key === ' ') {
      if (!pauseMode) {
        player.fire();
        thrustSound.play();
      }
    }
    if (keyCode === LEFT_ARROW) {
      player.changeDirection('left');
    }
    if (keyCode === RIGHT_ARROW) {
      player.changeDirection('right');
    }
    if ((keyCode === RETURN || keyCode === ENTER) && gameOverBool) {
      reset();
    }
    return false;
  }
  

  
  function keyReleased() {
    if (keyIsPressed === false) {
      player.changeDirection('none');
    }
  }
  
  function drawAllShots() {
    for (let shot of shots) {
      shot.draw();
    }
  }
  
  function moveAllShots() {
    for (let shot of shots) {
      shot.move();
    }
  }
  
  function createAllAliens() {
    let startingX = 70;
    let startingY = 200;
  
    for (i = 0; i < 48; i++) {
      aliens[i] = new Alien(startingX, startingY, 20, 20, alien1_a, alien1_b, 10);
      startingX += 30;
      if (startingX > width - 30) {
        startingX = 70;
        startingY -= 30;
      }
    }
    
    for (i = 48; i < 96; i++) {
      aliens[i] = new Alien(startingX, startingY, 18, 14, alien2_a, alien2_b, 20);
      startingX += 30;
      if (startingX > width - 30) {
        startingX = 70;
        startingY -= 30;
      }
    }
   
    for (i = 96; i < 120; i++) {
      aliens[i] = new Alien(startingX, startingY, 14, 14, alien3_a, alien3_b, 40);
      startingX += 30;
      if (startingX > width - 30) {
        startingX = 70;
        startingY -= 30;
      }
    }
  }
  []
  function drawAllAliens() {
    for (let alien of aliens) {
      alien.draw();
    }
  }
  
  
  function moveAllAliens() {
    for (let alien of aliens) {
      alien.moveHorizontal(alienDirection);
    }
    if (checkIfAliensReachedEdge()) {
      reverseAlienDirections();
      moveAllAliensDown();
    }
  }
  
  function checkIfAliensReachedEdge() {
    let edgeReached = false;
    for (let alien of aliens) {
      if ((alien.x < 15 && alien.alive) || (alien.x > width - 15 && alien.alive)) {
        edgeReached = true;
      }
    }
    return edgeReached;
  }
  
  
  function reverseAlienDirections() {
    if (alienDirection === 'left') {
      alienDirection = 'right';
    } else {
      alienDirection = 'left';
    }
  }
  
  function moveAllAliensDown() {
    for (let alien of aliens) {
      alien.moveVertical();
    }
  }
  
  function hitAlien() {
    for (let shot of shots) {
      for (let alien of aliens) {
     
        if (shot.x > alien.x - alien.alienWidth / 2 &&
          shot.x < alien.x + alien.alienWidth / 2 &&
          shot.y - shot.length > alien.y - alien.alienHeight / 2 &&
          shot.y - shot.length < alien.y + alien.alienHeight / 2 &&
          !shot.hit && alien.alive
        ) {
          alien.alive = false;
          shot.hit = true;
          score += alien.points; 
        }
      }
    }
  }
  
  function allAliensKilled() {
    let bool = true;
    for (let alien of aliens) {
      if (alien.alive) {
        bool = false;
      }
    }
    return bool;
  }
  
  
  function resetAliens() {
    createAllAliens();
    redAlienUFOThing.x = 0 - redAlienUFOThing.shipWidth; 
    if (speed > 2) {
      speed -= 2;
    }
    chanceOfFiringLaser += 10;
  
  }
  
  function fireLaser() {
  
    if (random(100) < chanceOfFiringLaser) {
      let i = floor(random(aliens.length));
      if (aliens[i].alive) {
        let l = new Laser(aliens[i].x, aliens[i].y + (aliens[i].alienHeight / 2), laserSpeed, white);
        lasers.push(l);
      }
    }
  }
  
  
  function drawAllLasers() {
    for (let laser of lasers) {
      laser.draw();
    }
  }
  
  
  function moveAllLasers() {
    for (let laser of lasers) {
      laser.move();
    }
  }
  
  
  function drawScore() {
    noStroke();
    fill(255);
    textSize(14);
    textAlign(LEFT);
    text('LIVES: ', width - 175, 28);
    text('SCORE:', 25, 28);}

  
  
  function hitPlayer() {
    for (let laser of lasers) {
      let leftEdgeOfLaser = laser.x - 2;
      let rightEdgeOfLaser = laser.x + 2;
      let frontOfLaser = laser.y + 8;
      let backOfLaser = laser.y;
      let leftEdgeOfShip = player.x - (player.shipWidth / 2);
      let rightEdgeOfShip = player.x + (player.shipWidth / 2);
      let frontOfShip = player.y - (player.shipHeight / 2);
      let backOfShip = player.y + (player.shipHeight / 2);
  
    
      if (rightEdgeOfLaser > leftEdgeOfShip &&
        leftEdgeOfLaser < rightEdgeOfShip &&
        frontOfLaser > frontOfShip &&
        backOfLaser < backOfShip &&
        !laser.used) {
        laser.used = true; 
        if (player.lives > 0) {
          lifeLost();
        }
        if (player.lives == 0) {
        CurrentScreen = Game_Screen7
        }
      }
    }
  }
  
 
  
  
  
  function lifeLost() {
    pauseTime = frameCount;
    player.color = red;
    pauseMode = true;
  }
  
  
  function animateNewLife() {
    
  
    if ((frameCount - pauseTime > 5 && frameCount - pauseTime < 10) ||
      (frameCount - pauseTime > 15 && frameCount - pauseTime < 20) ||
      (frameCount - pauseTime > 25 && frameCount - pauseTime < 30)
    ) {
      noStroke();
      fill(bgColor);
      rectMode(CENTER);
   
      rect(player.x, player.y - 4,
        player.shipWidth + 2, player.shipHeight + 8);
    }
  
    if (frameCount - pauseTime > 30) {
      player.color = green;
      player.x = width / 2;
      pauseMode = false;
      player.lives -= 1;
      
      for (let laser of lasers) {
        laser.used = true;
      }
      for (let shot of shots) {
        shot.hit = true;
      }
    }
  }
  
  
  function gameOver() {
    gameOverBool = true;
   
    noLoop();
   }
   
  
  
  
  function reset() {
    highScore = score;
    score = 0;
    player = new MyShip();
    createAllAliens();
    for (let laser of lasers) {
      laser.used = true;
    }
  
    for (let shot of shots) {
      shot.hit = true;
    }
    loop();
  }
  
  function createRedAlien() {
    redAlienUFOThing = new RedAlien();
    isThereARedAlien = true;
    print('red alien created!');
  }
  
  function moveRedAlien() {
    if (isThereARedAlien) {
      redAlienUFOThing.move();
    }
  }
  
  function drawRedAlien() {
    if (isThereARedAlien) {
      redAlienUFOThing.draw();
    }
  }
  
  function hitRedAlien() {
    if (isThereARedAlien) {
      for (let shot of shots) {
        if (shot.x > redAlienUFOThing.x - redAlienUFOThing.alienWidth / 2 &&
          shot.x < redAlienUFOThing.x + redAlienUFOThing.alienWidth / 2 &&
          shot.y - shot.length > redAlienUFOThing.y - redAlienUFOThing.alienHeight / 2 &&
          shot.y - shot.length < redAlienUFOThing.y + redAlienUFOThing.alienHeight / 2 &&
          !shot.hit && redAlienUFOThing.alive
        ) {
          redAlienUFOThing.alive = false;
          shot.hit = true;
          score += redAlienUFOThing.points; 
        }
      }
    }
  }
  
  function moveRedLaser() {
    if (isThereARedAlien) {
      if (redAlienUFOThing.redLaserFired) {
        redLaser.move();
      }
    }
}



function draw()
{
    background( 220 );
    
   switch ( CurrentScreen )
   {
        case MAIN_MENU:
        {
          imageMode(CORNER);
image(img2,0,0,0,800)
     
stroke(255)
fill(255)
        textSize( 60 );
        text( "Space ", width / 2 - 120, height / 5 );
        const button_width = width / 3 - 8;
        const button_height = 200;
        const game_left = 10;
        const game_top = height - button_height - 10;
        textSize(30);
        text("Game", game_left+button_width/2, game_top+button_height/2);
        const options_button_left = game_left + button_width + 5;
        const options_button_top = game_top;
        text( "source", options_button_left + button_width / 2, options_button_top + button_height / 2 );
        const credits_button_left = options_button_left + button_width + 5;
        const credits_button_top = game_top;
        text( "ending", credits_button_left + button_width / 2, credits_button_top + button_height / 2 );
        

            if ( mouseIsPressed == true && mouseWasPressed == false)
            {
            
                {
                    const mouse_is_within_x_range = mouseX >= game_left && mouseX < game_left +
                    button_width;
                    const mouse_is_within_y_range = mouseY > game_top && mouseX < game_top +
                    button_height;
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                    CurrentScreen = GAME_SCREEN;
                    }
            
            
                 }
            
            
      
                {
                    const mouse_is_within_x_range = mouseX >= options_button_left && mouseX < options_button_left +
                        button_width;
                    const mouse_is_within_y_range = mouseY > options_button_top && mouseY < options_button_top +
                        button_height;
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                        CurrentScreen = SOURCE_SCREEN;
                    }
            
                }
            
            
                {
                    const mouse_is_within_x_range = mouseX >= credits_button_left && mouseX < credits_button_left +
                        button_width;
                    const mouse_is_within_y_range = mouseY > credits_button_top && mouseY < credits_button_top +
                        button_height;
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                        CurrentScreen = CREDITS_SCREEN;
                    }
                
                } 
            
        
            
            }
        break
          }
    case SOURCE_SCREEN:
    {
        textSize( 18 );
        text("image",0,200)
        text( "<a href=https://kr.lovepik.com/images/png-office.html>사무실 Png vectors by Lovepik.com</a>",0,220 );
        text( "https://www.pngegg.com/en/png-kaeda",0,240);
        text( "https://www.manypixels.co/gallery",0,260);
        text("sound",0, 300)
        text("https://soundeffect-lab.info/",0, 320)
        text("https://pgtd.tistory.com/category",0, 340)
        
        
        push()
        textSize(15)
        text("main menu",25,130)
        pop()
        if ( mouseIsPressed == true && mouseWasPressed == false){
        const main_menuX = mouseX >= 10 && mouseX <140 
            const main_menuY = mouseY >= 100 && mouseY <150 
                    if ( main_menuX && main_menuY )
                    {
                        CurrentScreen = MAIN_MENU;
                    }
                }
        break
    }
 
    case CREDITS_SCREEN:
    {
        textSize( 60 );
       
        
        rect(150,200,200,200)
        rect(260,450,270,200)
        rect(450,200,200,200)
        textSize(40)
        text("ending1",185,310)
        text("ending2",485,310)
        text("ending3",330,560)
        push()
        textSize(20)
        text("main menu",25,130)
        pop()
        if ( mouseIsPressed == true && mouseWasPressed == false){
            const main_menuX = mouseX >= 10 && mouseX <140 
            const main_menuY = mouseY >= 100 && mouseY <150 
            const ending1X = mouseX >= 150 && mouseX < 350
            const ending1Y = mouseY >= 200 && mouseY < 400
            const ending2X = mouseX >= 450 && mouseX < 650
            const ending2Y = mouseY >= 200 && mouseY < 400
            const ending3X = mouseX >= 250 && mouseX < 450
            const ending3Y = mouseY >= 500 && mouseY < 700

                     if ( main_menuX && main_menuY )
                        {
                            CurrentScreen = MAIN_MENU;
                        }
                    if ( ending1X && ending1Y )
                        {
                            CurrentScreen = Game_Screen5;
                        }
                    
                    if ( ending2X && ending2Y )
                        {
                            CurrentScreen = Game_Screen7;
                        }
                    
                    if ( ending3X && ending3Y )
                        {
                            CurrentScreen = Game_Screen8;
                        }
                    }
        break
                }
   
    case GAME_SCREEN:
    {
         imageMode(CORNER);
        image(img3,0,0,800,800)
        textSize( 30 );
        push()
        
        text( "May 27, 5021 AD My name is Jan. ", 50, 500 );
        text( "I just passed my test to become an ", 50, 540 );
        text( "astronaut yesterday . ", 50, 580 );

        pop()
       
        push()
        textSize(20)
        text("main menu",25,30)
        pop()
        text("Next",650,700);
        if ( mouseIsPressed == true && mouseWasPressed == false){
        {
            const mouse_is_within_x_range = mouseX >= 650 && mouseX < 750;
            const mouse_is_within_y_range = mouseY >= 650 && mouseY <750;
            
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                        CurrentScreen = Game_Screen2;
                    }
            const main_menuX = mouseX >= 10 && mouseX <140 
            const main_menuY = mouseY >= 0 && mouseY <50 
                    if ( main_menuX && main_menuY )
                    {
                        CurrentScreen = MAIN_MENU;
                    }
                }
            }break
        }
    case Game_Screen2:
    {
        textSize( 30 );
        image(img4,0,0,800,800)
        push()
        stroke(255)
        fill(255)
        text( "Start your first spaceflight mission. ", 50, 500 );
        text( "You just need to fly the spaceship well.", 50, 540 );
        pop()
        push()
        textSize(20)
        stroke(255)
        fill(255)
        text("main menu",25,30)
        pop()
        text("Next",650,700);
        if ( mouseIsPressed == true && mouseWasPressed == false){
        {
            const mouse_is_within_x_range = mouseX >= 650 && mouseX < 750;
            const mouse_is_within_y_range = mouseY >= 650 && mouseY <750;
            
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                        CurrentScreen = Game_Screen3;
                    }
            const main_menuX = mouseX >= 10 && mouseX <140 
            const main_menuY = mouseY >= 0 && mouseY <50 
                    if ( main_menuX && main_menuY )
                    {
                        CurrentScreen = MAIN_MENU;
                    }
                }
            }break
        }
    case Game_Screen3:
    {
        textSize( 30 );
        image(img4,0,0,800,800)
        image(img5,-10,-150,800,700)
        image(img6,510,180,510,280)
        image(img6,0,80,200,180)
        push()
        stroke(255)
        fill(255)
        text( "On the first flight, aliens started to invade.", 50, 500 );
        text( "What should I do?", 50, 540 );
        pop()
        
        push()
        textSize(20)
        stroke(255)
        fill(255)
        text("main menu",25,30)
        pop()
        stroke(255)
        fill(255)
        text("run away",550,700);
        if ( mouseIsPressed == true && mouseWasPressed == false){
        {
            const mouse_is_within_x_range = mouseX >= 550 && mouseX < 750;
            const mouse_is_within_y_range = mouseY >= 550 && mouseY <750;
            
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                        CurrentScreen = Game_Screen5;
                    }
            const main_menuX = mouseX >= 10 && mouseX <140 
            const main_menuY = mouseY >= 0 && mouseY <50 
                    if ( main_menuX && main_menuY )
                    {
                        CurrentScreen = MAIN_MENU;
                    }
                }
            }
        
        text("fight alien ",350,700);
        if ( mouseIsPressed == true && mouseWasPressed == false)
        {
         {
            const mouse_is_within_x_range = mouseX >= 300 && mouseX < 500;
            const mouse_is_within_y_range = mouseY >= 550 && mouseY <750;
                    if ( mouse_is_within_x_range && mouse_is_within_y_range )
                    {
                        CurrentScreen = Game_Screen6;
                    }
         }

        }
       
        break
    
    }
    
  case Game_Screen5: {
    textSize( 30 );
    push()
     image(img7,0,0,800,800)
    stroke(255)
    fill(255)
    text("bad end",340,300)
    text( "You left the earth and lived happily alone.", 100, 500 );
    pop()
    push()
    textSize(20)
    stroke(255)
    fill(255)
    text("main meun",25,30)
    if ( mouseIsPressed == true && mouseWasPressed == false){
    {
        const main_menuX = mouseX >= 10 && mouseX <140 
        const main_menuY = mouseY >= 0 && mouseY <50 
                if ( main_menuX && main_menuY )
                {
                    CurrentScreen = MAIN_MENU;
                }
            }
        } 
        break
    }

case Game_Screen6: {
    if (focused || frameCount < 30) {
    background(bgColor);
    player.move();
    player.drawPlayer();
    player.drawExtraLives();
    drawScore();
    if (!pauseMode) {
      moveAllShots();
      moveAllLasers();
      moveRedLaser();
      if (frameCount % speed == 0) {
        moveAllAliens();
        fireLaser();
      }
      moveRedAlien();
    }
    if (pauseMode) {
      animateNewLife();
    }
    drawAllShots();
    drawAllLasers();
    drawAllAliens();
    drawRedAlien();
    hitAlien();
    hitPlayer();
    hitRedAlien();
    if (allAliensKilled()) {
      resetAliens();
    }
  } else {
    drawUnpauseInstructions();}

    
    if( score>= 1000){ CurrentScreen = Game_Screen8;}
    break

    
   }
case Game_Screen7: {
        textSize( 30 );
        image(img8,0,0,800,800)
        push()
        stroke(255)
        fill(255)
        text("bad end",340,300)
        text( "He was killed by aliens while defending Earth.", 50, 500 );
        pop()
        push()
        stroke(255)
        fill(255)
        textSize(20)
        text("main menu",25,30)
        if ( mouseIsPressed == true && mouseWasPressed == false){
        {
            const main_menuX = mouseX >= 10 && mouseX <140 
            const main_menuY = mouseY >= 0 && mouseY <50 
                    if ( main_menuX && main_menuY )
                    {
                        CurrentScreen = MAIN_MENU;
                    }
                }
            } break
    
        }
case Game_Screen8: {
    textSize( 30 );
    image(img9,0,0,800,800)
    push()
    stroke(255)
    fill(255)
    text("happy end",340,300)
    text( "You defeated the astronauts and saved the Earth.", 50, 500 );
    pop()
    push()
    textSize(20)
    stroke(255)
    fill(255)
    text("main menu",25,30)
    if ( mouseIsPressed == true && mouseWasPressed == false){
    {
        const main_menuX = mouseX >= 10 && mouseX <140 
        const main_menuY = mouseY >= 0 && mouseY <50 
                if ( main_menuX && main_menuY )
                {
                    CurrentScreen = MAIN_MENU;
                }
            }
        } break

}
}
   
   mouseWasPressed = mouseIsPressed
}
