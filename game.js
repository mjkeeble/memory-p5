class Game {
    constructor(cards) {
        this.cards = cards;
        this.pickedCards = [];
        this.board = [];
        this.pairsClicked = 0;
        this.pairsGuessed = 0;
        this.upCards = 0;
        this.clickAllowed = true;
    }

    setupGame() {
        // create empty fields
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= 6; j++) {
                if (i == 0 || i == 6 || j == 0 || j == 6) {
                    this.board.push({ column: i, row: j, status: 'empty' });
                } else {
                    let nextCardLaid = Math.floor(Math.random() * cards.length);
                    cards[nextCardLaid].column = i;
                    cards[nextCardLaid].x = i * (CARD_SIZE + GRID_SPACING);
                    cards[nextCardLaid].row = j;
                    cards[nextCardLaid].y = j * (CARD_SIZE + GRID_SPACING);
                    this.board.push(cards[nextCardLaid])
                    cards.splice(nextCardLaid, 1);
                }//end if
            } // end for j
        } //end for i

        // place cards
        for (let x = 1; x <= 5; x++) {
            for (let y = 1; y <= 5; y++) {

            } //end for j
        } // end for i
    } //end setupGame

    preloadGame() {
        console.log(`preloading`);

        this.images = [
            { src: loadImage('./assets/Arthur.jpg') },
            { src: loadImage('./assets/batkid.jpg') },
            { src: loadImage('./assets/captain-armenia.jpg') },
            { src: loadImage('./assets/deadpool.jpg') },
            { src: loadImage('./assets/kryptonite.jpg') },
            { src: loadImage('./assets/shazam.jpg') },
            { src: loadImage('./assets/captain-avenger.jpg') },
            { src: loadImage('./assets/the-tick.jpg') },
            { src: loadImage('./assets/super.jpg') },
            { src: loadImage('./assets/bananaman.jpg') },
            { src: loadImage('./assets/cooperman.jpg') },
            { src: loadImage('./assets/blunderwoman.jpg') }
        ]

    } // end preloadGame

    drawCards() {
        console.log(`drawing cards`);
        // background(255, 204, 0);
        strokeWeight(2)
        stroke(51)
        for (const item of this.board) {
            console.log(`${item.status} x:${item.x} y:${item.y}`);

            switch (item.status) {
                case "down":
                    image('spiderman.jpg', item.x, item.y, CARD_SIZE, CARD_SIZE);
                    // rect(item.x, item.y, CARD_SIZE, CARD_SIZE);
                    break;
                case "up":
                    image('spiderman.jpg', item.x, item.y, CARD_SIZE, CARD_SIZE);
                    // rect(item.x, item.y, CARD_SIZE, CARD_SIZE);
                    break;
                default:
                    break;
            } // end switch
        } // end for
    } //end drawCards

    isCardClicked(mouseh, mousev) {
        for (const item of this.board) {
            if (item.status != 'empty') {
                if (mouseh >= item.x && mouseh <= item.x + CARD_SIZE && mousev >= item.y && mousehv <= item.y + CARD_SIZE) item.status = 'up';
                this.upCards++
                if (this.upCards = 2) this.checkPair()
            } // end if not empty
        } // end for
    }// end isCardClicked

    checkPair(){
        const upPair = []
        for (const item of this.board) {
            if (item.status == 'up') {
                upPair.push(item);
            }
        } // end for loop
        if (upPair[1].name == upPair[1].name) {
                if (upPair[1].name == 'kryptonite') {
                    // GAME OVER!!
                } else {
                    this.clickAllowed = false;
                    this.pairsGuessed ++;
                    if(pairsGuessed === 11){
                        // GAME WON!!
                    } else{
                        // wait three seconds
                        upPair[1].status = 'down';
                        upPair[2].status = 'down';
                        game.clickAllowed = true;
                    } // end if else

                } // end if kryptonite
        }
    }// endcheckPair

} //end class Game

class card {
    constructor(name, img, status) {
        this.name = name;
        this.img = img;
        this.status = status;
    }
}// end class Card
