# Shapes
## What is this?
Using spapes, you can draw various shapes and line lights. For example, you can create triangles, squares, circles, lines, points, etc.
## Why is it important?
This is because you can make various things using shapes and you can make various other things
## How do we use it?
There are a method of inputting coordinates into a figure and a method of inputting coordinate values ​​and size of the figure.
## Example
It was used for 518,519,520 of the sketch js file and was used to collect and classify the endings.
```     rect(150,200,200,200) 
        rect(260,450,270,200)
        rect(450,200,200,200)
```
# Colors
## What is this?
This is to change the shape, background, or text to a different color.
## Why is it important?
If it is the same color, the letters will not be visible and the figures will not be visible, so change it to a different color. It can also be emphasized by changing the color or making it different.
## How do we use it?
There is a way to use fill to fill a color, and another is strok. The color of the wallpaper can be changed in the background, and it can be used as a single color. You can use the rbg value. To use the HTML code, "You must use this.
## Example
From 60 to 63 of the sketch.js file, red, green, white, etc. were used, and in addition, it was used in many places such as the shot.js file.
``` green = color(51, 255, 0);
    red = color(255, 51, 0);
    white = color(255);
    bgColor = color(50);
```
# Variables
## What is this?
Variables are what we use to put integers, decimals, etc.
## Why is it important?
This is because when using the same code, it is easy to modify the value and find the wrong one if you input a variable and use it.
## How do we use it?
Variables should be definable, and if they can be defined, variables are expressed using let and const. Let is modifiable, but const is not.
## Example
Sketch.js 1 to 32 are all variables.
```let CurrentScreen = MAIN_MENU;
let img1;
let canvas;
let player;
let green;
let red;
let white;
let bgColor;
let redAlienUFOThing;
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
```
# Conditional Statements
## What is this?
It checks whether the code is correct or not, and if it is correct, it executes it, otherwise it does something else or prevents it from running.
## Why is it important?
This is because you can create various things using conditional statements, and you can create responses when a button is pressed or pressed.
## How do we use it?
There are three types of if, else if, and else. 
If the if is executed, if it is false, else if is executed, and if else if is also false, else is used.
## Example
I use it too much, so I'll just show you one part.
```
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
```
# Loops
## What is this?
It repeats something until a condition is met.
## Why is it important?
Rather than using multiple lines of code to stop or iterate when something is satisfied, it's simpler to use a loop.
## How do we use it?
Loops can be used using while and for. while repeats until the condition becomes true, and for uses i++, (i<10), etc. It is the same as but different from while.
## Example
I usually use for for conditional statements.
```
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

```
# Functions
## What is this?
Functions are collections of code and use. You can call and use a function, and there is no need to use repetition.
## Why is it important?
By classifying them into functions, you can modify the code simply and easily, and when an error occurs, you only need to fix that part.
## How do we use it?
`function [name]([argument]) This is used, and the code is written inside the function.
## Example
So simple to use a lot.
```
function drawAllShots() {
    for (let shot of shots) {
      shot.draw();
    }
  }
  ```
 # Classes
## What is this?
A class is a collection of various functions, and functions are used within the class.
## Why is it important?
This is because, when making something, it is easy to make several things instead of just one.
## How do we use it?
After defining the class name, you can use it by putting variables, functions, etc. to be used in the class.
## Example
```class Laser {
  constructor(x, y, s, c) {
    this.x = x;
    this.y = y;
    this.sign = 1; 
    this.used = false;
    this.speed = s;
    this.c = c;
  }

  draw() {
    if (!this.used) {
      noFill();
      stroke(this.c);
      strokeWeight(1);
      if(this.c == red){
        strokeWeight(2);
      }
      beginShape();
      vertex(this.x, this.y);
      vertex(this.x + (2 * this.sign), this.y + 2);
      vertex(this.x - (2 * this.sign), this.y + 6);
      vertex(this.x, this.y + 8);
      endShape();
      
      if(!pauseMode){
        this.sign *= -1;
      }
    }
  }

  move() {
    this.y += this.speed;
  }
}
```
# Arrays
## What is these?
An array is a collection of data that stores letters and numbers.
## Why is it important?
This is important because it is easy to add or delete and when defining something.
## How do we use it?
After definition using an array, there are two methods. There is a method using [] and a method using [1,2,3] like this. The last value can be defined and arranged.
## Example
```let shots = []; 
let aliens = [];
```

