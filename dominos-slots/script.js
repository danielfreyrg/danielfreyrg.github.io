var hasSpun = false;
var prizes = ['red', 'blue', 'green', 'purple', 'black', 'orange'];
var roll = [];
var positionY;

function updateResults() {
    document.querySelector('.first').innerHTML = roll[0];
    document.querySelector('.second').innerHTML = roll[1];
    document.querySelector('.third').innerHTML = roll[2];
}

function jackpot() {
  //if all three slots are the same color, jackpot
  alert('JACKPOT!');
  return
}
function spin() {
    var columns = document.querySelectorAll('.slot-col');
    roll = [];
    columns.forEach(function(column, index) {
        var random = Math.floor(Math.random() * 6);
        //move the wheel by 33% * a random number (0-5) to choose the right position for the slot then add 2000 to simulate a full casino spin
        //100% background position y moves the slots up 3 places
        positionY = (random * (100 / 3)) + 2000 + '%';
        roll.push(prizes[random]);

        column.style.transition = 'background-position-y ' + (random + index + 1) + 's cubic-bezier(1,-0.08,0,1.04)';
        column.style.backgroundPositionY = positionY;

        // Update results after the last column finishes spinning
        if (index === columns.length - 1) {
            setTimeout(updateResults, (random + index + 1) * 1000);
        }
        if (roll[0] === roll[1] && roll[1] === roll[2]) {
          jackpot();
        }
    });
}

document.getElementById('spin').addEventListener('click', function() {
    if (hasSpun) {
        document.querySelectorAll('.slot-col').forEach(function(column, index, array) {
            column.style.transition = 'none'; // Disable transition for immediate reset
            column.style.backgroundPositionY = '0'; // Reset position
            document.querySelector('.first').innerHTML = '';
            document.querySelector('.second').innerHTML = '';
            document.querySelector('.third').innerHTML = '';

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
