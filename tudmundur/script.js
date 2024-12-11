document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const answers = ['Hættu þessu væli', 'Það er öllum drullu sama', "Skíttu ekki í þig", "þarf ég að hringja í vælubílinn?", "æjæj, elsku rúsínan mín þú hefur það svo erfitt", "er ekki kominn tími til að líta aðeins í eigin barm einu sinni?", "Á ég að prenta þetta á blað fyrir þig ?", "Þetta var nú ekki fallega sagt, Anna Sigríður mun fá að heyra þetta", "Farðu úr bænum", "heyrðu þú hefur bara rétt fyrir þér"]
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const answer = answers[Math.floor(Math.random() * answers.length)];
    const result = document.querySelector("#answer");
    result.textContent = 'Tuðmundur segir: ' + answer;
});
});