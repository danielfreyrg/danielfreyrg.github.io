class SpinningWheel {
    /**
 * Represents a spinning wheel for games or random selection visuals.
 * @class
 * @param {string} containerId - The DOM ID of the container where the wheel will be rendered.
 * @param {Object[]} data - An array of objects representing the segments of the wheel.
 * @param {string} data[].label - The text label for the segment.
 * @param {number} data[].value - The value of the segment.
 * @param {string} data[].infotext - The text displayed when the segment is selected.
 * @param {Object} options - Configuration options for the wheel appearance and behavior.
 * @param {number} options.breakpoint - The viewport width at which to change sizing rules.
 * @param {number} options.baseSize - The base size of the wheel.
 * @param {string[]} options.customColors - An array of colors used for the wheel segments.
 * @param {string} options.filters - SVG filter definitions for graphical effects.
 */
    constructor(containerId, data, options) {
        this.containerId = containerId;
        this.data = data;
        this.options = options;
        this.viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        this.baseSize = this.viewportWidth < this.options.breakpoint ? (this.viewportWidth * 0.85) : this.options.baseSize;
        this.strokeWidth = this.viewportWidth < this.options.breakpoint ? 10 : 20;
        this.paddingRight = this.viewportWidth < this.options.breakpoint ? 20 : 40;
        this.padding = { top: 20, right: this.paddingRight, bottom: 0, left: 0 };
        this.width = this.baseSize - this.padding.left - this.padding.right;
        this.height = this.baseSize - this.padding.top - this.padding.bottom;
        this.radius = Math.min(this.width, this.height) / 2;
        this.rotation = 0;
        this.oldRotation = 0;
        this.picked = 100000;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.startAngle = 0;
        this.dragStart = this.dragStart.bind(this);
        this.drag = this.drag.bind(this);
        this.dragEnd = this.dragEnd.bind(this);

        this.dragBehavior = d3.behavior.drag()
            .on("dragstart", this.dragStart)
            .on("drag", this.drag)
            .on("dragend", this.dragEnd);
        
        this.padding = {top:20, right: this.paddingRight, bottom:0, left:0};
        this.w = this.baseSize - this.padding.left - this.padding.right;
        this.h = this.baseSize - this.padding.top  - this.padding.bottom;
        this.r = Math.min(this.w, this.h)/2;
        this.hasSpun = localStorage.getItem(`${this.containerId}-hasSpun`) === 'true';
        this.initSVG();
        this.setupFilters();
        this.drawWheel();
        this.attachHandlers();
        if (!this.hasSpun) {
            this.container.on("touchmove", this.touchMove);
            this.container.call(this.dragBehavior);
            
            } else {
                this.container.on('.drag', null);
                this.container.on('touchMove', null);
            }
    }

    initSVG() {
        this.svg = d3.select(this.containerId)
            .append("svg")
            .attr("width", this.width + this.padding.left + this.padding.right)
            .attr("height", this.height + this.padding.top + this.padding.bottom);
        this.container = this.svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", `translate(${this.width / 2 + this.padding.left}, ${this.height / 2 + this.padding.top})`);
            this.vis = this.container.append("g")
            .attr("class", "wheel");
    }

    setupFilters() {
        const defs = this.svg.append("defs");
        if (this.options.filters) {
            defs.html(this.options.filters); // Directly insert predefined filters
        }
    
    }

    drawWheel() {
        const pie = d3.layout.pie().value(() => 1);
        const arc = d3.svg.arc().innerRadius(0).outerRadius(this.radius);

        const arcs = this.vis.selectAll("g.slice")
            .data(pie(this.data))
            .enter().append("g")
            .attr("class", "slice");

        arcs.append("path")
            .attr("fill", (d, i) => this.options.customColors[i % this.options.customColors.length])
            .attr("d", arc);

        arcs.append("text")
            .attr("transform", (d) => {
                const [x, y] = arc.centroid(d);
                const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) - 90;
                return `translate(${x}, ${y}) rotate(${angle})`;
            })
            .attr("text-anchor", "middle")
            .text(d => d.data.label);
            }


    attachHandlers() {
        this.vis.on("click", () => this.spin());
    }
    rotTween = (  to) =>  {
        var i = d3.interpolate(this.oldRotation % 360, this.rotation);
        return function(t) {
            return "rotate(" + i(t) + ")";
        };
    }
    reset = () => {
        this.hasSpun = false;
        this.rotation = 0;
        d3.select(this.containerId).selectAll(".slice").transition().duration(500).attr("transform", "rotate(0)");
        localStorage.removeItem(`${this.containerId}-hasSpun`);
        localStorage.removeItem(`${this.containerId}-savedPrize`);
        localStorage.removeItem(`${this.containerId}-savedPrizeImage`);
        localStorage.removeItem(`${this.containerId}-wheelRotation`);
    }
    spin() {
        if (this.hasSpun) return;
        this.hasSpun = true;
        localStorage.setItem(`${this.containerId}-hasSpun`, 'true');

        const ps = 360 / this.data.length;
        const pieslice = Math.round(1440 / this.data.length);
        const rng = Math.floor((Math.random() * 1440) + 360);

        this.rotation = (Math.round(rng / ps) * ps);
        let picked = Math.round(this.data.length - (this.rotation % 360) / ps);
        picked = picked >= this.data.length ? (picked % this.data.length) : picked;

        this.rotation += 90 - Math.round(ps / 2);
        const spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;

        this.vis.transition()
            .duration(spinDuration)
            .ease("bounce")
            .attrTween("transform", this.rotTween)
            .each("end", () => {
                d3.select("#prize h1").text(this.data[picked].infotext);
                if (this.data[picked].src && this.data[picked].src.trim() !== "") {
                    let prizeElement = d3.select("#prize");
                    if (prizeElement.select("img").empty()) {
                        prizeElement.append("img").attr("src", this.data[picked].src).attr("alt", this.data[picked].label);
                    } else {
                        prizeElement.select("img").attr("src", this.data[picked].src).attr("alt", this.data[picked].label);
                    }
                }
                document.getElementById("prize").classList.add('info')
                localStorage.setItem(`${this.containerId}-savedPrize`, this.data[picked].question);
                localStorage.setItem(`${this.containerId}-savedPrizeImage`, this.data[picked].src);
                if (this.hasSpun) {
                //     document.querySelector('#chart').style.opacity = 0.6;
                }
            });
            localStorage.setItem(`${this.containerId}-wheelRotation`, this.rotation);
            
    }
    
    
    touchStart = (event) => {
        this.touchStartY = d3.event.touches[0].clientY;
    }
    
    touchEnd = (event) =>{
        this.touchEndY = d3.event.changedTouches[0].clientY;
        let swipeDistance = touchEndY - touchStartY;
        this.spinWithSwipe(swipeDistance);
    }
    
    touchMove = (event) =>{
        d3.event.preventDefault();
    }
    dragStart = (d) =>{
        var dx = d3.event.x,
            dy = d3.event.y;
    
        this.startAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    
        if (isNaN(this.startAngle)) {
            this.startAngle = 0;
        }
    }
    
    drag = (d) => {
        // Calculate the angle based on the drag distance
        var dx = d3.event.x,
            dy = d3.event.y;
    
        var currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        var deltaAngle = currentAngle - this.startAngle;
    
        if (isNaN(deltaAngle)) {
            console.error("deltaAngle is NaN", currentAngle, this.startAngle);
            return;
        }
    
        // Update the rotation of the wheel
        this.rotation += deltaAngle;
        if (isNaN(this.rotation)) {
            console.error("rotation is NaN", deltaAngle);
            return;
        }
    
        this.vis.attr("transform", "rotate(" + this.rotation + ")");
    
        // Update the start angle for the next drag event
        this.startAngle = currentAngle;
    }
    
   dragEnd = (d) => {
        this.spinWithSwipe(this.rotation);
    }
    
    
    
    
    

    spinWithSwipe = (swipeDistance) =>{
        let spinDuration = 3000 + Math.abs(swipeDistance)*10; // example calculation
        if (this.hasSpun) {
            return;
        }
        this.hasSpun = true;
        localStorage.setItem('hasSpun', 'true');
    
        d3.select("#prize").html("<h1></h1>");
        var ps = 360/this.data.length,
            pieslice = Math.round(1440/this.data.length),
            rng = Math.floor((Math.random() * 1440) + 360);
        this.rotation = (Math.round(rng / ps) * ps);
        this.picked = Math.round(this.data.length - (this.rotation % 360)/ps);
        this.picked = this.picked >= this.data.length ? (this.picked % this.data.length) : this.picked;
        this.rotation += 90 - Math.round(ps/2);
        // var spinDuration = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
    
        this.vis.transition()
            .duration(spinDuration)
            .ease("bounce")
            .attrTween("transform", this.rotTween)
            .each("end", () => {
                d3.select("#prize h1").text(this.data[this.picked].infotext);
                if (this.data[this.picked].src && this.data[this.picked].src.trim() !== "") {
                    let prizeElement = d3.select("#prize");
                    if (prizeElement.select("img").empty()) {
                        prizeElement.append("img").attr("src", this.data[this.picked].src).attr("alt", this.data[this.picked].label);
                    } else {
                        prizeElement.select("img").attr("src", this.data[this.picked].src).attr("alt", this.data[this.picked].label);
                    }
                }
                document.getElementById("prize").classList.add('info')
                localStorage.setItem(`${this.containerId}-savedPrize`, this.data[this.picked].question);
                localStorage.setItem(`${this.containerId}-savedPrizeImage`, this.data[this.picked].src);
                if (this.hasSpun) {
                //     document.querySelector('#chart').style.opacity = 0.6;
                }
            });
            localStorage.setItem(`${this.containerId}-wheelRotation`, this.rotation);
            this.container.on('.drag', null);
    
    }


}

