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
