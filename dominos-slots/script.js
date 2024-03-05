var hasSpun = false;
var ids = {
  "pepperoni":1,
  "skinka":2,
  "hakk":3,
  "beikonkurl":4,
  "piparostur":8,
  "rjómaostur":9,
  "ananas":11,
  "jalapeno":13,
  "svartar ólífur":14,
  "græn paprika":16,
  "rauðlaukur":31,
  "fajitas kjúklingur":34,
  "spínat":35,
  "sveppir":36,
  "pulled pork":46,
  "vegan kjúklingur":47,
  "ferskur chili":48,
  "döðlur":49,
}
var slots_left = [ 'Spínat', 'Rjómaostur', 'Græn paprika', 'Pulled pork', 'Pepperoni', 'Sveppir']
var slots_middle = [ "Skinka", "Piparostur", "Svartar ólífur", "Ananas", "hakk", "Vegan kjúklingur"]
var slots_right = [ 'Fajitas kjúklingur', 'Rauðlaukur', 'Beikonkurl', 'Ferskur chili', 'Jalapeno', 'Döðlur']
var slots_left_small = [ 'Spínat', 'Rjóma- <br>ostur', 'Græn <br>paprika', 'Pulled <br>pork', 'Pepperoni', 'Sveppir']
var slots_middle_small = [ "Skinka", "Pipar- <br>ostur", "Svartar ólífur", "Ananas", "hakk", "Vegan <br>kjúlli"]
var slots_right_small = [ 'Fajitas <br>kjúlli', 'Rauð- <br>laukur', 'Beikon <br>kurl', 'Ferskur chili', 'Jalapeno', 'Döðlur']
var roll = [];
var cleanRoll = [];
var positionY;


function updateResults() {
  document.querySelector(".first span").innerHTML = roll[0];
  document.querySelector(".second span").innerHTML = roll[1];
  document.querySelector(".third span").innerHTML = roll[2];
  setTimeout(slide(), 1200);

}
function slide() {
  if (window.innerWidth < 376 && window.innerWidth > 365 && window.innerHeight < 157 && window.innerHeight > 145) {
    document.querySelector('.order-main').style.transform = 'translate(105%, -225%)';
    document.querySelector('.order-main').style.opacity = '1';
  }
}

function jackpot() {
  //if all three slots are the same color, jackpot
  return;
}
function spin() {
  var columns = document.querySelectorAll(".slot-col");
  roll = [];
  columns.forEach(function (column, index) {
    var random = Math.floor(Math.random() * 6);
    //move the wheel by 33% * a random number (0-5) to choose the right position for the slot then add 2000 to simulate a full casino spin (10*200 so it always spins atleast 10 times) 
    //100% background position y moves the slots up 3 places, 200% is a whole spin

    //offset for the first slot due to an error in the image
    positionY = random * (100 / 3) + -2000 - (index == 0 ? 3.5 : 0) + "%";
    // alert('window.outerWidth < 700 && index == 2 ' + (window.outerWidth < 700 && index == 2))


    // roll.push(prizes[random]);
    if (index === 0) {
      if (window.innerWidth < 301 || window.innerHeight < 300) {
        roll.push(slots_left_small[random]);

      } else {
        roll.push(slots_left[random])
      }
      cleanRoll.push(slots_left[random].toLowerCase())
    }
    if (index === 1) {
      if (window.innerWidth < 301 || window.innerHeight < 300) {
        roll.push(slots_middle_small[random]);
      } else {
        roll.push(slots_middle[random])
      }
      cleanRoll.push(slots_middle[random].toLowerCase())
      
    }
    if (index === 2) {
      if (window.innerWidth < 301 || window.innerHeight < 300) {
        roll.push(slots_right_small[random]);
      }
      else {
      roll.push(slots_right[random]);
      }
      cleanRoll.push(slots_right[random].toLowerCase())
    }

    column.style.transition =
      "background-position-y " +
      (random + (index * 2) + 1) +
      "s cubic-bezier(1,-0.08,0,1.04)";
    column.style.backgroundPositionY = positionY;
    column.setAttribute("data-index", random);
    document.querySelectorAll('a').forEach(function (i) {
      i.setAttribute('href', `https://www.dominos.is/panta/tilbod/10?toppings=${ids[cleanRoll[0]]},${ids[cleanRoll[1]]},${ids[cleanRoll[2]]}`)

     
    })
    // Update results after the last column finishes spinning
    if (index === columns.length - 1) {
      setTimeout(updateResults, (random + index + 1) * 1200);
      
    }
    if (roll[0] === roll[1] && roll[1] === roll[2]) {
      setTimeout(jackpot(), (random + index + 1) * 1200);
    }
  });
}

document.querySelectorAll(".spin").forEach( i => {
  i.addEventListener("click", function () {
  if (hasSpun) {
    cleanRoll = [];
    document
      .querySelectorAll(".slot-col")
      .forEach(function (column, index, array) {
        column.style.transition = "none"; // Disable transition for immediate reset
        column.style.backgroundPositionY = "0"; // Reset position
        //reset the results 
        document.querySelector(".first").innerHTML = "<span></span>";
        document.querySelector(".second").innerHTML = "<span></span>";
        document.querySelector(".third").innerHTML = "<span></span>";

        // If it's the last column, start spinning after a short delay
        if (index === array.length - 1) {
          setTimeout(spin, 100); // Delay to allow the reset to render
        }
      });
  } else {
    spin(); // First spin without resetting
    hasSpun = true;
  }
})
})














// var rotnum = 0;
// function test() {
//   rotnum++
//   console.log("rotnum: " + rotnum + "\nslots left: " + slots_left[rotnum%6] + "\n slots middle: " + slots_middle[rotnum%6] + "\n slots right: " + slots_right[rotnum%6])
//   document.querySelectorAll(".slot-col").forEach(function (column, index) {
    
//     rotation = rotnum * (100 / 3);
    
// column.style.backgroundPositionY = rotation + "%";
//   }
  
//   )
// }