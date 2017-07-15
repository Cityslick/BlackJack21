
const cardValue = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
const cardSuit = ['spades', 'hearts', 'clubs', 'diamonds'];
let cardStack = [];
let dealer = [];
let player = [];
let showPlayerCard = document.getElementById('playerHand');
let showDealerCard = document.getElementById('dealerHand');
let hitCard = false;
let dealingHands = false;
let playerStand = false;
let surrenderHand = false;
let playerCount;
let dealerCount;
let playerDisplay = document.getElementById('playerTotal');



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
  }
}


function cardTotals() {

  let dealerDisplay = document.getElementById('dealerTotal');
  let playerDisplay = document.getElementById('playerTotal');
  let surrenderDisplay = document.getElementById('surrended');

// Dealer Count
  let dealerCount = 0;
  if (dealer.length > 0) {
    for (let i = 0; i < dealer.length; i++) {
      if (dealer[i].value === 'ace' && dealer.length > 2) {
        dealer[i].points = 1;
        dealerCount += dealer[i].points;
      } else {
      dealerCount += dealer[i].points;
      }
    }
  dealerDisplay.innerText = `Dealer Cards Value: ${dealerCount}`;
  }


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
  playerDisplay.innerText = `Player Cards Value: ${playerCount}`;
  }

// If player surrenders their hand
  if (surrenderHand) {
    alert('YOU LOSE!');
    gameReset();
  }
// Looks for push on first deal
  if (dealingHands) {
    compare();
  }

// When player chooses to stand
  if (playerStand) {
    compareStand();
  }

// When player chooses to hit
  if (hitCard) {
      compare();
      console.log('HIT is TRUE!');
  }

  function makeFalse() {
        hitCard = false;
        dealingHands = false;
        playerStand = false;
  }

// Compare Dealer hand to Player hand when Player "stands"
  function compareStand() {
      if (dealerCount < 17) {
        setTimeout(function() {
          dealDealer();
          cardTotals();
          compare();
        }, 2000);
      } else if (dealerCount < 21 && dealerCount < playerCount && dealerCount >= 17) {
          alert('YOU WIN!');
          gameReset();
          makeFalse();
      } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount > playerCount) {
        alert('YOU LOSE!');
        gameReset();
        makeFalse();
      }
  }

// Compare Dealer hand to Player hand excluding Player "stand"
  function compare() {
      setTimeout(function() {
      if (dealerCount >= 17 && dealerCount === playerCount) {
          alert('PUSH!');
          makeFalse();
          gameReset();
      } else if (playerCount == 21 && dealerCount != 21) {
          alert('YOU WIN!');
          makeFalse();
          gameReset();
      } else if (playerCount > 21) {
          alert('BUSTED, YOU LOSE!');
          makeFalse();
          gameReset();
      } else if (dealerCount == 17 && dealerCount < playerCount && playerCount <= 21) {
          alert('YOU WIN!');
          makeFalse();
          gameReset();
      } else if (dealerCount == 21 && playerCount <= 21) {
          alert('YOU LOSE!');
          makeFalse();
          gameReset();
      } else if (dealerCount > 21) {
        alert('YOU WIN!');
        gameReset();
      } else if (dealerCount >= 17 && dealerCount < 21 && playerCount < 17) {
          surrenderDisplay.style.display = 'block';
          return;
      } else {
        return;
      }
    }, 800);
  }

function gameReset() {
  playerCount = 0;
  dealerCount = 0;
  player = [];
  dealer = [];
  setTimeout(function() {
  playerDisplay.innerText = `Player Cards Value: ${playerCount}`;
  dealerDisplay.innerText = `Dealer Cards Value: ${dealerCount}`;
  showDealerCard.innerHTML = '';
  showPlayerCard.innerHTML = '';
  }, 2000);
}

}


// Deal hand(s) to start game
function startDeal() {
  dealingHands = true;
  dealPlayer();
  setTimeout(function() {
    dealDealer();
      setTimeout(function() {
        dealPlayer();
          setTimeout(function() {
            dealDealer();
            cardTotals();
          }, 800);
      }, 800);
  }, 800);
}


// Player decides to take a "hit"
function hit() {
  hitCard = true;
  dealPlayer();
  cardTotals();
}


// Player decides to "stay"
function stay() {
  playerStand = true;
  cardTotals();
}

// Player surrenders hand
function surrender() {
  surrenderHand = true;
  cardTotals();
}








