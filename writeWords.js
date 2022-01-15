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

function createWordForm() {
    const wordInputForm = document.createElement('form');
    wordInputForm.id = "word-form";
    wordInputForm.innerHTML = '<label for="word">Enter a word</label><input type="text" name="word" id="word"><button type="submit">Write</button>';
    document.querySelector("#game-area").appendChild(wordInputForm);
}

function handleWordSubmission(evt, wordForm) {
    evt.preventDefault();
    const wordAttempt = wordForm.elements.word.value.toUpperCase().split('');
    wordForm.elements.word.value = '';
    const currentLetters = tileRack.letters.map(tile => tile.character);
    if (!hasLetters(wordAttempt, currentLetters)) {
        console.log('You do not have the letters to write that word');
    } else {
        console.log('Nice word bro');
    }
}
