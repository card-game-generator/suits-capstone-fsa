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
      whatToCheck: '',
      whenToCheck: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleWinCondition = this.handleWinCondition.bind(this);
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

  //handles moving the 'what to check' into the appropriate 'when to check' for win conditions
  handleWinCondition(event) {
    if (this.state.whenToCheck === 'End of each turn') {
      this.setState({
        turn: [...this.state.turn, { whatToCheck: this.state.whatToCheck }],
      });
    }

    if (this.state.whenToCheck === 'End of each phase') {
      let newTurn = this.state.turn.map(phase => {
        phase = { ...phase, whatToCheck: this.state.whatToCheck };
        return phase;
      });
      this.setState({ turn: newTurn });
    }

    if (this.state.whenToCheck === 'When deck is empty') {
      if (this.state.deck === 0) {
        console.log('idk what to do here');
      }
    }
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
          <button type="button" onClick={this.handleWinCondition}>
            Win Condition Check
          </button>
        </div>
      </div>
    );
  }
}
