class Game {
    constructor(cards) {
        this.cards = cards;
        this.pickedCards = [];
        this.board = [];
        this.pairsClicked = 0;
        this.pairsGuessed = 0;
        this.revealedCards = [];
        this.clickAllowed = true;
        this.speed = 10;
        this.p5Text = "GAME OVER\nEat Kryptonite Bozo!!\n The forces of\n incompetence\n are triumphant!!!";
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

    drawCards() {
        // put this in another function
        for (const item of this.board) {
            if (item.x < item.columns * (CARD_SIZE + GRID_SPACING)) {
                item.x + Math.min(
                    (item.columns * (CARD_SIZE + GRID_SPACING)) - item.x,
                    this.Speed
                )
            }
            if (item.x > item.columns * (CARD_SIZE + GRID_SPACING)) {
                item.x - Math.min(
                    item.x - (item.columns * (CARD_SIZE + GRID_SPACING)),
                    (this.Speed * -1)
                )
            }
            if (item.y < item.columns * (CARD_SIZE + GRID_SPACING)) {
                item.y + Math.min(
                    (item.columns * (CARD_SIZE + GRID_SPACING)) - item.y,
                    this.Speed
                )
            }
            if (item.y > item.columns * (CARD_SIZE + GRID_SPACING)) {
                item.y - Math.min(
                    item.y - (item.columns * (CARD_SIZE + GRID_SPACING)),
                    (this.Speed * -1)
                )
            }
        }
        strokeWeight(2)
        stroke(222, 191, 100)
        for (const item of this.board) {
            switch (item.status) {
                case "down":
                    fill(88, 48, 199);
                    rect(item.x, item.y, CARD_SIZE, CARD_SIZE);
                    break;
                case "up":
                    image(window[item.img], item.x, item.y, CARD_SIZE, CARD_SIZE)
                    break;
                case "moving1":
                    fill(194, 14, 41);
                    rect(item.x, item.y, CARD_SIZE, CARD_SIZE);
                    fill(88, 48, 199);
                    break;
                case "moving2":
                    fill(96, 153, 31);
                    rect(item.x, item.y, CARD_SIZE, CARD_SIZE);
                    fill(88, 48, 199);
                    break;
                default:
                    break;
            } // end switch
        } // end for
    } //end drawCards

    isCardClicked(mouseh, mousev) {
        console.log(`CLICKED ALLOWED AFTER CLICK`, this.clickAllowed);

        for (const item of this.board) {
            if (item.status != 'empty' && item.status != 'up') {
                if (mouseh >= item.x &&
                    mouseh <= item.x + CARD_SIZE &&
                    mousev >= item.y &&
                    mousev <= item.y + CARD_SIZE) {
                    item.status = 'up';

                    console.log(`this is item `, item)
                    this.revealedCards.push(item);
                    console.log(this.revealedCards);

                    if (this.revealedCards.length == 2) {
                        console.log(this.revealedCards.length);
                        this.checkPair();
                    } // end if two cards are up
                } // end if card clicked
            }// end if card down
        } // end for
    }// end isCardClicked

    checkPair() {
        let guessTxt = "";
        console.log(`checking pair`);
        this.pairsClicked++;
        if (this.pairsClicked == 1) {
            guessTxt = `${this.pairsClicked}\n guess made`;
        } else {
            guessTxt = `${this.pairsClicked}\n guesses made`;
        }
        document.getElementById(`message`).innerText = guessTxt;
        if (this.revealedCards[0].name != this.revealedCards[1].name) {
            this.unmatchingPair();
        } else {
            if (this.revealedCards[0].name == 'kryptonite') {
                this.endGameLose();
            } else {
                this.matchingPair();

            };

        };
    }

    testIfWon() {
        if (this.pairsGuessed == 11) {
            console.log(`game won`);
            document.getElementById("message").innerText = `You are a true hero!!!\nThe people of the world salute you!`
            setTimeout(() => { location.reload(), 10000 });
        };
    }

    matchingPair() {
        console.log(`matching pair `, this.revealedCards);

        this.clickAllowed = false;
        this.pairsGuessed++;
        document.getElementById('score').innerText = this.pairsGuessed;
        this.testIfWon();
        this.removeMatchingCards();
    }

    removeMatchingCards() {
        setTimeout(() => {
            console.log(`removematchingpair `, this.revealedCards);
            for (let i = 0; i < this.revealedCards.length; i++) {
                delete this.revealedCards[i].name;
                this.revealedCards[i].status = "empty"
            }
            this.revealedCards = []
            console.log(`matching pair removed`)
            console.log("revealed cards", this.revealedCards);
        }, 3000)
    }

    endGameLose() {
        console.log(`it's kryptonite`);
        game.clickAllowed = false
        document.getElementById("message").innerText = `GAME OVER\nEat Kryptonite Bozo!!\n The forces of incompetence are triumphant!!!`
        setTimeout(function () {
            location.reload();
        }, 3000)
        // 
    }

    unmatchingPair() {
        console.log(`not the same`);
        game.clickAllowed = false
        setTimeout(() => {
            console.log(`unmatching pair`,);
            this.revealedCards[0].status = 'down';
            this.revealedCards[1].status = 'down';
            console.log(`rev card 0 status `, this.revealedCards[0].status);

            this.revealedCards = []
            console.log(`revealed cards reset `, this.revealedCards);

            this.clickAllowed = true;
        }, 3000);
        this.triggerMovements()
    }

    drawText() {
        textSize(70);
        textAlign(CENTER)
        // text(this.p5Text, WIDTH/2, WIDTH/4)

    }

    triggerMovements() {
        let numOfMovements = 0
        if (this.pairsClicked == 3 || this.pairsClicked == 10 || this.pairsClicked == 15) numOfMovements++
    }


    movementSwapCards() {

        /*
select cards
store coordinates of card 1 in object
copy card 2 coordinates to card 1
copy card 1 coordinates to card 2
set status to moving1 or 2 if it is not empty
        */
    }

}



