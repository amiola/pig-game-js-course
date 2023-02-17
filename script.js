'use strict';

//SELECTING ELEMENTS

const score0El = document.querySelector('#score--0'); //score0Element

//ANOTHER WAY TO SELECT ELEMENTS BASED ON IDS:
const score1El = document.getElementById('score--1'); //we just put the name of the id
//it works the same way, but it's a little bit faster
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currP0El = document.getElementById('current--0');
const currP1El = document.getElementById('current--1');

let currScore, currPlayer, scores, gameOn;

//STARTING CONDITIONS
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currP0El.textContent = 0;
  currP1El.textContent = 0;
  currScore = 0;
  currPlayer = 0;
  scores = [0, 0];
  gameOn = true;
  
  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${currPlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//SWITCHING PLAYERS
const switchPlayer = function () {
  /*
  document
    .querySelector(`.player--${current}`)
    .classList.remove('player--active');*/
  currScore = 0;
  document.getElementById(`current--${currPlayer}`).textContent = currScore;
  /*
    currP0El.textContent = currScore;
    currP1El.textContent = currScore;
    */
  currPlayer === 0 ? (currPlayer = 1) : (currPlayer = 0);
  //TOGGLE: if the class is not in the element, it will add the class, and if it's in there, it will remove the class.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  /*
  document
    .querySelector(`.player--${currPlayer}`)
    .classList.add('player--active');*/
  /*
  if (current === 0) {
    currPlayer = 1;
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    currPlayer = 0;
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }*/
};

//HIDE THE DICE
diceEl.classList.add('hidden');

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (gameOn) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    //2.1. Remove hidden class
    diceEl.classList.remove('hidden');
    //2.2. Slect the image by the number of the dice
    //CHANGING THE IMAGE SOURCE
    diceEl.src = `dice-${dice}.png`;
    //3. Check for the rolled 1
    if (dice !== 1) {
      //add the dice to the current score
      currScore += dice;
      document.getElementById(`current--${currPlayer}`).textContent = currScore;
      /*
      ? (currP0El.textContent = currScore)
      : (currP1El.textContent = currScore);
      */
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//USE HOLDS SCORE
btnHold.addEventListener('click', function () {
  if (gameOn) {
    //1. Add current score to active player´s score
    scores[currPlayer] += currScore;
    document.getElementById(`score--${currPlayer}`).textContent =
      scores[currPlayer];
    /*
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  */
    //2. Check if player's score is above 100
    if (scores[currPlayer] >= 100) {
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.remove('player--active');
      gameOn = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//NEW GAME
btnNew.addEventListener('click', init);
