const game = new Game();

function preload() {
    game.preloadGame()


}

function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas"),

        game.setupGame()
}

function draw() {
    // console.log(`drawing`);
    clear()
    game.drawCards()
    // for (let card of game.board)
}

function mousePressed() {
    if (game.clickAllowed = true) {
        game.isCardClicked(mouseX, mouseY);
    }
}

// thing =