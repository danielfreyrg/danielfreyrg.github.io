let counter = 0;
var realRotation = 0;
var placedwords = 0;
var dropzone;
var startzone;
var placedwords = 0;
var animationIn = "slide-in";
var animationOut = "slide-out";
if (window.innerWidth < 600) {
    animationIn = "slide-in-mobile";
    animationOut = "slide-out-mobile";
}
// JavaScript objects to hold the weights for checkboxes
const wordWeights = {
    yngri: -1,
    "ekki-med-fulla-medvitund": -1,
    feiminn: -1,
    "ad-vinna-ur-afalli": -1,
    ooruggur: -1,
    "i-ojafnvaegi": -1,
    hraeddur: -1,
    frosinn: -1,
    "ekki-i-godu-astandi": -1,
    oreyndur: -1,
    "likamlega-sterkur": 2,
    fraegur: 2,
    frekur: 2,
    vinsaell: 2,
    sjalfsoruggur: 2,
    aestur: 2,
    eldri: 2,
    "med-meiri-reynslu": 2,
    efnadur: 2,
    "godur-i-kjaftinum": 2,
};
const wordsKK = {
    yngri: "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    feiminn: "feiminn",
    "ad-vinna-ur-afalli": "að vinna úr áfalli",
    ooruggur: "óöruggur",
    "i-ojafnvaegi": "í ójafnvægi",
    hraeddur: "hræddur",
    frosinn: "frosinn",
    "ekki-i-godu-astandi": "ekki í góðu ástandi",
    oreyndur: "óreyndur",
    "likamlega-sterkur": "líkamlega sterkur",
    fraegur: "frægur",
    frekur: "frekur",
    vinsaell: "vinsæll",
    sjalfsoruggur: "sjálfsöruggur",
    aestur: "æstur",
    eldri: "eldri",
    "med-meiri-reynslu": "með meiri reynslu",
    efnadur: "efnadur",
    "godur-i-kjaftinum": "góður í kjaftinum",
};
const wordsHK = {
    yngri: "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    feiminn: "feimið",
    "ad-vinna-ur-afalli": "að vinna úr áfalli",
    ooruggur: "óöruggt",
    "i-ojafnvaegi": "í ójafnvægi",
    hraeddur: "hrætt",
    frosinn: "frosið",
    "ekki-i-godu-astandi": "ekki í góðu ástandi",
    oreyndur: "óreynt",
    "likamlega-sterkur": "líkamlega sterkt",
    fraegur: "frægt",
    frekur: "frekt",
    vinsaell: "vinsælt",
    sjalfsoruggur: "sjálfsöruggt",
    aestur: "æst",
    eldri: "eldri",
    "med-meiri-reynslu": "með meiri reynslu",
    efnadur: "efnað",
    "godur-i-kjaftinum": "gott í kjaftinum",
};
const wordsKVK = {
    yngri: "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    feiminn: "feimin",
    "ad-vinna-ur-afalli": "að vinna úr áfalli",
    ooruggur: "óörugg",
    "i-ojafnvaegi": "í ójafnvægi",
    hraeddur: "hrædd",
    frosinn: "frosin",
    "ekki-i-godu-astandi": "ekki í góðu ástandi",
    oreyndur: "óreynd",
    "likamlega-sterkur": "líkamlega sterk",
    fraegur: "fræg",
    frekur: "frek",
    vinsaell: "vinsæl",
    sjalfsoruggur: "sjálfsörugg",
    aestur: "æst",
    eldri: "eldri",
    "med-meiri-reynslu": "með meiri reynslu",
    efnadur: "efnuð",
    "godur-i-kjaftinum": "góð í kjaftinum",
};

function splitAndFormatWord(word) {
    if (word.includes('-')) {
        return word
    }
    let splitIndex = Math.ceil(word.length / 2);

    const prefix = "sjálfs";
    if (word.startsWith(prefix)) {
        splitIndex = prefix.length;
    } else {
        return word;
    }

    const part1 = word.substring(0, splitIndex);
    const part2 = word.substring(splitIndex);

    return part1 + "-<br>" + part2;
}

