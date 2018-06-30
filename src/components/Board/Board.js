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
    // this.checkWinCondition = this.checkWinCondition.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.continueTurn = this.continueTurn.bind(this);
    this.setCurrPlayer = this.setCurrPlayer.bind(this);
  }

  setCurrPlayer(newPlayerIdx) {
    const players = this.state.players;
    players[this.state.currentPlayerIdx].isCurrentPlayer = false;
    players[newPlayerIdx].isCurrentPlayer = true;
    this.setState({ players });
  }

  async componentDidMount() {
    // have to await the setstate so that then the currPhase can be added on the state!
    await this.setState({ ...this.props.boardSetup });

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

    // if theres a dependent phase, we need to run it
    if (this.state.currPhase.dependentPhase) {
      // compare the result of the validator with the dependency on the currPhase
      if (
        (this.state.currPhase.dependency && validatorResult) ||
        (!validatorResult && !this.state.currPhase.dependentPhase)
      ) {
        validator(
          this.state.currPhase.dependentPhase,
          this.state.players[this.state.currentPlayerIdx]
        );
      }
    }

    let currentPhaseIdx = this.state.currentPhaseIdx + 1;
    let currentPlayerIdx = this.state.currentPlayerIdx;
    // if the turn is over, update the currentPlayerIndex as well as the curr player
    if (currentPhaseIdx >= this.state.turn.length) {
      currentPhaseIdx = 0;
      currentPlayerIdx = (this.state.currentPlayerIdx + 1) % this.state.players.length;
    }
    this.setCurrPlayer(currentPlayerIdx);
    this.setState({
      currentPhaseIdx,
      currentPlayerIdx,
      currPhase: this.state.turn[currentPhaseIdx],
    });
    if (typeof validatorResult === 'object') {
      const toSet = { cards: validatorResult };
      this.setState({
        field: toSet,
      });
    }
  }

  // END TURN CANT WORK IF THERE ARE EVENTS THAT NEED TARGETS THAT HAVENT BEEN RUN
  endTurn() {
    for (let i = this.state.currentPhaseIdx; i < this.state.turn.length; i++) {
      // right now the phases are returning the STRING NULL -_- so the below if
      // statement wont work unless were strictly checking !== null
      if (this.state.turn[i].target !== 'null') {
        this.setState({ currentPhaseIdx: i });
        break;
      }
      if (this.state.turn[i] === this.state.currPhase) {
        if (!validator(this.state.turn[i], this.state.players[this.state.currentPlayerIdx])) {
          alert(`You can't do that`);
        }
        // if (this.state.currPhase.dependentPhase && !this.state.currPhase.dependency) {

        // }
      } else {
        if (
          !validator(
            this.state.turn[i].dependentPhase,
            this.state.players[this.state.currentPlayerIdx]
          )
        ) {
          alert(`You can't do that`);
        }
      }
      if (i === this.state.turn.length - 1) {
        let currentPlayerIdx = (this.state.currentPlayerIdx + 1) % this.state.players.length;
        this.setCurrPlayer(currentPlayerIdx);
        this.setState({
          currentPlayerIdx,
          currentPhaseIdx: 0,
          currPhase: this.state.turn[0],
        });
        winCheck(this.state.turn[this.state.currentPhaseIdx], this.state);
      }
    }

    // next player's turn
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
        let currentPhaseIdx = this.state.currentPhaseIdx + 1;
        let currentPlayerIdx = this.state.currentPlayerIdx;
        // if the turn is over, update the currentPlayerIndex as well
        if (currentPhaseIdx >= this.state.turn.length) {
          currentPhaseIdx = 0;
          currentPlayerIdx = (this.state.currentPlayerIdx + 1) % this.state.players.length;
        }
        this.setCurrPlayer(currentPlayerIdx);
        this.setState({
          currentPhaseIdx,
          currentPlayerIdx,
          currPhase: this.state.turn[currentPhaseIdx],
        });
        winCheck(this.state.currPhase, this.state);
      }

      // if validator returned false, then check if theres a dependent
      // phase and set the currPhase to be that dependent phase
    } else {
      // need to account for going to the next state then
      if (this.state.currPhase.dependentPhase && !this.state.currPhase.dependency) {
        this.setState({ currPhase: this.state.currPhase.dependentPhase });
      } else {
        let currentPhaseIdx = this.state.currentPhaseIdx + 1;
        let currentPlayerIdx = this.state.currentPlayerIdx;
        // if the turn is over, update the currentPlayerIndex as well
        if (currentPhaseIdx >= this.state.turn.length) {
          currentPhaseIdx = 0;
          currentPlayerIdx = (this.state.currentPlayerIdx + 1) % this.state.players.length;
        }
        this.setCurrPlayer(currentPlayerIdx);
        this.setState({
          currentPhaseIdx,
          currentPlayerIdx,
          currPhase: this.state.turn[currentPhaseIdx],
        });
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
