import Deck from '../Deck';
import Player from '../Player';

export function createGame(numPlayers, numCardsPerPlayer) {
  const currentDeck = new Deck();
  currentDeck.create();
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
export function validator(event, context, target, source) {
  console.log('event name:', event.target.name, 'context:', context.target);
  // check if context.target is equal to event.target.name
  if (context.target === event.target.name) {
    console.log('stuff', source, context.sourceAction);
    // were expecting context.source to be an instance of a player

    source[context.sourceAction](event.target.value);
    target[context.targetAction](event.target.value);
    return true;
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
