// rhymeFinder.js
// Helper function (assuming alikeReplacer is similar for all rhyme functions)
function alikeReplacer(word) {
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
    úg: "ú"
  };
  for (var i of Object.keys(alike)) {
    if (word.includes(i)) {
      word = word.replace(i, alike[i]);
    }
  }
  return word;
}

// Main rhyme finding functions
function findExactRhymes(word, words) {
  var rhymes = [];
  for (var i of words) {
    if (i.slice(i.length - word.length) == word) {
      rhymes.push(i);
    }
  }
  return rhymes;
}

function findStartRhymes(rhyme, perfect, words) {
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
}

function findInnerRhymes(word, perfect, words) {
  var original = word;
  var rhymes = [];
  if (!perfect) {
    word = alikeReplacer(word);
  }
  for (var i of words) {
    var oldWord = i;
    if (!perfect) {
      i = alikeReplacer(i);
    }
    if (i.slice(1).includes(word.slice(1)) || i.slice(0).includes(word.slice(0))) {
      if (oldWord != original) {
        rhymes.push(oldWord);
      }
    }
  }
  return rhymes;
}

function findEndRhymes(word, perfect, oldindex, words) {
  var originalWord = word;
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
  }
  // The original function likely contains additional logic related to the `oldindex` and `different` array which should be here.
  // ...
  return rhymes;
}

function findImperfectRhymes(rhyme, words) {
  var rhymes = [];
  rhyme = alikeReplacer(rhyme);
  for (var word of words) {
    var realWord = word;
    word = alikeReplacer(word);
    var end = 1;
    for (var i = 0; i < word.length - end; i++) {
      if (word[word.length - end] == "_") {
        end += 1;
      }
      for (var j = 0; j < rhyme.length - end; j++) {
        if (rhyme.slice(j) == word.slice(i) && !rhymes.includes(word)) {
          rhymes.push(realWord);
        }
      }
    }
  }
  return rhymes;
}

// Exporting the functions to be used in other modules
export {
  alikeReplacer,
  findExactRhymes,
  findStartRhymes,
  findInnerRhymes,
  findEndRhymes,
  findImperfectRhymes
};
