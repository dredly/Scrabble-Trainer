const tileRack = {
    display: document.querySelector('#tile-rack'),
    letters: [],
    fill: function (numToFill) {
        // Populates the letters array with the specified number of letter objects
        // numToFill should be between 1 and 7
        for (let i = 0; i < numToFill; i++) {
            const randIndex = Math.floor(Math.random() * letterBag.length);
            const randLetter = letterBag[randIndex];
            letterBag.splice(randIndex, 1);
            this.letters.push(randLetter);
        }
    },
    // TODO: Change from showing blank tiles to a separate element for space in the rack
    initialRender: function () {
        // Renders 7 blank tiles to populate the tileRack HTML element
        for (let i = 0; i < 7; i++) {
            this.display.append(document.createElement('div'));
        }
    },
    reRender: function () {
        // Updates the display of the tileRack HTML element to show the current contents of the letters array
        for (let i = 0; i < 7; i++) {
            if (i < this.letters.length) {
                this.display.replaceChild(this.letters[i].makeTile(), this.display.children[i]);
            } else {
                this.display.replaceChild(document.createElement('div'), this.display.children[i]);
            }
        }
    },
    remove: function (ind) {
        // Removes a letter object at the given index from the letters array
        this.letters.splice(ind, 1);
    },
    replenish: function (usedLetters) {
        // Takes an array of letter objects that have been used, and replaces them
        // with new ketters frin the bag
        for (lett of usedLetters) {
            const current_ind = this.letters.indexOf(lett);
            this.remove(current_ind);
        }
        this.fill(usedLetters.length);
        this.reRender();
    }
};

function setupTileRack() {
    // Initialises the tileRack for the start of the game
    tileRack.fill(7);
    tileRack.initialRender();
    tileRack.reRender();
}