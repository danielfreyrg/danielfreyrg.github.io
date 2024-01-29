let counter = 0;
var realRotation = 0;
var placedwords = 0;
// JavaScript objects to hold the weights for checkboxes
const maleWordWeights = {
    "kk-yngri": 1,
    "kk-ekki-med-fulla-medvitund": 1,
    "kk-feiminn": 1,
    "kk-ad-vinna-ur-afalli": 1,
    "kk-ooruggur": 1,
    "kk-i-ojafnvaegi": 1,
    "kk-hraeddur": 1,
    "kk-frosinn": 1,
    "kk-ekki-i-godu-astandi": 1,
    "kk-oreyndur": 1,
    "kk-likamlega-sterkur": 2,
    "kk-fraegur": 2,
    "kk-frekur": 2,
    "kk-vinsaell": 2,
    "kk-sjalfsoruggur": 2,
    "kk-aestur": 2,
    "kk-eldri": 2,
    "kk-med-meiri-reynslu": 2,
    "kk-efnadur": 2,
    "kk-godur-i-kjaftinum": 2
};

const femaleWordWeights = {
    "kvk-yngri": -1,
    "kvk-ekki-med-fulla-medvitund": -1,
    "kvk-feimin": -1,
    "kvk-ad-vinna-ur-afalli": -1,
    "kvk-oorugg": -1,
    "kvk-i-ojafnvaegi": -1,
    "kvk-hraedd": -1,
    "kvk-frosin": -1,
    "kvk-ekki-i-godu-astandi": -1,
    "kvk-oreynd": -1,
    "kvk-likamlega-sterk": -2,
    "kvk-fraeg": -2,
    "kvk-frek": -2,
    "kvk-vinsael": -2,
    "kvk-sjalfsorugg": -2,
    "kvk-aest": -2,
    "kvk-eldri": -2,
    "kvk-med-meiri-reynslu": -2,
    "kvk-efnud": -2,
    "kvk-god-i-kjaftinum": -2
};
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
    document.querySelector('.kk-words').innerHTML += `<div class="word" id="word-${checkbox.id}" style="animation-name: slide-down;">${label}</div>`;
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
        document.querySelector('.kvk-words').innerHTML += `<div class="word" id="word-${checkbox.id}" style="animation-name: slide-down;">${label}</div>`;
        placedwords
        document.querySelectorAll('.word').forEach(function(word) {
            word.addEventListener('animationend', function() {
                word.style.animationName = 'none';
            });
        }
        )
    }
}
// if (placedwords > 8) {
//     document.querySelector('.words').style.justifyContent = 'space-evenly'

// } else {
//     document.querySelector('.words').style.justifyContent = ''
// }
}

// Function to update the counter
function updateCounter(checkbox, isFormKk) {
    const isChecked = checkbox.checked;
    const checkboxId = checkbox.id;
    updateDom(checkbox, isFormKk);

    // Use checkboxId to access the weight
    const weight = isFormKk ? maleWordWeights[checkboxId] : femaleWordWeights[checkboxId];
    console.log("Weight:", weight);

    if (isChecked) {
        counter += weight;
    } else {
        counter -= weight;
    }

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
