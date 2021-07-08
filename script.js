"use strict";

// Naming the players:
////// 1) using the hardcoding method (to be akcnowledged, not to be used)
/*
const playerOne = prompt('Qual o nome do Jogador 01?');
document.querySelector('#name--0').textContent = playerOne;
const playerTwo = prompt('Qual o nome do Jogador 02?');
document.querySelector('#name--1').textContent = playerTwo;
*/

////// 2) using a function

let listPlayers = [];

const playersNamesInput = function (nbrPlayers) {
  for (let i = 0; i < nbrPlayers; i++) {
    listPlayers[i] = prompt(`What's the name of Player ${i + 1}?`);
  }
  return listPlayers;
};

playersNamesInput(2); //In this particular game, it'll always be 2 players

/* FIND BELOW THE FUNCTION TO BE USED IN CASE YOU WANT THE USER TO TELL YOU HOW MANY PLAYERS ARE GOING TO PLAY PROVIDED THAT, OF COURSE, YOUR GAME ALLOWS 2+ PLAYERS:

const numberPlayers = function () {
  const howManyPlayers = Number(prompt('How many players?'));
  howManyPlayers < 2
    ? alert('The number of players must be 2+. Please refresh the page.')
    : playersNames(howManyPlayers);
};

numberPlayers();
*/

let playerName = document.querySelectorAll(".name");

const playersNamePrint = function () {
  for (let i = 0; i < listPlayers.length; i++) {
    playerName[i].textContent = listPlayers[i];
  }
};

playersNamePrint();

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const current0El = document.querySelector("#current--0");
const score1El = document.querySelector("#score--1");
const current1El = document.querySelector("#current--1");
let currentScoreBoth = document.querySelectorAll(".current-score");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Initial conditions variables
let currentScore, activePlayer, playing, scores;

const gameStart = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  for (let i = 0; i < currentScoreBoth.length; i++) {
    currentScoreBoth[i].textContent = 0;
  }

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");

  playersNamePrint();
};

gameStart();

//Function to switch players
const playerSwitch = function () {
  //sugestão do prof de como zerar os scores qd muda o player ⬇️
  //document.getElementById(`current--${activePlayer}`).textContent = 0;

  //switch to the other player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //In other words: is the activePlayer "0"? Yes? So Switch to "1". No? So switch do "0"
  currentScore = 0;
  //Toggling the class .active--player ⬇️
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");

  // minha sugestão de como zerar os scores qd muda o player ⬇️
  for (let i = 0; i < currentScoreBoth.length; i++) {
    currentScoreBoth[i].textContent = 0;
  }
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate a random number (dice roll)
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice image according to the number outcome
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. Check if number 1 was outcome; if TRUE, switch to the other player
    if (dice !== 1) {
      //Add the value of dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      playerSwitch();
    }
  }
});

//Holding score functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to the active player's global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if the active player's score is < 100
    if (scores[activePlayer] < 100) {
      playerSwitch();
    } else {
      playing = false;
      diceEl.classList.add("hidden");
      playerName[
        activePlayer
      ].textContent = `${playerName[activePlayer].textContent} WINS!`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
  }
});

//Resetting the game
////Suggestion #1 - reload the document
/*
btnNew.addEventListener('click', function () {
  location.reload();
});
*/
////Suggestion #2 -
btnNew.addEventListener("click", gameStart);
