import React, { Component } from 'react';

//Set initial state
let state = {
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

export default class PhaseForm extends Component {
  constructor() {
    super();
    //Retrieve last state
    this.state = state;

    //bind all click functions
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmitPhase = this.handleSubmitPhase.bind(this);
    this.handleSubmitDependentPhase = this.handleSubmitDependentPhase.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillUnmount() {
    //remember state for next mount
    state = this.state;
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

  handleDelete() {
    if (window.confirm('Are you sure you want to delete this phase?')) {
      let turnArrayCopy = [...this.state.turn];
      turnArrayCopy.splice(turnArrayCopy, 1);
      this.setState({ turn: turnArrayCopy });
    }
  }

  render() {
    const turn = this.state.turn;
    const handleSubmit = this.props.handleSubmit;
    const name = this.props.gameName;

    return (
      <div className="phase-form-container main-window">
        <div className="phase-form">
          <div className="phase-form-form">
            <div className="parent-form-right-title">{name}</div>

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
                    <strong>Dependent Form:</strong>
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
          </div>

          <div className="phase-form-bottom-container bottom-container">
            {this.state.turn.map((phase, index) => {
              return (
                <div key={`${phase}${index + 1}`} className="phase-form-bottom-content">
                  <button type="button" onClick={this.handleDelete}>
                    Delete!
                  </button>
                  <div className="phase-form-source">{phase.source}</div>
                  <div className="phase-form-sourceAction">{phase.sourceAction}</div>
                  <div className="phase-form-target">{phase.target}</div>
                  <div className="phase-form-targetAction">{phase.targetAction}</div>
                  <div className="phase-form-dependentSource">{phase.dependantSource}</div>
                  <div className="phase-form-dependentSourceAction">
                    {phase.dependentSourceAction}
                  </div>
                  <div className="phase-form-dependentTarget">{phase.dependentTarget}</div>
                  <div className="phase-form-dependentTargetAction">
                    {phase.dependentTargetAction}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div id="next-button" className="starting-button-next">
          <button
            className="starting-rules-bottom-button fas fa-chevron-right"
            type="button"
            onClick={() => handleSubmit({ turn })}
          />
        </div>
      </div>
    );
  }
}
