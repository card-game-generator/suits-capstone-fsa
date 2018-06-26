import React, { Component } from 'react';
import StartingRules from './StartingRules';
import PhaseForm from './PhaseForm';

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      formIdx: 1,
      players: 0,
      cards: 0,
      turn: [],
    };
    this.handleState = this.handleState.bind(this);
  }

  handleState(stateChanges) {
    let formIdx = this.state.formIdx + 1;
    this.setState({ ...stateChanges, formIdx });
  }

  render() {
    let idx = this.state.formIdx;
    return (
      <div className="parent-form">
        {idx === 1 ? <StartingRules handleSubmit={this.handleState} /> : null}
        {idx === 2 ? <PhaseForm handleSubmit={this.handleState} /> : null}

        {/* <div>players and cards populate here, maybe another subComponent</div>
        <div>
          just here to show local state of parent Number of players {this.state.players} Number of
          cards for each player {this.state.cards}
        </div> */}
        {this.state.turn.map(phase => {
          return (
            <div key={phase}>
              just a div showing phase {phase.source} {phase.sourceAction} {phase.target}
              {phase.targetAction}
            </div>
          );
        })}
      </div>
    );
  }
}
