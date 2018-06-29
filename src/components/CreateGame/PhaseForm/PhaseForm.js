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
      dependentSource: '',
      dependentSourceAction: '',
      dependentTarget: '',
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
        <div className="turn-form-title">Phase Form: </div>
        <div>
          <h4>Here, you'll be creating your game! You can do it for the following:</h4>
          <small>
            <p>
              First, you choose a <strong>source</strong>. Your source is going to be who the
              current player is, if there is any. Right now, it can only be yourself so choose
              'self'.
            </p>
            <p>
              Second, you choose a <strong>source action</strong>. This is going to be the action
              that the source is going to be going through. For now, choose 'add card'.
            </p>
            <p>
              Third, you choose a <strong>target</strong>. Who is the player that we want to target?
              For now, choose 'player'.
            </p>
            <p>
              Fourth, you choose a <strong>target action</strong>. What to we want the player to do?
              Let's choose 'give card'
            </p>
            <p>
              Then, we want to add a <strong>dependent phase</strong>. Let's click there and set
              toggle dependency to <strong>false</strong>. This means that this is what's going to
              happen when the player we target doesn't have the card we request.
            </p>
            <p>
              The <strong>source</strong> is still 'self', and the <strong>source action</strong> is
              still 'add card', but the <strong>target</strong> is now 'deck' and the
              <strong>target action</strong> is 'give card'.
            </p>
            <p>
              Click on <strong>submit phase</strong> and lets add another phase:
              <br />
              <strong>Source:</strong> self
              <br />
              <strong>Source Action:</strong> has 4 of a kind
              <br />
              <strong>Target & target action:</strong> null (select something else and then select
              null - we're working on this big)
              <br />
              <strong>Add Dependent Phase => Toggle:</strong> true
              <br />
              <strong>source:</strong> self
              <br />
              <strong>source action:</strong> increment score
              <br />
              <strong>target & target action:</strong> null (select somehting else and then select
              null - we're working on this big)
            </p>
          </small>
        </div>
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
              <option>deck</option>
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
                Source
                <select name="dependentSource" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>self</option>
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
                Target
                <select name="dependentTarget" onChange={this.handleToggle}>
                  <option>null</option>
                  <option>player</option>
                  <option>All Players</option>
                  <option>deck</option>
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
