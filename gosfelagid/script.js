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

  // Intensity configuration - controls how erratic and fast bubbles become
  var intensityConfig = {
    current: 10,       // Current intensity value (0-100), starts at 10
    speedMultiplier: 0.5 + (10 / 100) * 2.5,  // Initial speed multiplier for 10
    swingMultiplier: 0.2 + (10 / 100) * 3.8   // Initial swing multiplier for 10
  };

  // Bubble count configuration - adjust these values to control the number of bubbles
  var bubbleCountConfig = {
    smallScreen: 15,    // Number of bubbles on smaller screens (reduced from 30)
    largeScreen: 60     // Number of bubbles on larger screens (reduced from 30)
  };

  // Dynamic bubble spawning based on intensity
  var dynamicBubbleConfig = {
    minBubbles: 15,     // Minimum bubbles at low intensity
    maxBubbles: 200,    // Maximum bubbles at high intensity
    spawnThreshold: 20, // Intensity level where extra bubbles start spawning
    maxBubblesIntensity: 100 // Intensity level where max bubbles are reached
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

  function getTargetBubbleCount(intensity) {
    if (intensity <= dynamicBubbleConfig.spawnThreshold) {
      return dynamicBubbleConfig.minBubbles;
    }
    
    // Calculate bubble count based on intensity (exponential growth)
    var intensityRatio = (intensity - dynamicBubbleConfig.spawnThreshold) / 
                         (dynamicBubbleConfig.maxBubblesIntensity - dynamicBubbleConfig.spawnThreshold);
    var bubbleCount = dynamicBubbleConfig.minBubbles + 
                      (dynamicBubbleConfig.maxBubbles - dynamicBubbleConfig.minBubbles) * 
                      Math.pow(intensityRatio, 1.5); // Exponential growth for dramatic effect
    
    return Math.round(bubbleCount);
  }

  function adjustBubbleCount(targetCount, world) {
    var currentBubbleCount = 0;
    var bubbleObjects = [];
    
    // Count current bubbles and collect them
    for (var i = 0; i < world.objects.length; i++) {
      if (world.objects[i] instanceof Bubble) {
        currentBubbleCount++;
        bubbleObjects.push(world.objects[i]);
      }
    }
    
    var difference = targetCount - currentBubbleCount;
    
    if (difference > 0) {
      // Need more bubbles - spawn them
      for (var i = 0; i < difference; i++) {
        var baseSpeed = -randomInRange(speedConfig.minSpeed, speedConfig.maxSpeed);
        var baseSwing = randomInRange(-40, 40);
        
        // Apply current intensity multipliers
        var initialSpeed = baseSpeed * intensityConfig.speedMultiplier;
        var initialSwing = baseSwing * intensityConfig.swingMultiplier;
        
        world.objects.push(new Bubble(
          Math.random() * world.physicalProperties.width, 
          world.physicalProperties.height + Math.random() * 300, 
          initialSpeed, 
          getRandomSize(), 
          randomInRange(7, 10), 
          initialSwing, 
          getRandomColor()
        ));
      }
    } else if (difference < 0) {
      // Need fewer bubbles - remove excess ones
      var bubblesToRemove = Math.abs(difference);
      
      // Remove bubbles from the bottom of the screen first (oldest ones)
      bubbleObjects.sort(function(a, b) {
        return b.y - a.y; // Sort by Y position, highest Y first (bottom of screen)
      });
      
      for (var i = 0; i < bubblesToRemove && i < bubbleObjects.length; i++) {
        var bubbleIndex = world.objects.indexOf(bubbleObjects[i]);
        if (bubbleIndex > -1) {
          world.objects.splice(bubbleIndex, 1);
        }
      }
    }
    
    // Update bubble count display
    updateBubbleCountDisplay(world);
  }

  function updateBubbleCountDisplay(world) {
    var bubbleCount = 0;
    for (var i = 0; i < world.objects.length; i++) {
      if (world.objects[i] instanceof Bubble) {
        bubbleCount++;
      }
    }
    document.getElementById('bubble-count-value').textContent = bubbleCount;
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
    this.originalSpeed = speed; // Store original speed for intensity adjustments
    this.radius = radius;
    this.fragments = fragments;
    this.swing = swing;
    this.originalSwing = swing; // Store original swing for intensity adjustments
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
        
        // Make repulsion more aggressive at high intensities
        if (intensityConfig.current > 70) {
          repulsionStrength *= 1.5; // 50% stronger repulsion at high intensity
        }
        
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
    
    // Add erratic movement based on intensity
    var erraticX = 0;
    if (intensityConfig.current > 20) {
      // Much more chaotic movement at high intensities
      var chaosFactor = Math.pow(intensityConfig.current / 100, 2); // Exponential increase in chaos
      erraticX = (Math.random() - 0.5) * chaosFactor * 12; // Up to 6x more random movement
    }
    
    this.x = this.startX + Math.cos(this.y / 80) * this.swing + erraticX;
    
    // Add random speed variations at high intensities for more chaos
    var finalSpeed = this.speed;
    if (intensityConfig.current > 80) {
      finalSpeed += (Math.random() - 0.5) * 2; // Random speed variation at very high intensity
    }
    
    this.y += finalSpeed;
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
    var baseSpeed = -randomInRange(speedConfig.minSpeed, speedConfig.maxSpeed);
    var baseSwing = randomInRange(-40, 40);
    
    // Apply initial intensity multipliers
    var initialSpeed = baseSpeed * intensityConfig.speedMultiplier;
    var initialSwing = baseSwing * intensityConfig.swingMultiplier;
    
    objects.push(new Bubble(Math.random() * w, h + Math.random() * 300, initialSpeed, getRandomSize(), randomInRange(7, 10), initialSwing, getRandomColor()));
  }

  var world = new World({
    width: c.width,
    height: c.height,
    friction: 0.997
  }, objects, $, 'rgba(255, 255, 255, 0.28)');

  $.globalCompositeOperation = blendMode;

  world.animate();

  // Initialize bubble count display
  updateBubbleCountDisplay(world);

  // Continuous bubble count adjustment at high intensities
  setInterval(function() {
    if (intensityConfig.current > 60) {
      var targetBubbleCount = getTargetBubbleCount(intensityConfig.current);
      adjustBubbleCount(targetBubbleCount, world);
    }
  }, 2000); // Check every 2 seconds

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

  // Add intensity slider event listener
  var intensitySlider = document.getElementById('intensity-slider');
  var intensityValue = document.getElementById('intensity-value');
  
  intensitySlider.addEventListener('input', function() {
    intensityConfig.current = parseInt(this.value);
    intensityValue.textContent = this.value;
    
    // Update intensity multipliers based on slider value
    intensityConfig.speedMultiplier = 0.5 + (intensityConfig.current / 100) * 5.5; // 0.5x to 6x speed (much faster at max)
    intensityConfig.swingMultiplier = 0.2 + (intensityConfig.current / 100) * 7.8; // 0.2x to 8x swing (much more erratic at max)
    
    // Apply intensity to all existing bubbles
    for (var i = 0; i < world.objects.length; i++) {
      var bubble = world.objects[i];
      if (bubble instanceof Bubble) {
        // Update speed based on intensity
        bubble.speed = bubble.originalSpeed * intensityConfig.speedMultiplier;
        // Update swing based on intensity
        bubble.swing = bubble.originalSwing * intensityConfig.swingMultiplier;
      }
    }
    
    // Dynamic bubble count adjustment based on intensity
    var targetBubbleCount = getTargetBubbleCount(intensityConfig.current);
    adjustBubbleCount(targetBubbleCount, world);
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