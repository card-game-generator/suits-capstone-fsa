import Deck from '../Deck';

const Deck1 = new Deck();

export default Deck1;

//expects to check if move/click is valid based on the target value
export function validator(event) {
  //check if context.target is equal to event.target.name
  if(context.target === event.target.name) {
    context.source[context.sourceAction](event.target.value)
    context.target[context.targetAction](event.target.value)
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
