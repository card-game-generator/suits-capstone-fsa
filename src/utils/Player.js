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
    // currDeck.getCards(numOfCards) returns an array of the cards OR throws error
    if (currDeck.getSize() < numCards) {
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
    //CG: Think about requesting cards could be more modular if we weren't just looking for value. 
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

  // returns true if a player has any card 4x, false otherwise. yeerrr
  //CG: this seems soooooo specific. 
  has4OfAKind() {
    const cardCount = {};
    this.hand.forEach(card => (cardCount[card.value] = ++cardCount[card.value] || 1));
    const cards = Object.keys(cardCount).filter(key => cardCount[key] === 4);
    if (cards.length > 0) {
      //CG: This seems duplicated... :thinking-face:. Maybe use splice if we don't care about mutation...which I'm assuming you don't since you're already doing it.
      const removed = this.hand.filter(card => card.value === cards[0]);
      this.hand = this.hand.filter(card => card.value !== cards[0]);
      return removed;
    }
    return false;
  }
}

export default Player;
