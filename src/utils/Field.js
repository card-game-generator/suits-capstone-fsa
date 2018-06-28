class Field {
  constructor() {
    this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    this.type = 'field';
    this.cards = [];
    this.size = this.cards.length;
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

export default Field;
