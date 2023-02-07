var mobile = !(window.getComputedStyle(document.querySelector('#show-door-mobile')).display == "none");

// info for fyrirspurnir door combinations 
// doorInfo template: 
// {name: "door name", src: "image name"}, 
// add new doors after all the others in doorInfo but before the "]"  


var doorInfo = [
    { name: "H5111", src: "H5111.png" },
    { name: "H3010", src: "H3010-1.png" },
    { name: "H5110", src: "H5110.png" },
    { name: "H4030", src: "H4030.png" },
    { name: "H2030", src: "H2030-2.png" },
    { name: "H5102", src: "H5102.png" },
    { name: "H1000", src: "H1000-1.png" },
    { name: "H5101", src: "H5101.png" },
    { name: "H4021", src: "H4021.png" },
    { name: "H4040", src: "H4040.png" },
    { name: "H1060", src: "H1060-1.png" },
    { name: "SV5510", src: "SV5510.png" },
    { name: "H2000", src: "H2000-2.png" },
    { name: "H5150", src: "H5150.png" },
    { name: "SV5512", src: "SV5512.png" },
    { name: "H3000", src: "H3000-1.png" },
    { name: "H3050", src: "H3050.png" },
    { name: "H3040", src: "H3040.png" },
    { name: "H5155", src: "H5155.png" },
    { name: "H3020", src: "H3020-1.png" },
    { name: "H4050 lóðrétt rásun", src: "H4050_lodrett_rasun.png" },
    { name: "H1010", src: "H1010-1.png" },
    { name: "H2020", src: "H2020-2.png" },
    { name: "SV5500", src: "SV5500.png" },
    { name: "SV5514", src: "SV5514.png" },
    { name: "H5130", src: "H5130.png" },
    { name: "H2025", src: "H2025-1.png" },
    { name: "H4020", src: "H4020-1.png" },
    { name: "H5131", src: "H5131.png" },
    { name: "H5100", src: "H5100-1.png" },
    { name: "H3030", src: "H3030.png" },
    { name: "H4011", src: "H4011.png" },
    { name: "H1050", src: "H1050-1.png" },
    { name: "H5122", src: "H5122.png" },
    { name: "H1070", src: "H1070-1.png" },
    { name: "H5121", src: "H5121.png" },
    { name: "H2040", src: "H2040-1.png" },
    { name: "H5040", src: "H5040.png" },
    { name: "H5120", src: "H5120.png" },
    { name: "H4000", src: "H4000.png" },
];


//frameInfo template 
//     { name: "frame name", src: "frame image", TopMargin: number, LeftMargin: number, Height: number, Width: number }, 


// explanations for outerInfo numbers 
// TopMargin: distance from top of frame to the hole for the door in pixels 
// LeftMargin: distance from left of frame to the hole for the door in pixels 
// Height: height of door hole from the bottom edge of the hole to the top edge in pixels - not including the frame itself 

// Width: width of door hole from the Left edge of the hole to the right  edge in pixels- not including the frame itself 
//totalWidth and totalHeight: complete height and width of the image in pixels

// add new frames after all the others in frameInfo but before the "]"  


