
var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
var baseSize = viewportWidth < 768 ? (viewportWidth*0.85) : 800;
var imgSize = viewportWidth < 768 ? 100 : 120;
var wheelImgAngle = viewportWidth < 768 ? 0.6 : 0.5;
var strokeWidth = viewportWidth < 768 ? 10 : 20;
var paddingRight = viewportWidth < 768 ? 20 : 40;
var padding = {top:20, right: paddingRight, bottom:0, left:0};
var w = baseSize - padding.left - padding.right,
    h = baseSize - padding.top  - padding.bottom,
    r = Math.min(w, h)/2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();
var customColors = ['#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)'];
var hasSpun = localStorage.getItem('hasSpun') === 'true'; // If 'hasSpun' is 'true' in localStorage, set hasSpun to true
var savedPrize = localStorage.getItem('savedPrize');
if (savedPrize) {
    document.getElementById("prize").classList.add('info')
    document.querySelector("#prize h1").innerHTML = savedPrize;
    // document.querySelector('#chart').style.opacity = 0.6;
    var savedPrizeImage = localStorage.getItem('savedPrizeImage');
    if (savedPrizeImage && savedPrizeImage.trim() !== "") {
        let prizeElement = d3.select("#prize");
        if (prizeElement.select("img").empty()) {
            prizeElement.append("img").attr("src", savedPrizeImage).attr("alt", savedPrize);
        } else {
            prizeElement.select("img").attr("src", savedPrizeImage).attr("alt", savedPrize);
        }
    }
} else {

}
var data = [
    {"label":"ÚT AÐ BORÐA", "value":1, "question":"Þú ert kominn í pottinn. Vinningshafi verður dreginn út í lok sýningar.", "src": "skull.png"},
    {"label":"ENGINN VINNINGUR", "value":2, "question":"Gengur kannski betur næst", "src": ""},
    {"label":"SÚKKULAÐI", "value":3, "question":"SÚKKULAÐI", "src": "apollo.png"},
    {"label":"ENGINN VINNINGUR", "value":4, "question":"Þú grípur í tómt", "src": ""},
    {"label":"SÚKKULAÐI", "value":5, "question":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "hraun.png"},
    {"label":"ENGINN VINNINGUR", "value":6, "question":"Farðu á rúntinn með Sigga sýru", "src": ""},
    {"label":"SÚKKULAÐI", "value":7, "question":"PRETTYBOYTJOKKO", "src": "Prins_Polo.webp"},
    {"label":"ENGINN VINNINGUR", "value":8, "question":"Stöngin út", "src": ""}
];



var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w + (viewportWidth < 768 ? 100 : 220) + padding.left + padding.right + (viewportWidth < 768 ? 30 : 0))
    .attr("height", h + (viewportWidth < 768 ? 100 : 220) + padding.top + padding.bottom);
var mobileOffset = viewportWidth < 768 ? viewportWidth * 0.05 : 0;
var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + ((w/2)+50 + padding.left + 20 - mobileOffset) + "," + ((h/2)+50 + padding.top) + ")");
var defs = svg.append("defs");


let touchStartY;
let touchEndY;

function touchStart(event) {
    touchStartY = d3.event.touches[0].clientY;
}

function touchEnd(event) {
    touchEndY = d3.event.changedTouches[0].clientY;
    let swipeDistance = touchEndY - touchStartY;
    spinWithSwipe(swipeDistance);
}

function touchMove(event) {
    d3.event.preventDefault();
}
function dragStart(d) {
    var dx = d3.event.x,
        dy = d3.event.y;

    startAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (isNaN(startAngle)) {
        startAngle = 0;
    }
}

function drag(d) {
    // Calculate the angle based on the drag distance
    var dx = d3.event.x,
        dy = d3.event.y;

    var currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    var deltaAngle = currentAngle - startAngle;

    if (isNaN(deltaAngle)) {
        console.error("deltaAngle is NaN", currentAngle, startAngle);
        return;
    }

    // Update the rotation of the wheel
    rotation += deltaAngle;
    if (isNaN(rotation)) {
        console.error("rotation is NaN", deltaAngle);
        return;
    }

    vis.attr("transform", "rotate(" + rotation + ")");

    // Update the start angle for the next drag event
    startAngle = currentAngle;
}

function dragEnd(d) {
    spinWithSwipe(rotation);
}



var dragBehavior = d3.behavior.drag()
    .on("dragstart", dragStart)
    .on("drag", drag)
    .on("dragend", dragEnd);

    if (!hasSpun) {
        container.on("touchmove", touchMove);
        container.call(dragBehavior);
        
        } else {
            container.on('.drag', null);
            container.on('touchMove', null);
        }
