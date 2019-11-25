let img;
const vScale = 1;
const IMAGE_PATH = '../assets/first-light-cover-image-only.png';
const BACKGROUND_PATH = '../assets/subset-ep-cover-background.jpg';
const PARTICLE_COUNT = 2000;

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

var Controls = function() {
  this.radius = 10;
  this.yMult = 0;
  this.xMult = 0;
  this.r1 = 1;
  this.r2 = 1;
  this.speed = 1;
  this.rThreshold = 10;
  this.gThreshold = 10;
  this.bThreshold = 10;
  this.rMult = 1.0;
  this.gMult = 1.0;
  this.bMult = 1.0;
  this.get = key => this[key];
  // this.speed = 0.8;
  // this.displayOutline = false;
  // this.explode = function() { ... };
  // Define render logic ...
};

const controls = new Controls();

window.onload = function() {
  const gui = new dat.GUI();

  gui.add(controls, 'yMult', -12, 12);
  gui.add(controls, 'xMult', -12, 12);
  gui.add(controls, 'r1', 1, 600);
  gui.add(controls, 'r2', 1, 600);
  gui.add(controls, 'speed', 1, 50);
  gui.add(controls, 'rThreshold', 1, 250);
  gui.add(controls, 'gThreshold', 1, 250);
  gui.add(controls, 'bThreshold', 1, 250);
  gui.add(controls, 'rMult', 1.0, 5.0);
  gui.add(controls, 'gMult', 1.0, 5.0);
  gui.add(controls, 'bMult', 1.0, 5.0);
};

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

  this.opacity = random(100);
  this.r1 = controls.get('r1');
  this.r2 = controls.get('r2');
  this.deltaX = 1;
  this.deltaY = 1;
  this.update = function() {
    // this.x += 1;
    const rand = random(100);
    const speed = controls.get('speed');
    this.y += (controls.get('yMult') / 10) * speed;
    this.x += (controls.get('xMult') / 10) * speed;
    this.r1 = controls.get('r1');
    this.r2 = controls.get('r2');
    this.opacity = 10;
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
  };

  this.show = function() {
    noStroke();
    const px = floor(this.x / vScale);
    const py = floor(this.y / vScale);
    const [r, g, b, a] = img.get(px, py);
    if (
      r > controls.get('rThreshold') &&
      g > controls.get('gThreshold') &&
      b > controls.get('bThreshold')
    ) {
      fill(
        r * controls.get('rMult'),
        g * controls.get('gMult'),
        b * controls.get('bMult'),
        this.opacity
      );
      rect(this.x, this.y, this.r1, this.r2);
    }
    // if (g > 150) {
    //   if (g > 200) {
    //     this.x += mouseDiffX * 10;
    //     this.y += mouseDiffY * 10;
    //   } else {
    //     this.x += mouseDiffX * 3;
    //     this.y += mouseDiffY * 3;
    //   }
    // } else if (b > 150) {
    //   // this.y += 1;
    //   // this.r = sinCount * 5;
    // }
    // if (r > 150 && b < 220 && g < 120) {
    //   // this.r = sinCount * 8;
    // }

    // this.opacity++;
    // this.deltaX *= this.deltaX + mouseX;
    // this.deltaY *= directionY;
    // const rand = random(200);
    // this.opacity = random(100);
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
  image(img, 0, 0);
  // background(0, 20, 59, 200);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

function draw() {
  // background(0, 20, 59, 80);
  // if (count > 1000) {
  //   for (let i = 0; i < PARTICLE_COUNT; i++) {
  //     particles[i] = new Particle(random(width), random(height));
  //   }
  //   count = 0;
  // }
  // sinCount = Math.sin(count / 20);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  // count++;
}

// function mouseMoved() {
//   mouseDiffX = (mouseX / width - 0.5) * -1;
//   mouseDiffY = (mouseY / height - 0.5) * -1;
// }

// function mousePressed() {
//   for (let i = 0; i < PARTICLE_COUNT; i++) {
//     particles[i] = new Particle(random(width), random(height));
//   }
// }
