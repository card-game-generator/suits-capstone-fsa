import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

//Set initial state
let state = {
  turn: [],
  source: 'null',
  sourceAction: 'null',
  target: 'null',
  targetAction: 'null',
  dependency: false,
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
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillUnmount() {
    //remember state for next mount
    state = this.state;
  }

  //sets source, and target
  handleSelect(selectedOption) {
    if (selectedOption) {
      this.setState({ [selectedOption.name]: selectedOption.value });
    }
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
      dependency: false,
    }));
  }

  // Toggles the view for the dependent phase
  handleSubmitDependentPhase() {
    this.setState({ childFormShow: !this.state.childFormShow, dependency: !this.state.dependency });
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
            <div className="phase-form-options-container">
              <div className="form-dropdown">
                <div className="turn-form-independent tufrn-form-dropdown-container dropdown-container-box">
                  <div className="label-option-container">
                    <label>Source</label>
                    <Select
                      clearable={false}
                      value={this.state.source}
                      onChange={this.handleSelect}
                      options={[
                        { value: 'null', label: 'Blank', name: 'source' },
                        { value: 'self', label: 'Self', name: 'source' },
                      ]}
                    />
                  </div>

                  <div className="label-option-container">
                    <label>Source Action</label>
                    <Select
                      clearable={false}
                      value={this.state.sourceAction}
                      onChange={this.handleSelect}
                      options={[
                        { value: 'null', label: 'Blank', name: 'sourceAction' },
                        { value: 'giveCard', label: 'Give Card', name: 'sourceAction' },
                        { value: 'addCard', label: 'Add Card', name: 'sourceAction' },
                        { value: 'has4ofAKind', label: '4 of a Kind', name: 'sourceAction' },
                        { value: 'incrementScore', label: 'Increment Score', name: 'sourceAction' },
                      ]}
                    />
                  </div>

                  <div className="label-option-container">
                    <label>Target</label>
                    <Select
                      clearable={false}
                      value={this.state.target}
                      onChange={this.handleSelect}
                      options={[
                        { value: 'null', label: 'Blank', name: 'target' },
                        { value: 'player', label: 'Player', name: 'target' },
                        { value: 'All Players', label: 'All Players', name: 'target' },
                        { value: 'deck', label: 'Deck', name: 'target' },
                      ]}
                    />
                  </div>

                  <div className="label-option-container">
                    <label>Target Action</label>
                    <Select
                      clearable={false}
                      value={this.state.targetAction}
                      onChange={this.handleSelect}
                      options={[
                        { value: 'null', label: 'Blank', name: 'targetAction' },
                        { value: 'giveCard', label: 'Give Card', name: 'targetAction' },
                        { value: 'addCard', label: 'Add Card', name: 'targetAction' },
                        { value: 'has4ofAKind', label: '4 of a Kind', name: 'targetAction' },
                        { value: 'incrementScore', label: 'Increment Score', name: 'targetAction' },
                      ]}
                    />
                  </div>

                  {!this.state.dependency && (
                    <button
                      className="dropdown-form-button"
                      type="button"
                      onClick={this.handleSubmitDependentPhase}
                    >
                      <i className="fas fa-plus-circle" />
                    </button>
                  )}
                </div>

                {this.state.childFormShow && (
                  <div className="turn-form-plus">
                    <i className="fas fa-plus-circle" />
                  </div>
                )}

                {/* These are the dependent action select options, refactor later */}

                {this.state.childFormShow && (
                  <div className="turn-form-dependent turn-form-dropdown-container dropdown-container-box">
                    <div className="label-option-container">
                      <label>Dependeny:</label>
                      <Select
                        clearable={false}
                        value={this.state.dependency}
                        onChange={this.handleSelect}
                        options={[
                          { value: true, label: 'True', name: 'dependency' },
                          { value: false, label: 'False', name: 'dependency' },
                        ]}
                      />
                    </div>

                    <div className="label-option-container">
                      <label>Source</label>
                      <Select
                        clearable={false}
                        value={this.state.dependentSource}
                        onChange={this.handleSelect}
                        options={[
                          { value: 'null', label: 'Blank', name: 'dependentSource' },
                          { value: 'self', label: 'Self', name: 'dependentSource' },
                        ]}
                      />
                    </div>

                    <div className="label-option-container">
                      <label>Source Action</label>
                      <Select
                        clearable={false}
                        value={this.state.dependentSourceAction}
                        onChange={this.handleSelect}
                        options={[
                          { value: 'null', label: 'Blank', name: 'dependentSourceAction' },
                          { value: 'giveCard', label: 'Give Card', name: 'dependentSourceAction' },
                          { value: 'addCard', label: 'Add Card', name: 'dependentSourceAction' },
                          {
                            value: 'has4ofAKind',
                            label: '4 of a Kind',
                            name: 'dependentSourceAction',
                          },
                          {
                            value: 'incrementScore',
                            label: 'Increment Score',
                            name: 'dependentSourceAction',
                          },
                        ]}
                      />
                    </div>

                    <div className="label-option-container">
                      <label>Target</label>
                      <Select
                        clearable={false}
                        value={this.state.dependentTarget}
                        onChange={this.handleSelect}
                        options={[
                          { value: 'null', label: 'Blank', name: 'dependentTarget' },
                          { value: 'player', label: 'Player', name: 'dependentTarget' },
                          { value: 'All Players', label: 'All Players', name: 'dependentTarget' },
                          { value: 'deck', label: 'Deck', name: 'dependentTarget' },
                        ]}
                      />
                    </div>

                    <div className="label-option-container">
                      <label>Target Action</label>
                      <Select
                        clearable={false}
                        value={this.state.dependentTargetAction}
                        onChange={this.handleSelect}
                        options={[
                          { value: 'null', label: 'Blank', name: 'dependentTargetAction' },
                          { value: 'giveCard', label: 'Give Card', name: 'dependentTargetAction' },
                          { value: 'addCard', label: 'Add Card', name: 'dependentTargetAction' },
                          {
                            value: 'has4ofAKind',
                            label: '4 of a Kind',
                            name: 'dependentTargetAction',
                          },
                          {
                            value: 'incrementScore',
                            label: 'Increment Score',
                            name: 'dependentTargetAction',
                          },
                        ]}
                      />
                    </div>

                    {this.state.dependency && (
                      <button
                        className="dropdown-form-button button-close"
                        type="button"
                        onClick={this.handleSubmitDependentPhase}
                      >
                        <i className="fas fa-times-circle" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="phase-form-bottom-container bottom-container">
            <div className="phase-form-bottom-container-float bottom-container-float">
              {this.state.turn.map((phase, index) => {
                return (
                  <div
                    key={`${phase}${index + 1}`}
                    className="phase-form-bottom-content bottom-content"
                  >
                    <button className="button-close" type="button" onClick={this.handleDelete}>
                      <i className="fas fa-times-circle" />
                    </button>
                    <div className="phase-form-bottom-group bottom-content-group">
                      <div className="phase-form-source">{phase.source}</div>
                      <div className="phase-form-sourceAction">{phase.sourceAction}</div>
                      <div className="phase-form-target">{phase.target}</div>
                      <div className="phase-form-targetAction">{phase.targetAction}</div>
                    </div>

                    {phase.dependency && (
                      <div className="turn-form-plus">
                        <i className="fas fa-caret-right" />
                      </div>
                    )}

                    {phase.dependency && (
                      <div className="phase-form-bottom-group bottom-content-group">
                        <div className="phase-form-dependentSource">
                          {phase.dependentPhase.source}
                        </div>
                        <div className="phase-form-dependentSourceAction">
                          {phase.dependentPhase.sourceAction}
                        </div>
                        <div className="phase-form-dependentTarget">
                          {phase.dependentPhase.target}
                        </div>
                        <div className="phase-form-dependentTargetAction">
                          {phase.dependentPhase.targetAction}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                className="button-submit-phase"
                type="button"
                onClick={this.handleSubmitPhase}
              >
                <i className="far fa-plus-square" />
              </button>
            </div>
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
