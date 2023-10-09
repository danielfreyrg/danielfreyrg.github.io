// Get the width of the viewport
var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

// Adjust the sizes based on the viewport width
var baseSize = viewportWidth < 768 ? 450 : 750;  // 450 for mobile, 750 for larger screens
var imgSize = viewportWidth < 768 ? 60 : 100;
var paddingRight = viewportWidth < 768 ? 20 : 40;  // Adjust these values as needed

var padding = {top:20, right: paddingRight, bottom:0, left:0};
            w = baseSize - padding.left - padding.right,
            h = baseSize - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();
            // var customColors = ['#F9C200', '#F9C200', '#F9C200', '#F9C200', '#F9C200', '#F9C200', '#F9C200', '#F9C200'];
            var customColors = ['#F9C200', 'rgba(255, 255, 255, 1)', '#F9C200', 'rgba(255, 255, 255, 1)', '#F9C200', 'rgba(255, 255, 255, 1)', '#F9C200', 'rgba(255, 255, 255, 1)']
        
            var data = [
                    {"label":"BÍLL",  "value":1,  "question":"ÞÚ VANNST NÝJAN BÍL", "src": "bill.png"}, 
                    {"label":"ÓHEPPNI",  "value":2,  "question":"ADIOS AMIGO", "src": ""}, 
                    {"label":"SÚKKULAÐI",  "value":3,  "question":"SÚKKULAÐI", "src": "kitkat.png"},
                    {"label":"SORRY",  "value":4,  "question":"ÞÚ ERT LOSER", "src": ""}, //font-weight
                    {"label":"SÚKKULAÐI",  "value":5,  "question":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "kitkat.png"}, 
                    {"label":"ENGIN VINNINGUR",  "value":6,  "question":"KANNSKI Í NÆSTA LÍFI AUMINGI", "src": ""}, 
                    {"label":"SÚKKULAÐI",  "value":7,  "question":"PRETTYBOYTJOKKO", "src": "kitkat.png"},
                    {"label":"AFSAKIÐ",  "value":8,  "question":"TIL AÐ SNÚA AFTUR LEGGÐU 5000KR INN Á RKNR: 511-14-25266, KT: 020498-2859", "src": ""},
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
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
// First, create the paths (wheel slices)
arcs.append("path")
    .attr("fill", function(d, i) { return customColors[i]; })  // Use custom colors
    .attr("stroke", "#000")  // Black outline
    .attr("stroke-width", 2)  // Width of the outline
    .attr("d", function (d) { return arc(d); });

// Then, create the pegs
var pegRadius = r + 10;  // Position the peg 10 units outside the wheel. Adjust as needed.
var pegLength = 10;  // Adjust the length as needed.
var pegWidth = 3;    // Adjust the width as needed.

arcs.each(function(d, i) {
    // Calculate the position based on the end angle of each slice
    var angle = d.endAngle;
    var x = pegRadius * Math.sin(angle);
    var y = -pegRadius * Math.cos(angle);

    vis.append("rect")
        .attr("x", x - pegWidth / 2)
        .attr("y", y)
        .attr("width", pegWidth)
        .attr("height", pegLength)
        .attr("fill", "#000")  // Color of the peg. Adjust as needed.
        .attr("transform", "rotate(" + (angle * 180 / Math.PI) + "," + x + "," + y + ")");
});

// Add the text labels
arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
    })
    .attr("text-anchor", "end")
    .text( function(d, i) {
        return data[i].label;
    });

// Lastly, append the images so they are on top
arcs.each(function(d, i) {
    // Check if the src attribute is not empty
    if (d.data.src && d.data.src.trim() !== "") {
        // Calculate the mid-angle of the slice
        var midAngle = (d.startAngle + d.endAngle) / 2;

        // Use trigonometry to determine the position of the image
        var x = (0.6 * r) * Math.sin(midAngle);
        var y = -(0.6 * r) * Math.cos(midAngle);

        // Append the image to the group element of the slice
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
        function spin(d){
            // container.on("click", null);
            d3.select("#prize").html("<h1></h1>");
        
            var ps = 360/data.length,
                pieslice = Math.round(1440/data.length),
                rng = Math.floor((Math.random() * 1440) + 360);
        
            rotation = (Math.round(rng / ps) * ps);
            picked = Math.round(data.length - (rotation % 360)/ps);
            console.log(picked)
            picked = picked >= data.length ? (picked % data.length) : picked;
        
            rotation += 90 - Math.round(ps/2);
        
            // Generate a random duration between 3000 and 9000 ms
            var spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
        
            vis.transition()
            .duration(spinDuration) // Use the random spin duration
            .ease("bounce") 
            // .ease("cubic-in-out")
            .attrTween("transform", rotTween)
            .each("end", function(){
                d3.select("#prize h1")
                    .text(data[picked].question);
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
            });
            // container.on("click", spin);
    }
        
        
        
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .attr("stroke", "#000000") 
            .attr("stroke-width", "2")
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        // function getRandomNumbers(){
        //     var array = new Uint16Array(1000);
        //     var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
        //     if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
        //         window.crypto.getRandomValues(array);
        //         console.log("works");
        //     } else {
        //         //no support for crypto, get crappy random numbers
        //         for(var i=0; i < 1000; i++){
        //             array[i] = Math.floor(Math.random() * 100000) + 1;
        //         }
        //     }
        //     return array;
        // }


