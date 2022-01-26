const tileRack = {
    display: document.querySelector('#tile-rack'),
    letters: [],
    fill: function (numToFill) {
        const newTiles = letterBag.splice(0, numToFill);
        this.letters.push(...newTiles);
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
        // with new letters from the bag
        console.log(usedLetters);
        for (let lett of usedLetters) {
            const current_ind = this.letters.indexOf(lett);
            this.remove(current_ind);
        }
        this.fill(usedLetters.length);
        this.reRender();
    },
    tradeAll: function () {
        this.replenish([...this.letters]);
        userScore.total -= 50;
        userScore.penalties -= 50;
        scoreDisplay.innerText = userScore.total;
    }
};

function setupTileRack() {
    // Initialises the tileRack for the start of the game
    tileRack.fill(7);
    tileRack.initialRender();
    tileRack.reRender();
}