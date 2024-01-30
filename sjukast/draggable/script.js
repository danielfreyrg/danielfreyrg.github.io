let counter = 0;
var realRotation = 0;
var placedwords = 0;
var dropzone
var leftwords = []
var rightwords = []
// JavaScript objects to hold the weights for checkboxes
const wordWeights = {
    "yngri": 1,
    "ekki-med-fulla-medvitund": 1,
    "feiminn": 1,
    "ad-vinna-ur-afalli": 1,
    "ooruggur": 1,
    "i-ojafnvaegi": 1,
    "hraeddur": 1,
    "frosinn": 1,
    "ekki-i-godu-astandi": 1,
    "oreyndur": 1,
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
document.addEventListener('DOMContentLoaded', function() {
    // Make words draggable
    const words = document.querySelectorAll('label');
    words.forEach(word => {
        word.setAttribute('draggable', true);
        word.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });

    // Setup drop zones
    const dropZones = document.querySelectorAll('.right-words, .left-words');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow dropping by preventing default
        });

        zone.addEventListener('drop', (event) => {
            event.preventDefault();
            const id = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            zone.appendChild(draggableElement);
            updateCounter(zone, id); // Update counters or any other logic after drop
        });
    });

    // Function to update counters based on current dropped words
    function updateCounter(zone, id ) {
        var weight = wordWeights[id];
        if (zone.classList.contains('right-words')) {
            counter += weight;
        } else {
            counter -= weight;
        }
        console.log("Counter value:", counter);
        rotateBar()

  
        
    }
});

function updateDom(checkbox, isFormKk) {
 var label = document.querySelector('label[for="' + checkbox.id + '"]').textContent;
 var exists = document.getElementById("word-" + checkbox.id);
     if (isFormKk) {
        if (exists) {
            exists.style.animationName = 'fade-out-right';
            exists.addEventListener('animationend', function() {
            exists.remove();
            placedwords -= 1;
            });
        }
        else {
        placedwords += 1;
    document.querySelector('.right-words').innerHTML += `<div class="word" id="word-${checkbox.id}" style="animation-name: slide-down;">${label}</div>`;
    document.querySelectorAll('.word').forEach(function(word) {
        word.addEventListener('animationend', function() {
            word.style.animationName = 'none';
        });
    }
    )
        }
    }
    else {
        if (exists) {
            exists.style.animationName = 'fade-out-left';
            exists.addEventListener('animationend', function() {
            exists.remove();
            });
            placedwords -= 1;
        }
        else {
        document.querySelector('.left-words').innerHTML += `<div class="word" id="word-${checkbox.id}" style="animation-name: slide-down;">${label}</div>`;
        placedwords
        document.querySelectorAll('.word').forEach(function(word) {
            word.addEventListener('animationend', function() {
                word.style.animationName = 'none';
            });
        }
        )
    }
}
}

// Function to update the counter
function rotateBar() {

    if (counter > 10) {
        realRotation = 10;
    } else if (counter < -10) {
        realRotation = -10;
    } else {
        realRotation = counter;
    }

    document.querySelector('.top').style.transform = `rotate(${realRotation}deg)`;
    document.querySelector('.words').style.transform = `rotate(${realRotation}deg)`;
    // Log the current counter value for demonstration
    console.log("Counter value:", counter);
}

// Add event listeners to checkboxes in the 'kk' form
document.querySelectorAll('#kk input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateCounter(this, true); // Pass `this` (the checkbox) directly
    });
});

// Add event listeners to checkboxes in the 'kvk' form
document.querySelectorAll('#kvk input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateCounter(this, false); // Pass `this` (the checkbox) directly
    });
});
