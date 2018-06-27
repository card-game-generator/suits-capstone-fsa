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

  incrementScore() {
    this.score++;
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

  // returns true if a player has any card 4x, false otherwise
  has4OfAKind() {
    const cardCount = {};
    this.hand.forEach(card => (cardCount[card] = ++cardCount[card] || 1));
    return Object.values(cardCount).filter(value => value === 4).length >= 1;
  }
}

export default Player;
