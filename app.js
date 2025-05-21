let fruits = [
  "apple", "banana", "cherry", "date", "elderberry",
  "fig", "grape", "honeydew", "kiwi", "lemon",
  "mango", "nectarine", "orange", "papaya", "peach",
  "pear", "pineapple", "plum", "pomegranate", "quince",
  "raspberry", "starfruit", "strawberry", "tangerine", "ugli",
  "watermelon", "blueberry", "apricot", "blackberry", "cantaloupe"
];
let container = document.getElementById('container')
let content = document.getElementById('content')
let popup = document.getElementById('popup')
let nextBtn = document.getElementById('next');
let skipBtn = document.getElementById('skip');
let scorePopup = document.getElementById('score')
let currentWord = ''
let counter = 0;
let attempts = 0;

function randomWord() {
    let randomIndex = Math.floor(Math.random() * fruits.length);
    let words = fruits[randomIndex].split('')
    currentWord = words.slice()
    console.log(currentWord);
    renderBtn(words)

}

function renderBtn(words) {
    for (let i = words.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * words.length)
        let temp = words[i]
        words[i] = words[j]
        words[j] = temp
    }
    console.log(words);

    container.innerHTML = ''

    words.forEach(letter => {
        let btn = document.createElement("button")
        btn.innerHTML = letter
        btn.id = letter
        container.appendChild(btn)


        btn.addEventListener("click", function () {
            content.innerText += btn.innerText + " "
            btn.remove()

            if (container.children.length === 0) {
                rightAns()
                nextBtn.disabled = false;
                skipBtn.disabled = false;
            }
        })
    });


}

function rightAns() {
    let originalWord = currentWord.join('')
    let userWord = content.innerText

    ++attempts


    if (userWord === originalWord) {
        popup.style.display = "block";
        popup.innerHTML = `
        <h1>✅ Correct!</h1>
        <p>You unscrambled it perfectly.</p>`
        ++counter
    } else {
        popup.style.display = "block";
        popup.innerHTML = `
        <h1>❌ Oops!</h1>
        <p>The correct word was: <strong>${originalWord}</strong></p>
        `
    }
}
function next() {
    randomWord();
    popup.innerText = ""
    content.innerText = ''
    popup.style.display = "none";


    score()

}
function skip() {
    rightAns()
    nextBtn.disabled = false;
    skipBtn.disabled = false;

    const buttons = container.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    score()

}
function score() {
    if (attempts === 10) {
        scorePopup.style.display = "block";
        scorePopup.innerHTML = `
        <h1>Game Finished</h1>
        <p>Your Total Is: <strong>${counter}/10</strong></p>
        <button onclick="ok()">OK</button>
        `
        nextBtn.disabled = true;
        skipBtn.disabled = true;
    }
}
function ok() {
    scorePopup.innerHTML = ''
    counter = 0
    attempts = 0
    nextBtn.disabled = false;
    skipBtn.disabled = false;
    popup.style.display = "none";
    scorePopup.style.display = "none";
    randomWord();
}
randomWord();
