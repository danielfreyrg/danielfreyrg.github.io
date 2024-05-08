class SpinningWheel {
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
        this.hasSpun = localStorage.getItem('hasSpun') === 'true';
        this.initSVG();
        this.setupFilters();
        this.drawWheel();
        this.attachHandlers();
    }

    initSVG() {
        this.svg = d3.select(this.containerId)
            .append("svg")
            .attr("width", this.width + this.padding.left + this.padding.right)
            .attr("height", this.height + this.padding.top + this.padding.bottom);
        this.container = this.svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", `translate(${this.width / 2 + this.padding.left}, ${this.height / 2 + this.padding.top})`);
    }

    setupFilters() {
        const defs = this.svg.append("defs");

        const filter = defs.append("filter")
            .attr("id", "dropshadow")
            .attr("x", "-50%")
            .attr("y", "-50%")
            .attr("width", "200%")
            .attr("height", "200%");
        filter.append("feOffset")
            .attr("dx", 6.7393)
            .attr("dy", 19.2553)
            .attr("in", "SourceAlpha")
            .attr("result", "offOut");
        filter.append("feGaussianBlur")
            .attr("stdDeviation", 9.6276)
            .attr("in", "offOut")
            .attr("result", "blurOut");
        filter.append("feBlend")
            .attr("in", "SourceGraphic")
            .attr("in2", "blurOut")
            .attr("mode", "normal");

        // Additional filters like arrow shadow can be defined here
    }

    drawWheel() {
        const pie = d3.pie().value(() => 1);
        const arc = d3.arc().innerRadius(0).outerRadius(this.radius);

        const arcs = this.container.selectAll("g.slice")
            .data(pie(this.data))
            .enter().append("g")
            .attr("class", "slice");

        arcs.append("path")
            .attr("fill", (d, i) => this.options.customColors[i % this.options.customColors.length])
            .attr("d", arc);

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.label);
    }

    attachHandlers() {
        this.svg.on("click", () => this.spin());
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

        this.container.transition()
            .duration(spinDuration)
            .ease(d3.easeBounce)
            .attrTween("transform", () => {
                const interpolate = d3.interpolate(this.oldRotation % 360, this.rotation);
                return t => `rotate(${interpolate(t)})`;
            })
            .on("end", () => {
                d3.select("#prize").html(`<h1>${this.data[picked].question}</h1>`);
                if (this.data[picked].src && this.data[picked].src.trim() !== "") {
                    const prizeElement = d3.select("#prize");
                    prizeElement.selectAll("img").remove(); // Remove old images if any
                    prizeElement.append("img")
                        .attr("src", this.data[picked].src)
                        .attr("alt", this.data[picked].label);
                }
                document.getElementById("prize").classList.add('info');
                localStorage.setItem(`${this.containerId}-savedPrize`, this.data[picked].question);
                localStorage.setItem(`${this.containerId}-savedPrizeImage`, this.data[picked].src);
                this.oldRotation = this.rotation;
            });
    }

    reset() {
        localStorage.removeItem(`${this.containerId}-hasSpun`);
        localStorage.removeItem(`${this.containerId}-savedPrize`);
        localStorage.removeItem(`${this.containerId}-savedPrizeImage`);
        this.hasSpun = false;
        this.rotation = 0;
        d3.select(this.containerId).selectAll(".slice").transition().duration(500).attr("transform", "rotate(0)");
    }
}

// Usage:
const wheelData = [
    {"label":"ÚT AÐ BORÐA", "value":1, "question":"Þú ert kominn í pottinn. Vinningshafi verður dreginn út í lok sýningar.", "src": "skull.png"},
    {"label":"ENGINN VINNINGUR", "value":2, "question":"Gengur kannski betur næst", "src": ""},
    {"label":"SÚKKULAÐI", "value":3, "question":"SÚKKULAÐI", "src": "apollo.png"},
    {"label":"ENGINN VINNINGUR", "value":4, "question":"Þú grípur í tómt", "src": ""},
    {"label":"SÚKKULAÐI", "value":5, "question":"ÞÚ VANNST GLÆNÝTT SÚKKULAÐI", "src": "hraun.png"},
    {"label":"ENGINN VINNINGUR", "value":6, "question":"Farðu á rúntinn með Sigga sýru", "src": ""},
    {"label":"SÚKKULAÐI", "value":7, "question":"PRETTYBOYTJOKKO", "src": "Prins_Polo.webp"},
    {"label":"ENGINN VINNINGUR", "value":8, "question":"Stöngin út", "src": ""}
];

const wheelOptions = {
    breakpoint: 768,
    baseSize: 800,
    customColors: ['#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)', '#F9C200', 'rgba(0, 0, 0, 1)']
};

const spinningWheel = new SpinningWheel('#chart', wheelData, wheelOptions);
