let counter = 0;
var realRotation = 0;
var placedwords = 0;
var dropzone
var startzone
var placedwords = 0
// JavaScript objects to hold the weights for checkboxes
const wordWeights = {
    "yngri": -1,
    "ekki-med-fulla-medvitund": -1,
    "feiminn": -1,
    "ad-vinna-ur-afalli": -1,
    "ooruggur": -1,
    "i-ojafnvaegi": -1,
    "hraeddur": -1,
    "frosinn": -1,
    "ekki-i-godu-astandi": -1,
    "oreyndur": -1,
    "likamlega-sterkur": 2,
    "fraegur": 2,
    "frekur": 2,
    "vinsaell": 2,
    "sjalfsoruggur": 2,
    "aestur": 2,
    "eldri": 2,
    "med-meiri-reynslu": 2,
    "efnadur": 2,
    "godur-i-kjaftinum": 2
};
const wordsKK = {
    "yngri": "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    "feiminn": "feiminn",
    "ad-vinna-ur-afalli": "að vinna úr áfalli",
    "ooruggur": "óróuggur",
    "i-ojafnvaegi": "í ójafnvægi",
    "hraeddur": "hræddur",
    "frosinn": "frósinn",
    "ekki-i-godu-astandi": "ekki í góðu ástandi",
    "oreyndur": "óreyndur",
    "likamlega-sterkur": "líkamlega sterkur",
    "fraegur": "frægur",
    "frekur": "frekur",
    "vinsaell": "vinsæll",
    "sjalfsoruggur": "sjálfsöruggur",
    "aestur": "æstur",
    "eldri": "eldri",
    "med-meiri-reynslu": "með meiri reynslu",
    "efnadur": "efnadur",
    "godur-i-kjaftinum": "góður í kjaftinum"
};
const wordsHK = {
    "yngri": "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    "feiminn": "feimið",
    "ad-vinna-ur-afalli": "að vinna úr áfalli",
    "ooruggur": "óróuggt",
    "i-ojafnvaegi": "í ójafnvægi",
    "hraeddur": "hrætt",
    "frosinn": "frosið",
    "ekki-i-godu-astandi": "ekki í góðu ástandi",
    "oreyndur": "óreynt",
    "likamlega-sterkur": "líkamlega sterkt",
    "fraegur": "frægt",
    "frekur": "frekt",
    "vinsaell": "vinsælt",
    "sjalfsoruggur": "sjálfsöruggt",
    "aestur": "æst",
    "eldri": "eldri",
    "med-meiri-reynslu": "með meiri reynslu",
    "efnadur": "efnað",
    "godur-i-kjaftinum": "gott í kjaftinum"
};
const wordsKVK = {
    "yngri": "yngri",
    "ekki-med-fulla-medvitund": "ekki með fulla meðvitund",
    "feiminn": "feimin",
    "ad-vinna-ur-afalli": "að vinna úr áfalli",
    "ooruggur": "óörugg",
    "i-ojafnvaegi": "í ójafnvægi",
    "hraeddur": "hrædd",
    "frosinn": "frosin",
    "ekki-i-godu-astandi": "ekki í góðu ástandi",
    "oreyndur": "óreynd",
    "likamlega-sterkur": "líkamlega sterk",
    "fraegur": "fræg",
    "frekur": "frek",
    "vinsaell": "vinsæl",
    "sjalfsoruggur": "sjálfsörugg",
    "aestur": "æst",
    "eldri": "eldri",
    "med-meiri-reynslu": "með meiri reynslu",
    "efnadur": "efnuð",
    "godur-i-kjaftinum": "góð í kjaftinum"
};
document.addEventListener('DOMContentLoaded', function () {
    // Make words draggable
    const words = document.querySelectorAll('label');
    words.forEach(word => {
        word.setAttribute('draggable', true);
        word.addEventListener('dragstart', (event) => {
            startzone = event.target.parentElement
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });

    // Setup drop zones
    const dropZones = document.querySelectorAll('.right-words, .left-words, .start');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow dropping by preventing default
        });

        zone.addEventListener('drop', (event) => {
            event.preventDefault();
            document.querySelector('.info').style.animationName = 'fade-out';
            const id = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            zone.appendChild(draggableElement);
            draggableElement.style.animationName = 'slide-down';
            draggableElement.addEventListener('animationend', function () {
                draggableElement.style.animationName = 'none';
            });
            if (wordWeights[id] > 1) {
                draggableElement.classList.add('big-word');
            }
            updateCounter(zone, id); // Update counters or any other logic after drop
        });
    });

    // Function to update counters based on current dropped words
    function updateCounter(dropzone, id) {
        var alreadyplaced = false
        var weight = wordWeights[id];
        weight = weight * 2;

        if (dropzone.classList.contains('left-words')) {
            weight = -weight;
        }
        if (startzone.classList.contains('left-words') && dropzone.classList.contains('right-words') 
        || startzone.classList.contains('right-words') && dropzone.classList.contains('left-words')) {
            alreadyplaced = true
            weight = weight * 2;
        }
        if (dropzone.classList.contains('start') && !startzone.classList.contains('left-words')) {

            weight = -weight;

        }
        if (dropzone.classList.contains('start')) {
            alreadyplaced = true
            weight = weight * 2;
        }

        if (startzone == dropzone) {
            weight = 0;
            alreadyplaced = true
        }

        if (!alreadyplaced) {
            placedwords += 1;
        }
        if (placedwords > 2) {
            //wait for 3 seconds
            setTimeout(function () {
            document.querySelector('.scene3').style.animationName = 'slide-out';
            document.querySelector('.scene3').addEventListener('animationend', function () {
                document.querySelector('.scene4').style.display = 'block';
            }
            )
            
            }, 1500)
        }

        console.log("Weight:", weight);
        counter += weight;
        console.log("Counter value:", counter);
        rotateBar()

        console.log('------------------')



    }
});