var frameInfo = [
    { name: "K03", src: "K03-2.png", TopMargin: 18, LeftMargin: 18, Height: 620, Width: 273, totalWidth: 414, totalHeight: 656 },
    { name: "K23", src: "K23-2.png", TopMargin: 75, LeftMargin: 18, Height: 545, Width: 247, totalWidth: 450, totalHeight: 635 },
    { name: "K07", src: "K07-2.png", TopMargin: 18, LeftMargin: 18, Height: 614, Width: 270, totalWidth: 410, totalHeight: 650 },
    { name: "K05", src: "K05-2.png", TopMargin: 18, LeftMargin: 18, Height: 620, Width: 274, totalWidth: 414, totalHeight: 656 },
    { name: "K21", src: "K21-2.png", TopMargin: 18, LeftMargin: 118, Height: 602, Width: 263, totalWidth: 500, totalHeight: 635 },
    { name: "K02", src: "K02-2.png", TopMargin: 16, LeftMargin: 15, Height: 492, Width: 215, totalWidth: 330, totalHeight: 522 },
    { name: "K24", src: "K24-3.png", TopMargin: 50, LeftMargin: 12, Height: 377, Width: 166, totalWidth: 300, totalHeight: 437 },
    { name: "K20", src: "K20-3.png", TopMargin: 18, LeftMargin: 117, Height: 600, Width: 266, totalWidth: 500, totalHeight: 633 },
    { name: "K22", src: "K22-2.png", TopMargin: 18, LeftMargin: 17, Height: 606, Width: 265, totalWidth: 450, totalHeight: 635 },
    { name: "K06", src: "K06-2.png", TopMargin: 18, LeftMargin: 18, Height: 615, Width: 270, totalWidth: 410, totalHeight: 650 },
    { name: "K13", src: "K13-2.png", TopMargin: 18, LeftMargin: 118, Height: 606, Width: 266, totalWidth: 533, totalHeight: 641 },
    { name: "K08", src: "K08-2.png", TopMargin: 18, LeftMargin: 18, Height: 608, Width: 268, totalWidth: 436, totalHeight: 645 },
    { name: "K10", src: "K10-2.png", TopMargin: 18, LeftMargin: 18, Height: 606, Width: 266, totalWidth: 433, totalHeight: 641 },
    { name: "K09", src: "K09-4.png", TopMargin: 18, LeftMargin: 18, Height: 609, Width: 269, totalWidth: 504, totalHeight: 645 },
    { name: "K14", src: "K14-2.png", TopMargin: 17, LeftMargin: 116, Height: 600, Width: 266, totalWidth: 529, totalHeight: 635 },
];

var mobile = !(window.getComputedStyle(document.querySelector('#show-door-mobile')).display == "none");

