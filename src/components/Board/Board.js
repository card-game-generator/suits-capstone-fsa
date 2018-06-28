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
      field: 0,
      players: [],
      currentPlayerIdx: 0,
      turn: [],
      currentPhaseIdx: 0,
      whatToCheck: '',
      whenToCheck: '',
      currPhase: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkWinCondition = this.checkWinCondition.bind(this);
    this.endTurn = this.endTurn.bind(this);
  }

  async componentDidMount() {
    // have to await the setstate so that then the currPhase can be added on the state!
    await this.setState({ ...this.props.boardSetup });
    await this.setState({ currPhase: this.state.turn[this.state.currentPhaseIdx] });
  }

  // endTurn will run thru the remaining phases that arent dependent on
  // click events
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
        this.setState({ currentPlayerIdx, currentPhaseIdx: 0, currPhase: this.state.turn[0] });
        winCheck(this.state.turn[this.state.currentPhaseIdx], this.state);
      }
    }

    // next player's turn
  }

  //Handles deck click
  handleClick(target, reqCard, event) {
    event.preventDefault();
    console.log('TARGET', target, 'REQCARD', reqCard, 'EVENT', event);
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
        this.setState({
          currentPhaseIdx,
          currentPlayerIdx,
          currPhase: this.state.turn[currentPhaseIdx],
        });
        winCheck(this.state.currPhase, this.state);
      }
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
        // console.log('idk what to do here');
      }
    }
  }

  render() {
    const deck = this.state.deck;
    const field = this.state.field;
    console.log('CURRENT PLAYER', this.state.players[this.state.currentPlayerIdx]);
    console.log('STATE IN RENDER', this.state);
    console.log('CURRPHASE', this.state.currPhase);
    console.log('CURRPHASE IDX', this.state.currentPhaseIdx);
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
