var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
var baseSize = viewportWidth < 768 ? 400 : 800;
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
 
    document.querySelector("#prize h1").innerHTML = savedPrize;
    document.querySelector('#chart').style.opacity = 0.5;
    // Assuming you have the image saved as well
    var savedPrizeImage = localStorage.getItem('savedPrizeImage');
    if (savedPrizeImage && savedPrizeImage.trim() !== "") {
        let prizeElement = d3.select("#prize");
        if (prizeElement.select("img").empty()) {
            prizeElement.append("img").attr("src", savedPrizeImage).attr("alt", savedPrize);
        } else {
            prizeElement.select("img").attr("src", savedPrizeImage).attr("alt", savedPrize);
        }
    }

}
var data = [
    {"label":"ÚT AÐ BORÐA", "value":1, "question":"Þú ert kominn í pott og verður dreginn út í lok sýningar", "src": "skull.png"},
    {"label":"ENGINN VINNINGUR", "value":2, "question":"ADIOS AMIGO", "src": ""},
    {"label":"SÚKKULAÐI", "value":3, "question":"SÚKKULAÐI", "src": "apollo.png"},
    {"label":"ENGINN VINNINGUR", "value":4, "question":"ÞÚ ERT LOSER", "src": ""},
    {"label":"SÚKKULAÐI", "value":5, "question":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "hraun.png"},
    {"label":"ENGINN VINNINGUR", "value":6, "question":"KANNSKI Í NÆSTA LÍFI AUMINGI", "src": ""},
    {"label":"SÚKKULAÐI", "value":7, "question":"PRETTYBOYTJOKKO", "src": "Prins_Polo.webp"},
    {"label":"ENGINN VINNINGUR", "value":8, "question":"TIL AÐ SNÚA AFTUR LEGGÐU 5000KR INN Á RKNR: 511-14-25266, KT: 020498-2859", "src": ""}
];

function easeInOutBack(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w + 220 + padding.left + padding.right)  // increased width
    .attr("height", h + 220 + padding.top + padding.bottom);

var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + ((w/2)+50 + padding.left + 20) + "," + ((h/2)+50 + padding.top) + ")");  // adjusted x-translation
    var defs = svg.append("defs");

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
    
// Add a static shadow circle to the container
container.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', baseSize/2 - (viewportWidth < 768 ? 8 : 20))
    .attr('fill', 'rgba(0,0,0,0)')
    .attr("stroke", "rgba(250,215,102,1)")
    .attr('stroke-width', strokeWidth)
    .attr("filter", "url(#dropshadow)");  // Apply the shadow filter to the static circle

// Create the spinning wheel group
var vis = container.append("g")
    .attr("class", "the-wheel");


    var savedRotation = localStorage.getItem('wheelRotation');
    if (savedRotation) {
        rotation = +savedRotation; // Convert the saved string to a number
        vis.attr("transform", "rotate(" + rotation + ")");
    }
var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
var arc = d3.svg.arc().outerRadius(r);
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    
    filter.append("feOffset")
        .attr("result", "offOut")
        .attr("in", "SourceAlpha")
        .attr("dx", "7")
        .attr("dy", "20");
    
    filter.append("feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "offOut")
        .attr("stdDeviation", "28");
    
    filter.append("feColorMatrix")
        .attr("result", "matrixOut")
        .attr("in", "blurOut")
        .attr("type", "matrix")
        .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0");
    
    filter.append("feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "matrixOut")
        .attr("mode", "normal");
    
arcs.append("path")
    .attr("fill", function(d, i) { return customColors[i]; })
    .attr("stroke", "#000")
    .attr("stroke-width", 2)
    .attr("d", function (d) { return arc(d); });

var pegRadius = r + 10;
var pegLength = 10;
var pegWidth = 3;
// arcs.each(function(d, i) {
//     var angle = d.endAngle;
//     var x = pegRadius * Math.sin(angle);
//     var y = -pegRadius * Math.cos(angle);
//     vis.append("rect")
//         .attr("x", x - pegWidth / 2)
//         .attr("y", y)
//         .attr("width", pegWidth)
//         .attr("height", pegLength)
//         .attr("fill", "#000")
//         .attr("transform", "rotate(" + (angle * 180 / Math.PI) + "," + x + "," + y + ")");
// });

arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (viewportWidth < 768 ? d.outerRadius -20 : d.outerRadius -50) +")";
    })
    .attr("text-anchor", "end")
    .text(function(d, i) {
        return data[i].label;
    })

