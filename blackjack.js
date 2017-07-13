
let cardValue = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
let cardSuit = ['spades', 'hearts', 'clubs', 'diamonds'];
let cardStack = [];
let shuffledStack = [];
let dealer = [];
let player = [];




//Create an array of objects to get 52 cards with suits and values

function cards() {

  for(let i = 0; i < cardValue.length; i++) {
    for (let j = 0; j < cardSuit.length; j++) {
      let deck = {
        value: cardValue[i],
        suit: cardSuit[j],
        image: `Cards/${cardValue[i]}_of_${cardSuit[j]}.png`,
      };
      cardStack.push(deck);
    }
  }


  for(let i = 0; i < cardStack.length; i++) {
    switch(cardStack[i].value) {
      case 'ace':
        cardStack[i].points = 1;
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        cardStack[i].points = cardStack[i].value;
        break;
      case 'jack':
      case 'king':
      case 'queen':
        cardStack[i].points = 10;
        break;
    }
  }
  return cardStack;
}


//Shuffle the cards

function shuffle() {
  cards();

  for(let i = 0; i < cardStack.length; i++) {
      let rando = cardStack[Math.floor(Math.random() * cardStack.length)];
      let shuffled = {
        value: rando.value,
        suit: rando.suit,
        points: rando.points,
        image: rando.image,
      };
      shuffledStack.push(shuffled);
    }
    return shuffledStack;
  }

// console.log(shuffle());

let imgTag = document.createElement('img');
let showPlayerCard = document.getElementById('playerHand');
let showDealerCard = document.getElementById('dealerHand');
let pickACard = shuffledStack.shift();
let playerCards = [];
let dealerCards = [];



function deal() {
  shuffle();
  dealPlayer();
  dealDealer();
  dealPlayer();
  dealDealer();
}

function dealPlayer() {
  let card = shuffledStack.shift();
  shuffledStack.splice(shuffledStack.indexOf(card), 1);
  playerCards.push(card);
  let imgTag = document.createElement('img');
  imgTag.src = card.image;
  showPlayerCard.append(imgTag);
}

function dealDealer() {
  let card = shuffledStack.shift();
  shuffledStack.splice(shuffledStack.indexOf(card), 1);
  dealerCards.push(card);
  let imgTag = document.createElement('img');
  imgTag.src = card.image;
  showDealerCard.append(imgTag);
}

deal();
console.log(playerCards);
console.log(dealerCards);

//Appending images?!?!?!?!
// let displayCards = ['Cards/ace_of_diamonds.png'];
// let showCard = document.getElementById('logo8');
// let imgTag = document.createElement('img');
// imgTag.src = displayCards[0];
// showCard.append(imgTag);


