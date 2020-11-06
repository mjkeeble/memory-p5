class Game {
    constructor(cards, quotes) {
        this.cards = cards;
        // this.tickQuotes = quotes;
        this.pickedCards = [];
        this.board = [];
        this.pairsClicked = 0;
        this.pairsGuessed = 0;
        this.revealedCards = [];
        this.clickAllowed = true;
        this.ongoingMovement = 0
        this.speed = 6;
        this.numOfMovements = 0
        this.rotation = 0
        this.rotationSpeed = 6

    }

    setupGame() {
        // console.log(this.tickQuotes);

        // create empty fields
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= 6; j++) {
                if (i == 0 || i == 6 || j == 0 || j == 6) {
                    let thisEmptyField = {
                        column: i,
                        row: j,
                        status: 'empty',
                        x: i * (CARD_SIZE + GRID_SPACING),
                        y: i * (CARD_SIZE + GRID_SPACING)
                    };
                    this.board.push(thisEmptyField)
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

    calculateMovement() {
        for (const item of this.board) {
            let destinationX = item.column * (CARD_SIZE + GRID_SPACING);
            let destinationY = item.row * (CARD_SIZE + GRID_SPACING);
            if (item.x < destinationX) item.x += this.speed;
            if (item.y < destinationY) item.y += this.speed;
            if (item.x > destinationX) item.x -= this.speed;
            if (item.y > destinationY) item.y -= this.speed;
            if (item.status == "moving1" ||
                item.status == "moving2") {
                if (item.x == destinationX &&
                    item.y == destinationY &&
                    item.status != "empty") {
                    item.status = "down";
                }
            }

        } //end for loop
    } // end calculateMovement

    drawCards() {
        strokeWeight(2)
        stroke(222, 191, 100)

        for (const item of this.board) {
            if (this.rotation != 0) {
            }
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
            } // end switch
        } // end for
    } //end drawCards

    isCardClicked(mouseh, mousev) {
        for (const item of this.board) {
            if (item.status != 'empty' && item.status != 'up') {
                if (mouseh >= item.x &&
                    mouseh <= item.x + CARD_SIZE &&
                    mousev >= item.y &&
                    mousev <= item.y + CARD_SIZE) {
                    item.status = 'up';
                    this.revealedCards.push(item);

                    if (this.revealedCards.length == 2) {
                        this.checkPair();
                    } // end if two cards are up
                } // end if card clicked
            }// end if card down
        } // end for
    }// end isCardClicked

    checkPair() {
        let guessTxt = "";
        this.pairsClicked++;
        console.log(`clicked ${this.pairsClicked} movements ${this.numOfMovements}`);

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
            remove();
            let endStr = `<div id="endMessage">`
            endStr += `<p class="endMessageText">You are a true hero!!!<br>`
            endStr += `<p class="endMessageText">the people<br>`
            endStr += `<p class="endMessageText">of the world salute you!</p>`
            endStr += `<p id="returnBtn">Click here to play again!</p>`
            endStr += `</div>`

            document.getElementById('mainflex').innerHTML = endStr
            document.getElementById("returnBtn").addEventListener("click", function () {
                location.reload()
            });
        };
    }

    matchingPair() {
        this.clickAllowed = false;
        this.pairsGuessed++;
        document.getElementById('score').innerText = this.pairsGuessed;
        // let tickText = this.tickQuotes[Math.floor(Math.random() * this.tickQuotes.length)];
        let tickText = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('instructionTxt').innerText = tickText;
        this.testIfWon();
        this.removeMatchingCards();
    }

    removeMatchingCards() {
        setTimeout(() => {
            for (let i = 0; i < this.revealedCards.length; i++) {
                delete this.revealedCards[i].name;
                this.revealedCards[i].status = "empty";
            }
            this.revealedCards = [];
        }, 1000)
    }

    endGameLose() {
        remove();
        let endStr = `<div id="endMessage">`
        endStr += `<p class="endMessageText">Eat Kryptonite Bozo!!</p>`
        endStr += `<p class="endMessageText">The forces of incompetence</p>`
        endStr += `<p class="endMessageText">are triumphant!!!</p>`
        endStr += `<p id="returnBtn">Click here to play again!</p>`
        endStr += `</div>`
        document.getElementById('mainflex').innerHTML = endStr
        document.getElementById("returnBtn").addEventListener("click", function () {
            location.reload()
        });
        document.getElementById("instructions").style.display = "none";
        // 
    }

    unmatchingPair() {
        game.clickAllowed = false
        setTimeout(() => {
            this.revealedCards[0].status = 'down';
            this.revealedCards[1].status = 'down';

            this.revealedCards = []

            this.clickAllowed = true;
        }, 1500);
        this.triggerMovements()
    }

    drawText() {
        textSize(70);
        textAlign(CENTER)
        // text(this.p5Text, WIDTH/2, WIDTH/4)

    }

    triggerMovements() {
        // console.log(`trigger movement `, this.board.length);
        // this.swapCards()
        let extra = Math.floor(Math.random() * 10);
        if (this.pairsClicked >= 3) {
            console.log(`extra `, extra);

            switch (extra) {
                case 9:
                    this.reverseHorizontalPositions()
                    break;
                case 8:
                    this.reverseVerticalPositions()
                    break
                default:

                    this.swapCards()
                    break;
            }
        }
    }

    // rotateCards() {
    //     this.rotation += this.rotationSpeed;
    // }
    // for(let i = 0; i <= numOfMovements; i++) { 
    //     let movementSelector = Math.floor(Math.random() * 1.5)
    //     switch (movementSelector) {
    //         case 0:
    //             break;
    // case 1:
    //             break;
    //         default:
    //             break;
    //     }
    //     ;
    // }

    swapCards() {
        console.log(`calling card swap`);
        if (this.pairsClicked == 3 ||
            this.pairsClicked == 12 ||
            this.pairsClicked == 18 ||
            this.pairsClicked == 24 ||
            this.pairsClicked == 30) {
            this.numOfMovements++
        }
        for (let i = 0; i < this.numOfMovements; i++) {

            const card1 = this.board[Math.floor(Math.random() * this.board.length)];
            const card2 = this.board[Math.floor(Math.random() * this.board.length)];
            let cardCoordinates = {
                "column": Number(card1.column),
                "row": Number(card1.row)
            }
            // console.log(`card1 before move x:${card1.x} y:${card1.y}`);
            // console.log(`card2 before move x:${card2.x} y:${card2.y}`);

            card1.column = card2.column;
            card1.row = card2.row;
            if (card1.status != "empty" && card2.status != "up") card1.status = "moving1"
            card2.column = cardCoordinates.column;
            card2.row = cardCoordinates.row;
            if (card2.status != "empty" && card2.status != "up") card2.status = "moving2"
            // console.log(`card1 before move x:${card1.x} y:${card1.y}`);
            // console.log(`card2 before move x:${card2.x} y:${card2.y}`);
        }
    }

    // magnate() {
    //  =====needs timing to regulate movement, otherwise they all move as a block =====
    //     const direction = ["up", "down", "left", "right"];
    //     const magnateArr = [
    //         [],
    //         [],
    //         [],
    //         [],
    //         [],
    //         [],
    //         []
    //     ];
    //     let magnateDirection = Math.floor(Math.random() * direction.length);
    //     magnateDirection = "up"
    //     for (let i = 0; i < this.board.length; i++) {
    //         console.log(this.board[i])
    //         magnateArr[this.board[i].column][this.board[i].row] = this.board[i];
    //     }
    //     console.log(magnateArr);

    //     switch (magnateDirection) {
    //         case "up":
    //             for (let j = 0; j < magnateArr.length; j++) {
    //                 for (let k = magnateArr[j].length - 2; k >= 0; k--) {
    //                     console.log(`j: ${j} k: ${k}`);

    //                     magnateArr[j][k + 1].row = k;
    //                     magnateArr[j][k].row = k + 1
    //                 }
    //             }
    //             break;
    //         case "down":

    //             break;
    //         case "left":

    //             break;
    //         default:
    //             break;
    //     }
    // }

    reverseHorizontalPositions() {
        for (let i = 0; i < this.board.length; i++) {
            console.log(Math.sqrt(this.board.length - 1));

            this.board[i].column = Math.sqrt(this.board.length) - this.board[i].column - 1;
        }
    }

    reverseVerticalPositions() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].row = Math.sqrt(this.board.length) - this.board[i].row - 1;
        }
    }
}