// arcs.each(function(d, i) {
//     if (d.data.src && d.data.src.trim() !== "") {
//         var midAngle = (d.startAngle + d.endAngle) / 2;
//         var x = ((wheelImgAngle) * r) * Math.sin(midAngle);
//         var y = -((wheelImgAngle) * r) * Math.cos(midAngle);
//         d3.select(this).append("image")
//             .attr("xlink:href", d.data.src)
//             .attr("x", x)
//             .attr("y", y)
//             .attr("width", imgSize)
//             .attr("height", imgSize)
//             .attr("transform", "translate(-50,-50)");
//     }
// });

container.on("click", spin);

function spin(d) {
    if (hasSpun) {
        return;  // Exit the function if the wheel has already been spun
    }
    hasSpun = true;  // Mark the wheel as having been spun
    localStorage.setItem('hasSpun', 'true');  // Save the spin status to local storage

    d3.select("#prize").html("<h1></h1>");
    var ps = 360/data.length,
        pieslice = Math.round(1440/data.length),
        rng = Math.floor((Math.random() * 1440) + 360);
    rotation = (Math.round(rng / ps) * ps);
    picked = Math.round(data.length - (rotation % 360)/ps);
    picked = picked >= data.length ? (picked % data.length) : picked;
    rotation += 90 - Math.round(ps/2);
    var spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
    // var audioElement = document.getElementById("spinSound");
    var pegHitSound = document.getElementById("pegHitSound");
    var totalPegs = data.length;
    var timeForOnePegHit = spinDuration / (360 / (360 / totalPegs));
    var currentTime = 0;

    function playPegHitSound() {
        var delays = [50, 45, 40, 35, 30, 28, 27, 26, 25, 25, 26, 27, 28, 30, 35, 40, 45, 50, 60, 70, 80, 100, 120, 150, 180, 220, 260, 300, 350, 400, 450, 500];
        var totalDelays = delays.reduce(function(a, b) { return a + b; }, 0);
        
        var delayIndex = 0;
        var playNextSound = function() {
            pegHitSound.play();
    
            if (totalDelays < spinDuration) {
                setTimeout(playNextSound, delays[delayIndex] || 500);  // Default to 500ms if we've run out of predefined values
                totalDelays += delays[delayIndex] || 500;
                delayIndex++;
            }
        };
    
        playNextSound();
    }
    
    
    
    // audioElement.play();
    playPegHitSound(0);
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
            localStorage.setItem('savedPrize', data[picked].question);
            localStorage.setItem('savedPrizeImage', data[picked].src);
            if (hasSpun) {
                document.querySelector('#chart').style.opacity = 0.5;
            }
            // audioElement.pause();
            // audioElement.currentTime = 0;
        });
        localStorage.setItem('wheelRotation', rotation);

}

svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
    .append("path")
    .attr("d", "M92.74,76.12C71.72,76.12,0,38.06,0,38.06,0,38.06,71.72,0,92.74,0s38.06,17.04,38.06,38.06-17.04,38.06-38.06,38.06Z")
    .attr("stroke", "rgba(250,215,102,1)")
    .attr("filter", "url(#dropshadow)")
    .attr('stroke-width', 5)
    .style({"fill":"red"});

container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", viewportWidth < 768 ? 60 : 100)
    .attr("fill", "#000000")
    .attr("stroke", "rgba(250,215,102,1)")
    .attr("stroke-width", strokeWidth/2)
    .style({"cursor":"pointer"});

container.append("text")
    .attr("x", 0)
    .attr("y", viewportWidth < 768 ? 45 : 75)
    .attr("text-anchor", "middle")
    .text("SNÚA")
    .style({"font-weight":"bold", "font-size":"20px", 'fill': '#fff'});
container.append('image')
.attr('x', viewportWidth < 768 ? -45 : -70)
.attr('y', viewportWidth < 768 ? -55 : -90)
.attr('width', viewportWidth < 768 ? 90 : 150)
// .attr('height', 10)
.attr('href', 'skull.png')
function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
        return "rotate(" + i(t) + ")";
    };
}
container.append('circle')
.attr('cx', 0)
.attr('cy', 0)
.attr('r', baseSize/2 - (viewportWidth < 768 ? 8 : 20))
.attr('fill', 'rgba(0,0,0,0)')
.attr("stroke", "rgba(250,215,102,1)")
.attr('stroke-width', strokeWidth);

// Get the reset button by its ID
var resetButton = document.getElementById("resetButton");

// Add a click event listener to the button
resetButton.addEventListener("click", function() {
    // Reset local storage
    localStorage.removeItem('hasSpun');
    localStorage.removeItem('savedPrize');
    localStorage.removeItem('savedPrizeImage');
    localStorage.removeItem('wheelRotation');  // Also remove the saved rotation

    // Refresh the page
    location.reload();
});