var scale;
var leftAlign
var topAlign
if (mobile) {
    scale = 0.4;
    leftAlign = 250
    topAlign = 50
} else {
    scale = 1;
    leftAlign = 300
    topAlign = 50
}
const openModal = async function(event, isMobile) {
    mobile = isMobile;
    event.preventDefault();
    const doorModal = document.getElementById("door-modal");
    doorModal.style.display = "block";
    await sleep(0.1); //wait 0.1 seconds so the two events don't fire at once
    window.addEventListener(
        "click",
        function close(event) {
            doorModal.style.display = "none";
        }, {
            once: true
        }
    );
};
const sleep = (time) => {
    return new Promise((resolve) =>
        setTimeout(resolve, Math.ceil(time * 1000))
    );
};
const currenturl = window.location.href;
const siteArr = currenturl.split("/");
var currentLocation = siteArr[siteArr.length - 2];
if (currentLocation == 'fyrirspurnir') {
    document.getElementById('show-door-desktop').style.display = 'none';
}
if (currentLocation == "image-testing") {
    const desktopDoorButton = document.getElementById("show-door-desktop");
    const mobileDoorButton = document.getElementById("show-door-mobile");

    desktopDoorButton.addEventListener("click", (event) => {
        openModal(event, false);
    });
    mobileDoorButton.addEventListener("click", (event) => {
        openModal(event, true);
    });
    const frameselector = document.getElementsByClassName("wpcf7-select")[1];
    const doorselector = document.getElementsByClassName("wpcf7-select")[0];

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function(a, b) {
            /* next line works with strings and numbers,
             * and you may want to customize it to your needs
             */
            var result =
                a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
            return result * sortOrder;
        };
    }
    doorInfo.sort(dynamicSort("name"));
    frameInfo.sort(dynamicSort("name"));
    var doorimg = document.getElementById("door");
    var frameimg = document.getElementById("frame");

    for (var i = 0; i < doorInfo.length; i++) {
        doorselector.innerHTML +=
            "<option value='" +
            doorInfo[i].name +
            "'>" +
            doorInfo[i].name +
            "</option>";
    }
    for (var i = 0; i < frameInfo.length; i++) {
        frameselector.innerHTML +=
            "<option value='" +
            frameInfo[i].name +
            "'>" +
            frameInfo[i].name +
            "</option>";
    }
    const findFrame = (name) => {
        for (var i = 0; i < frameInfo.length; i++) {
            if (frameInfo[i].name == name) {
                return frameInfo[i];
            }
        }
        return {
            name: "",
            src: "",
            TopMargin: 50,
            LeftMargin: 30,
            Width: 200,
            Height: 500,
            totalHeight: 500,
            totalWidth: 200
        };
    };

    const findDoor = (name) => {
        for (var i = 0; i < doorInfo.length; i++) {
            if (doorInfo[i].name == name) {
                return doorInfo[i];
            }
        }
        return {
            name: "",
            src: ""
        };
    };
    const changeDoor = () => {
        var door = findDoor(doorselector.value);
        var doorimg = document.getElementById("door");
        var frameimg = document.getElementById("frame");
        doorimg.style.display = 'block'
        if (frameselector.value == "Karmur Nr (ef eru hliðargluggar)") {
            frameimg.style.display = 'none';
        } else {
            frameimg.style.display = 'block';
        }
        if (doorselector.value == "Hurð Nr") {
            doorimg.style.display = 'none';
        } else {
            doorimg.style.display = 'block';
        }
        var frame = findFrame(frameselector.value);
        if (frame == 'K24') {
            scale += 0.3
        }

        if (door == undefined || (door == undefined && frame == undefined)) {
            return;
        }
        doorimg.src =
            "https://dev.starkup.ee/kambar/wp-content/uploads/2022/05/" + door.src;

        frameimg.style.width = frame.totalWidth * scale + "px";
        frameimg.style.height = frame.totalHeight * scale + "px";
        doorimg.style.top = topAlign + (frame.TopMargin * scale) + "px";
        doorimg.style.left = leftAlign + (frame.LeftMargin * scale) + "px";
        doorimg.style.height = frame.Height * scale + "px";
        doorimg.style.width = (frame.Width + 2) * scale + "px";

        document.getElementById("doorcombo-title").innerHTML =
            "<h3> Hurð: " + door.name + ", karmur: " + frame.name + "</h3>";
    };
    const changeFrame = () => {
        frameimg.style.display = 'block';
        var frame = findFrame(frameselector.value);
        if (frame == 'K24') {
            scale += 0.3
        }
        var door = findDoor(doorselector.value);
        if (frameselector.value == "Karmur Nr (ef eru hliðargluggar)") {
            frameimg.style.display = 'none';
        } else {
            frameimg.style.display = 'block';
        }
        if (doorselector.value == "Hurð Nr") {
            doorimg.style.display = 'none';
        } else {
            doorimg.style.display = 'block';
        }
        if (frame == undefined || (door == undefined && frame == undefined)) {
            return;
        }
        frameimg.src =
            "https://dev.starkup.ee/kambar/wp-content/uploads/2022/05/" + frame.src;
        frameimg.style.width = frame.totalWidth * scale + "px";
        frameimg.style.height = frame.totalHeight * scale + "px";
        doorimg.style.top = topAlign + (frame.TopMargin * scale) + "px";
        doorimg.style.left = leftAlign + (frame.LeftMargin * scale) + "px";
        doorimg.style.height = frame.Height * scale + "px";
        doorimg.style.width = (frame.Width + 2) * scale + "px";

        document.getElementById("doorcombo-title").innerHTML =
            "<h3> Hurð: " + door.name + ", karmur: " + frame.name + "</h3>";
    };
    frameselector.addEventListener("change", changeFrame);
    doorselector.addEventListener("change", changeDoor);
}