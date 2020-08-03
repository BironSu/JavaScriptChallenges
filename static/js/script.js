
var playerScore = 0;
var botScore = 0;
let playerScoreBoard = document.getElementById('rps-player-score');
let botScoreBoard = document.getElementById('rps-bot-score');

// Challenge 1: Your Age in Days
function ageToDays(){
    var numbers = /^[0-9]+$/;
    if (document.getElementById('ageInDays') != null) {
        document.getElementById('ageInDays').remove();
    }
    let birthYear = prompt('What year were you born?');
    while (birthYear >= 2020 || !birthYear.match(numbers)){
        birthYear = prompt('What year were you born? Must be less than 2020 and numbers only!');
    }

    let ageInDays = (2020 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + ageInDays + ' days old!');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetAgeButton(){
    if (document.getElementById('ageInDays') != null){
        document.getElementById('ageInDays').remove();
    } else{
        alert('Nothing to remove!');
    }
}

// Challenge 2: Generate Cat
function generateCat(){
    let image = document.createElement('img');
    let catResultID = document.getElementById('flex-cat-results');
    image.setAttribute('id','generatedCats');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    catResultID.appendChild(image);
}

function resetCatButton(){
    if (document.getElementById('generatedCats') != null) {
        document.getElementById('generatedCats').remove();
    }
}

// Challenge 3: Rock Paper Scissors
function rpsGame(yourChoice){
    console.log(yourChoice.id);
    var playerChoice, botChoice;
    playerChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(playerChoice, botChoice);
    message = finalMessage(results);
    console.log(playerScore, botScore);
    rpsFrontEnd(playerChoice, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissor'][number];
}

function decideWinner(yourChoice, botChoice){
    let rpsDatabase = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0}
    };
    return rpsDatabase[yourChoice][botChoice];
}

function finalMessage(yourScore){
    if (yourScore === 0){
        rpsScoreTracker('lose');
        return {'message' : 'You have lost!', 'color': 'red'};
    } else if (yourScore === 0.5){
        return {'message': 'Draw!', 'color': 'yellow'};
    } else{
        rpsScoreTracker('win');
        return {'message': 'You have won!', 'color': 'green'};
    };
}
function rpsScoreTracker(condition){
    if (condition === 'win'){
        playerScore++;
        playerScoreBoard.textContent = 'Player Score: ' + playerScore;
    } else if (condition === 'lose'){
        botScore++;
        botScoreBoard.textContent = 'Bot Score: ' + botScore;
    }
}
function rpsFrontEnd(playerChoice, botChoice, message){
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let messageDiv = document.createElement('div');

    let playAgainButtons = document.createElement('button');
    playAgainButtons.setAttribute('class', 'btn btn-primary');
    playAgainButtons.innerHTML = "<h1 id='message' style='color: " + message['color'] + "; font-size = 30px; padding: 30px; '>" + message['message'] + "<br> Play Again! </h1>";
    playAgainButtons.setAttribute('onClick','javascript: rpsPlayAgain()');

    createResultRPSImages('player', imagesDatabase[playerChoice], 'box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);');
    document.getElementById('flex-box-rps-div').appendChild(playAgainButtons);

    createResultRPSImages('bot', imagesDatabase[botChoice], 'box-shadow: 0px 10px 50px rgba(247, 38, 24, 1);');
}

function createResultRPSImages(id, source, color){
    let x = document.createElement('img');
    x.setAttribute('id', String(id));
    x.setAttribute('src', String(source));
    x.setAttribute('height', '150');
    x.setAttribute('width', '150');
    x.setAttribute('style', String(color));
    document.getElementById('flex-box-rps-div').appendChild(x);
}

function rpsPlayAgain(){
    document.getElementById('flex-box-rps-div').remove();

    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'flex-box-container-3');
    newDiv.setAttribute('id', 'flex-box-rps-div');
    let containerThree = document.getElementById('rps-container');
    containerThree.appendChild(newDiv);

    createDefaultRPSImages('rock', '../images/RPS/Rock.jpg');
    createDefaultRPSImages('paper', '../images/RPS/Paper.jpg');
    createDefaultRPSImages('scissor', '../images/RPS/Scissor.jpg');

}
function createDefaultRPSImages(id, source){
    let x = document.createElement('img');
    x.setAttribute('id', String(id));
    x.setAttribute('src', String(source));
    x.setAttribute('height', '150');
    x.setAttribute('width', '150');
    x.setAttribute('alt', '');
    x.setAttribute('onClick', 'rpsGame(this)')
    document.getElementById('flex-box-rps-div').appendChild(x);
}

function rpsResetScore(){
    playerScore = 0;
    botScore = 0;
    playerScoreBoard.textContent = 'Player Score: ' + playerScore;
    botScoreBoard.textContent = 'Bot Score: ' + botScore;
}

// Challenge 4: Button Color Changer
var allButtons = document.getElementsByTagName('button');
var saveDefaultButtons = [];

