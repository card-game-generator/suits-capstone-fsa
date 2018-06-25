import React, { Component } from 'react';
import PlayerComp from './Player';
import DeckComp from './Deck';
import { validator, createGame } from '../../utils/Game/CurrentGame';

import BoardContext from './BoardContext';

//Import createGame to populate Board state for validator testing
let currentGame = createGame(4, 7);
let players = currentGame.players;
let deck = currentGame.currentDeck;

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck,
      field: 0,
      players,
      currentPlayerIdx: 0,
      turn: [
        {
          target: 'player',
          targetAction: 'giveCard',
          source: 'player',
          sourceAction: 'addCard'
        },
      ],
      currentPhaseIdx: 0,
    };
  }

  //Handles deck click
  handleClick(target) {
    let phase1 = this.state.turn[0]

    validator(phase1, target, this.state.players[this.state.currentPlayerIdx]);
    // // invokes validator with the clicked component
    // console.log(target);
    // validator(target);
  }

  render() {
    const deck = this.state.deck;
    return (
      //Use BoardContext Provider to pass state to children
      <BoardContext.Provider value={{ state: this.state }}>
        {/* Create game board */}
        <div className="game-board">
          <div className="player-container">
            {/* Map all players */}
            {this.state.players.map(player => {
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
