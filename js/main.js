let img;
const vScale = 1;
const IMAGE_PATH = '../assets/subset-ep-cover-5-compressed-2.jpg';
const BACKGROUND_PATH = '../assets/subset-ep-cover-background.jpg';
const PARTICLE_COUNT = 3000;

const toRight = true;
let directionX = 1;
let directionY = 1;
const particles = [];
let increaseSize = true;
let increaseOpacity = true;
let count = 0;
let mouseDiffX = 0;
let mouseDiffY = 0;
let sinCount = 0;

const dist = (x1, y1, x2, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

function Particle(x, y) {
  this.initX = x;
  this.initY = y;
  this.x = x;
  this.y = y;
  this.r = 2;
  this.opacity = 1;
  this.deltaX = 0;
  this.deltaY = 0;

  this.update = function() {
    // this.x += 1;
    const rand = random(200);
    // if (rand > 1) {
    //   this.y *= 1.001;
    // } else {
    //   this.y /= 1.001;
    // }
    // this.y += (mouseY - height) / height;
    // this.x += mouseX / width;

    // this.x = constrain(this.x, 0, width);
    // this.y = constrain(this.y, 0, height);
    // this.r += 1;
    this.opacity = rand;
  };

  this.show = function() {
    noStroke();
    const px = floor(this.x / vScale);
    const py = floor(this.y / vScale);
    const [r, g, b, a] = img.get(px, py);
    if (r > 10 && g > 10 && b > 10) {
      fill(r, g + this.deltaY, b, this.opacity);
      ellipse(this.x, this.y, this.r, this.r + random(2));
    }
    if (g > 150) {
      if (g > 200) {
        this.x += mouseDiffX * 10;
        this.y += mouseDiffY * 10;
      } else {
        this.x += mouseDiffX * 3;
        this.y += mouseDiffY * 3;
      }
    } else if (b > 150) {
      // this.y += 1;
      this.r = sinCount * 5;
    }
    if (r > 150 && b < 220 && g < 120) {
      this.r = sinCount * 8;
    }

    // this.opacity++;
    this.deltaX *= this.deltaX + mouseX;
    this.deltaY *= directionY;
    // const rand = random(200);
    this.opacity = random(200);
  };
}

function preload() {
  img = loadImage(IMAGE_PATH);
  // backgroundImg = loadImage(BACKGROUND_PATH);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.loadPixels();
  noStroke();
  pixelDensity(1);
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  // image(backgroundImg, 0, -100);
}

function draw() {
  background(0, 20, 59, 80);
  sinCount = Math.sin(count / 20);
  for (var i = 0; i < particles.length; i++) {
    // particles[i].update();
    particles[i].show();
  }
  count++;
}

function mouseMoved() {
  mouseDiffX = (mouseX / width - 0.5) * -1;
  mouseDiffY = (mouseY / height - 0.5) * -1;
}

function mousePressed() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}
