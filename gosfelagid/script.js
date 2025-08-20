window.onload = function() {
  var blendMode = 'hue';

  var c = document.getElementById('c'),
    $ = c.getContext('2d'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;

  // Size configuration - you can easily adjust these values
  var sizeConfig = {
    small: { min: 25, max: 50, weight: 0.9 },    // 60% of bubbles will be small
    medium: { min: 75, max: 150, weight: 0.05 },  // 30% of bubbles will be medium  
    large: { min: 30, max: 350, weight: 0.05 }    // 10% of bubbles will be large
  };

  // Speed configuration - adjust these values to control bubble movement speed
  var speedConfig = {
    minSpeed: 0.8,    // Minimum upward speed (lower = slower)
    maxSpeed: 1.5     // Maximum upward speed (lower = slower)
  };

  // Bubble count configuration - adjust these values to control the number of bubbles
  var bubbleCountConfig = {
    smallScreen: 15,    // Number of bubbles on smaller screens (reduced from 30)
    largeScreen: 60     // Number of bubbles on larger screens (reduced from 30)
  };

  // Color configuration - adjust these weights to control the distribution of each color
  var colorConfig = {
    lightBlue: { color: '#8CC4DFE5', weight: 0.2 },    // 40% of bubbles will be light blue
    darkBlue: { color: '#2F5DE8E5', weight: 0.7 },     // 40% of bubbles will be dark blue
    limeGreen: { color: '#E2FF69', weight: 0.1 }       // 20% of bubbles will be lime green
  };

  var i, bubblesNumber = w * h > 750000 ? bubbleCountConfig.largeScreen : bubbleCountConfig.smallScreen,
    objects = [],
    maxRadius = w * h > 500000 ? 50 : 35,
    maxYVelocity = 2;

  function getRandomSize() {
    var rand = Math.random();
    var cumulativeWeight = 0;
    
    for (var size in sizeConfig) {
      cumulativeWeight += sizeConfig[size].weight;
      if (rand <= cumulativeWeight) {
        return randomInRange(sizeConfig[size].min, sizeConfig[size].max);
      }
    }
    return randomInRange(sizeConfig.medium.min, sizeConfig.medium.max); // fallback
  }

  function getRandomColor() {
    var rand = Math.random();
    var cumulativeWeight = 0;
    
    for (var color in colorConfig) {
      cumulativeWeight += colorConfig[color].weight;
      if (rand <= cumulativeWeight) {
        return colorConfig[color].color;
      }
    }
    return colorConfig.lightBlue.color; // fallback
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  Vector.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };

  Vector.prototype.multiply = function(value) {
    this.x *= value;
    this.y *= value;
    return this;
  };

  Vector.prototype.getMagnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  function Fragment(position, velocity, radius, hue) {
    this.position = position;
    this.velocity = velocity;
    this.startSpeed = this.velocity.getMagnitude();
    this.radius = radius;
    this.hue = hue;
  }

  Fragment.prototype.update = function(world) {
    this.velocity.multiply(world.physicalProperties.friction);
    this.position.add(this.velocity);
    this.radius *= this.velocity.getMagnitude() / this.startSpeed;
    if (this.radius < 0.1) {
      world.objects.splice(world.objects.indexOf(this), 1);
    }
  }

  Fragment.prototype.render = function($) {
    $.beginPath();
    $.fillStyle = this.hue;
    $.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    $.fill();
  };

  function Bubble(x, y, speed, radius, fragments, swing, hue) {
    this.x = x;
    this.y = y;
    this.startX = this.x;
    this.speed = speed;
    this.radius = radius;
    this.fragments = fragments;
    this.swing = swing;
    this.hue = hue;
  }

  Bubble.prototype.update = function(world) {
    // Apply repulsion force if mouse is nearby
    if (world.mousePosition) {
      var dx = this.x - world.mousePosition.x;
      var dy = this.y - world.mousePosition.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var repulsionRadius = 200 + this.radius; // Increased repulsion radius for more powerful effect
      
      if (distance < repulsionRadius && distance > 0) {
        var repulsionStrength = (repulsionRadius - distance) / repulsionRadius * 8.0; // Increased from 3.0 to 8.0 for stronger repulsion
        this.x += (dx / distance) * repulsionStrength;
        this.y += (dy / distance) * repulsionStrength;
      }
    }
    
    // Check collisions with other bubbles
    for (var i = 0; i < world.objects.length; i++) {
      var other = world.objects[i];
      if (other !== this && other instanceof Bubble) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var minDistance = this.radius + other.radius;
        
        if (distance < minDistance && distance > 0) {
          // Collision detected - push bubbles apart
          var overlap = minDistance - distance;
          var pushX = (dx / distance) * overlap * 0.5;
          var pushY = (dy / distance) * overlap * 0.5;
          
          this.x += pushX;
          this.y += pushY;
          other.x -= pushX;
          other.y -= pushY;
        }
      }
    }
    
    this.x = this.startX + Math.cos(this.y / 80) * this.swing;
    this.y += this.speed;
    if (this.y + this.radius < 0) {
      this.y = world.physicalProperties.height + this.radius;
    }
  }

  Bubble.prototype.render = function($) {
    $.beginPath();
    $.fillStyle = this.hue;
    $.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    $.fill();
  };

  Bubble.prototype.pop = function(world) {
    world.objects.splice(world.objects.indexOf(this), 1);
    for (var i = 0; i < this.fragments; i++) {
      world.objects.push(new Fragment(new Vector(this.x, this.y), new Vector(randomInRange(-2, 2), randomInRange(-2, 2)), randomInRange(2, this.radius / 4), this.hue));
    }
  };

  function World(physicalProperties, objects, ctx, background) {
    this.physicalProperties = physicalProperties;
    this.objects = objects;
    this.ctx = ctx;
    this.background = background;
    this.frameID = 0;
  }

  World.prototype.update = function() {
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this);
    }
  };

  World.prototype.render = function() {
    this.ctx.clearRect(0, 0, this.physicalProperties.width, this.physicalProperties.height);
    if (this.background) {
      this.ctx.fillStyle = this.background;
      this.ctx.fillRect(0, 0, this.physicalProperties.width, this.physicalProperties.height);
    }
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(this.ctx);
    }
  };

  World.prototype.animate = function() {
    this.update();
    this.render();
    this.frameID = requestAnimationFrame(this.animate.bind(this));
  };

  for (i = 0; i < bubblesNumber; i++) {
    objects.push(new Bubble(Math.random() * w, h + Math.random() * 300, -randomInRange(speedConfig.minSpeed, speedConfig.maxSpeed), getRandomSize(), randomInRange(7, 10), randomInRange(-40, 40), getRandomColor()));
  }

  var world = new World({
    width: c.width,
    height: c.height,
    friction: 0.997
  }, objects, $, 'rgba(255, 255, 255, 0.28)');

  $.globalCompositeOperation = blendMode;

  world.animate();

  window.addEventListener('resize', function() {
    w = world.physicalProperties.width = c.width = window.innerWidth;
    h = world.physicalProperties.height = c.height = window.innerHeight;
    $.globalCompositeOperation = blendMode;
  });

  window.addEventListener('mousemove', function(e) {
    world.mousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('touchmove', function(e) {
    world.mousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });

  window.addEventListener('mouseleave', function(e) {
    world.mousePosition = null;
  });

  // Add click event listener for bubble popping
  window.addEventListener('click', function(e) {
    var clickX = e.clientX;
    var clickY = e.clientY;
    
    // Check if any bubble was clicked
    for (var i = 0; i < world.objects.length; i++) {
      var bubble = world.objects[i];
      if (bubble instanceof Bubble) {
        var dx = clickX - bubble.x;
        var dy = clickY - bubble.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        // If click is within bubble radius, pop it
        if (distance <= bubble.radius) {
          bubble.pop(world);
          break; // Only pop one bubble per click
        }
      }
    }
  });

  // Add touch event listener for mobile devices
  window.addEventListener('touchend', function(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    var clickX = touch.clientX;
    var clickY = touch.clientY;
    
    // Check if any bubble was touched
    for (var i = 0; i < world.objects.length; i++) {
      var bubble = world.objects[i];
      if (bubble instanceof Bubble) {
        var dx = clickX - bubble.x;
        var dy = clickY - bubble.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        // If touch is within bubble radius, pop it
        if (distance <= bubble.radius) {
          bubble.pop(world);
          break; // Only pop one bubble per touch
        }
      }
    }
  });

};