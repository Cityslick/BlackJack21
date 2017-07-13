
let cardValue = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
let cardSuit = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
let cardStack = [];
let shuffledStack = [];
let dealer = [];
let player = [];




//Create an array of sequential cards and suits to get 52 cards

function cards() {

  for(let i = 0; i < cardValue.length; i++) {
    for (let j = 0; j < cardSuit.length; j++) {
      let deck = {
        value: cardValue[i],
        suit: cardSuit[j]
      };
      cardStack.push(deck);
    }
  }


  for(let i = 0; i < cardStack.length; i++) {
    switch(cardStack[i].value) {
      case 'Ace':
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
      case 'Jack':
      case 'King':
      case 'Queen':
        cardStack[i].points = 10;
        break;
    }
  }
  return cardStack;
}


console.log(cards());
console.log(cardStack.length);

//Shuffle the cards

function shuffle() {
  for(let i = 0; i < cardStack.length; i++) {
      let rando = cardStack[Math.floor(Math.random() * cardStack.length)];
      let shuffled = {
        value: rando.value,
        suit: rando.suit
      };
      shuffledStack.push(shuffled);
    }
    return shuffledStack;
  }

console.log(shuffle());
console.log(shuffledStack[4]);




//Appending images?!?!?!?!
let displayCards = ['wood-grain.jpg'];
let showCard = document.getElementById('logo8');
let imgTag = document.createElement('img');
imgTag.src = displayCards[0];
showCard.append(imgTag);
