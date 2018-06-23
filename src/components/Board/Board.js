import React, { Component } from 'react';
import Player from '../../utils/Player';
import Deck from '../../utils/Deck';
import PlayerComp from './Player';
import { validator } from '../../utils/Game/CurrentGame';

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
      deck: 24,
      field: 0,
      players: [newPlayer],
      currentPlayerIdx: 0,
      turn: [
        {
          source: this.currentPlayerIdx,
          sourceAction: 'addCard',
          target: 'player',
          targetAction: 'giveCard',
        },
      ],
      currentPhaseIdx: 0,
    };
  }

  //Handles deck click
  handleClick(target, event) {
    console.log(target);
    // console.log(event.target.name);
    // console.log('turn', this.state.turn[0]);
    // validator(event, this.state.turn[0], target, this.state.players[this.state.currentPlayerIdx]);
    // invokes validator with the clicked component
    // console.log(target);
    // validator(target);
  }

  render() {
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
                <div onClick={event => this.handleClick(player, event)} key={player.name}>
                  <PlayerComp player={player} />
                </div>
              );
            })}
          </div>

          {/* This is rendering the deck to click */}
          <button
            onClick={event => this.handleClick(event)}
            name={this.state.deck}
            className="game-deck"
          >
            THIS IS THE DECK
          </button>
        </div>
      </BoardContext.Provider>
    );
  }
}
