
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

      for (j = 0; j < shuffledStack.length; j++) {
        if (rando === shuffledStack[j]) {
          --i;
        }
      }
    }
    return shuffledStack;
  }


let imgTag = document.createElement('img');
let showPlayerCard = document.getElementById('playerHand');
let showPlayerCard2 = document.getElementById('playerHand2');
let showDealerCard = document.getElementById('dealerHand');
let showDealerCard2 = document.getElementById('dealerHand2');
let pickACard = shuffledStack.shift();
let playerCards = [];
let dealerCards = [];


function spliced(shuffledStack) {
  shuffle();
  shuffledStack = shuffledStack.splice(0, 4);
  return shuffledStack;
}
let card = spliced(shuffledStack);


//First deal out of 4 cards
function deal() {
  shuffle();
  let imgTag = document.createElement('img');
  let imgTag2 = document.createElement('img');
  let imgTag3 = document.createElement('img');
  let imgTag4 = document.createElement('img');

  for(let i = 0; i < card.length; i++) {
    if (i % 2 === 0) {
      playerCards.push(card[i]);
    } else {
      dealerCards.push(card[i]);
    }
  }

  for(let i = 0; i < playerCards.length; i++) {
    if (i % 2 === 0) {
      imgTag.src = playerCards[i].image;
      showPlayerCard.append(imgTag);
    } else {
      imgTag2.src = playerCards[i].image;
      showPlayerCard2.append(imgTag2);
    }
  }

  for(let i = 0; i < dealerCards.length; i++) {
    if (i % 2 === 0) {
      imgTag3.src = dealerCards[i].image;
      showDealerCard.append(imgTag3);
    } else {
      imgTag4.src = dealerCards[i].image;
      showDealerCard2.append(imgTag4);
    }
  }
playerCount();
dealerCount();
}


//Calculate Player and Dealer total
function playerCount() {
  let count = 0;
  if(playerCards.length > 0) {
    for(let i = 0; i < playerCards.length; i++) {
      count += playerCards[i].points;
    }
  }
  let display = document.getElementById('playerTotal');
  display.innerText = `Player Cards Value: ${count}`;
}

function dealerCount() {
  let count = 0;
  if(dealerCards.length > 0) {
    for(let i = 0; i < dealerCards.length; i++) {
      count += dealerCards[i].points;
    }
  }
  let display = document.getElementById('dealerTotal');
  display.innerText = `Dealer Cards Value: ${count}`;
}

function restOfDeck(shuffledStack) {
  shuffledStack = shuffledStack.splice(0, 1);
  return shuffledStack;
}
let newCards = restOfDeck(shuffledStack);
console.log(newCards);

let n = 0;

function hitMe() {
  let newImgTag = document.createElement('img');
  newImgTag.src = newCards[n].image;
  playerCards.push(newCards[n]);
  showPlayerCard2.append(newImgTag)
  playerCount();
  restOfDeck(shuffledStack);
}



