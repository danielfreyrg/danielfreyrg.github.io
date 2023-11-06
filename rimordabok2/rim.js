function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var words = httpGet(
  "https://raw.githubusercontent.com/danielfreyrg/danielfreyrg.github.io/main/rimordabok2/allwords.txt"
);
words = words.split(", ");
var updateRhymes = function () {
  document.getElementById("result").innerHTML = "";

  if (document.getElementById("rhymeWord").value.length > 0) {
    document.getElementById("loader").classList.add("loader");
  } else {
    return;
  }

  var rhymeCount = 0;
  document.getElementById("footer").style.position = "static";
  var rhyme = document.getElementById("rhymeWord").value;
  var perfect = document.getElementById("perfectRhyme").checked;
  var endRhyme = document.getElementById("endRhymes").checked;
  var innerRhyme = document.getElementById("innerRhymes").checked;
  var startRhyme = document.getElementById("startRhymes").checked;
  var maxVowels = parseInt(document.getElementById("maxVowels").value);
  if (rhyme.length > 0) {
    rhyme = rhyme.toLowerCase();
    if (endRhyme) {
      var allRhymes = findEndRhymes(rhyme, perfect);
    } else if (innerRhyme) {
      var allRhymes = findInnerRhymes(rhyme, perfect);
    } else if (startRhyme) {
      var allRhymes = findStartRhymes(rhyme, perfect);
    } else {
      var allRhymes = findAllRhymes(rhyme, perfect);
    }
    var categories = printRhymeCategories(allRhymes);
    document.getElementById("loader").classList = "";

    var added = 0;
    for (var key in categories) {
      if (categories[key].length > 0 && key <= maxVowels) {
        rhymeCount += categories[key].length;
        added++;
        var inner = '<div class="rhyme-item">';
        inner += "<h3>" + key + " atkvæði: </h3>" + "\n";
        inner +=
          '<p class="rhymes">' +
          categories[key].join(", ") +
          "</p>\n" +
          '<p class="amount">fjöldi: ' +
          categories[key].length +
          "</p>";
        inner += "</div>";
        document.getElementById("result").innerHTML += inner;
      }
    }
    if (added < 1) {
      document.getElementById("footer").style.position = "fixed";
      var error = '<h2> því miður fundust engin rímorð fyrir "' + rhyme + '" ';

      if (maxVowels != 10) {
        error += "með færri en " + maxVowels + " atkvæði </h2>";
      } else {
        error += "</h2>";
      }
      result.innerHTML += error;
    } else if (rhymeCount < 10) {
      document.getElementById("footer").style.position = "fixed";
    }
  } else {
    document.getElementById("footer").style.position = "fixed";
  }
  console.log(rhymeCount);
  document.getElementById("syllableCount").innerHTML =
    '<h2> "' +
    rhyme +
    '" er ' +
    findSyllables(rhyme) +
    " atkvæði og rímar við " +
    rhymeCount +
    " orð </h2>";
  document.querySelector(".debug").innerHTML = alikeReplacer(
    document.getElementById("rhymeWord").value
  );
};

findSyllables = function (word) {
  dict = {};
  var counter = 0;
  var vowels = [
    "a",
    "e",
    "i",
    "o",
    "u",
    "á",
    "í",
    "ó",
    "ú",
    "ö",
    "æ",
    "é",
    "y",
    "ý",
  ];
  var doubles = ["ey", "au", "ei", "aí"];
  for (double of doubles) {
    if (word.includes(double)) {
      counter += 1;
    }
  }
  for (var i = 0; i < word.length; i++) {
    nextletter = "";
    lastletter = "";
    letter = word[i];
    if (i < word.length - 1) {
      nextletter = word[i + 1];
    }
    if (i > 0) {
      lastletter = word[i - 1];
    }
    if (vowels.includes(letter)) {
      if (
        !doubles.includes(letter + nextletter) &&
        !doubles.includes(lastletter + letter)
      ) {
        counter += 1;
      }
    }
  }
  return counter;
};

