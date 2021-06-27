// Name       : jiyun_seok
// Assignment : Make a Game
// Course     : CS099
// Spring 2021
class Shot {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.direction = dir; 
    this.length = 5;
    this.hit = false;
}

draw() {
  if (!this.hit) {
    stroke(255);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y -  this.length);
    if (this.y < 0) {
      shots.splice(0, 1); 
    }
  }
}

move() {
  this.y -= 12;
}
}