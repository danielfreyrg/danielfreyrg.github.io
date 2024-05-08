document.querySelectorAll('.dial').forEach(dial => {
  let startY;
  let moving = false;

  dial.addEventListener('mousedown', function(e) {
    startY = e.clientY;
    moving = true;
    e.preventDefault(); // Prevent text selection
  });

  document.addEventListener('mouseup', () => {
    moving = false;
  });

  document.addEventListener('mousemove', function(e) {
    if (moving) {
      const dy = e.clientY - startY;
      if (Math.abs(dy) > 30) { // Same threshold, adjust if needed
        cycleNumbers(dial, dy);
        startY = e.clientY;
      }
    }
  });

  function cycleNumbers(dial, dy) {
    const numbers = dial.querySelectorAll('.number');
    if (dy > 0) { // Dragging down
      dial.appendChild(numbers[0]); // Move the first to the last
    } else { // Dragging up
      dial.insertBefore(numbers[numbers.length - 1], numbers[0]); // Move the last to the first
    }
  }
});

document.getElementById('checkCombo').addEventListener('click', () => {
  const digits = Array.from(document.querySelectorAll('.dial'), dial => dial.children[2].textContent).join('');
  alert('Current Combination: ' + digits);
});
