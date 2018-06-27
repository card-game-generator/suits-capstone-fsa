import React, { Component } from 'react';
import PlayerComp from './Player';
import DeckComp from './Deck';
import { validator, createGame } from '../../utils/Game/CurrentGame';
// import BoardContext, {
//   currentGame,
//   turn,
//   whatToCheck,
//   whenToCheck,
// } from './components/Board/BoardContext';

//Import createGame to populate Board state for validator testing
// let currentGame = createGame(4, 7);
// let players = currentGame.players;
// let deck = currentGame.currentDeck;

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      field: 0,
      players: [],
      currentPlayerIdx: 0,
      turn: [],
      currentPhaseIdx: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.props.boardSetup });
  }

  //Handles deck click
  handleClick(target, reqCard, event) {
    event.preventDefault();
    let phase1 = this.state.turn[0];

    validator(phase1, this.state.players[this.state.currentPlayerIdx], target, reqCard);
  }

  render() {
    const deck = this.state.deck;
    return (
      //Use BoardContext Provider to pass state to children

      <div>
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
        </div>
      </div>
    );
  }
}