document.addEventListener("DOMContentLoaded", function () {
    // Make words draggable
    const words = document.querySelectorAll("label");
    words.forEach((word) => {
        word.setAttribute("draggable", true);
        word.addEventListener("dragstart", (event) => {
            document
                .querySelectorAll(".right-words, .left-words, .start")
                .forEach((zone) => {
                    zone.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    zone.style.borderRadius = "20px";
                    zone.style.border = "2px solid rgba(255, 255, 255, 0.5)";
                    setTimeout(function () {
                        zone.style.backgroundColor = "";
                        zone.style.borderRadius = "";
                        zone.style.border = "";
                    }
                        , 5000);

                });


            startzone = event.target.parentElement;
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });

    // Setup drop zones
    const dropZones = document.querySelectorAll(
        ".right-words, .left-words, .start"
    );
    dropZones.forEach((zone) => {
        zone.addEventListener("dragover", (event) => {
            event.preventDefault(); // Allow dropping by preventing default
        });

        zone.addEventListener("drop", (event) => {
            document
                .querySelectorAll(".right-words, .left-words, .start")
                .forEach((zone) => {
                    zone.style.backgroundColor = "";
                    zone.style.borderRadius = "";
                    zone.style.border = "";
                });
            event.preventDefault();
            document.querySelector(".info").style.animationName = "fade-out";
            const id = event.dataTransfer.getData("text/plain");
            const draggableElement = document.getElementById(id);
            draggableElement.innerHTML = splitAndFormatWord(
                draggableElement.innerHTML
            );
            zone.appendChild(draggableElement);
            draggableElement.style.animationName = "slide-down";
            draggableElement.addEventListener("animationend", function () {
                draggableElement.style.animationName = "none";
            });

            updateCounter(zone, id); // Update counters or any other logic after drop
        });
    });

    // Function to update counters based on current dropped words
    function updateCounter(dropzone, id) {
        var alreadyplaced = false;
        var weight = wordWeights[id];
        weight = weight * 2;

        if (dropzone.classList.contains("left-words")) {
            weight = -weight;
        }
        if (
            (startzone.classList.contains("left-words") &&
                dropzone.classList.contains("right-words")) ||
            (startzone.classList.contains("right-words") &&
                dropzone.classList.contains("left-words"))
        ) {
            alreadyplaced = true;
            weight = weight * 2;
        }
        if (
            dropzone.classList.contains("start") &&
            !startzone.classList.contains("left-words")
        ) {
            weight = -weight;
        }
        if (dropzone.classList.contains("start")) {
            alreadyplaced = true;        }

        if (startzone == dropzone) {
            weight = 0;
            alreadyplaced = true;
        }

        if (!alreadyplaced) {
            placedwords += 1;
        }
        if (placedwords == 4) {

            document.querySelector(".done-button").style.display = "block";
        } 
        if (placedwords > 7) {
            setTimeout(function () {
                nextScene(3);
            }, 1000);
        }

        counter += weight;
        console.log("Counter: " + counter + " Word: " + id + " Weight: " + weight);
        rotateBar();

        console.log("------------------");
    }
});

function rotateBar() {
    if (counter > 11) {
        realRotation = 11;
    } else if (counter < -11) {
        realRotation = -11;
    } else {
        realRotation = counter;
    }
    document.querySelector(
        ".scene3 .bar"
    ).style.transform = `rotate(${realRotation}deg)`;
    document.querySelector(
        ".scene3 .words"
    ).style.transform = `rotate(${realRotation}deg)`;
}

document.querySelector(".kk-button").addEventListener("click", function () {
    document.querySelectorAll("form > label").forEach(function (label) {
        label.innerHTML = wordsKK[label.id];
    });
    nextScene(2);
});
document.querySelector(".kvk-button").addEventListener("click", function () {
    document.querySelectorAll("form > label").forEach(function (label) {
        label.innerHTML = wordsKVK[label.id];
    });
    nextScene(2);
});

document.querySelector(".hk-button").addEventListener("click", function () {
    document.querySelectorAll("form > label").forEach(function (label) {
        label.innerHTML = wordsHK[label.id];
    });
    nextScene(2);
});

document.querySelector(".start-button").addEventListener("click", function () {
    nextScene(1);

});

document.querySelector(".reset-button").addEventListener("click", function () {
    document.querySelector(".background-plain").style.animationName = "fade-out";
    document.querySelector(".scene4").style.animationName = animationOut;
    document
        .querySelector(".scene4")
        .addEventListener("animationend", function () {
            window.location.reload();
        });
});

document.querySelector(".done-button").addEventListener("click", function () {
    document.querySelector(".scene3").style.animationName = "slide-out";
    document
        .querySelector(".scene3")
        .addEventListener("animationend", function () {
            document.querySelector(".scene4").style.display = "block";
            document.querySelector(".background-plain").style.display = "block";
            document.querySelector(".scene3").style.display = "none";
        });
});



function nextScene(num) {
    document.querySelector(".scene" + num).style.animationName = "slide-out";
    document
        .querySelector(".scene" + num)
        .addEventListener("animationend", function () {
            document.querySelector(".scene" + (num + 1)).style.display = "block";
            document.querySelector(".scene" + (num + 1)).style.animationName = "slide-in";
            document.querySelector(".scene" + num).style.display = "none";
        });
}