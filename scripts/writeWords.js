function hasLetters(attemptedWord, availableLetters) {
    // Takes two arrays, attemptedWord and availableLetters,
    // and checks that the attemptedWord can be written with 
    // the available letters. 

    //Returns a boolean value

    for (let letter of attemptedWord) {
        const numInAttempt = attemptedWord.filter(item => item === letter).length;
        const numInAvailable = availableLetters.filter(item => item === letter).length;
        if (numInAttempt > numInAvailable) return false;
    }
    return true;
}

function getLetterObj(character) {
    // Takes a single character, and returns the letter object associated with it
    return letterList.filter(letter => letter.character === character)[0];
}

function createWordForm() {
    const formWrapper = document.createElement('div');
    formWrapper.id = 'form-wrapper';
    const wordInputForm = document.createElement('form');
    wordInputForm.classList.add('game-form');
    wordInputForm.autocomplete = 'off';
    wordInputForm.id = "word-form";
    wordInputForm.innerHTML = '<label for="word">Enter a word</label><input type="text" name="word" id="word" autofocus><button type="submit" class="button">Write</button>';
    formWrapper.appendChild(wordInputForm);
    document.querySelector("#game-area").appendChild(formWrapper);
}

function changeMessageColor(changeTo) {
    if (gameMessages.classList[0] !== changeTo) {
        gameMessages.classList.forEach(cls => {
            gameMessages.classList.remove(cls);
        })
        gameMessages.classList.add(changeTo);
    }
}

function handleSuccessfulWord(wordAttempt) {
    console.log("Valid word");
    gameMessages.innerText = "Valid Word";
    changeMessageColor('green');
    const successfulWordArr = wordAttempt.split('').map(chr => getLetterObj(chr));
    let points = successfulWordArr.map(lett => lett.pointsVal).reduce((a, b) => a + b);
    // Bingo Rule, i.e. Player gets a flat bonus if they use all tiles at once
    if (successfulWordArr.length === 7) {
        userScore.total += bingoBonus;
        userScore.bonuses.bingo += bingoBonus;
    }
    userScore.total += points;
    scoreDisplay.innerText = userScore.total;
    console.log(`Total score: ${userScore.total}. Points for this word: ${points}`);
    tileRack.replenish(successfulWordArr);
    currentRound += 1;
    // Keeps track of all written words
    wordsWritten.push({ word: wordAttempt, points: points });
    if (currentRound > numRounds) {
        handleGameEnd();
        timer.stop();
    }

    roundDisplay.innerText = currentRound;
}

function handleWordSubmission(evt, wordForm) {
    evt.preventDefault();
    const wordAttempt = wordForm.elements.word.value.toUpperCase();
    wordForm.elements.word.value = '';
    const currentLetters = tileRack.letters.map(tile => tile.character);
    if (!hasLetters(wordAttempt.split(''), currentLetters)) {
        console.log('You do not have the letters to write that word');
        gameMessages.innerText = "You do not have the required letters";
        changeMessageColor('red');
    } else {
        if (scrabbleDict.has(wordAttempt)) {
            handleSuccessfulWord(wordAttempt);
        } else {
            console.log("not a real word");
            userScore.total -= 5;
            userScore.penalties -= 5;
            scoreDisplay.innerText = userScore.total;
            gameMessages.innerText = "That is not a valid word!";
            changeMessageColor('red');
        }
    }
}
