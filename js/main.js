let img;
var vScale = 1;

// var deltaX = 0;
// var deltaY = 0;
var toRight = true;
var directionX = 1;
var directionY = 1;

function Particle(x, y) {
  this.x = x;
  this.y = y;
  // this.r = random(2, 10);
  this.r = 5;
  this.deltaX = 0;
  this.deltaY = 0;

  this.update = function() {
    // this.x += random(-5, 5);
    // this.y += random(-5, 5);
    this.x += 1;
    this.y += 1;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  };

  this.show = function() {
    noStroke();
    var px = floor(this.x / vScale);
    var py = floor(this.y / vScale);
    var col = img.get(px, py);
    if (col[0] > mouseX && col[1] < mouseY) {
      /* fill(
        col[0] * ((this.deltaY * this.deltaX) / 500),
        col[1] * (this.deltaY / 50),
        col[2] * (this.deltaX / 20),
        100
      );*/
      fill(col[0], col[1], col[2], 100);
      rect(this.x + this.deltaX, this.y + this.deltaY, this.r, this.r);
      this.deltaX += directionX;
      this.deltaY += directionY;
    }
    // if (col[0] < 40 && col[1] < 40) {
    //   fill(col[0], col[1], col[2], 15);
    //   rect(this.x, this.y + deltaY / 3, this.r, this.r + 50);
    // }
  };
}

function preload() {
  img = loadImage("assets/first-light-cover-image-only.png");
}
var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.loadPixels();
  noStroke();
  pixelDensity(1);
  for (var i = 0; i < 5000; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  background(51);
  image(img, 0, 0);
}

function draw() {
  img.loadPixels();
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

// function mouseMoved() {
//   directionX += mouseX - width / 2;
//   directionY += mouseY - height / 2;
// }

function mousePressed() {
  directionX = random(-5, 5);
  directionY = random(-5, 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  image(img, 0, 0);
}
