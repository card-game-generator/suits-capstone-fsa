class Player {
  constructor(name) {
    this.name = name;
    this.hand = []; //array of Cards
    this.isCurrentPlayer = false;
    this.score = 0;
    this.type = 'player';
  }

  createHand(numCards, currDeck) {
    let dealtCards = [];
    if (currDeck.size < numCards) {
      throw new Error('Not enough cards');
    }
    let temp = [...currDeck.cards];
    dealtCards = temp.splice(0, numCards);
    currDeck.cards = temp;
    this.hand = dealtCards;
  }

  changeScore(num) {
    this.score += num;
  }

  // this func is expecting reqCard to be a VALUE (without SUIT)
  giveCard(reqCard) {
    let cardFound = this.hand.find(card => card.value === String(reqCard));
    if (cardFound) {
      this.hand.splice(this.hand.indexOf(cardFound), 1);
      return cardFound;
    }
    return null;
  }

  addCard(card) {
    this.hand.push(card);
  }
}

export default Player;
