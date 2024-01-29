let counter = 0;
var realRotation = 0;

// Function to update the counter
function updateCounter(isChecked, isFormKk) {
    // Increment or decrement the counter by 2 based on the checkbox state and form
    if (isChecked && isFormKk) {
        counter += 2;
    } else if (isChecked && !isFormKk) {
        counter -= 2;
    } else if (!isChecked && isFormKk) {
        counter -= 2;
    } else if (!isChecked && !isFormKk) {
        counter += 2;
    }
    if (counter > 10) {
        realRotation = 10;
    } else if (counter < -10) {
        realRotation = -10;
    }
    else {
        realRotation = counter;
    }
    document.querySelector('.top').style.transform = `rotate(${realRotation}deg)`; 
    // Log the current counter value for demonstration
    console.log("Counter value:", counter);
}

// Add event listeners to checkboxes in the 'kk' form
document.querySelectorAll('#kk input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateCounter(this.checked, true);
    });
});

// Add event listeners to checkboxes in the 'kvk' form
document.querySelectorAll('#kvk input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateCounter(this.checked, false);
    });
});