import React, { Component } from 'react';
export default class PhaseForm extends Component {
  constructor() {
    super();
    this.state = {
      turn: [],
      source: 'self',
      sourceAction: '',
      target: '',
      targetAction: '',
      dependentSource: 'self',
      dependentSourceAction: '',
      dependentTarget: '',
      dependentTargetAction: '',
      childFormShow: false,
    };
    // this.childFormShow = false
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmitPhase = this.handleSubmitPhase.bind(this);
    this.handleClear = this.handleClear.bind(this); //we need to have a pop for turn
    this.handleSubmitDependentPhase = this.handleSubmitDependentPhase.bind(this);
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
    let { source, sourceAction, target, targetAction, childFormShow } = this.state;
    this.setState(prevState => ({
      turn: [...prevState.turn, { source, sourceAction, target, targetAction }],
      childFormShow: false,
    }));
    if (childFormShow) {
      let {
        dependentSource,
        dependentSourceAction,
        dependentTarget,
        dependentTargetAction,
      } = this.state;
      this.setState(prevState => ({
        turn: [
          ...prevState.turn,
          {
            dependentSource,
            dependentSourceAction,
            dependentTarget,
            dependentTargetAction,
          },
        ],
        childFormShow: false,
      }));
    }
  }

  handleSubmitDependentPhase() {
    this.setState({ childFormShow: !this.state.childFormShow });
  }

  render() {
    const turn = this.state.turn;
    const handleSubmit = this.props.handleSubmit;
    console.log('turn', this.state.turn);
    return (
      <div className="turn-form">
        <form>
          <label>
            Source
            <select name="source" onChange={this.handleToggle}>
              <option defaultValue>null</option>
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

          {/* These are the dependent action select options, refactor later */}
          {this.state.childFormShow && (
            <div className="turn-form-dependent">
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
            </div>
          )}
        </form>
        <button type="button" onClick={this.handleSubmitDependentPhase}>
          Add Dependent Phase
        </button>
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
