import Deck from '../Deck';
import Player from '../Player';
import Field from '../Field';

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
  let incrementPhase = false;
  // if theres no target, run the source action by default
  if (!target) {
    source[currPhase.sourceAction]();
    incrementPhase = true;
    // else make sure that the target is valid
  } else if (currPhase.target === target.type) {
    const found = target[currPhase.targetAction](request);
    if (found) {
      source[currPhase.sourceAction](found);
      incrementPhase = true;
    }
  }
  return incrementPhase;
}

export function winCheck(currPhase, state) {
  let winningConditions = {
    playerHighestScore: () => {
      let highestScore = 0;
      let winningPlayer;
      players.forEach(player => {
        if (player.score > highestScore) {
          highestScore = player.score;
          winningPlayer = player;
        }
      });
      if (!winningPlayer) winningPlayer = 'No one wins!';
      return winningPlayer;
    },
  };
  let { deck, players, currentPlayerIdx, whatToCheck, whenToCheck } = state;
  if (whenToCheck === 'When deck is empty') {
    if (deck.cards.length === 0) {
      // run whatToCheck
      let winner = winningConditions[whatToCheck]();
      alert('This is the winner: ' + winner.name);
      // then run an endGame function
    }
  }
}
