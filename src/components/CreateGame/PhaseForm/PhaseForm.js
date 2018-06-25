import React, { Component } from 'react';

export default class PhaseForm extends Component {
  constructor() {
    super();
    this.state = { source: 'self', target: '', Action: [] };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmitAction = this.handleSubmitAction.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleToggleAction = this.handleToggleAction.bind(this);
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
  handleSubmitAction() {
    this.setState(prevState => ({
      Action: [...prevState.Action, this.action],
    }));
  }
  handleToggleAction(event) {
    event.preventDefault();
    this.action = event.target.value;
  }
  // handleSubmit(){

  // }

  render() {
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
            Target
            <select name="target" onChange={this.handleToggle}>
              <option>null</option>
              <option>Chosen Player</option>
              <option>Player 1</option>
              <option>Player 2</option>
              <option>Player 3</option>
              <option>Player 4</option>
              <option>All Player</option>
              <option>Deck</option>
            </select>
          </label>

          <label>
            Action
            <select name="action" onChange={this.handleToggleAction}>
              <option>Take Card</option>
              <option>Take Card</option>
            </select>
            <button type="button" onClick={this.handleSubmitAction}>
              Add Action
            </button>
            <button type="button" onClick={this.handleClear}>
              clear action
            </button>
          </label>
        </form>
        {/* <button type="button" onClick={}>Submit Phase</button> */}
      </div>
    );
  }
}
