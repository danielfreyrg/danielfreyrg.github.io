var hasSpun = false;
var prizes = ['red', 'blue', 'green', 'purple', 'black', 'orange'];
var roll = [];
var nums = [];
var positionY;

function updateResults() {
    var resultsElement = document.querySelector('.results');
    document.querySelector('.first').innerHTML = roll[0];
    document.querySelector('.second').innerHTML = roll[1];
    document.querySelector('.third').innerHTML = roll[2];
}

function spin() {
    var columns = document.querySelectorAll('.slot-col');
    roll = [];
    nums = [];
    columns.forEach(function(column, index) {
        var random = Math.floor(Math.random() * 6);
        nums.push(random);
        positionY = (random * (100 / 3)) + 2000 + '%';
        roll.push(prizes[random]);

        column.style.transition = 'background-position-y ' + (random + index + 1) + 's ease-in-out';
        column.style.backgroundPositionY = positionY;

        // Update results after the last column finishes spinning
        if (index === columns.length - 1) {
            setTimeout(updateResults, (random + index + 1) * 1000);
        }
    });
}

document.getElementById('spin').addEventListener('click', function() {
    if (hasSpun) {
        document.querySelectorAll('.slot-col').forEach(function(column, index, array) {
            column.style.transition = 'none'; // Disable transition for immediate reset
            column.style.backgroundPositionY = '0'; // Reset position

            // If it's the last column, start spinning after a short delay
            if (index === array.length - 1) {
                setTimeout(spin, 100); // Delay to allow the reset to render
            }
        });
    } else {
        spin(); // First spin without resetting
        hasSpun = true;
    }
});
