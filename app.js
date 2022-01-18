function shuffle(array, seed) {
    // Function taken from user Ulf Aslak on stackoverflow
    // https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed

    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(random(seed) * m--);

        // And swap it with the current elements.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed
    }

    return array;
}

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function handleStart(evt) {
    evt.preventDefault();
    let seed = Math.random();
    if (!seedForm.elements.isRandom.checked) {
        seed = seedForm.elements.chosenSeed.value;
    }
    console.log(`Seed is ${seed}`);
    seedDisplay.innerText = seed;
    shuffle(letterBag, seed);
    seedForm.remove();
    createWordForm();
    currentRound += 1;
    roundDisplay.innerText = currentRound;
    const wordForm = document.querySelector("#word-form");
    wordForm.addEventListener('submit', e => handleWordSubmission(e, wordForm));
    setupTileRack();
}

const seedForm = document.querySelector("#seed-form");
const randomSeedCheck = document.querySelector("#use-seed");
const seedSelection = document.querySelector("#seed-selection");

// Enables the manual seed input if the user choose to do so
randomSeedCheck.addEventListener("click", () => {
    seedSelection.toggleAttribute("disabled");
})

// Start the main "game loop" on submission of the random seed form
seedForm.addEventListener("submit", e => handleStart(e));

const gameMessages = document.querySelector('#game-messages');

// Initialise game info
const roundDisplay = document.querySelector('#roundDisplay');
const scoreDisplay = document.querySelector('#scoreDisplay');
const seedDisplay = document.querySelector('#seedDisplay');

let userScore = 0;
let currentRound = 0;