function spinWithSwipe(swipeDistance) {
    // Use swipeDistance to adjust the spin strength/duration
    let spinDuration = 3000 + Math.abs(swipeDistance)*10; // example calculation
    if (hasSpun) {
        return;
    }
    hasSpun = true;
    localStorage.setItem('hasSpun', 'true');

    d3.select("#prize").html("<h1></h1>");
    var ps = 360/data.length,
        pieslice = Math.round(1440/data.length),
        rng = Math.floor((Math.random() * 1440) + 360);
    rotation = (Math.round(rng / ps) * ps);
    picked = Math.round(data.length - (rotation % 360)/ps);
    picked = picked >= data.length ? (picked % data.length) : picked;
    rotation += 90 - Math.round(ps/2);
    // var spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;

    vis.transition()
        .duration(spinDuration)
        .ease("bounce")
        .attrTween("transform", rotTween)
        .each("end", function() {
            d3.select("#prize h1").text(data[picked].question);
            if (data[picked].src && data[picked].src.trim() !== "") {
                let prizeElement = d3.select("#prize");
                if (prizeElement.select("img").empty()) {
                    prizeElement.append("img").attr("src", data[picked].src).attr("alt", data[picked].label);
                } else {
                    prizeElement.select("img").attr("src", data[picked].src).attr("alt", data[picked].label);
                }
            }
            document.getElementById("prize").classList.add('info')
            localStorage.setItem('savedPrize', data[picked].question);
            localStorage.setItem('savedPrizeImage', data[picked].src);
            if (hasSpun) {
                container.on('.drag', null);            }
        });
        localStorage.setItem('wheelRotation', rotation);
        container.on('.drag', null);

}

var filter = defs.append("filter")
    .attr("id", "dropshadow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

filter.append("feOffset")
    .attr("result", "offOut")
    .attr("in", "SourceAlpha")
    .attr("dx", "6.7393")
    .attr("dy", "19.2553");

filter.append("feGaussianBlur")
    .attr("result", "blurOut")
    .attr("in", "offOut")
    .attr("stdDeviation", "9.6276");

filter.append("feColorMatrix")
    .attr("result", "matrixOut")
    .attr("in", "blurOut")
    .attr("type", "matrix")
    .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0");

filter.append("feBlend")
    .attr("in", "SourceGraphic")
    .attr("in2", "matrixOut")
    .attr("mode", "multiply");

container.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', baseSize/2 - (viewportWidth < 768 ? 8 : 20))
    .attr('fill', 'rgba(0,0,0,0)')
    .attr("stroke", "url(#linear-gradient)")
    .attr('stroke-width', strokeWidth)
    .attr("filter", "url(#dropshadow)");
// Add this gradient definition after your existing defs declaration.
defs.append("linearGradient")
    .attr("id", "linear-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("gradientTransform", "rotate(45)")
    .attr("gradientUnits", "objectBoundingBox")
    .selectAll("stop")
    .data([
        {"offset": "0", "color": "#fad766"},
        {"offset": ".14", "color": "#b4712a"},
        {"offset": ".29", "color": "#cc943f"},
        {"offset": ".47", "color": "#e5b854"},
        {"offset": ".61", "color": "#f4ce61"},
        {"offset": ".71", "color": "#fad766"},
        {"offset": "1", "color": "#b4712a"}
    ])
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });
    var filter = defs.append("filter")
    .attr("id", "arrow-shadow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

filter.append("feOffset")
    .attr("result", "offOut")
    .attr("in", "SourceAlpha")
    .attr("dx", "6.7393")
    .attr("dy", "19.2553");

filter.append("feGaussianBlur")
    .attr("result", "blurOut")
    .attr("in", "offOut")
    .attr("stdDeviation", "9.6276");

filter.append("feColorMatrix")
    .attr("result", "matrixOut")
    .attr("in", "blurOut")
    .attr("type", "matrix")
    .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "matrixOut");  // This merges the shadow first
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");  // This merges the original graphic on top of the shadow

var vis = container.append("g")
    .attr("class", "the-wheel");

var savedRotation = localStorage.getItem('wheelRotation');
if (savedRotation) {
    rotation = +savedRotation;
    vis.attr("transform", "rotate(" + rotation + ")");
}
var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
var arc = d3.svg.arc().outerRadius(r);
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

