class Letter {
    constructor(character, pointsVal, qty) {
        this.character = character;
        this.pointsVal = pointsVal;
        this.qty = qty;
    }
    makeTile() {
        // Method to render the html for a given letter object
        const { character, pointsVal } = this;
        console.log(character);
        const tile = document.createElement('div');
        // Make sure the 0 for value is not displayed for blank tiles
        if (pointsVal !== 0) {
            tile.innerHTML = `<div>${character}<sub>${pointsVal}</sub></div>`;
        }
        tile.classList.add('tile');
        return tile;
    }
}

const letterList = [
    ['A', 1, 9], ['B', 3, 2], ['C', 3, 2], ['D', 2, 4], ['E', 1, 12], ['F', 4, 2],
    ['G', 2, 3], ['H', 4, 2], ['I', 1, 9], ['J', 8, 1], ['K', 5, 1], ['L', 1, 4],
    ['M', 3, 2], ['N', 1, 6], ['O', 1, 8], ['P', 3, 2], ['Q', 10, 1], ['R', 1, 6],
    ['S', 1, 4], ['T', 1, 6], ['U', 1, 4], ['V', 4, 2], ['W', 4, 2], ['X', 8, 1],
    ['Y', 4, 2], ['Z', 10, 1]
].map(letterInfo => new Letter(...letterInfo));

const letterBag = [];
letterList.forEach(letter => {
    for (i = 0; i < letter.qty; i++) {
        letterBag.push(letter);
    }
})
