let counter = 0;
var realRotation = 0;
var placedwords = 0;
var dropzone;
var startzone;
var placedwords = 0;
var animationIn = "slide-in";
var animationOut = "slide-out";
var alreadyplaced = false;
var scale = 1;

if (window.innerWidth < 600) {
    animationIn = "slide-in-mobile";
    animationOut = "slide-out-mobile";

}

const wordCounter = {
    stressadur: 0,
    "meikar-ekki-ad-beila": 0,
    "vill-ekki-saera": 0,
    "vill-ekki-bregdast": 0,
    "vill-ad-adrir-fili-sig": 0,
    "ahrifagjarn": 0,
    yngri: 0,
    "ekki-med-fulla-medvitund": 0,
    feiminn: 0,
    "ad-vinna-ur-afalli": 0,
    ooruggur: 0,
    "i-ojafnvaegi": 0,
    hraeddur: 0,
    frosinn: 0,
    "ekki-i-godu-astandi": 0,
    oreyndur: 0,
    "likamlega-sterkur": 0,
    fraegur: 0,
    frekur: 0,
    vinsaell: 0,
    sjalfsoruggur: 0,
    aestur: 0,
    eldri: 0,
    "med-meiri-reynslu": 0,
    efnadur: 0,
    "godur-i-kjaftinum": 0,
    'sudar': 0,
    'pressa': 0
};
const wordWeights = {
    pressa: -2,
    stressadur: -2,
    "meikar-ekki-ad-beila": -2,
    "vill-ekki-saera": -2,
    "vill-ekki-bregdast": -2,
    "vill-ad-adrir-fili-sig": -1,
    "ahrifagjarn": -1,
    yngri: -2,
    "ekki-med-fulla-medvitund": -50,
    feiminn: -1,
    "ad-vinna-ur-afalli": -2,
    ooruggur: -2,
    "i-ojafnvaegi": -2,
    hraeddur: -3,
    frosinn: -3,
    "ekki-i-godu-astandi": -2,
    oreyndur: -2,
    "likamlega-sterkur": 2,
    fraegur: 2,
    frekur: 3,
    vinsaell: 1,
    sjalfsoruggur: 2,
    aestur: 3,
    eldri: 2,
    "med-meiri-reynslu": 2,
    efnadur: 1,
    "godur-i-kjaftinum": 1,
    'stressadur-clone-0': -2,
    "meikar-ekki-ad-beila-clone-0": -2,
    "vill-ekki-saera-clone-0": -2,
    "vill-ekki-bregdast-clone-0": -2,
    "vill-ad-adrir-fili-sig-clone-0": -1,
    "ahrifagjarn-clone-0": -1,
    'yngri-clone-0': -2,
    "ekki-med-fulla-medvitund-clone-0": -50,
    'feiminn-clone-0': -1,
    "ad-vinna-ur-afalli-clone-0": -2,
    'ooruggur-clone-0': -2,
    "i-ojafnvaegi": -2,
    'hraeddur-clone-0': -3,
    'frosinn-clone-0': -3,
    "ekki-i-godu-astandi-clone-0": -2,
    'oreyndur-clone-0': -2,
    "likamlega-sterkur-clone-0": 2,
    'fraegur-clone-0': 2,
    'frekur-clone-0': 3,
    'vinsaell-clone-0': 1,
    'sjalfsoruggur-clone-0': 2,
    'aestur-clone-0': 3,
    'eldri-clone-0': 2,
    "med-meiri-reynslu-clone-0": 2,
    'efnadur-clone-0': 1,
    "godur-i-kjaftinum-clone-0": 1,
    'stressadur-clone-1': -2,
    "meikar-ekki-ad-beila-clone-1": -2,
    "vill-ekki-saera-clone-1": -2,
    "vill-ekki-bregdast-clone-1": -2,
    "vill-ad-adrir-fili-sig-clone-1": -1,
    "ahrifagjarn-clone-1": -1,
    'yngri-clone-1': -2,
    "ekki-med-fulla-medvitund-clone-1": -50,
    'feiminn-clone-1': -1,
    "ad-vinna-ur-afalli-clone-1": -2,
    'ooruggur-clone-1': -2,
    "i-ojafnvaegi-clone-1": -2,
    'hraeddur-clone-1': -3,
    'frosinn-clone-1': -3,
    "ekki-i-godu-astandi-clone-1": -2,
    'oreyndur-clone-1': -2,
    "likamlega-sterkur-clone-1": 2,
    'fraegur-clone-1': 2,
    'frekur-clone-1': 3,
    'vinsaell-clone-1': 1,
    'sjalfsoruggur-clone-1': 2,
    'aestur-clone-1': 3,
    'eldri-clone-1': 2,
    "med-meiri-reynslu-clone-1": 2,
    'efnadur-clone-1': 1,
    "godur-i-kjaftinum-clone-1": 1,
    'sudar': 1,
    'sudar-clone-0': 1,
    'sudar-clone-1': 1,
    'pressa-clone-0': -2,
    'pressa-clone-1': -2,
    
};
const words = {
    stressadur: "stress",
    "vill-ekki-saera": "vill ekki særa",
    "ahrifagjarn": "áhrifagirni",
    yngri: "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    ooruggur: "óöryggi",
    hraeddur: "hræðsla",
    frosinn: "að frjósa",
    "likamlega-sterkur": "líkamlegur styrkur",
    fraegur: "frægð",
    frekur: "frekja",
    vinsaell: "nýtur vinsælda",
    sjalfsoruggur: "sjálfsöryggi",
    aestur: "æsingur",
    eldri: "eldri",
    "med-meiri-reynslu": "meiri reynsla",
    efnadur: "efnaðri",
    "godur-i-kjaftinum": "kjaftfor",
    'i-ojafnvaegi': "í ójafnvægi",
    'sudar': "suðar",
    'pressa': "upplifir pressu",
};