for (let i = 0; i < allButtons.length; i++){
    saveDefaultButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonPressed){
    if (buttonPressed.value === 'red'){
        changeToRed();
    } else if (buttonPressed.value === 'green'){
        changeToGreen();
    } else if (buttonPressed.value === 'reset'){
        resetButtonColor();
    } else if (buttonPressed.value === 'random'){
        randomButtonColor();
    }
}

function changeToRed(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function changeToGreen(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function resetButtonColor(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(saveDefaultButtons[i]);
    }
}

function randomButtonColor(){
    let choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger', 'btn-secondary']
    for (let i = 0; i < allButtons.length; i++){
        let randomNumber = Math.floor(Math.random() * choices.length);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
}

// Challenge 5: Blackjack

let blackjackGame = {
    'you': {
        'scoreSpan': '#blackjack-player-score',
        'div': '#blackjack-player-box',
        'score': 0
    },
    'dealer': {
        'scoreSpan': '#blackjack-dealer-score',
        'div': '#blackjack-dealer-box',
        'score': 0
    },
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardSuits' : ['C','D','H','S'],
    'cardsMap': {
        '2': 2, 
        '3': 3, 
        '4': 4, 
        '5': 5, 
        '6': 6, 
        '7': 7,
        '8': 8,
        '9': 9, 
        '1': 10, 
        'J': 10, 
        'Q': 10, 
        'K': 10, 
        'A': [1,11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};
// CODE FROM https://wsvincent.com/javascript-object-oriented-deck-cards/ FOR CREATING FULL DECK
class Deck{
    constructor(){
        this.deck = [];
        this.reset();
        this.shuffle();
    }
    reset(){
        this.deck = [];
    
        const suits = ['H', 'S', 'C', 'D'];
        const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    
        for (let suit in suits){
            for (let value in values){
                this.deck.push(`${values[value]}${suits[suit]}`);
            }
        }
    }
    shuffle(){
        const {deck} = this;
        let m = deck.length, i;
        while(m){
            i = Math.floor(Math.random() * m--);
            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
        return this;
    }
    deal(){
        return this.deck.pop();
    }
}
const blackjackPlayer = blackjackGame['you'];
const blackjackDealer = blackjackGame['dealer'];
const fullDeck = new Deck();
const hitSound = new Audio('../sounds/swish.m4a');
const winSound = new Audio('../sounds/cash.mp3');
const lossSound = new Audio('../sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        if (fullDeck.deck.length === 0){
            fullDeck.reset();
        }
        let card = fullDeck.deal();
        let cardValue = card[0];
        showCard(card, blackjackPlayer);
        updateScore(cardValue,blackjackPlayer);
        showScore(blackjackPlayer);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * blackjackGame['cards'].length);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `../../images/cardsPNG/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true){
        let yourImages = document.querySelector('#blackjack-player-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#blackjack-dealer-box').querySelectorAll('img');

        for (let i = 0; i <yourImages.length; i++){
            yourImages[i].remove();
        }

        for (let i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }

        blackjackPlayer['score'] = 0;
        blackjackDealer['score'] = 0;

        document.querySelector('#blackjack-player-score').textContent = 0;
        document.querySelector('#blackjack-dealer-score').textContent = 0;

        document.querySelector('#blackjack-player-score').style.color = 'white';
        document.querySelector('#blackjack-dealer-score').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play!";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['isStand'] = false;
        blackjackGame['turnsOver'] = false;
    }
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        dealerLogic();
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    if (blackjackPlayer['score'] > 11 && blackjackGame['turnsOver'] === false && blackjackGame['isStand'] === false){
        blackjackGame['isStand'] = true;
        await sleep(1000);
        while (blackjackDealer['score'] <= 15 && blackjackGame['turnsOver'] === false){
            if (fullDeck.deck.length === 0){
                fullDeck.reset();
            }
            let card = fullDeck.deal();
            let cardValue = card[0];
            showCard(card, blackjackDealer);
            updateScore(cardValue,blackjackDealer);
            showScore(blackjackDealer);
            await sleep(1000);
            if (blackjackDealer['score'] >= 16){
                blackjackGame['turnsOver'] = true;
                let winner = computeWinner();
                showResult(winner);
            }
            
        }
    }
}

function computeWinner(){
    let winner;
    if (blackjackPlayer['score'] <= 21 ){
        if (blackjackPlayer['score'] > blackjackDealer['score'] || blackjackDealer['score'] > 21){
            blackjackGame['wins']++;
            winner = blackjackPlayer;
        } else if (blackjackPlayer['score'] < blackjackDealer['score']){
            blackjackGame['losses']++;
            winner = blackjackDealer;
        } else if (blackjackPlayer['score'] === blackjackDealer['score']){
            blackjackGame['draws']++;
        }

    } else if (blackjackPlayer['score'] > 21 && blackjackDealer['score'] <= 21){
        blackjackGame['losses']++;
        winner = blackjackDealer;
    } else if (blackjackPlayer['score'] > 21 && blackjackDealer['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true){
        if (winner === blackjackPlayer){
            document.querySelector('#blackjack-wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === blackjackDealer){
            document.querySelector('#blackjack-losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        } else{
            document.querySelector('#blackjack-draws').textContent = blackjackGame['draws'];
            message = 'Draw!';
            messageColor = 'yellow';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}