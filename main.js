const header = document.querySelector('header');
const main = document.querySelector('main');

let userScore = 0;
let computerScore = 0;

const challengeDisplay = document.querySelector('[data-challenge]');
const userScoreDisplay = document.querySelector('[data-score="user"]');
const computerScoreDisplay = document.querySelector('[data-score="computer"]');
const choiceBtns = document.querySelectorAll('[data-choice]');
const result = document.querySelector('[data-result]');
const reset = document.querySelector('[data-reset]');

const values = ['rock', 'paper', 'scissors'];
let outcome = '';

let resizeListener;
window.onresize = () => {
    clearTimeout(resizeListener);
    resizeListener = setTimeout(() => {
        checkViewPort();
    }, 250);
};

function checkViewPort() {
    let headerHeight = header.clientHeight;
    console.log(headerHeight)
    main.style.height = `calc(100% - ${headerHeight}px)`;
}

checkViewPort();

choiceBtns.forEach((btn) => {
    let gameListener;
    const icon = btn.querySelector('i');
    btn.addEventListener('click', () => {
        // clear event if btn has already been clicked
        clearTimeout(gameListener);
        const value = btn.dataset.choice;
        gameListener = setTimeout(() => {
            play(value);
            icon.classList.add(outcome);
            setTimeout(() => {
                icon.classList.remove(outcome);
            }, 500);
        }, 500);
    });
})

reset.addEventListener('click', () => {
    resetGame();
})

function getRandomChoice() {
    return values[Math.floor(Math.random() * values.length)];
}

function play(userInput) {
    const computerInput = getRandomChoice();
    challengeDisplay.innerHTML = `You : ${userInput.toUpperCase()}<br>AI : ${computerInput.toUpperCase()}`;
    getWinner(userInput, computerInput);
}

function getWinner(userInput, computerInput) {
    if (userInput === computerInput) {
        result.innerHTML = "Draw!"
        updateScore('draw');
    } else {
        const firstValueInitial = userInput.charAt(0);
        const secondValueInitial = computerInput.charAt(0);
        switch (firstValueInitial + secondValueInitial) {
            case "sp":
            case "rs":
            case "pr":
                result.innerHTML = `You WIN!`;
                updateScore('user');
                break;
            case "ps":
            case "sr":
            case "rp":
                result.innerHTML = `AI WINS!`;
                updateScore('computer');
                break;
        }
    }
}

function updateScore(winner) {
    if (winner === 'user') {
        outcome = 'win';
        userScore++;
        userScoreDisplay.innerHTML = userScore;
    } else if (winner === 'computer'){
        outcome = 'lose';
        computerScore++;
        computerScoreDisplay.innerHTML = computerScore;
    } else {
        outcome = 'draw';
    }
}

function resetGame() {
    userScore = 0;
    userScoreDisplay.innerHTML = userScore;
    computerScore = 0;
    computerScoreDisplay.innerHTML = computerScore;
    result.innerHTML = ``;
    challengeDisplay.innerHTML = ``;
}