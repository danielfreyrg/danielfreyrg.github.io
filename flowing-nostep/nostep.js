let img;
const detail = 6;
let particles = [];
let grid = [];
let particleImage;
let ctx;
let isTouching = false;
let currentstep = 6

function touchStarted() {
  console.log(touches);
  if (touches.length > 0) {
    let touchX = touches[0].x;
    let touchY = touches[0].y;
  
    if (isInsideCanvas()) {
      isTouching = true;
      return false;
    }
  }
}

function preload() {
    img = document.getElementById('sourceImg');
    img.onclick = function() {
        img = loadImage(img.src, function() {
            img.style.display = 'none';
            windowResized();
        });
    }
    
        // window['goToStep6']();
    }
//   if (window.location.href.indexOf('file://') > -1) {
//     img = loadImage('https://danielfreyrg.github.io/flowing-image/Pipar_Staff_0313-nobg.png');

//   } else {
//     img = loadImage('Pipar_Staff_0313-nobg.png');
//   }


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
    let x = mouseX;
    let y = mouseY;
  
    if (isTouching) {
      x = touchX;
      y = touchY;
    }
  
    let d = dist(this.x, this.y, x, y);
    if (d < 50 && (mouseIsPressed || isTouching || window.innerWidth > 1000)) {
      let diffY = this.y - y;
      this.y += map(d, 0, 50, diffY > 0 ? 10 : -10, 0);
    } else {
      this.y = lerp(this.y, this.originalY, 0.05);
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

  draw() {
    image(particleImage, this.x, this.y);
  }
}

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

function step6() {
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
    if (img) {
    windowResized();
    }
  }

  function windowResized () {
    if (img && img.width && img.height) {
        const imgRatio = img.width/img.height;
    
    if (windowWidth/windowHeight > imgRatio) {
      resizeCanvas(floor(windowHeight * imgRatio), floor(windowHeight));
    } else {
      resizeCanvas(floor(windowWidth), floor(windowWidth / imgRatio));
    }
    noiseSeed(random(100));
      window['goToStep6']();
    
    draw();
  }
}

function draw() {
  step6();
}
