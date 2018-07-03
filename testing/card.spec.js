import { expect } from 'chai';
import Card from '../src/utils/Card';

const card = new Card('clubs', 10);
describe('Card class', () => {
  it('cards have a suit and value', () => {
    expect(card).to.have.property('suit');
    expect(card).to.have.property('value');
  });
  it('values for card are the expected values', () => {
    expect(card.suit).to.equal('clubs');
    expect(card.value).to.equal(10);
  });
});
