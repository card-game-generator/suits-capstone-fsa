import React, { Component } from 'react';
import PlayerComp from './Player';
import DeckComp from './Deck';
import { validator } from '../../utils/Game/CurrentGame';
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
    this.checkWinCondition = this.handleWinCondition.bind(this);
    this.endTurn = this.endTurn.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.props.boardSetup });
  }

  // endTurn will run thru the remaining phases that arent dependent on
  // click events
  endTurn() {
    for (let i = this.state.currentPhaseIdx; i < this.state.turn.length; i++) {
      if (!validator(this.state.turn[i], this.state.players[this.state.currentPlayerIdx])) {
        alert(`You can't do that`);
      }
    }
    // next player's turn
    let currentPlayerIdx = ++this.state.currentPlayerIdx % this.state.players.length;
    this.setState({ currentPlayerIdx });
  }

  //Handles deck click
  handleClick(target, reqCard, event) {
    event.preventDefault();
    let currPhase = this.state.turn[this.state.currentPhaseIdx];
    // if the action is valid, increment currPhaseIdx
    if (validator(currPhase, this.state.players[this.state.currentPlayerIdx], target, reqCard)) {
      let currentPhaseIdx = this.state.currentPhaseIdx + 1;
      let currentPlayerIdx = this.state.currentPlayerIdx;
      // if the turn is over, update the currentPlayerIndex as well
      if (currentPhaseIdx >= this.state.turn.length) {
        currentPhaseIdx = 0;
        currentPlayerIdx = (this.state.currentPlayerIdx + 1) % this.state.players.length;
      }
      this.setState({ currentPhaseIdx, currentPlayerIdx });
    }
  }

  //handles moving the 'what to check' into the appropriate 'when to check' for win conditions
  checkWinCondition() {
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
            <button type="button" onClick={this.endTurn}>
              End Turn
            </button>
          </div>
          <div
            onClick={event => {
              this.handleClick(deck, event);
            }}
          >
            <DeckComp deck={this.state.deck} />
          </div>
          <button type="button" onClick={this.checkWinCondition}>
            Win Condition Check
          </button>
        </div>
      </div>
    );
  }
}
