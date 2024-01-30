let counter = 0;
var realRotation = 0;
var placedwords = 0;
var dropzone
var startzone
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
            const id = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            zone.appendChild(draggableElement);
            draggableElement.style.animationName = 'slide-down';
            draggableElement.addEventListener('animationend', function() {
                draggableElement.style.animationName = 'none';
            });
            updateCounter(zone, id); // Update counters or any other logic after drop
        });
    });

    // Function to update counters based on current dropped words
    function updateCounter(dropzone, id ) {
        var weight = wordWeights[id];
        console.log('pre-drop: '+ weight)

        if (dropzone.classList.contains('left-words')) {
            weight = -weight;
        }
        if (startzone.classList.contains('left-words') && dropzone.classList.contains('right-words') || startzone.classList.contains('right-words') && dropzone.classList.contains('left-words')){
        weight = weight*2;
        }
        if (dropzone.classList.contains('start') && !startzone.classList.contains('left-words')) {
            
            weight = -weight;

        } 

        if (startzone == dropzone) {
            weight = 0;
        }
        counter += weight;
        console.log("Counter value:", counter);
        rotateBar()
        console.log('post-drop: '+ weight)
        console.log('------------------')

  
        
    }
});



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
}

