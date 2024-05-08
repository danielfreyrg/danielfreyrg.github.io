var data = [
    {"label":"ÚT AÐ BORÐA", "value":1, "infotext":"Þú ert kominn í pottinn. Vinningshafi verður dreginn út í lok sýningar.", "src": "skull.png"},
    {"label":"ENGINN VINNINGUR", "value":2, "infotext":"Gengur kannski betur næst", "src": ""},
    {"label":"SÚKKULAÐI", "value":3, "infotext":"SÚKKULAÐI", "src": "apollo.png"},
    {"label":"ENGINN VINNINGUR", "value":4, "infotext":"Þú grípur í tómt", "src": ""},
    {"label":"SÚKKULAÐI", "value":5, "infotext":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "hraun.png"},
    {"label":"ENGINN VINNINGUR", "value":6, "infotext":"Farðu á rúntinn með Sigga sýru", "src": ""},
    {"label":"SÚKKULAÐI", "value":7, "infotext":"PRETTYBOYTJOKKO", "src": "Prins_Polo.webp"},
    {"label":"ENGINN VINNINGUR", "value":8, "infotext":"Stöngin út", "src": ""}
];
function createWheel(containerId, data, options) {
    var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var baseSize = viewportWidth < options.breakpoint ? (viewportWidth * 0.85) : options.baseSize;
    var strokeWidth = viewportWidth < options.breakpoint ? 10 : 20;
    var paddingRight = viewportWidth < options.breakpoint ? 20 : 40;
    var padding = { top: 20, right: paddingRight, bottom: 0, left: 0 };
    var w = baseSize - padding.left - padding.right,
        h = baseSize - padding.top - padding.bottom,
        r = Math.min(w, h) / 2;
    var rotation = 0, oldrotation = 0, picked = 100000;

    var hasSpun = localStorage.getItem(containerId + 'hasSpun') === 'true';
    var savedPrize = localStorage.getItem(containerId + 'savedPrize');
    var savedPrizeImage = localStorage.getItem(containerId + 'savedPrizeImage');

    var svg = d3.select(containerId)
        .append("svg")
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);

    var container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");

    // Definitions for filters and other SVG elements
    var defs = svg.append("defs");
    setupFilters(defs);  // Call to setup the filters

    var pie = d3.layout.pie().sort(null).value(function(d) { return 1; });
    var arc = d3.svg.arc().outerRadius(r);

    // Draw slices
    var arcs = container.selectAll("g.slice")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "slice");
    arcs.append("path")
        .attr("fill", function(d, i) { return options.customColors[i % options.customColors.length]; })
        .attr("d", arc);

    // Add drag behavior
    var dragBehavior = d3.behavior.drag()
        .on("dragstart", dragStart)
        .on("drag", drag)
        .on("dragend", dragEnd);
    container.call(dragBehavior);

    if (!hasSpun) {
        container.on("touchmove", touchMove);
        container.call(dragBehavior);
    } else {
        container.on('.drag', null);
        container.on('touchMove', null);
    }

    function dragStart(d) {
        var dx = d3.event.x, dy = d3.event.y;
        startAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    }

    function drag(d) {
        var dx = d3.event.x, dy = d3.event.y;
        var currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        var deltaAngle = currentAngle - startAngle;
        rotation += deltaAngle;
        container.attr("transform", "rotate(" + rotation + ")");
        startAngle = currentAngle;
    }

    function dragEnd(d) {
        spinWithSwipe(rotation);
    }

    function touchMove(event) {
        d3.event.preventDefault();
    }

    function spinWithSwipe(swipeDistance) {
        let spinDuration = 3000 + Math.abs(swipeDistance) * 10;
        if (hasSpun) return;
        hasSpun = true;
        localStorage.setItem(containerId + 'hasSpun', 'true');
        animateSpin(spinDuration);
    }

    function animateSpin(duration) {
        var ps = 360 / data.length,
            pieslice = Math.round(1440 / data.length),
            rng = Math.floor((Math.random() * 1440) + 360);

        rotation = (Math.round(rng / ps) * ps);
        picked = Math.round(data.length - (rotation % 360) / ps);
        picked = picked >= data.length ? (picked % data.length) : picked;
        rotation += 90 - Math.round(ps / 2);

        container.transition()
            .duration(duration)
            .ease("cubic-out")
            .attrTween("transform", function() {
                var interpolate = d3.interpolate(oldrotation % 360, rotation);
                return function(t) {
                    return "rotate(" + interpolate(t) + ")";
                };
            })
            .each("end", function() {
                oldrotation = rotation;
                localStorage.setItem(containerId + 'savedPrize', data[picked].label);
                localStorage.setItem(containerId + 'savedPrizeImage', data[picked].src);
            });
    }

    // Reset functionality and more can be added similarly

    return {
        spin: function() { spinWithSwipe(0); },
        reset: function() {
            localStorage.removeItem(containerId + 'hasSpun');
            localStorage.removeItem(containerId + 'savedPrize');
            localStorage.removeItem(containerId + 'savedPrizeImage');
            hasSpun = false;
        }
    };
}
function setupFilters(defs) {
    var dropShadowFilter = defs.append("filter")
        .attr("id", "dropshadow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    dropShadowFilter.append("feOffset")
        .attr("result", "offOut")
        .attr("in", "SourceAlpha")
        .attr("dx", "6.7393")
        .attr("dy", "19.2553");
    dropShadowFilter.append("feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "offOut")
        .attr("stdDeviation", "9.6276");
    dropShadowFilter.append("feColorMatrix")
        .attr("result", "matrixOut")
        .attr("in", "blurOut")
        .attr("type", "matrix")
        .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0");
    dropShadowFilter.append("feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "matrixOut")
        .attr("mode", "multiply");

    var arrowShadowFilter = defs.append("filter")
        .attr("id", "arrow-shadow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    arrowShadowFilter.append("feOffset")
        .attr("dx", "6.7393")
        .attr("dy", "19.2553");
    arrowShadowFilter.append("feGaussianBlur")
        .attr("stdDeviation", "9.6276");
    arrowShadowFilter.append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0");
    var feMerge = arrowShadowFilter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "matrixOut");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // Add the linear gradient for the wheel colors
    var gradient = defs.append("linearGradient")
        .attr("id", "linear-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("gradientTransform", "rotate(45)");
    gradient.selectAll("stop")
        .data([
            {"offset": "0%", "color": "#fad766"},
            {"offset": "14%", "color": "#b4712a"},
            {"offset": "29%", "color": "#cc943f"},
            {"offset": "47%", "color": "#e5b854"},
            {"offset": "61%", "color": "#f4ce61"},
            {"offset": "71%", "color": "#fad766"},
            {"offset": "100%", "color": "#b4712a"}
        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });
}



// Example of setting up the wheel
var wheel1 = createWheel("#outerWheel", data, {
    breakpoint: 768,
    baseSize: 800,
    customColors: ['#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)']
});
