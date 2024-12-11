document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const answers = ['Hættu þessu væli', 'Það er öllum drullu sama', "Skíttu ekki í þig", "þarf ég að hringja í vælubílinn?"]
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const answer = answers[Math.floor(Math.random() * answers.length)];
    const result = document.querySelector("#answer");
    result.textContent = 'Tuðmundur segir: ' + answer;
});
});