function rotateBar() {

    if (counter > 11) {
        realRotation = 11;
    } else if (counter < -11) {
        realRotation = -11;
    }
    else {
        realRotation = counter;
    }
    document.querySelector('.scene3 .bar').style.transform = `rotate(${realRotation}deg)`;
    document.querySelector('.scene3 .words').style.transform = `rotate(${realRotation}deg)`;
}






document.querySelector('.kk-button').addEventListener('click', function () {
    document.querySelectorAll('form > label').forEach(function (label) {
        label.innerHTML = wordsKK[label.id];
    })
    document.querySelector('.scene2').style.animationName = 'slide-out';
    document.querySelector('.scene2').addEventListener('animationend', function () {
        document.querySelector('.scene3').style.animationDuration = '0.7s';
        document.querySelector('.scene3').style.display = 'block';
        document.querySelector('.scene3').style.animationName = 'slide-in';

    })



})
document.querySelector('.kvk-button').addEventListener('click', function () {
    document.querySelectorAll('form > label').forEach(function (label) {
        label.innerHTML = wordsKVK[label.id];
    })
    document.querySelector('.scene2').style.animationName = 'slide-out';
    document.querySelector('.scene2').addEventListener('animationend', function () {
        document.querySelector('.scene3').style.display = 'block';
        document.querySelector('.scene3').style.animationName = 'slide-in';

    })



})

document.querySelector('.hk-button').addEventListener('click', function () {
    document.querySelectorAll('form > label').forEach(function (label) {
        label.innerHTML = wordsHK[label.id];
    })
    document.querySelector('.scene2').style.animationName = 'slide-out';
    document.querySelector('.scene2').addEventListener('animationend', function () {
        document.querySelector('.scene3').style.display = 'block';
        document.querySelector('.scene3').style.animationName = 'slide-in';

    })

}
)

document.querySelector('.start-button').addEventListener('click', function () {
    document.querySelector('.scene1').style.animationName = 'slide-out';
    //after animation
    document.querySelector('.scene1').addEventListener('animationend', function () {
        document.querySelector('.scene2').style.animationDuration = '0.7s';
        document.querySelector('.scene2').style.animationName = 'slide-in';
        document.querySelector('.scene2').style.display = 'block';
    })

}
)

document.querySelector('.reset-button').addEventListener('click', function () {
    document.querySelector('.scene4').style.animationName = 'slide-out';
    document.querySelector('.scene4').addEventListener('animationend', function () {
    window.location.reload();
    }
    )
//     document.querySelectorAll('form > label').forEach(function (label) {
//         label.innerHTML = wordsKVK[label.id];
//     })
//     document.querySelector('.scene4').style.animationName = 'slide-out';
//     document.querySelector('.scene4').addEventListener('animationend', function () {
//         document.querySelector('.scene1').style.animationName = 'slide-in';
//         document.querySelector('.scene1').style.animationDuration = '0.7s';
//         document.querySelector('.scene1').style.display = 'block';
//     })
// //move all labels out of the dropzones and into the startzone
//     document.querySelectorAll('.left-words label').forEach(function (label) {
//         document.querySelector('.start').appendChild(label);
//     })
//     document.querySelectorAll('.right-words label').forEach(function (label) {
//         document.querySelector('.start').appendChild(label);
//     })
//     placedwords = 0;
//     document.querySelector('.info').style.animationName = '';
//     counter = 0;
//     rotateBar()

}
)