function splitAndFormatWord(word) {
    if (word.includes('-')) {
        return word
    }
    // word = word.innerHTML
    let splitIndex = Math.ceil(word.length / 2);

    const prefix = "sjálfs";
    if (word.startsWith(prefix) || word.startsWith("áhrifa")|| word =='stressaður' ) {
        
        splitIndex = prefix.length;
    } else {
        return word;
    }
    if (word == 'stressað') {
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
            startzone = event.target.parentElement;
            if (startzone.classList.contains('start')) {
                
            }
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });

    // Setup drop zones
    const dropZones = document.querySelectorAll(
        ".right-words, .left-words, .start, .bg-drop-zone"
    );
    dropZones.forEach((zone) => {
        zone.addEventListener("dragover", (event) => {
            event.preventDefault(); // Allow dropping by preventing default
        });

        zone.addEventListener("drop", (event) => {

            event.preventDefault();
            if (zone.classList.contains('bg-drop-zone')) {
                zone = document.querySelector('.start');

            }

            const id = event.dataTransfer.getData("text/plain");
            const draggableElement = document.getElementById(id);
            draggableElement.querySelector("span").innerHTML = splitAndFormatWord(
                draggableElement.querySelector("span").innerHTML
            );
            //if "ö" in word and dropzone is left-words or right words then add class big-word-extra
            if (draggableElement.innerHTML.includes("ö") && (zone.classList.contains("left-words") || zone.classList.contains("right-words"))) {
                draggableElement.classList.add("big-word-extra");
            }
            if (wordWeights[id] > 0) {
                draggableElement.classList.add("big-word");
            }
            if ((wordCounter[id] == 0 && !zone.classList.contains("start")) && startzone != zone) {
                var cloned = draggableElement.cloneNode(true);
                cloned.id = id + "-clone-" + wordCounter[id];
                cloned.addEventListener("dragstart", (event) => {
                    startzone = event.target.parentElement;
                    event.dataTransfer.setData("text/plain", event.target.id);
                }
                );
                zone.appendChild(cloned);
                wordCounter[id] += 1;
            } else {
                zone.appendChild(draggableElement);
            }
            if (zone.classList.contains("start")) {

                    
                draggableElement.style.animationName = "slide-in";
                draggableElement.addEventListener("animationend", function () {
                    draggableElement.style.animationName = "none";
                }, { once: true });
            }
            else {
                if (!cloned) {
            draggableElement.style.animationName = "slide-down";
            draggableElement.addEventListener("animationend", function () {
                draggableElement.style.animationName = "none";

            }, { once: true });
            
        }
        else {
            cloned.style.animationName = "slide-down";
            cloned.addEventListener("animationend", function () {
                cloned.style.animationName = "none";

            }, { once: true })
        }
    }
            updateCounter(zone, id); // Update counters or any other logic after drop
            // scaleSaw();

        });
    });


    
    

    // Function to update counters based on current dropped words
    function updateCounter(dropzone, id) {
        alreadyplaced = false;
        // var weight = wordWeights[id];
        // weight = weight * 2;
        //get the weight from the data-weight attribute
        weight = parseInt(document.getElementById(id).getAttribute('data-weight'));

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
            if ((startzone.classList.contains("left-words") || startzone.classList.contains("right-words")) && placedwords > 0) {
                placedwords -= 1;
            }
            alreadyplaced = true;       
            if (id.includes('clone')) {
                document.getElementById(id).remove();
            }
        }

        if (startzone == dropzone) {
            weight = 0;
            alreadyplaced = true;
        }

        if (!alreadyplaced) {
            placedwords += 1;
        }
        if (placedwords == 1) {

            document.querySelector(".done-button").style.display = "block";
        } 
        if (placedwords > 10 || counter > 20 || counter < -20) {
            setTimeout(function () {
                // nextScene(2);
            }, 4000);
        }

        counter += weight;
        rotateBar();

    }
});

