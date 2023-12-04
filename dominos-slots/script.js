var hasSpun = false
var prizes = ['red', 'blue', 'green', 'purple', 'black','orange']
var random
var roll = []
var nums = []
var positionY
function spin() {
  var i = 0
  document.querySelectorAll('.slot-col').forEach(function(column) {
    i++
random = Math.floor(Math.random()*6) 
nums.push(random)
column.style.transition = 'background-position-y ' +  (random + i) + 's ease-in-out'
    positionY = (random * (100/3)) + 2000 + '%'
  roll.push(prizes[random])

column.style.backgroundPositionY = positionY
console.log('roll: ',roll)
console.log('prizes: ',prizes)
console.log('nums: ',nums)
console.log('i: ',i)

})
}
document.getElementById('spin').addEventListener('click', function() {
  roll = [];
  nums = [];
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

