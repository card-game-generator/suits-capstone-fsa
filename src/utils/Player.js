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
  giveCard(reqCard, target) {
    let cardFound = target.hand.find(card => Number(card.value) === reqCard);
    if (cardFound) {
      target.hand.splice(target.hand.indexOf(cardFound), 1);
      return cardFound;
    }
    return null;
  }

  addCard(card) {
    this.hand.push(card);
  }
}

export default Player;
