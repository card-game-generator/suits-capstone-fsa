import React, { Component } from 'react';
export default class PhaseForm extends Component {
  constructor() {
    super();
    this.state = {
      turn: [],
      source: 'null',
      sourceAction: 'null',
      target: 'null',
      targetAction: 'null',
      dependency: true,
      dependentSource: 'null',
      dependentSourceAction: 'null',
      dependentTarget: 'null',
      dependentTargetAction: 'null',
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
        source: this.state.dependentSource,
        sourceAction: this.state.dependentSourceAction,
        target: this.state.dependentTarget,
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
      dependency: true,
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
        <div className="parent-form-right-title">Suits</div>
        <div className="turn-form-title">
          <h3>Welcome to the Phase Form!</h3>
        </div>
        <div>
          <p>
            Here, you'll be creating the rules for your game! A phase is each componenet of a turn.
            For example, if I want to play 'Go Fish', one turn will be made up of 2 phases, each
            with a dependent phase. The first, I want the current player to request a card from
            another player. Since that has two outcomes, I want to add a{' '}
            <strong>dependent phase</strong>. If the player does not have the card, I want to
            request a card from the deck - then I can finally submit the phase. But my turn isn't
            over yet! I need to check if I have a 4 of a kind - that'll be the next phase. Then my
            turn is over and I can hit 'submit turn' - let's get creative!
          </p>
          <small>
            <p />
          </small>
        </div>
        <form>
          <label>
            Who's turn is it?
            <select name="source" onChange={this.handleToggle}>
              <option>null</option>
              <option>self</option>
            </select>
          </label>
          <br />
          <label>
            What's happening to this player?
            <select name="sourceAction" onChange={this.handleToggle}>
              <option>null</option>
              <option>giveCard</option>
              <option>addCard</option>
              <option>has4OfAKind</option>
              <option>incrementScore</option>
            </select>
          </label>
          <br />

          <label>
            Who/what am I targeting?
            <select name="target" onChange={this.handleToggle}>
              <option>null</option>
              <option>player</option>
              <option>All Players</option>
              <option>deck</option>
            </select>
          </label>
          <br />

          <label>
            What do I want the target to do?
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
              <div className="turn-form-dependent-title">
                <strong>Dependent Form:</strong>{' '}
              </div>
              <label>
                Did the above phase happen?
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
              <br />

              <label>
                Who's turn is it?
                <select name="dependentSource" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>self</option>
                </select>
              </label>
              <br />

              <label>
                What's happening to this player?
                <select name="dependentSourceAction" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>giveCard</option>
                  <option>addCard</option>
                  <option>has4OfAKind</option>
                  <option>incrementScore</option>
                </select>
              </label>
              <br />

              <label>
                Who/what am I targeting?
                <select name="dependentTarget" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>player</option>
                  <option>All Players</option>
                  <option>deck</option>
                </select>
              </label>
              <br />

              <label>
                What do I want the target to do?
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