printRhymeCategories = function (wordList, maxVowels) {
  dict = {};
  var counter = 0;
  var vowels = [
    "a",
    "e",
    "i",
    "o",
    "u",
    "á",
    "í",
    "ó",
    "ú",
    "ö",
    "æ",
    "é",
    "y",
    "ý",
  ];
  var doubles = ["ey", "au", "ei", "aí"];
  for (word of wordList) {
    for (double of doubles) {
      if (word.includes(double)) {
        counter += 1;
      }
    }
    for (var i = 0; i < word.length; i++) {
      nextletter = "";
      lastletter = "";
      letter = word[i];
      if (i < word.length - 1) {
        nextletter = word[i + 1];
      }
      if (word.length > 0) {
        lastletter = word[i - 1];
      }
      if (vowels.includes(letter)) {
        !doubles.includes(letter + nextletter);
        if (
          !doubles.includes(letter + nextletter) &&
          !doubles.includes(lastletter + letter)
        ) {
          counter += 1;
        }
      }
    }
    try {
      dict[counter].push(word);
    } catch (error) {
      dict[counter] = [word];
    }
    counter = 0;
  }

  for (var i = 1; i < maxVowels + 1; i++) {
    if (dict[i].length > 0) {
      var string = dict[i].join(", ");
      console.log(i + " atkvæði: " + string);
      console.log("\n fjöldi: " + dict[i].length);
      console.log(
        "------------------------------------------------------------------------------------------------------------------------------------------------------------"
      );
    }
  }
  return dict;
};
alikeReplacer = function (word) {
  var alike = {
    ígja: "ía",
    agi: "æi",
    æg: "æ",
    æj: "æ",
    aí: "æ",
    ív: "íf",
    ýv: "íf",
    y: "i",
    gg: "__",
    íja: "ía",
    ingja: "ía",
    ægja: "æja",
    íe: "é",
    ý: "í",
    eij: "ei",
    eyj: "ei",
    ey: "ei",
    eigj: "ei",
    eygj: "ei",
    egj: "ei",
    ægj: "æ",
    mn: "nn",
    mm: "nn",
    erl: "ell",
    ugl: "ull",
    k: "_",
    t: "_",
    d: "_",
    p: "_",
    b: "_",
    rl: "ll",
    æ: "æj",
    agl: "all",
  };
  for (var i of Object.keys(alike)) {
    if (word.includes(i)) {
      word = word.replace(i, alike[i]);
    }
  }
  return word;
};
findSyllableRhymes = function (word, perfect) {
  var vowels = [
    "a",
    "e",
    "i",
    "o",
    "u",
    "á",
    "í",
    "ó",
    "ú",
    "ö",
    "æ",
    "é",
    "y",
    "ý",
  ];
  if (!perfect) {
    word = alikeReplacer(word);
  }
};
findStartRhymes = function (rhyme, perfect) {
  var original = rhyme;
  var rhymes = [];
  if (!perfect) {
    rhyme = alikeReplacer(rhyme);
  }
  for (var word of words) {
    var oldWord = word;
    if (!perfect) {
      word = alikeReplacer(word);
    }
    if (word.slice(0, rhyme.length).includes(rhyme)) {
      if (oldWord != original) {
        rhymes.push(oldWord);
      }
    }
  }
  return rhymes;
};
findAllRhymes = function (word, perfect) {
  var all = [];
  var end = findEndRhymes(word, perfect);
  var inner = findInnerRhymes(word, perfect);
  var start = findStartRhymes(word, perfect);
  for (var i of end) {
    if (!all.includes(i)) {
      all.push(i);
    }
  }
  for (var i of inner) {
    if (!all.includes(i)) {
      all.push(i);
    }
  }
  for (var i of start) {
    if (!all.includes(i)) {
      all.push(i);
    }
  }
  return all;
};
findImperfectRhymes = function (rhyme) {
  var rhymes = [];
  var rhyme = alikeReplacer(rhyme);
  for (word of words) {
    var realWord = word;
    word = alikeReplacer(word);
    var end = 1;

    for (var i = 0; i < word.length - end; i++) {
      if (word[word.length - end] == "_") {
        end += 1;
      }
      for (var j = 0; j < rhyme.length - end; j++) {
        if (rhyme.slice(j) == word.slice(i) && !rhymes.includes(realWord)) {
          rhymes.push(realWord);
        }
      }
    }
  }
  return rhymes;
};
findInnerRhymes = function (word, perfect) {
  var original = word;
  var rhymes = [];
  if (!perfect) {
    word = alikeReplacer(word);
  }
  for (var i of words) {
    oldWord = i;
    if (!perfect) {
      i = alikeReplacer(i);
    }
    if (
      i.slice(1).includes(word.slice(1) || i.slice(0).includes(word.slice(0)))
    ) {
      if (oldWord != original) {
        rhymes.push(oldWord);
      }
    }
  }
  return rhymes;
};
findEndRhymes = function (word, perfect, oldindex = -3) {
  originalWord = word;
  var rhymes = [];
  var different = ["nn", "ll", "ei", "ey", "au", "ss"];
  if (!perfect) {
    word = alikeReplacer(word);
    if (word.length <= 2) {
      oldindex = -1;
    } else if (word.length < 4) {
      oldindex = -2;
    }
    var secondlast = word[word.length - 2];
    var veryRhymey = ["é", "o", "ó", "í", "æ"];
    if (veryRhymey.includes(secondlast)) {
      oldindex = -2;
    }
    if (word[word.length - 1] == "ö") {
      oldindex = -1;
    }
    if (
      word.slice(oldindex).includes("nn") &&
      word[word.length + oldindex] == "n"
    ) {
      oldindex -= 1;
    }
  } else {
    oldindex = -word.length + 1;
  }
  if (word.length == 2) {
    oldindex = -2;
  } else if (word.length == 1) {
    oldindex = -1;
  }
  var j = word[word.length + oldindex];
  while (word[word.length + oldindex] == "_") {
    oldindex -= 1;
  }
  if (word.length == 4) {
    oldindex = -3;
  }
  for (var i of words) {
    index = oldindex;
    var add = true;
    oldWord = i;
    if (!perfect) {
      i = alikeReplacer(i);
    }
    var a = word.slice(word.length + oldindex);
    if (i.length < word.length) {
      var test = word.length - i.length;
    }
    var b = i.slice(i.length + oldindex);
    var lastLetterInRange = i[i.length + oldindex];
    var secondLastInRange = i[i.length + oldindex - 1];
    if (
      (lastLetterInRange == "i" &&
        secondLastInRange == "e" &&
        !word.slice(oldindex - 1).includes("ei")) ||
      (lastLetterInRange == "u" &&
        secondLastInRange == "a" &&
        !word.slice(oldindex - 1).includes("au"))
    ) {
      //edge case where 'ei' or 'au is just out of the slice for instance "monika" and breika don't rhyme also 'luma' and 'sauma
      continue;
    }
    if (
      (word.slice(index) == i.slice(index) &&
        word[word.length - 1] == i[i.length - 1] &&
        originalWord != oldWord) ||
      (word[word.length - 1] == "í" && i[i.length - 1] == "í") ||
      (word[word.length - 1] == "æ" && i[i.length - 1] == "æ")
    ) {
      if (originalWord != oldWord) {
        for (double of different) {
          var z = originalWord.slice(index);
          if (originalWord.slice(index - 1).includes(double)) {
            if (oldWord.includes(double) && !rhymes.includes(oldWord)) {
              add = true;
            } else {
              add = false;
            }
          }
        }
      }
    } else {
      add = false;
    }
    if (add) {
      rhymes.push(oldWord);
    }
  }

  return rhymes;
};
findExactRhymes = function (word) {
  var rhymes = [];
  for (var i of words) {
    if (i.slice(i.length - word.length) == word) {
      rhymes.push(i);
    }
  }
  return rhymes;
};

document
  .getElementById("rhymeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    updateRhymes();
  });
document.querySelectorAll('input[type="radio"]').forEach((element) => {
  element.addEventListener("change", function (event) {
    event.preventDefault();
    event.stopPropagation();
    updateRhymes();
  });
});
document
  .getElementById("perfectRhyme")
  .addEventListener("change", function (event) {
    event.preventDefault();
    event.stopPropagation();
    updateRhymes();
  });

function updatePage(array) {}
