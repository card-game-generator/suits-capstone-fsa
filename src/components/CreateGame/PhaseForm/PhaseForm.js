import React, { Component } from 'react';
// target: 'player',
//           targetAction: 'giveCard',
//           source: 'player',
//           sourceAction: 'addCard',
export default class PhaseForm extends Component {
  constructor() {
    super();
    this.state = { turn: [], source: 'self', sourceAction: '', target: '', targetAction: '' };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmitPhase = this.handleSubmitPhase.bind(this);
    this.handleClear = this.handleClear.bind(this); //we need to have a pop for turn
  }
  //Clears the array of actions for the phase
  handleClear() {
    this.setState({ Action: [] });
  }
  //sets source, and target
  handleToggle(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  //adds selected action to array
  handleSubmitPhase() {
    let { source, sourceAction, target, targetAction } = this.state;
    this.setState(prevState => ({
      turn: [...prevState.turn, { source, sourceAction, target, targetAction }],
    }));
  }

  render() {
    console.log(this.state);
    const turn = this.state.turn;
    const handleSubmit = this.props.handleSubmit;
    return (
      <div>
        <form>
          <label>
            Source
            <select name="source" onChange={this.handleToggle}>
              <option>null</option>
              <option>self</option>
            </select>
          </label>

          <label>
            Source Action
            <select name="sourceAction" onChange={this.handleToggle}>
              <option>null</option>
              <option>Chosen Player</option>
              <option>All Players</option>
              <option>Deck</option>
            </select>
          </label>

          <label>
            Target
            <select name="target" onChange={this.handleToggle}>
              <option>null</option>
              <option>Chosen Player</option>
              <option>All Players</option>
              <option>Deck</option>
            </select>
          </label>

          <label>
            Target Action
            <select name="targetAction" onChange={this.handleToggle}>
              <option>Take Card</option>
              <option>Take Card</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={this.handleSubmitPhase}>
          Submit Phase
        </button>
        <button type="button" onClick={() => handleSubmit({ turn })}>
          Submit Turn
        </button>
      </div>
    );
  }
}
