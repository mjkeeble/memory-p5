const game = new Game();

function preload() {
    arthurImg = loadImage('./assets/Arthur.jpg');
    batkidImg = loadImage('./assets/batkid.jpg')
    captainArmeniaImg = loadImage('./assets/captain-armenia.jpg')
    superianImg = loadImage('./assets/superian.jpg')
    blunderwomanImg = loadImage('./assets/blunderwoman.jpg')
    kryptoniteImg = loadImage('./assets/kryptonite.jpg')
    shazam = loadImage('./assets/shazam.jpg')
    captainAvengerImg = loadImage('./assets/captain-avenger.jpg')
    tickImg = loadImage('./assets/the-tick.jpg')
    superImg = loadImage('./assets/super.jpg')
    bananamanImg = loadImage('./assets/bananaman.jpg')
    coopermanImg = loadImage('./assets/cooperman.jpg')
}

function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas");
    frameRate(60);
    angleMode(DEGREES)

    game.setupGame();
}

function draw() {
    game.calculateMovement()
    // console.log(`drawing`);
    clear()
    game.drawCards()
    game.drawText()
    // for (let card of game.board)
}


function mousePressed() {
    if (game.revealedCards.length < 2) {
        game.isCardClicked(mouseX, mouseY);
    }
}

// thing =