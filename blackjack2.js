
const cardValue = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
const cardSuit = ['spades', 'hearts', 'clubs', 'diamonds'];
let cardStack = [];
let dealer = [];
let player = [];
let showPlayerCard = document.getElementById('playerHand');
let showDealerCard = document.getElementById('dealerHand');
let hitCard = false;
let dealingHands = false;
var playerStand = false;
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

function secondDealerCard() {
  let img = document.createElement('img');
  img.src = 'Cards/cardBack_red.png';
  img.points = 0;
  let dealerDisplay = document.getElementById('playerTotal');
  showDealerCard.append(img);
  dealer.push(img);
  console.log(dealer);
}

function removeSecondCard() {
  let dealtHand = document.getElementById('dealerHand');
  dealtHand.removeChild(dealtHand.childNodes[1]);
}



// When player chooses to stand
// Compare Dealer hand to Player hand when Player "stands"





// Compare Dealer hand to Player hand excluding Player "stand"
  function compare() {


  let dealerDisplay = document.getElementById('dealerTotal');
  let playerDisplay = document.getElementById('playerTotal');
  let surrenderDisplay = document.getElementById('surrended');
// Dealer Count
  let dealerCount = 0;
  if (dealer.length > 0) {
    for (let i = 0; i < dealer.length; i++) {
      if (dealer[i].value === 'ace' && dealerCount > 21) {
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
      if (player[i].value === 'ace' && playerCount > 21) {
        player[i].points = 1;
        playerCount += player[i].points;
      } else {
      playerCount += player[i].points;
      }
    }
  playerDisplay.innerText = `Player Cards Value: ${playerCount}`;
  }


  console.log('compare function is run');

      setTimeout(function() {
      if (dealerCount >= 17 && dealerCount === playerCount) {
          alert('PUSH!');
          gameReset();
      } else if (playerCount == 21 && dealerCount != 21) {
          alert('YOU WIN!');
          gameReset();
      } else if (playerCount > 21) {
          alert('BUSTED, YOU LOSE!');
          gameReset();
      } else if (dealerCount == 17 && dealerCount < playerCount && playerCount <= 21) {
          alert('YOU WIN!');
          gameReset();
      } else if (dealerCount == 21 && playerCount <= 21) {
          alert('YOU LOSE!');
          gameReset();
      } else if (dealerCount > 21) {
        alert('YOU WIN!');
        gameReset();
      } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount > playerCount) {
          alert('YOU LOSE! this should work everytime');
          gameReset();
          return;
      } else if (dealerCount < 21 && dealerCount < playerCount && dealerCount >= 17) {
          alert('YOU WIN!');
          gameReset();
      // } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount > playerCount) {
      //     alert('YOU LOSE! this should work everytime');
      //     console.log('hello there!');
      //     gameReset();
      } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount < playerCount) {
          alert('YOU WIN!');
          gameReset();
      } else {
        console.log('no reset, return');
        return;
      }
    }, 800);
    console.log(playerCount);

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

    function makeFalse() {
          hitCard = false;
          dealingHands = false;
          playerStand = false;
          surrenderHand = false;
    }
  makeFalse();
  console.log('reset function is run');
  console.log(hitCard);
  console.log(playerStand);
  }


if (playerStand) {
    console.log(playerStand);
    if (dealerCount < playerCount) {
        setTimeout(function() {
          console.log('dealer adds a card!');
          dealDealer();
          // playerStand = false;
          compare();
        }, 1000);
     }
  }

}







// Deal hand(s) to start game
function startDeal() {
  dealPlayer();
  setTimeout(function() {
    dealDealer();
      setTimeout(function() {
        dealPlayer();
          setTimeout(function() {
            secondDealerCard();
            compare();
          }, 800);
      }, 800);
  }, 800);
}


// Player decides to take a "hit"
function hit() {
  dealPlayer();
  compare();
  console.log('hitCard is true');
}


// Player decides to "stay"
function stay() {
  removeSecondCard();
  dealDealer();
  playerStand = true;
  compare();
  console.log('stay function runs');
}