arcs.append("path")
    .attr("fill", function(d, i) { return customColors[i]; })
    .attr("stroke", "#000")
    .attr("stroke-width", 2)
    .attr("d", function (d) { return arc(d); });

    arcs.append("text")
    .attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (viewportWidth < 768 ? d.outerRadius -20 : d.outerRadius -50) +")";
    })
    .attr("text-anchor", "end")
    .each(function(d, i) {
        var label = data[i].label;
        if (label === "ENGINN VINNINGUR") {
            d3.select(this)
                .append("tspan")
                .attr("x", -18)
                .attr("dy", "-0.5em")  // Adjust as necessary for line spacing
                .text("ENGINN");
            
            d3.select(this)
                .append("tspan")
                .attr("x", 0)
                .attr("dy", "1.2em")  // Adjust as necessary for line spacing
                .text("VINNINGUR");
        } else {
            d3.select(this).text(label);
        }
    });
container.on("click", spin);

function spin(d) {
    if (hasSpun) {
        return;
    }
    hasSpun = true;
    localStorage.setItem('hasSpun', 'true');

    d3.select("#prize").html("<h1></h1>");
    var ps = 360/data.length,
        pieslice = Math.round(1440/data.length),
        rng = Math.floor((Math.random() * 1440) + 360);
    rotation = (Math.round(rng / ps) * ps);
    picked = Math.round(data.length - (rotation % 360)/ps);
    picked = picked >= data.length ? (picked % data.length) : picked;
    rotation += 90 - Math.round(ps/2);
    var spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;

    vis.transition()
        .duration(spinDuration)
        .ease("bounce")
        .attrTween("transform", rotTween)
        .each("end", function() {
            d3.select("#prize h1").text(data[picked].question);
            if (data[picked].src && data[picked].src.trim() !== "") {
                let prizeElement = d3.select("#prize");
                if (prizeElement.select("img").empty()) {
                    prizeElement.append("img").attr("src", data[picked].src).attr("alt", data[picked].label);
                } else {
                    prizeElement.select("img").attr("src", data[picked].src).attr("alt", data[picked].label);
                }
            }
            document.getElementById("prize").classList.add('info')
            localStorage.setItem('savedPrize', data[picked].question);
            localStorage.setItem('savedPrizeImage', data[picked].src);
            if (hasSpun) {
            //     document.querySelector('#chart').style.opacity = 0.6;
            }
        });
        localStorage.setItem('wheelRotation', rotation);

}
//ARROW
svg.append("g")
    .attr("transform", "translate(" + (w + (viewportWidth < 768 ? 20 : 0)- (mobileOffset+5) + padding.left + padding.right) + "," + ((h/2) + 30 +padding.top) + ")")
    .append("path")
    .attr("d", "M92.74,76.12C71.72,76.12,0,38.06,0,38.06,0,38.06,71.72,0,92.74,0s38.06,17.04,38.06,38.06-17.04,38.06-38.06,38.06Z")
    .attr("stroke", "url(#linear-gradient)")
    .attr("filter", "url(#arrow-shadow)")
    .attr('stroke-width', 5)
    .attr('class', 'arrow')
    .style({"fill":"#C20000"});

container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", viewportWidth < 768 ? 40 : 100)
    .attr("fill", "#000000")
    .attr("stroke", "url(#linear-gradient)")
    .attr("stroke-width", strokeWidth/2)
    .style({"cursor":"pointer"});
container.append("text")
    .attr("x", 0)
    .attr("y", viewportWidth < 768 ? 30 : 75)
    .attr("text-anchor", "middle")
    .text("SNÚA")
    .style({"font-weight":"bold", "font-size":(viewportWidth < 768 ? '14px' : '24px'), 'fill': '#fff'});
container.append('image')
.attr('x', viewportWidth < 768 ? -30 : -75)
.attr('y', viewportWidth < 768 ? -35 : -90)
.attr('width', viewportWidth < 768 ? 60 : 150)
.attr('href', 'skull.png')
function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
        return "rotate(" + i(t) + ")";
    };
}
//outer circle
container.append('circle')
.attr('cx', 0)
.attr('cy', 0)
.attr('r', baseSize/2 - (viewportWidth < 768 ? 8 : 20))
.attr('fill', 'rgba(0,0,0,0)')
.attr("stroke", "url(#linear-gradient)")
.attr('stroke-width', strokeWidth);

var resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", function() {
    localStorage.removeItem('hasSpun');
    localStorage.removeItem('savedPrize');
    localStorage.removeItem('savedPrizeImage');
    localStorage.removeItem('wheelRotation');
    location.reload();
});
