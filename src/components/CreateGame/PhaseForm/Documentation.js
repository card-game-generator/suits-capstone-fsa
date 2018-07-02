import React, { Component } from 'react';

//Set initial state
let state = {
};

export default class Documentation extends Component {
  constructor() {
    super();
    //Retrieve last state
    this.state = state;

  }

  componentWillUnmount() {
    //remember state for next mount
    state = this.state;
  }

  render() {

    return (
      <div className="documentation-container">
        <div className="documentation-menu">

          <div className="documentation-menu-section">
            <div className="documentation-title">Starting Overview</div>
            <div className="documentation-sub-container">
              <div className="documentation-subtitle">Name</div>
              <div className="documentation-subtitle">Players</div>
              <div className="documentation-subtitle">Cards</div>
            </div>

          </div>

          <div className="documentation-menu-section">
            <div className="documentation-title">Turn</div>
            <div className="documentation-sub-container">
              <div className="documentation-subtitle">Phase</div>

              <div className="documentation-sub-container">
                <div className="documentation-subtitle">Source</div>
                <div className="documentation-subtitle">Source Action</div>
                <div className="documentation-subtitle">Target</div>
                <div className="documentation-subtitle">Target Action</div>
              </div>

              <div className="documentation-subtitle">Dependent Phase</div>
              <div className="documentation-sub-container">
                <div className="documentation-subtitle">Dependent Source</div>
                <div className="documentation-subtitle">Dependent Source Action</div>
                <div className="documentation-subtitle">Dependent Target</div>
                <div className="documentation-subtitle">Dependent Target Action</div>
              </div>

            </div>

          </div>

          <div className="documentation-menu-section">
            <div className="documentation-title">Victory</div>
            <div className="documentation-sub-container">
              <div className="documentation-subtitle">Time</div>
              <div className="documentation-subtitle">Win</div>
            </div>
          </div>

        </div>

        <div className="documentation">

          <div className="turn-form-title">
            <h3>Welcome to the Phase Form!</h3>
          </div>

          <div className="documentation-content">
            Here, you'll be creating the rules for your game! A phase is each componenet of a turn.
            For example, if I want to play 'Go Fish', one turn will be made up of 2 phases, each
            with a dependent phase. The first, I want the current player to request a card from
            another player. Since that has two outcomes, I want to add a
            <strong>dependent phase</strong>. If the player does not have the card, I want to
            request a card from the deck - then I can finally submit the phase. But my turn isn't
            over yet! I need to check if I have a 4 of a kind - that'll be the next phase. Then my
            turn is over and I can hit 'submit turn' - let's get creative!
          </div>


        </div>
      </div>
    );
  }
}
