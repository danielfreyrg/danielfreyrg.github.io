// Get the width of the viewport
var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
var easingFunctions = ["linear", "quad",   "sin", "exp", "circle", "bounce", "back", "easePolyInOut", "easeElasticInOut"];

// Adjust the sizes based on the viewport width
var baseSize = viewportWidth < 768 ? 450 : 750;  
var imgSize = viewportWidth < 768 ? 60 : 100;
var paddingRight = viewportWidth < 768 ? 20 : 40;

var padding = {top:20, right: paddingRight, bottom:0, left:0},
    w = baseSize - padding.left - padding.right,
    h = baseSize - padding.top  - padding.bottom,
    r = Math.min(w, h)/2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();
var customColors = ['#F9C200', 'rgba(255, 255, 255, 1)', '#F9C200', 'rgba(255, 255, 255, 1)', '#F9C200', 'rgba(255, 255, 255, 1)', '#F9C200', 'rgba(255, 255, 255, 1)'];

var data = [
    {"label":"BÍLL", "value":1, "question":"ÞÚ VANNST NÝJAN BÍL", "src": "bill.png"},
    {"label":"ÓHEPPNI", "value":2, "question":"ADIOS AMIGO", "src": ""},
    {"label":"", "value":3, "question":"SÚKKULAÐI", "src": "apollo.png"},
    {"label":"SORRY", "value":4, "question":"ÞÚ ERT LOSER", "src": ""},
    {"label":"", "value":5, "question":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "hraun.png"},
    {"label":"ENGIN VINNINGUR", "value":6, "question":"KANNSKI Í NÆSTA LÍFI AUMINGI", "src": ""},
    {"label":"", "value":7, "question":"PRETTYBOYTJOKKO", "src": "Prins_Polo.webp"},
    {"label":"AFSAKIÐ", "value":8, "question":"TIL AÐ SNÚA AFTUR LEGGÐU 5000KR INN Á RKNR: 511-14-25266, KT: 020498-2859", "src": ""}
];

function easeInOutBack(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width",  w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
var vis = container
    .append("g");
    
var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
var arc = d3.svg.arc().outerRadius(r);
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

// First, create the paths (wheel slices)
arcs.append("path")
    .attr("fill", function(d, i) { return customColors[i]; })
    .attr("stroke", "#000")
    .attr("stroke-width", 2)
    .attr("d", function (d) { return arc(d); });

var pegAngles = [];  // Store angles where pegs are located

arcs.each(function(d, i) {
    var angle = (d.endAngle);
    pegAngles.push(angle * 180 / Math.PI);  // Convert to degrees

    var pegRadius = r + 10;
    var x = pegRadius * Math.sin(angle);
    var y = -pegRadius * Math.cos(angle);

    vis.append("rect")
        .attr("x", x - 1.5)
        .attr("y", y)
        .attr("width", 3)
        .attr("height", 10)
        .attr("fill", "#000")
        .attr("transform", "rotate(" + (angle * 180 / Math.PI) + "," + x + "," + y + ")");
});

arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
    })
    .attr("text-anchor", "end")
    .text(function(d, i) {
        return data[i].label;
    });

arcs.each(function(d, i) {
    if (d.data.src && d.data.src.trim() !== "") {
        var midAngle = (d.startAngle + d.endAngle) / 2;
        var x = (0.6 * r) * Math.sin(midAngle);
        var y = -(0.6 * r) * Math.cos(midAngle);
        d3.select(this).append("image")
            .attr("xlink:href", d.data.src)
            .attr("x", x)
            .attr("y", y)
            .attr("width", imgSize)
            .attr("height", imgSize)
            .attr("transform", "translate(-50,-50)");
    }
});

container.on("click", spin);

function spin(d) {
    d3.select("#prize").html("<h1></h1>");
    var randomEase = easingFunctions[Math.floor(Math.random() * easingFunctions.length)];
console.log("randomEase: " + randomEase);

    var ps = 360 / data.length,
        pieslice = Math.round(1440 / data.length),
        rng = Math.floor((Math.random() * 1440) + 360);
    rotation = (Math.round(rng / ps) * ps);
    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? (picked % data.length) : picked;
    rotation += 90 - Math.round(ps / 2);
    var spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
    console.log('spinDuration: ' + spinDuration)

    // var audioElement = document.getElementById("spinSound");
    var pegHitSound = document.getElementById("pegHitSound");

    // audioElement.play();

    vis.transition()
        .duration(spinDuration)
        // .ease("bounce")
        // .ease("cubic-in-out")
        .ease(randomEase)

        .attrTween("transform", function() {
            var startAngle = oldrotation % 360;
            var endAngle = rotation;
            return function(t) {
                var currentAngle = startAngle + (endAngle - startAngle) * t;
                for (var i = 0; i < pegAngles.length; i++) {
                    if (Math.abs(currentAngle - pegAngles[i]) < 1) {
                        pegHitSound.play();
                    }
                }
                return "rotate(" + currentAngle + ")";
            };
        })
        .each("end", function() {
            d3.select("#prize h1").text(data[picked].question);
            if (data[picked].src && data[picked].src.trim() !== "") {
                let prizeElement = d3.select("#prize");
                if (prizeElement.select("img").empty()) {
                    prizeElement.append("img")
                        .attr("src", data[picked].src)
                        .attr("alt", data[picked].label);
                } else {
                    prizeElement.select("img")
                        .attr("src", data[picked].src)
                        .attr("alt", data[picked].label);
                }
            }
            // audioElement.pause();
            // audioElement.currentTime = 0;
        });
}

svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
    .append("path")
    .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
    .style({"fill": "black"});

container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .attr("stroke", "#000000")
    .attr("stroke-width", "2")
    .style({"fill": "white", "cursor": "pointer"});

container.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({"font-weight": "bold", "font-size": "30px"});
