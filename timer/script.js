let startTime;
let endTime;
let timerInterval;
let reactionStarted = false;

document.getElementById('startButton').addEventListener('click', function() {
    if (reactionStarted) {
        endTime = new Date();
        clearInterval(timerInterval);
        const reactionTime = (endTime - startTime) / 1000;
        document.getElementById('timeDisplay').textContent = `Reaction time: ${reactionTime.toFixed(3)} seconds`;
        this.disabled = true; // Disable the button after stopping the timer
    }
});

function startReactionTest() {
    document.body.style.backgroundColor = 'red';
    startTime = new Date();
    reactionStarted = true;
    document.getElementById('startButton').disabled = false; // Enable the Go button

    updateTimerDisplay(); // Start updating the timer immediately
    timerInterval = setInterval(updateTimerDisplay, 16); // Continue updating every 16 ms
}

function updateTimerDisplay() {
    if (reactionStarted) {
        const now = new Date();
        const elapsed = now - startTime;
        document.getElementById('timeDisplay').textContent = `Time: ${(elapsed / 1000).toFixed(3)} seconds`;
    }
}

// Random delay between 1 and 2 seconds
const randomDelay = Math.random() * 1000 + 1000; // 1000 to 2000 ms
setTimeout(startReactionTest, randomDelay);
