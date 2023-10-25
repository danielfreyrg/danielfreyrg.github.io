let img;
const detail = 6;
let particles = [];
let grid = [];
let particleImage;
let ctx;
var currentstep = 1;
function preload() {
  // img = loadImage('Pipar_Staff_0313.jpg');
  // img = loadImage('Pipar_Staff_0313-nobg.png');

  // img = loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/Meisje_met_de_parel.jpg?3');
  //if running locally use this file
  if (window.location.href.indexOf('file://') > -1) {
    img = loadImage('https://danielfreyrg.github.io/flowing-image/Pipar_Staff_0313-nobg.png');
  } else {
    img = loadImage('Pipar_Staff_0313-nobg.png');
  }
}

class Particle {
  constructor (x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.prevX = this.x;
    this.speed = 0;
    this.v = random(0, 0.7);
    this.originalY = this.y;

  }
  repelFromMouse() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 50) { // 50 is the distance of influence. Adjust as needed.
      let diffY = this.y - mouseY;
      this.y += map(d, 0, 50, diffY > 0 ? 10 : -10, 0); // 10 is the maximum shift. Adjust as needed.
    } else {
      // When the particle is not influenced by the mouse, move it back to its original position
      this.y = lerp(this.y, this.originalY, 0.05); // 0.05 is the interpolation amount. Adjust as needed.
    }
  }
  
  
  update (speed) {
    if (grid.length) {
      let yIndex = constrain(floor(this.y / detail), 0, grid.length - 1);
let xIndex = constrain(floor(this.x / detail), 0, grid[0].length - 1);
this.speed = grid[yIndex][xIndex] * 0.97;

      // this.speed = grid[floor(this.y / detail)][floor(this.x / detail)] * 0.97;
    }
    this.x += (1 - this.speed) * 3 + this.v;
    if (currentstep == 6) {
    this.repelFromMouse();
    }
    if (this.x > width) {
      this.x = 0;
    }
  }
  
  draw () {
    image(particleImage, this.x, this.y);
  }
}

/* ====== STEP 1 ====== */
function step1 () {
  clear();
  noLoop();
  image(img, 0, 0, width, height);
  noFill();
  stroke(120);
  strokeWeight(1);
  strokeCap(SQUARE);
  ctx.globalAlpha = 1;
  for (let y = 0; y < height; y+=detail) {
    for (let x = 0; x < width; x+=detail) {
      rect(x + 0.5, y + 0.5, detail, detail);
    }
  }
}

/* ====== STEP 2 ====== */
function step2 () {
  currentstep = 2;
  clear();
  ctx.globalAlpha = 1;
  noLoop();
  image(img, 0, 0, width, height);
  loadPixels();
  noStroke();
  for (let y = 0; y < height; y+=detail) {
    for (let x = 0; x < width; x+=detail) {
      const r = pixels[(y  * width + x) * 4];
      const g = pixels[(y  * width + x) * 4 + 1];
      const b = pixels[(y  * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = floor(brightness(_color) / 100 * 255);
      fill(_brightness);
      rect(x, y, detail, detail);
    }
  }
}

/* ====== STEP 3 ====== */
function goToStep3 () {
  ctx.globalAlpha = 1;
  loop();
  
  grid = [];
  particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(null, (i/20) * height));
  }
}

function step3 () {
  currentstep = 3;

  clear();
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}

/* ====== STEP 4 ====== */
function goToStep4 () {
  clear();
  ctx.globalAlpha = 1;
  loop();
  image(img, 0, 0, width, height);
  loadPixels();
  clear();
  noStroke();
  
  grid = [];
  for (let y = 0; y < height; y+=detail) {
    let row = [];
    for (let x = 0; x < width; x+=detail) {
      const r = pixels[(y * width + x) * 4];
      const g = pixels[(y * width + x) * 4 + 1];
      const b = pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 100;
      fill(_brightness * 255);
      rect(x, y, detail, detail);
      row.push(_brightness);
    }
    grid.push(row);
  }
  
  particles = [];
  for (let i = 0; i < 3000; i++) {
    particles.push(new Particle(null, (i/3000) * height));
  }
}

function step4 () {
  currentstep = 4;

  clear();
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}

/* ====== STEP 5 ====== */
function goToStep5 () {
  clear();
  ctx.globalAlpha = 1;
  loop();
  image(img, 0, 0, width, height);
  loadPixels();
  clear();
  noStroke();
  
  grid = [];
  for (let y = 0; y < height; y+=detail) {
    let row = [];
    for (let x = 0; x < width; x+=detail) {
      const r = pixels[(y * width + x) * 4];
      const g = pixels[(y * width + x) * 4 + 1];
      const b = pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 100;
      fill(_brightness * 255);
      rect(x, y, detail, detail);
      row.push(_brightness);
    }
    grid.push(row);
  }
  
  particles = [];
  for (let i = 0; i < 3000; i++) {
    particles.push(new Particle(null, (i/3000) * height));
  }
}

function step5 () {
  currentstep = 5;

  clear();
  particles.forEach(p => {
    p.update();
    ctx.globalAlpha = p.speed * 0.3;
    p.draw();
  });
}

/* ====== STEP 6 ====== */
function goToStep6 () {
  clear();
  ctx.globalAlpha = 1;
  loop();
  image(img, 0, 0, width, height);
  loadPixels();
  clear();
  noStroke();
  
  grid = [];
  for (let y = 0; y < height; y+=detail) {
    let row = [];
    for (let x = 0; x < width; x+=detail) {
      const r = pixels[(y * width + x) * 4];
      const g = pixels[(y * width + x) * 4 + 1];
      const b = pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 100;
      row.push(_brightness);
    }
    grid.push(row);
  }
  
  particles = [];
  for (let i = 0; i < 3000; i++) {
    particles.push(new Particle(null, (i/3000) * height));
  }
}

function step6 () {
  currentstep = 6;

  ctx.globalAlpha = 0.05;
  fill(0);
  rect(0,0,width,height);
  ctx.globalAlpha = 0.2;
  particles.forEach(p => {
    p.update();
    ctx.globalAlpha = p.speed * 0.3;
    p.draw();
  });
}

function setup () {
  const canvas = createCanvas(100,100);
  ctx = canvas.drawingContext;
  
  pixelDensity(1);
  
  particleImage = createGraphics(8, 8);
  particleImage.fill(255);
  particleImage.noStroke();
  particleImage.circle(4, 4, 4);
  
  windowResized();
  document.querySelector('#step').addEventListener('input', () => {
    if (window['goToStep' + step.value]) {
      window['goToStep' + step.value]();
    }
    draw();
  });
}

function windowResized () {
  const imgRatio = img.width/img.height;
  if (windowWidth/windowHeight > imgRatio) {
    resizeCanvas(floor(windowHeight * imgRatio), floor(windowHeight));
  } else {
    resizeCanvas(floor(windowWidth), floor(windowWidth / imgRatio));
  }
  noiseSeed(random(100));
  if (window['goToStep' + step.value]) {
    window['goToStep' + step.value]();
  }
  draw();
}

const texts = document.querySelectorAll('section p');
function draw () {
  window['step' + step.value]();
  
  texts.forEach(text => text.style.display = 'none');
  texts[step.value - 1].style.display = 'block';
}