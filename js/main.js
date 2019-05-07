let img;
const vScale = 1;

const toRight = true;
let directionX = 1;
let directionY = 1;
const particles = [];
let increaseSize = true;
let increaseOpacity = true;

const dist = (x1, y1, x2, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 8;
  this.opacity = 1;
  this.deltaX = 0;
  this.deltaY = 0;

  this.update = function() {
    this.x += 1;
    this.y += 1;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  };

  this.show = function() {
    noStroke();
    const px = floor(this.x / vScale);
    const py = floor(this.y / vScale);
    if (dist(px, py, mouseX, mouseY) < 200) {
      const col = img.get(px, py);
      if (col[0] > 20 || col[1] > 50 || col[2] > 60) {
        fill(
          col[0] + this.deltaY / 20,
          col[1] + this.deltaY / 20,
          col[2] + this.deltaY / 20,
          this.opacity / (dist(mouseX, mouseY, px, py) / 100)
        );

        // if (this.deltaY % 10) {
        //   if (increaseOpacity) {
        //     increaseOpacity = false;
        //   } else {
        //     increaseOpacity = true;
        //   }
        // }
        // if (increaseSize) {
        //   // this.r += 0.2;
        // } else {
        //   // this.r -= 0.2;
        // }
        rect(
          this.x + (this.deltaX * this.deltaX) / 200,
          this.y + Math.sin(this.deltaY / 500),
          this.r * random(20),
          this.r
        );
        // this.opacity++;
        this.deltaX *= this.deltaX * Math.sin(this.deltaY);
        this.deltaY += directionY;
      }
    }
  };
}

function preload() {
  img = loadImage('../assets/unknown_number_cover.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.loadPixels();
  noStroke();
  pixelDensity(0.5);
  for (var i = 0; i < 5000; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  background(51);
  image(img, 0, 0);
  img.loadPixels();
}

let count = 0;
function draw() {
  if (count >= 100) {
    for (var i = 0; i < 5000; i++) {
      particles[i] = new Particle(random(width), random(height));
    }
    count = 0;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  count++;
}

// function mouseMoved() {
//   directionX = mouseX;
//   directionY = mouseY;
// }

function mousePressed() {
  directionX = random(-5, 5);
  directionY = random(-5, 5);
  for (var i = 0; i < 5000; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  image(img, 0, 0);
}