// Usage:
const wheelData = [
    {"label":"ÚT AÐ BORÐA", "value":1, "infotext":"Þú ert kominn í pottinn. Vinningshafi verður dreginn út í lok sýningar.", "src": "skull.png"},
    {"label":"ENGINN VINNINGUR", "value":2, "infotext":"Gengur kannski betur næst", "src": ""},
    {"label":"SÚKKULAÐI", "value":3, "infotext":"SÚKKULAÐI", "src": "apollo.png"},
    {"label":"ENGINN VINNINGUR", "value":4, "infotext":"Þú grípur í tómt", "src": ""},
    {"label":"SÚKKULAÐI", "value":5, "infotext":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "hraun.png"},
    {"label":"ENGINN VINNINGUR", "value":6, "infotext":"Farðu á rúntinn með Sigga sýru", "src": ""},
    {"label":"SÚKKULAÐI", "value":7, "infotext":"PRETTYBOYTJOKKO", "src": "Prins_Polo.webp"},
    {"label":"ENGINN VINNINGUR", "value":8, "infotext":"Stöngin út", "src": ""}
];

const wheelOptions1= {
    breakpoint: 768,
    baseSize: 800,
    customColors: ['#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)'],
    filters:     `<linearGradient id="linear-gradient" x1="94.12" y1="179.49" x2="754.59" y2="644.72" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fad766"/>
    <stop offset=".14" stop-color="#b4712a"/>
    <stop offset=".29" stop-color="#cc943f"/>
    <stop offset=".47" stop-color="#e5b854"/>
    <stop offset=".61" stop-color="#f4ce61"/>
    <stop offset=".71" stop-color="#fad766"/>
    <stop offset="1" stop-color="#b4712a"/>
  </linearGradient>
  <filter id="drop-shadow" filterUnits="userSpaceOnUse">
    <feOffset dx="6.74" dy="19.26"/>
    <feGaussianBlur result="blur" stdDeviation="9.63"/>
    <feFlood flood-color="#000" flood-opacity=".75"/>
    <feComposite in2="blur" operator="in"/>
    <feComposite in="SourceGraphic"/>
  </filter>`
};

