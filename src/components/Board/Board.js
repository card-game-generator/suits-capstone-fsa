import React, { Component } from 'react';
import PlayerComp from './Player';
import DeckComp from './Deck';
import FieldComp from './Field';
import { validator, winCheck } from '../../utils/Game/CurrentGame';
export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck: { cards: [] },
      field: { cards: [] },
      players: [],
      currentPlayerIdx: 0,
      turn: [],
      currentPhaseIdx: 0,
      whatToCheck: '',
      whenToCheck: '',
      currPhase: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.continueTurn = this.continueTurn.bind(this);
    // this.setCurrPlayer = this.setCurrPlayer.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    // first, calc the new indexes
    let currentPhaseIdx = this.state.currentPhaseIdx + 1;
    let currentPlayerIdx = this.state.currentPlayerIdx;
    // if the turn is over, update the currentPlayerIndex as well as the currentPlayerIdx
    if (currentPhaseIdx >= this.state.turn.length) {
      currentPhaseIdx = 0;
      currentPlayerIdx = (this.state.currentPlayerIdx + 1) % this.state.players.length;
    }

    // to reset the current player
    const players = this.state.players;
    // first set the previous players isCurrentPlayer prop to false
    players[this.state.currentPlayerIdx].isCurrentPlayer = false;
    // set the new players isCurrentPlayer prop to true
    players[currentPlayerIdx].isCurrentPlayer = true;

    // the new currPhase based off the calculated currPhaseIdx
    const currPhase = this.state.turn[currentPhaseIdx];

    // then reset the state
    this.setState({
      currentPhaseIdx,
      currentPlayerIdx,
      currPhase,
      players,
    });
  }

  async componentDidMount() {
    // have to await the setstate so that then the currPhase can be added on the state...
    await this.setState({ ...this.props.boardSetup });
    // set the current player on start
    const players = this.state.players;
    players[0].isCurrentPlayer = true;
    await this.setState({ currPhase: this.state.turn[this.state.currentPhaseIdx], players });
  }

  // endTurn will run thru the remaining phases that arent dependent on
  // click events

  continueTurn() {
    const validatorResult = validator(
      this.state.currPhase,
      this.state.players[this.state.currentPlayerIdx]
    );
    const dependency = this.state.currPhase.dependency,
      dependentPhase = this.state.currPhase.dependentPhase,
      currentPlayer = this.state.players[this.state.currentPlayerIdx];

    // if theres a dependent phase, we need to run it
    if (this.state.currPhase.dependentPhase) {
      // CASES: validatorResult is dependent on TRUE, OR validatorResult is dependent on FALSE, if either is true, run the validator again on the dependent phase
      if ((dependency && validatorResult) || (!dependency && !validatorResult)) {
        validator(dependentPhase, currentPlayer);
      }
    }
    // update the state
    this.updateState();
  }

  //Handles deck click
  handleClick(target, reqCard, event) {
    event.preventDefault();
    if (
      validator(
        this.state.currPhase,
        this.state.players[this.state.currentPlayerIdx],
        target,
        reqCard
      )
    ) {
      if (this.state.currPhase.dependentPhase && this.state.currPhase.dependency) {
        this.setState({ currPhase: this.state.currPhase.dependentPhase });
      } else {
        this.updateState();
        winCheck(this.state.currPhase, this.state);
      }

      // if validator returned false, then check if theres a dependent
      // phase and set the currPhase to be that dependent phase
    } else {
      // need to account for going to the next state then
      if (this.state.currPhase.dependentPhase && !this.state.currPhase.dependency) {
        this.setState({ currPhase: this.state.currPhase.dependentPhase });
      } else {
        this.updateState();
        winCheck(this.state.currPhase, this.state);
      }
    }
  }

  render() {
    const deck = this.state.deck;
    const field = this.state.field;
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
            <button
              type="button"
              onClick={this.endTurn}
              disabled={this.state.currPhase.target !== 'null'}
            >
              End Turn
            </button>
            <button
              type="button"
              onClick={this.continueTurn}
              disabled={this.state.currPhase.target !== 'null'}
            >
              Continue Turn
            </button>
          </div>
          <div className={'deck'}>
            <DeckComp deck={deck} submitHandler={this.handleClick} />
          </div>
          <button type="button" onClick={this.checkWinCondition}>
            Win Condition Check
          </button>
        </div>
        <div>
          <FieldComp field={field} submitHandler={this.handleClick} />
        </div>
      </div>
    );
  }
}
