
const cardValue = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
const cardSuit = ['spades', 'hearts', 'clubs', 'diamonds'];
let cardStack = [];
let dealer = [];
let player = [];
let showPlayerCard = document.getElementById('playerHand');
let showDealerCard = document.getElementById('dealerHand');
let dealingHands = true;
let playerStand = false;
let playerCount;
let dealerCount;




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
        cardStack[i].points = 11;
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



//Shuffle the cards - cardStack array
//Using the "Fisher-Yates "algorithm for shuffling cards and preventing duplicate picks

function shuffle(arr) {
  let len = arr.length;
  let i;
  let t;


  while (len) {
    i = Math.floor(Math.random() * len--);

    t = arr[len];
    arr[len] = arr[i];
    arr[i] = t;
  }
  return cardStack;
}

//Testing shuffle
cards(); //pushes cards objects into cardstack array
shuffle(cardStack); //cardstack array is now shuffled
console.log(cardStack) //logging shuffled stack to console

// Deal a player card and append to HTML element > show on screen
function dealPlayer() {
  if (cardStack.length > 0) {
    let card = cardStack.shift();
    let img = document.createElement('img');
    img.src = card.image;
    showPlayerCard.append(img);
    player.push(card);
    cardTotals();
  }
}

// Deal a dealer card and append to its HTML elem > show on screen
function dealDealer() {
  if (cardStack.length > 0) {
    let card = cardStack.shift();
    let img = document.createElement('img');
    img.src = card.image;
    showDealerCard.append(img);
    dealer.push(card);
    cardTotals();
  }
}


function cardTotals() {

// Dealer Count
  let dealerCount = 0;
  if (dealer.length > 0) {
    for (let i = 0; i < dealer.length; i++) {
      if (dealer[i].value === 'ace' && dealer.length > 2) {
        dealer[i].points = 1;
        dealerCount += dealer[i].points;
      }
      dealerCount += dealer[i].points;
    }
  } else {
    dealerCount = 0;
  }
  let dealerDisplay = document.getElementById('dealerTotal');
  dealerDisplay.innerText = `Dealer Cards Value: ${dealerCount}`;

// Player Count
  let playerCount = 0;
  if (player.length > 0) {
    for (let i = 0; i < player.length; i++) {
      if (player[i].value === 'ace' && player.length > 2) {
        player[i].points = 1;
        playerCount += player[i].points;
      } else {
      playerCount += player[i].points;
      }
    }
  let playerDisplay = document.getElementById('playerTotal');
  playerDisplay.innerText = `Player Cards Value: ${playerCount}`;
  }


// When Player chooses to "stay" on their hand
  if(playerStand) {
      setTimeout(function() {
        if (dealerCount === playerCount) {
          alert("PUSH!");
          return;
        }
          else if (dealerCount == 17) {
          compare();
        } else if (dealerCount < 17 && hitStay){
          dealDealer();
          compare();
        } else {
          compare();
        }
      }, 800);
  }

// Compare Dealer hand to Player hand
  function compare() {
    if (dealerCount == 21 && dealerCount > playerCount) {
      alert('You Lose!');
      return;
    } else if (dealerCount > 21 && playerCount <= 21) {
      alert('You Won!');
      return; //reset function goes here
    } else if (dealerCount > playerCount && dealerCount < 21 && hitStay) {
      alert('You Lose!');
      return;
    } else {
      return;
    }
  }

// Player Win Conditions
if (playerCount > 21) {
      setTimeout(function() {
      alert('Busted!');
      }, 800);
      return; // reset function goes here;
  } else if (playerCount == 21) {
      stay();
  } else {
    return;
  }




}


// Deal hand(s) to start game
function startDeal() {
  if (dealingHands) {
    dealPlayer();
    setTimeout(function() {
      dealDealer();
        setTimeout(function() {
          dealPlayer();
            setTimeout(function() {
              dealDealer();
              playerStand = true;
              cardTotals();
            }, 800);
        }, 800);
    }, 800);
    dealingHands = false;
  } else {
    return;
  }
}

let hitStay = false;
// Player decides to take a "hit"
function hit() {
  dealPlayer();
  hitStay = true;
}


// Player decides to "stay"
function stay() {
  setTimeout(function() {
    dealDealer();
    playerStand = true;
    hitStay = true;
  }, 800);
}










