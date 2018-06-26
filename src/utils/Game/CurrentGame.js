import Deck from '../Deck';
import Player from '../Player';

export function createGame(numPlayers, numCardsPerPlayer) {
  const currentDeck = new Deck();
  currentDeck.shuffle();
  const players = [];

  for (let i = 1; i <= numPlayers; i++) {
    let player = new Player(`player ${i}`);
    player.createHand(numCardsPerPlayer, currentDeck);
    players.push(player);
  }
  return { players, currentDeck };
}

//expects to check if move/click is valid based on the target value
export function validator(currPhase, source, target, request) {
  // check if currPhase.target is equal to event.target.name
  if (currPhase.target === target.type) {
    // were expecting currPhase.source to be an instance of a player
    // currPhase.source
    const found = target[currPhase.targetAction](request);
    //We are assuming that the source is the current player
    if (found) {
      source[currPhase.sourceAction](found);
    }

    // if theres a dependent action, then run the validator again
    // THIS IS EXPECTING TARGET AND SOURCE TO BE UNCHANGED
    if (currPhase.dependentPhase) {
      validator(currPhase.dependentPhase, source, target, request);
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