// =========================================
const quotes = [
    "\"When destiny speaks, she speaks to me. She says 'Hi', by the way.\"",
    "\"We got a tiger by the tail.\"",
    "\" Whoa, check out the crime lab! It's all thorough and complicated.\"",
    "\"Perfect. You've got the brains. I got the everything else!\"",
    "\"I have the reflexes of an Olympic-level jungle cat.\"",
    "\"I have there strength of ten, perhaps 20 men. A crowded bus stop... of men.\"",
    "\"Come on over. It's good. It's warm. It's like the inside of bread.\"",
    "\"Wicked men! Look at you, beetling away at your dunghill of contraband.\"",
    "\"I say unto you... Stop your evil ways!\"",
    "\"The key to successful falling lies in realizing that you are a falling person.\"",
    "\"Am I never naked? Or am I never NOT naked?\"",
    "\"He may be on the compact side as heroes go, but that's just the way Destiney crumbles her cookies.\"",
    "\"The true hero stays above it all, using their keen senses to feel through the fog, to penetrate the din, and hear that one tiny voice on the wind, crying for help.\"",
    "\"There is no God. There is only dog.\"",
    "\"What if his job is to spread his wings and soar?\"",
    "\"Your mouth says one thing, your guns say some other things, bald, bad man.\"",
    "\"Okay. This is the part where you say 'Kill them all!' and I start punching.\"",
    "\"Please tell me you're not considering teaming up with Mr. Stabby here?\"",
    "\"I am a creature of action. I need an act to act upon when action-packed rescue drama is afoot.\""
]