const wheelOptions2= {
    breakpoint: 768,
    baseSize: 800,
    customColors: ['#fefefe', 'rgba(0, 0, 255, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 255, 1)', 'rgba(0, 0, 0, 1)'],
    filters:     `<linearGradient id="linear-gradient" x1="94.12" y1="179.49" x2="754.59" y2="644.72" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fad766"/>
    <stop offset=".14" stop-color="#b4712a"/>
    <stop offset=".29" stop-color="#cc943f"/>
    <stop offset=".47" stop-color="#e5b854"/>
    <stop offset=".61" stop-color="#f4ce61"/>
    <stop offset=".71" stop-color="#fad766"/>
    <stop offset="1" stop-color="#b4712a"/>
  </linearGradient>
  <filter id="drop-shadow" filterUnits="userSpaceOnUse">
    <feOffset dx="6.74" dy="19.26"/>
    <feGaussianBlur result="blur" stdDeviation="9.63"/>
    <feFlood flood-color="#000" flood-opacity=".75"/>
    <feComposite in2="blur" operator="in"/>
    <feComposite in="SourceGraphic"/>
  </filter>`
};

innerWheel = new SpinningWheel('#innerWheel', wheelData, wheelOptions1);

outerWheel = new SpinningWheel('#outerWheel', wheelData, wheelOptions2);
 
document.getElementById("resetButton").addEventListener("click", function() {
    outerWheel.reset();
    innerWheel.reset();
    location.reload();
});