function rotateBar() {
    if (counter > 20) {
        realRotation = 20;
    } else if (counter < -20) {
        realRotation = -20;
    } else {
        realRotation = counter;
    }
    document.querySelector(
        ".scene2 .bar"
    ).style.transform = `rotate(${realRotation}deg)`;
    document.querySelector(
        ".scene2 .words"
    ).style.transform = `rotate(${realRotation}deg)`;
}



document.querySelector(".start-button").addEventListener("click", function () {
    
    document.querySelector(".background-plain").style.animationName = "fade-out";
    document.querySelector(".background").style.animationName = "fade-in";
    document.querySelector('.background').style.display = 'block';
    document.querySelectorAll(".start > label").forEach(function (label) {
        label.innerHTML = '<span>' + words[label.id] + '</span>';
             label.setAttribute('data-weight', wordWeights[label.id])
         });
    nextScene(1);


});

document.querySelector(".start-again-button").addEventListener("click", function () {
    document.querySelector(".background-plain").style.animationName = "fade-out";
    document.querySelector(".scene3").style.animationName = animationOut;
    document
        .querySelector(".scene3")
        .addEventListener("animationend", function () {
            window.location.reload();
        }, { once: true });
});

document.querySelector(".done-button").addEventListener("click", function () {
    nextScene(2)
    document.querySelector('.background').style.animationName = 'fade-out';
});



function nextScene(currentSceneNum) {
    var limit = 2
    if (currentSceneNum == 2) {
        if (counter >= limit) {
        document.querySelector('.scene3 #results').innerHTML = `Það lítur út fyrir að þú gætir verið í veikari stöðu í ykkar samskiptum. `
        } else if (counter <= -limit) {
            document.querySelector('.scene3 #results').innerHTML = `Það lítur út fyrir að þú gætir verið í sterkari stöðu í ykkar samskiptum.`
        
        } else {
            document.querySelector('.scene3 #results').innerHTML = `Það lítur út fyrir að vera gott jafnvægi í ykkar samskiptum.`
        
        }
    }
    document.querySelector(".scene" + currentSceneNum).style.animationName = "slide-out";
    document
        .querySelector(".scene" + currentSceneNum)
        .addEventListener("animationend", function () {
            document.querySelector(".scene" + (currentSceneNum + 1)).style.display = "block";
            document.querySelector(".scene" + (currentSceneNum + 1)).style.animationName = "slide-in";
            document.querySelector(".scene" + currentSceneNum).style.display = "none";
            var lottie = document.querySelector('dotlottie-player');
            if (currentSceneNum == 1 && lottie) {
                lottie.remove();
            }
        }, { once: true });
}

function resetSaw(bool) {
    if (!bool) {
        return
    }
    //set all wordcounters to 0 
    for (var key in wordCounter) {
        wordCounter[key] = 0;
    }
    document.querySelectorAll(".right-words, .left-words").forEach(function (zone) {
        var children = [].slice.call(zone.children);
        children.forEach(function (word) {
            if (word.id.includes('clone')) {
                word.remove();
            }
            word.style.animationName = "fade-out";
            word.addEventListener("animationend", function () {
                word.style.animationName = "none";
                document.querySelector(".start").appendChild(word);
            }, { once: true });
            
        }
        );
    });
    counter = 0;
    placedwords = 0;
    alreadyplaced = false;   
    rotateBar();
    document.querySelector('body').click();
}
function scaleSaw(resetScale = false) {
    var rightWords = document.querySelector(".right-words");
    var leftWords = document.querySelector(".left-words");
    var top = Math.min(rightWords.getBoundingClientRect().top, leftWords.getBoundingClientRect().top);
    var saw = document.querySelector(".scene2 .saw");
    if (resetScale) {
scale = 1;
saw.style.transform = 'scale(' + scale + ')';
    }

    // Only proceed if the right-words element is off the screen (top < 0)
    if (top < 0 && scale > 0.2) {
        // Calculate adjustment needed based on how far off the screen the element is
        // This is a basic adjustment calculation and may need to be refined
        var adjustment = Math.abs(top) / 1000; // Example adjustment calculation
        var newScale = scale - adjustment;
        scale = Math.max(newScale, 0.2); // Ensure scale does not go below 0.2

        saw.style.transform = 'scale(' + scale + ')';

        // Log the new scale for debugging
        console.log('Adjusted scale to: ' + scale);
    } else if (top > 0 && scale < 1) {
        var adjustment = Math.abs(top) / 1000; // Example adjustment calculation
        var newScale = scale + adjustment;
        scale = Math.min(newScale, 1); // Ensure scale does not go above 1
        saw.style.transform = 'scale(' + scale + ')';
        console.log('Adjusted scale to: ' + scale);
    }
}