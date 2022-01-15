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
    const wordInputForm = document.createElement('form');
    wordInputForm.id = "word-form";
    wordInputForm.innerHTML = '<label for="word">Enter a word</label><input type="text" name="word" id="word"><button type="submit">Write</button>';
    document.querySelector("#game-area").appendChild(wordInputForm);
}

function handleWordSubmission(evt, wordForm) {
    evt.preventDefault();
    const wordAttempt = wordForm.elements.word.value.toUpperCase();
    wordForm.elements.word.value = '';
    const currentLetters = tileRack.letters.map(tile => tile.character);
    if (!hasLetters(wordAttempt.split(''), currentLetters)) {
        console.log('You do not have the letters to write that word');
    } else {
        if (scrabbleDict.has(wordAttempt)) {
            console.log("real word");
            tileRack.replenish(wordAttempt.split('').map(chr => getLetterObj(chr)));
        } else {
            console.log("not a real word");
        }
    }
}
