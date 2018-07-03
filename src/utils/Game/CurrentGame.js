import Deck from '../Deck';
import Player from '../Player';
import Field from '../Field';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export function createGame(numPlayers, numCardsPerPlayer) {
  const deck = new Deck();
  const field = new Field();
  deck.shuffle();
  const players = [];

  for (let i = 1; i <= numPlayers; i++) {
    let player = new Player(`player ${i}`);
    player.createHand(numCardsPerPlayer, deck);
    players.push(player);
  }
  return { players, deck, field };
}

//expects to check if move/click is valid based on the target value
export function validator(currPhase, source, target, request) {
  // SOURCE IS ALWAYS CURRENT PLAYER...
  socket.emit('message', { message: 'hi' });
  socket.on('message', payload => {
    console.log(payload);
  });
  let result = false;
  // if theres no target, run the source action by default
  if (!target) {
    result = source[currPhase.sourceAction]();
    // else make sure that the target is valid
  } else if (currPhase.target === target.type) {
    const found = target[currPhase.targetAction](request);
    if (found) {
      source[currPhase.sourceAction](found);
      result = true;
    }
    // if the player clicks on invalid target
  } else {
    alert(`You can't do that`);
    return 'invalid';
  }
  return result;
}

/* winCheck will run at the end of each phase,
depending on the whenToCheck string it'll run the
appropriate function from the winningConditions helper func */
export function winCheck(currPhase, state) {
  let { deck, players, currentPlayerIdx, whatToCheck, whenToCheck } = state;
  if (whenToCheck === 'When deck is empty') {
    if (deck.cards.length === 0) {
      // run whatToCheck
      let winner = winningConditions(whatToCheck);
      alert('The winner is: ' + winner.name);
      // then run an endGame function
    }
  }

  function winningConditions(condition) {
    let highestScore = 0,
      highestCardCount = 0,
      lowestCardCount = 52,
      winningPlayer = {};
    players.forEach(player => {
      switch (condition) {
        case 'Player with highest score':
          if (player.score > highestScore) {
            highestScore = player.score;
            winningPlayer = player;
          }
          // if two players both have the highest score then THERE IS NO WINNER!!!!!!
          if (player.score === highestScore) winningPlayer = {};
          break;
        case 'Player with most cards':
          if (player.hand.length > highestCardCount) {
            highestCardCount = player.hand.length;
            winningPlayer = player;
          }
          if (player.hand.length === highestCardCount) winningPlayer = {};
          break;
        case 'Player with least cards':
          if (player.hand.length < lowestCardCount) {
            lowestCardCount = player.hand.length;
            winningPlayer = player;
          }
          if (player.hand.length === lowestCardCount) winningPlayer = {};
          break;
      }
    });
    if (!winningPlayer.name) winningPlayer.name = 'NO ONE';
    return winningPlayer;
  }
}
