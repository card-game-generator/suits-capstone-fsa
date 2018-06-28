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
  console.log(
    'in validator: the phase: ',
    currPhase,
    'SOURCE: ',
    source,
    'TARGET:',
    target,
    request
  );
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
  // if theres a dependent action, then run the validator again
  // pass in the same source from prev event since right now its the currPlayer obj always
  // if (currPhase.dependentPhase) {
  //   validator(currPhase.dependentPhase, source, currPhase.dependentPhase.target, request);
  //   incrementPhase = true;
  // }
  // the return value of the validator will determine if currPhaseIndex
  // should be incremented
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
      if (!winningPlayer) winningPlayer.name = 'No one wins!';
      return winningPlayer;
    },
  };
  let { deck, players, currentPlayerIdx, whatToCheck, whenToCheck } = state;
  if (whenToCheck === 'When deck is empty') {
    if (deck.size === 0) {
      // run whatToCheck
      let winner = winningConditions[whatToCheck]();
      alert('This is the winner: ' + winner.name);
      // then run an endGame function
    }
  }
}

/*
 phaseForm {source:..., target:....., action: []}
function functionCreator (phase) {
  phase.action.forEach(action => {
    if (action === getCard){
      return function(source, target, card) //assuming phase and target are players
      source.getCard(target, card);
    }
  })
}

onClick ===> () => {let action = functionCreator({phase});
                    action(event.source, event.target, event.card)}

*/
