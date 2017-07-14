
const cardValue = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
const cardSuit = ['spades', 'hearts', 'clubs', 'diamonds'];
let cardStack = [];
let dealer = [];
let player = [];
let showPlayerCard = document.getElementById('playerHand');
let showDealerCard = document.getElementById('dealerHand');
let dealingHands = true;




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
    playerCardTotal();
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
    dealerCardTotal();
  }
}

// Calculate player total points

function playerCardTotal() {
  var playerCount = 0;
  if (player.length > 0) {
    for (let i = 0; i < player.length; i++) {
      if (player[i].value === 'ace' && player.length > 2) {
        player[i].points = 1;
        playerCount += player[i].points;
      } else {
      playerCount += player[i].points;
    }
  }
  let display = document.getElementById('playerTotal');
  display.innerText = `Player Cards Value: ${playerCount}`;
  }
}



function dealerCardTotal() {
  var dealerCount = 0;
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
  let display = document.getElementById('dealerTotal');
  display.innerText = `Dealer Cards Value: ${dealerCount}`;
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
            }, 800);
        }, 800);
    }, 800);
    dealingHands = false;
  } else {
    return;
  }
}

// Player decides to take a "hit"
function hit() {
  dealPlayer();
}


// Player decides to "stay"
function stay() {
  dealDealer();
}


// Check for win
function checkWinner() {

 if (playerCount > 21) {

    alert('hello!');
    console.log('BUSTED!');
    playerCount = 0;
    dealerCount = 0;
    player = [];
    dealer = [];

    setTimeout(function() {
    cards();
    shuffle(cardStack);
    showPlayerCard.innerHTML = '';
    showDealerCard.innerHTML = '';
    dealingHands = true;
    }, 2000);
  } else if (playerCount == 21) {
    console.log('WINNER!');
  }
}








