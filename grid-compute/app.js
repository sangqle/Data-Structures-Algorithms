const height = 600
const width = 600
const squareSize = 15
const speedPopulate = 15;
let s;

let vector = [];

function setup() {
  createCanvas(height, width);
  s = new node();
  
}

function draw() {
  background(220);
  grid();
//   displayMousePosition();
//   s.update();
  s.randomUpdate();
//   s.displayAtPos();
  s.show();
}

function grid() {
  for (var x = 0; x < width; x += squareSize) {
    line(x, 0, x, height);
    for (var y = 0; y < height; y += squareSize) {
      line(0, y, width, y);
      node();
    }
  }
}
function node() {
    this.x = 0;
    this.y = 0;
    this.xspeed = speedPopulate;
    this.yspeed = speedPopulate;
    
    this.update = function() {
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
    this.show = function() {
        fill(1);
        rect(this.x, this.y, squareSize, squareSize);
    }
    this.randomUpdate = function() {
        this.x = this.x + this.xspeed;
        if(this.x > width - squareSize) {
            this.x = 0;
            this.y = this.y + this.yspeed;
        }
        if(this.y > height - squareSize) {
            this.x = 0;
            this.y = 0;
        }
    }
    this.displayAtPos = function() {
        this.x = 600 - 15;
        this.y = 600 - 15;
    }
}
function displayMousePosition() {
    rect(0, 0, 60, 20);
    text(mouseX + ',' + mouseY, 10, 15);
}