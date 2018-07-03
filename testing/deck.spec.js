import { expect } from 'chai';
import Deck from '../src/utils/Deck';

const deck = new Deck();

describe('Deck class', () => {
  it('deck has 52 cards', () => {
    expect(deck.cards.length).to.equal(52);
    //deck.size returns 0?
  });
  it('values for cards in deck have card properties', () => {
    expect(deck.cards[0]).to.have.property('suit');
    expect(deck.cards[1]).to.have.property('value');
  });
  it('can give a card away', () => {
    deck.giveCard();
    expect(deck.cards.length).to.equal(51);
    deck.giveCard();
    expect(deck.cards.length).to.equal(50);
  });
  it('returns false if you try to get a card from an empty deck', () => {
    deck.cards = [];
    expect(deck.giveCard()).to.equal(false);
  });
});
