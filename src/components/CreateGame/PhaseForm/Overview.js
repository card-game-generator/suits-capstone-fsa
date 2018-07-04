import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let state = this.props.state;

export default class WinConditions extends Component {
  constructor() {
    super();
    //Retrieve last state
    this.state = state;

    //bind all click functions
  }

  render() {

    return (
        <div className="review-game-container main-window">
        <div className="review-game">
          <div className="review-game-content">
            <div className="parent-form-right-title">{this.state.name}</div>
            {this.state.turn.map(phase => {
              return (
                <div key={phase}>
                  just a div showing phase {phase.source} {phase.sourceAction} {phase.target}
                  {phase.targetAction}
                </div>
              );
            })}

            <button
              onClick={() => {
                db.collection('games').add(this.state);
              }}
            >
              Save game!
            </button>
          </div>
        </div>

        <div id="next-button" className="starting-button-next">
          <button
            className="starting-rules-bottom-button fas fa-chevron-right"
            type="button"
            onClick={() => captureRules(this.state)}
          />
        </div>
      </div>
    );
  }
}
