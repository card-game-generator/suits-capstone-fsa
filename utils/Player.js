class Player {
  constructor(name) {
    this.name = name;
    this.hand = []; //array of Cards
    this.isCurrentPlayer = false;
    this.score = 0;
  }

  createHand(numCards, currDeck) {
    this.hand = currDeck.deal(numCards);
  }

  changeScore(num) {
    this.score += num;
  }

  // this func is expecting reqCard to be a VALUE (without SUIT)
  getCard(reqCard, target) {
    let cardFound = target.hand.find(card => Number(card.value) === reqCard);
    if (cardFound) {
      target.hand.splice(target.hand.indexOf(cardFound), 1);
      this.hand.push(cardFound);
      return this.hand;
    }
    return null;
  }
 }

 export default Player;
