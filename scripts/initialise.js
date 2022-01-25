const gameArea = document.querySelector('#game-area');
const seedForm = document.querySelector("#seed-form");
const randomSeedCheck = document.querySelector("#use-seed");
const seedSelection = document.querySelector("#seed-selection");
const timeDisplay = document.querySelector('#timer');
const roundDisplay = document.querySelector('#roundDisplay');
const scoreDisplay = document.querySelector('#scoreDisplay');
const seedDisplay = document.querySelector('#seedDisplay');

const tradeButton = document.createElement('button');
tradeButton.innerText = 'Trade letters';
tradeButton.classList.add('button');
tradeButton.addEventListener('click', () => {
    tileRack.tradeAll();
})

const timer = new easytimer.Timer();
let seed = Math.random();
const userScore = {
    total: 0, penalties: 0, bonuses: {
        time: 0, bingo: 0
    }
};
let currentRound = 0;
const wordsWritten = [];

timeDisplay.innerText = `${timeInMinutes}:00`;