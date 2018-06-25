import React, { Component } from 'react';
import Player from '../../utils/Player';
import Deck from '../../utils/Deck';
import PlayerComp from './Player';
import DeckComp from './Deck';
import { validator, createGame } from '../../utils/Game/CurrentGame';

import BoardContext from './BoardContext';

export default class Board extends Component {
  constructor() {
    super();
    //deck assumes that we have 4 players with 7 cards, hence 52-28 = 24 cards.
    const deck = new Deck();
    deck.create();
    const newPlayer = new Player('player 1');
    newPlayer.createHand(5, deck);
    console.log(deck, newPlayer);
    this.state = {
      deck: deck,
      field: 0,
      players: [newPlayer],
      currentPlayerIdx: 0,
      turn: [
        {
          target: 'deck',
          targetAction: 'giveCard',
          source: this.currentPlayerIdx,
          sourceAction: 'addCard'
        },
      ],
      currentPhaseIdx: 0,
    };
  }

  //Handles deck click
  handleClick(target) {
    console.log(target); //player
    console.log('turn', this.state.turn[0]);
    let phase1 = this.state.turn[0]
    console.log(phase1)

    validator(phase1, target);
    // // invokes validator with the clicked component
    // console.log(target);
    // validator(target);
  }

  render() {
    console.log(this.state.deck);
    const deck = this.state.deck;
    return (
      //Use BoardContext Provider to pass state to children
      <BoardContext.Provider value={{ state: this.state }}>
        {/* Create game board */}
        <div className="game-board">
          <div className="player-container">
            {/* Map all players */}
            {this.state.players.map(player => {
              console.log(player);
              return (
                //Player component
                <button onClick={() => this.handleClick(player)} key={player.name}>
                  <PlayerComp player={player} />
                </button>
              );
            })}
          </div>
          <div
            onClick={event => {
              this.handleClick(deck, event);
            }}
          >
            <DeckComp deck={this.state.deck} />
          </div>
        </div>
      </BoardContext.Provider>
    );
  }
}
