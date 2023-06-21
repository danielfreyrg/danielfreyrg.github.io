// Helpers
var canvasWidth;
var canvasHeight;
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
shuffle = function(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

String.prototype.hashCode = function() {
    // See http://www.cse.yorku.ca/~oz/hash.html        
    var hash = 5381;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) + hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

const venues = {
     "1": {value: "Option 1", src: "580b57fbd9996e24bc43c0fc.png"},
     "2": {value: "Option 2", src: "580b57fbd9996e24bc43c0fc.png"},
     "3": {value: "Option 3", src: "580b57fbd9996e24bc43c0fc.png"},
     "4": {value: "Option 4", src: "580b57fbd9996e24bc43c0fc.png"},
     "5": {value: "Option 5", src: "580b57fbd9996e24bc43c0fc.png"},
     "6": {value: "Option 6", src: "580b57fbd9996e24bc43c0fc.png"},
     "7": {value: "Option 7", src: "580b57fbd9996e24bc43c0fc.png"},
     "8": {value: "Option 8", src: "580b57fbd9996e24bc43c0fc.png"}
};

// $(function() {

//     var venueContainer = $('#venues ul');
//     $.each(venues, function(key, item) {
//         venueContainer.append(
//         $(document.createElement("li")).append(
//         $(document.createElement("input")).attr({
//              'venue-' + key,
//             name: item,
//             value: item,
//             type: 'checkbox',
//             checked: true
//         }).change(function() {
//             var cbox = $(this)[0];
//             var segments = wheel.segments;
//             var i = segments.indexOf(cbox.value);

//             if (cbox.checked && i == -1) {
//                 segments.push(cbox.value);

//             } else if (!cbox.checked && i != -1) {
//                 segments.splice(i, 1);
//             }

//             segments.sort();
//             wheel.update();
//         })

//         ).append(
//         $(document.createElement('label')).attr({
//             'for': 'venue-' + key
//         }).text(item)))
//     });

//     // $('#venues ul>li').tsort("input", {
//     //     attr: "value"
//     // });
// });

// WHEEL!
var wheel = {

    timerHandle: 0,
    timerDelay: 33,

    angleCurrent: 0,
    angleDelta: 0,

    size: 500,

    canvasContext: null,

    colors: ['#ffff00', '#ffc700', '#ff9100', '#ff6301', '#ff0000', '#c6037e',
             '#713697', '#444ea1', '#2772b2', '#0297ba', '#008e5b', '#8ac819'],

    segments: [],

    seg_colors: [],
    // Cache of segments to colors
    maxSpeed: Math.PI / 16,

    upTime: 1000,
    // How long to spin up for (in ms)
    downTime: 17000,
    // How long to slow down for (in ms)
    spinStart: 0,

    frames: 0,

    centerX: 300,
    centerY: 300,

    spin: function() {
        this.uptime = getRandomInt(5);
        this.downtime = getRandomInt(10);
        console.log('uptime: ' + this.uptime + ' downtime: ' + this.downtime)
        // Start the wheel only if it's not already spinning
        if (wheel.timerHandle == 0) {
            wheel.spinStart = new Date().getTime();
            wheel.maxSpeed = Math.PI / (16 + Math.random()); // Randomly vary how hard the spin is
            wheel.frames = 0;

            wheel.timerHandle = setInterval(wheel.onTimerTick, wheel.timerDelay);
        }
    },

    onTimerTick: function() {

        wheel.frames++;

        wheel.draw();

        var duration = (new Date().getTime() - wheel.spinStart);
        var progress = 0;
        var finished = false;

        if (duration < wheel.upTime) {
            progress = duration / wheel.upTime;
            wheel.angleDelta = wheel.maxSpeed * Math.sin(progress * Math.PI / 2);
        } else {
            progress = duration / wheel.downTime;
            wheel.angleDelta = wheel.maxSpeed * Math.sin(progress * Math.PI / 2 + Math.PI / 2);
            if (progress >= 1) finished = true;
        }

        wheel.angleCurrent += wheel.angleDelta;
        while (wheel.angleCurrent >= Math.PI * 2)
        // Keep the angle in a reasonable range
        wheel.angleCurrent -= Math.PI * 2;

        if (finished) {
            clearInterval(wheel.timerHandle);
            wheel.timerHandle = 0;
            wheel.angleDelta = 0;

        }


    },

    init: function(optionList) {
        try {
            wheel.initWheel();
            wheel.initCanvas();
            wheel.draw();

            $.extend(wheel, optionList);

        } catch (exceptionData) {
            alert('Wheel is not loaded ' + exceptionData);
        }

    },





    initWheel: function() {
        shuffle(wheel.colors);
    },

    // Called when segments have changed
    update: function() {
        // Ensure we start mid way on a item
        //var r = Math.floor(Math.random() * wheel.segments.length);
        var r = 0;
        wheel.angleCurrent = ((r + 0.5) / wheel.segments.length) * Math.PI * 2;

        var segments = wheel.segments;
        var len = segments.length;
        var colors = wheel.colors;
        var colorLen = colors.length;

        // Generate a color cache (so we have consistant coloring)
        var seg_color = new Array();
        for (var i = 0; i < len; i++)
        seg_color.push(colors[segments[i].hashCode().mod(colorLen)]);

        wheel.seg_color = seg_color;

        wheel.draw();
    },

    draw: function() {
        wheel.initCanvas();
        wheel.clear();
        wheel.drawWheel();
        wheel.drawNeedle();
    },
    initCanvas: function() {
        var canvas = $('#wheel #canvas').get(0);
        canvas.addEventListener("click", wheel.spin, false);
        wheel.canvasContext = canvas.getContext("2d");
        var wheelDiv = $('#wheel')[0];
        canvas.width = wheelDiv.offsetWidth;
        canvas.height = wheelDiv.offsetHeight;
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        wheel.centerX = Math.floor(canvasWidth / 2);
        wheel.centerY = Math.floor(canvasHeight / 2);
    },

    clear: function() {
        var ctx = wheel.canvasContext;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    },

    drawNeedle: function() {
        var PI2 = Math.PI * 2;
        var ctx = wheel.canvasContext;

        var centerX = wheel.centerX;
        var centerY = wheel.centerY;
        var size = wheel.size;

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.fileStyle = '#ffffff';

        ctx.beginPath();

        ctx.moveTo(centerX + size - 40, centerY);
        ctx.lineTo(centerX + size + 20, centerY - 20);  
        ctx.lineTo(centerX + size + 20, centerY + 20);
        //draw arc around edge
        
        
        ctx.closePath();

        ctx.stroke();
        ctx.fill();

        // Which segment is being pointed to?
        var i = wheel.segments.length - Math.floor((wheel.angleCurrent / (Math.PI * 2)) * wheel.segments.length) - 1;

        // Now draw the winning name
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = '#000000';
        ctx.font = "2em Arial";
        ctx.fillText(wheel.segments[i], centerX + size + 25, centerY);
    },

    drawSegment: function(key, lastAngle, angle) {
        var ctx = wheel.canvasContext;

        var centerX = wheel.centerX;
        var centerY = wheel.centerY;
        var size = wheel.size;

        var segments = wheel.segments;
        var len = wheel.segments.length;
        var colors = wheel.seg_color;

        var value = segments[key].value;

        ctx.save();
        ctx.beginPath();

        // Start in the centre
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, size, lastAngle, angle, false); // Draw a arc around the edge
        ctx.lineTo(centerX, centerY); // Now draw a line back to the centre
        ctx.closePath();

        ctx.fillStyle = colors[key];
        ctx.fill();
        ctx.stroke();

        // Now draw the text
        ctx.save(); // The save ensures this works on Android devices
        ctx.translate(centerX, centerY);
        ctx.rotate((lastAngle + angle) / 2);

        ctx.fillStyle = '#000000';
        ctx.fillText(value.substr(0, 20), size / 2 + 20, 0);
        //draw image
        var img = new Image;
        img.id= "img";
        img.src ="580b57fbd9996e24bc43c0fc.png"
        img.width = 100;
        img.height = 100;
        ctx.drawImage(document.querySelector('img'), size / 2 + 90, -70, 100, 100);
        ctx.restore();

        ctx.restore();
    },

    drawWheel: function() {
        console.log(wheel.timerHandle)
        var ctx = wheel.canvasContext;
        // var ctx = document.getElementById('canvas').getContext('2d');


        var angleCurrent = wheel.angleCurrent;
        var lastAngle = angleCurrent;

        var segments = wheel.segments;
        var len = wheel.segments.length;
        var colors = wheel.colors;
        var colorsLen = wheel.colors.length;

        var centerX = wheel.centerX;
        var centerY = wheel.centerY;
        var size = wheel.size;

        var PI2 = Math.PI * 2;

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "1.4em Arial";

        for (var i = 1; i <= len; i++) {
            var angle = PI2 * (i / len) + angleCurrent;
            wheel.drawSegment(i - 1, lastAngle, angle);
            lastAngle = angle;
        }
        // Draw a center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, PI2, false);
        ctx.closePath();

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.fill();
        ctx.stroke();

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, PI2, false);
        ctx.closePath();

        ctx.lineWidth = 10;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    },
}

window.onload = function() {
    wheel.init(venues);
    // wheel.initCanvas();

    // var segments = new Array();
    var segments = venues;
    // $.each($('#venues input:checked'), function(key, cbox) {
    //     segments.push(cbox.value);
    // });

    wheel.segments = segments;
    wheel.update();

    // Hide the address bar (for mobile devices)!
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
}