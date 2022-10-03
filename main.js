let userScore = 0;
let computerScore = 0;

const userScoreDisplay = document.querySelector('[data-score="user"]');
const computerScoreDisplay = document.querySelector('[data-score="computer"]');
const choiceBtns = document.querySelectorAll('[data-choice]');
const result = document.querySelector('[data-result]');
const reset = document.querySelector('[data-reset]');

const values = ['rock', 'paper', 'scissors'];

choiceBtns.forEach((btn) => {
    let gameListener;
    btn.addEventListener('click', () => {
        clearTimeout(gameListener)
        const value = btn.dataset.choice;
        gameListener = setTimeout(() => {
            play(value);
        }, 1000);
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
    result.innerHTML = `You : ${userInput.toUpperCase()}<br>AI : ${computerInput.toUpperCase()}`;
    setTimeout(() => {
        getWinner(userInput, computerInput);
    }, 1000);
}

function getWinner(userInput, computerInput) {
    if (userInput === computerInput) {
        result.innerHTML = "Draw!"
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
                updateScore('computer');
                result.innerHTML = `AI WINS!`;
                break;
        }
    }
}

function updateScore(winner) {
    if (winner === 'user') {
        userScore++;
        userScoreDisplay.innerHTML = userScore;
    } else {
        computerScore++;
        computerScoreDisplay.innerHTML = computerScore;
    }
}

function resetGame() {
    userScore = 0;
    userScoreDisplay.innerHTML = userScore;
    computerScore = 0;
    computerScoreDisplay.innerHTML = computerScore;
    result.innerHTML = ``;
}