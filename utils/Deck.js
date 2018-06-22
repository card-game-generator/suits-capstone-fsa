import Card from './Card';

class Deck {
  constructor() {
    this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    this.values = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'K',
      'Q',
      'A'
    ];
    this.deck = [];
    this.size = 52;
  }

  shuffleHelper(deck) {
    let currentIndex = deck.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    return deck;
  }

  shuffle() {
    this.deck = this.shuffleHelper(this.deck);
  }

  deal(numCards) {
    let cards = [];
    if (this.size < numCards) {
      throw new Error('there is not enough card');
    }
    let temp = [...this._deck];
    cards = temp.splice(0, numCards);
    this.deck = temp;
    return cards;
  }

  create() {
    this.values.forEach(value => {
      this.suits.forEach(suit => {
        let card = new Card(suit, value);
        this.deck.push(card);
      });
    });
  }

  show() {
    return this.deck;
  }

  size() {
    return this.size;
  }
}

export default Deck;
