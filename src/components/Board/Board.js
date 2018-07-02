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
    this.updateState = this.updateState.bind(this);
  }

  updateState(validatorResult) {
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

    // if the validator is returning an object instead of just a bool, then lets assume theyre cards that are expecting to be added to the field (maybe the deck too later...)
    if (typeof validatorResult === 'object') {
      const toSet = { cards: [...this.state.field.cards, ...validatorResult] };
      this.setState({
        field: toSet,
      });
    }

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

  continueTurn() {
    const validatorResult = validator(
      this.state.currPhase,
      this.state.players[this.state.currentPlayerIdx]
    );
    const dependency = this.state.currPhase.dependency,
      dependentPhase = this.state.currPhase.dependentPhase,
      currentPlayer = this.state.players[this.state.currentPlayerIdx];

    // if the validator returns invalid
    if (validatorResult === 'invalid') return;

    // if theres a dependent phase, we need to run it
    if (this.state.currPhase.dependentPhase) {
      // CASES: validatorResult is dependent on TRUE and the validatorResult returned true,
      // OR validatorResult is dependent on FALSE and validatorResult returned false,
      // if either is true, run the validator again on the dependent phase
      if ((dependency && validatorResult) || (!dependency && !validatorResult)) {
        validator(dependentPhase, currentPlayer);
      }
    }
    // update the state
    this.updateState(validatorResult);
  }

  //Handles deck click
  handleClick(target, reqCard, event) {
    event.preventDefault();
    let dependentPhase = this.state.currPhase.dependentPhase,
      dependency = this.state.currPhase.dependency,
      validatorResult = validator(
        this.state.currPhase,
        this.state.players[this.state.currentPlayerIdx],
        target,
        reqCard
      );

    // if the validator returns invalid
    if (validatorResult === 'invalid') return;

    // if the validator returns true, then check if theres a dependentPhase and that the condition for the dependentPhase is also true
    if (validatorResult) {
      if (dependentPhase && dependency) {
        // if it is true, reset the currPhase on the state to the dependentPhase
        this.setState({ currPhase: dependentPhase });
        // if not, update the state and run winCheck func
      } else {
        this.updateState(validatorResult);
        winCheck(this.state);
      }
      // if the validator returned false
    } else {
      // if there is a dependentPhase and the condition for that dependentPhase is false, then update the currPhase to that dependentPhase
      if (dependentPhase && !dependency) {
        this.setState({ currPhase: dependentPhase });
      }
    }
  }

  render() {
    const deck = this.state.deck;
    const field = this.state.field;
    return (
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
