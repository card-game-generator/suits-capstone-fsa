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
    };
    this.handleState = this.handleState.bind(this);
  }

  handleState(stateChanges) {
    console.log(stateChanges);
    let formIdx = this.state.formIdx + 1;
    this.setState({ ...stateChanges, formIdx });
  }

  render() {
    console.log(this.state, 'this');
    let idx = this.state.formIdx;
    return (
      <div>
        {idx === 1 ? <StartingRules handleSubmit={this.handleState} /> : null}
        {/* {idx === 2 ? <PhaseForm /> : null} */}
        <PhaseForm />
        <div>players and cards populate here, maybe another subComponent</div>
      </div>
    );
  }
}
