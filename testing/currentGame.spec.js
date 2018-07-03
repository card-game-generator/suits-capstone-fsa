import { expect } from 'chai';
import { createGame, validator, winCheck } from '../src/utils/Game/CurrentGame';

describe('Create Game', () => {
  const game = createGame(4, 8);
  it('games have the specified number of players', () => {
    expect(game.players.length).to.equal(4);
  });
  it('players have the specified number of cards', () => {
    expect(game.players[0].hand.length).to.equal(8);
    expect(game.players[1].hand.length).to.equal(8);
    expect(game.players[2].hand.length).to.equal(8);
    expect(game.players[3].hand.length).to.equal(8);
  });
  it('deck has the proper number of cards', () => {
    expect(game.deck.cards.length).to.equal(20);
  });
  it('game has a field', () => {
    expect(game).to.have.property('field');
  });
});

describe('Validator', () => {});
