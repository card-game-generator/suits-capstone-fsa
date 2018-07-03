import { expect } from 'chai';
import Player from '../src/utils/Player';
import Card from '../src/utils/Card';

const player = new Player('jack');

describe('player class', () => {
  before(() => {
    const cards = [];
    cards.push(new Card('clubs', '10'));
    cards.push(new Card('hearts', '8'));
    player.addCard(cards[0]);
    player.addCard(cards[1]);
  });

  describe('player hand', () => {
    it('player hand should have proper number of cards', () => {
      expect(player.hand.length).to.equal(2);
    });
    it('cards are what we expect them to be', () => {
      expect(player.hand[0].value).to.equal('10');
      expect(player.hand[1].value).to.equal('8');
      expect(player.hand[0].suit).to.equal('clubs');
      expect(player.hand[1].suit).to.equal('hearts');
    });
    it('you can add to hand', () => {
      player.addCard(new Card('spades', '3'));
      expect(player.hand[2].value).to.equal('3');
    });
    it('you can check for four of a kind', () => {
      player.addCard(new Card('spades', '3'));
      player.addCard(new Card('spades', '3'));
      player.addCard(new Card('spades', '3'));
      expect(player.has4OfAKind().length).to.equal(4);
    });
    it('can give away a card', () => {
      expect(player.giveCard(10).value).to.equal('10');
    });
    it('returns null if trying to give card that does not exist', () => {
      expect(player.giveCard(3)).to.equal(null);
    });
    it('four of a kind returns false if there arent four matching values', () => {
      expect(player.has4OfAKind()).to.equal(false);
    });
  });
  describe('Player score', () => {
    it('score is initially 0', () => {
      expect(player.score).to.equal(0);
    });
    it('score can increment', () => {
      player.incrementScore();
      expect(player.score).to.equal(1);
      player.incrementScore();
      expect(player.score).to.equal(2);
    });
  });

  describe('Player properties', () => {
    it('player has proper name', () => {
      expect(player.name).to.equal('jack');
    });
  });
});
