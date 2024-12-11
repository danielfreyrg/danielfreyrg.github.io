document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");

const answers = ['Hættu þessu væli', 'Það er öllum drullu sama', "Skíttu ekki í þig", "þarf ég að hringja í vælubílinn?", "æjæj, elsku rúsínan mín þú hefur það svo erfitt", "er ekki kominn tími til að líta aðeins í eigin barm einu sinni?", "Á ég að prenta þetta á blað fyrir þig ?", "Þetta var nú ekki fallega sagt, Anna Sigríður mun fá að heyra þetta", "Farðu úr bænum", "heyrðu þú hefur bara rétt fyrir þér", "Djöfulsins læti eru þetta, þarftu ekkert að vinna eða?", "Nei nú hringi ég í jens.", "Væl og tuðningsmálaráðherra var að  hringja og hún kannaðist ekkert við þig", "Kyssirðu mömmu þína með þessum munni? Ég meina fingrum.", "Hættu að grenja!", "Farðekkjaðgrenja!", "Þegiðu kjafti!", "Kyssirðu mömmu þína með þessum munni? Ég meina fingrum.", "Mammaðín.", "Nei, þú!", "Gæti verið að þú sért vandamálið?", "Parklife!", "Endilega sendu þetta tuð á öllumerdrull@drullimcdrulldrull.þegiðu og við svörum þér innan 10.000 virkra daga.", "Ég er að hlusta og skil hvað þú ert að meina. Mér er bara alveg skítfokkingsama.", "Fer skjátíminn þinn ekki að verða búinn í dag?", "Það mætti ef til vill bjóða yður að bragða óhreinindi?"]
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const answer = answers[Math.floor(Math.random() * answers.length)];
    const result = document.querySelector("#answer");
    result.textContent = 'Tuðmundur segir: ' + answer;
});
});