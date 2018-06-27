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
      dependency: true,
      dependentSourceAction: '',
      dependentTargetAction: '',
      childFormShow: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmitPhase = this.handleSubmitPhase.bind(this);
    this.handleSubmitDependentPhase = this.handleSubmitDependentPhase.bind(this);
  }

  //sets source, and target
  handleToggle(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  //adds selected action to depdendentObj inside of turnObj
  handleSubmitPhase() {
    let dependentObj = null;

    if (this.state.childFormShow) {
      dependentObj = {
        source: this.state.source,
        sourceAction: this.state.dependentSourceAction,
        target: this.state.target,
        targetAction: this.state.dependentTargetAction,
      };
    }
    //If childFormShow is true, then add dependent actions to object keys
    let { source, sourceAction, target, targetAction, dependency } = this.state;
    this.setState(prevState => ({
      turn: [
        ...prevState.turn,
        { source, sourceAction, target, targetAction, dependency, dependentPhase: dependentObj },
      ],
      childFormShow: false,
    }));
  }
  // Toggles the view for the dependent phase
  handleSubmitDependentPhase() {
    this.setState({ childFormShow: !this.state.childFormShow });
  }
  //TODO we might want to implement a button to remove a phase from the turn Array

  render() {
    const turn = this.state.turn;
    const handleSubmit = this.props.handleSubmit;
    return (
      <div className="turn-form">
        <div className="turn-form-title">Phase Form: </div>
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
              <option>giveCard</option>
              <option>addCard</option>
              <option>has4OfAKind</option>
              <option>incrementScore</option>
            </select>
          </label>

          <label>
            Target
            <select name="target" onChange={this.handleToggle}>
              <option>null</option>
              <option>player</option>
              <option>All Players</option>
              <option>Deck</option>
            </select>
          </label>

          <label>
            Target Action
            <select name="targetAction" onChange={this.handleToggle}>
              <option>null</option>
              <option>giveCard</option>
              <option>addCard</option>
              <option>has4OfAKind</option>
              <option>incrementScore</option>
            </select>
          </label>

          {/* These are the dependent action select options, refactor later */}

          {this.state.childFormShow && (
            <div className="turn-form-dependent">
              <hr />
              <div className="turn-form-dependent-title">Dependent Form: </div>
              <label>
                Toggle Dependency
                <select
                  onChange={() =>
                    this.setState({
                      dependency: !this.state.dependency,
                    })
                  }
                >
                  <option>true</option>
                  <option>false</option>
                </select>
              </label>
              <label>
                Source Action
                <select name="dependentSourceAction" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>giveCard</option>
                  <option>addCard</option>
                  <option>has4OfAKind</option>
                  <option>incrementScore</option>
                </select>
              </label>

              <label>
                Target Action
                <select name="dependentTargetAction" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>giveCard</option>
                  <option>addCard</option>
                  <option>has4OfAKind</option>
                  <option>incrementScore</option>
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
