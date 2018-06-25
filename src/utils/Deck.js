import Card from './Card';

class Deck {
  constructor() {
    this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    this.size = 52;
    this.type = 'deck';
    this.cards = [];
    this.create();
  }

  shuffleHelper(cards) {
    let currentIndex = cards.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  }

  shuffle() {
    this.cards = this.shuffleHelper(this.cards);
  }

  create() {
    this.values.forEach(value => {
      this.suits.forEach(suit => {
        let card = new Card(suit, value);
        this.cards.push(card);
      });
    });
  }

  show() {
    return this.cards;
  }

  size() {
    return this.size;
  }
}

export default Deck;
