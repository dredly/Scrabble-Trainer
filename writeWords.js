function createWordForm() {
    const wordForm = document.createElement('form');
    wordForm.id = "word-form";
    wordForm.innerHTML = '<label for="word">Enter a word</label><input type="text" name="word" id="word"><button type="submit">Write</button>';
    document.querySelector("#game-area").appendChild(wordForm);
}