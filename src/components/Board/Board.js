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
          targetAction: 'incrementScore',
          source: 'null',
          sourceAction: 'null',
          // if there's a nested phase:
          // dependentPhase: {
          //   target: 'player',
          //   targetAction: 'giveCard',
          //   source: 'player',
          //   sourceAction: 'addCard',
          // },
        },
        {
          target: 'player',
          targetAction: 'incrementScore',
          source: 'null',
          sourceAction: 'null',
          // if there's a nested phase:
          // dependentPhase: {
          //   target: 'player',
          //   targetAction: 'giveCard',
          //   source: 'player',
          //   sourceAction: 'addCard',
          // },
        },
      ],
      currentPhaseIdx: 0,
      whatToCheck: 'Player with highest score',
      whenToCheck: 'End of each phase',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleWinCondition = this.handleWinCondition.bind(this);
  }

  //Handles deck click
  handleClick(target, reqCard, event) {
    event.preventDefault();
    let phase1 = this.state.turn[0];

    validator(phase1, this.state.players[this.state.currentPlayerIdx], target, reqCard);
  }

  //handles moving the 'what to check' into the appropriate 'when to check' for win conditions
  handleWinCondition(event) {
    if (this.state.whenToCheck === 'End of each turn') {
      this.setState({
        turn: [...this.state.turn, { whatToCheck: this.state.whatToCheck }],
      });
    }

    if (this.state.whenToCheck === 'End of each phase') {
      this.state.turn.map(phase => {
        this.setState(prevState => ({
          turn: [...prevState.turn, { whatToCheck: this.state.whatToCheck }],
        }));
      });
      // this.state.turn.map(phase => {
      //   console.log(phase);
      //   this.setState({
      //     turn: [{ ...phase, whatToCheck: this.state.whatToCheck }],
      //   });
      // });
    }

    if (this.state.whenToCheck === 'When deck is empty') {
      if (this.state.deck === 0) {
        console.log('idk what to do here');
      }
    }
  }

  render() {
    const deck = this.state.deck;
    console.log('STATE', this.state);

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
                <button key={player.name}>
                  <PlayerComp submitHandler={this.handleClick} player={player} />
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
          <button type="button" onClick={this.handleWinCondition}>
            Win Condition Check
          </button>
        </div>
      </BoardContext.Provider>
    );
  }
}
