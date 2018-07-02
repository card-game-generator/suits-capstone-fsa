import React, { Component } from 'react';

//Set initial state
let state = {};

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

              <div className="documentation-subtitle">Other Questions</div>
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
          {/* ----SECTION BLOCK STARTS HERE */}
          <div id="turn" className="documentation-section">
            <div className="documentation-section-title">Turns</div>

            <div className="documentation-section-content">
              FAQs on filling out your phase form!
            </div>

            {/* ----SUB SECTION BLOCK STARTS HERE */}
            <div id="phase" className="documentation-sub-section">
              <div className="documentation-sub-section-title">Phase</div>

              <div className="documentation-section-content">
                A phase is each component of a turn. For example, if I want to play ‘Go Fish’, one
                turn will be made up of 2 phases, each with a dependent phase. The first, I want the
                current player to request a card from another player. Since that has two outcomes, I
                want to add a dependent phase.
              </div>

              {/* ----NESTED SUB SECTION BLOCK STARTS HERE */}
              <div id="source" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">What is my source?</div>

                <div className="documentation-section-content">
                  A source is the current player or ‘thing’ who is going to lead all the actions of
                  the turn. For ‘Go Fish’, it’ll be ‘self’.
                </div>
              </div>

              <div id="source-action" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">
                  What is my source action?
                </div>

                <div className="documentation-section-content">
                  This is what we want to happen to the source. Maybe, it’s add a card to their hand
                  or be forced to give a card away. For ‘Go Fish’, it’ll be ‘addCard’, since the
                  source wants to add a card to their hand.
                </div>
              </div>

              <div id="target" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">What is my target?</div>

                <div className="documentation-section-content">
                  The target is who or what is going to be directly affected by the source action.
                  For ‘Go Fish’, it’ll be ‘player’.
                </div>
              </div>

              <div id="target-action" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">
                  What is my target action?
                </div>

                <div className="documentation-section-content">
                  This is going to be the action that the target will complete. For ‘Go Fish’, the
                  target action would be ‘give card’, which would give a card to the source and add
                  it to the source’s hand.
                </div>
              </div>
              {/* NESTED SUB SECTION BLOCK ENDS HERE */}
            </div>
            {/* SUB SECTION BLOCK ENDS HERE */}
          </div>
          {/* SECTION BLOCK ENDS HERE */}

          {/* ----SECTION BLOCK STARTS HERE */}
          <div id="turn-dependent-phase" className="documentation-section">
            {/* ----SUB SECTION BLOCK STARTS HERE */}
            <div id="dependent-phase" className="documentation-sub-section">
              <div className="documentation-sub-section-title">Dependent Phase</div>

              <div className="documentation-section-content">
                A dependent phase is a phase who’s outcome is determined on the phase directly
                before it. In the example of ‘Go Fish’, if the player does not have the card, they
                should request a card from the deck - then, the user can finally submit the complete
                phase.
              </div>
            </div>
            {/* SUB SECTION BLOCK ENDS HERE */}
            {/* ----NESTED SUB SECTION BLOCK STARTS HERE */}
            <div id="dependent-source" className="documentation-nested-sub-section">
              <div className="documentation-nested-sub-section-title">
                What is my dependent source?
              </div>
              <div className="documentation-section-content">
                My dependent source is usually going to mirror the selection for ‘source’ - it’s who
                the dependent source is going to be led by. For ‘Go Fish’, it’s going to be ‘self’.
              </div>
            </div>

            <div id="dependent-source-action" className="documentation-nested-sub-section">
              <div className="documentation-nested-sub-section-title">
                What is my dependent source action?
              </div>

              <div className="documentation-section-content">
                This is going to be the action that the current dependent source wants to check for.
                For ‘Go Fish’, it’ll be ’addCard’.
              </div>
            </div>

            <div id="dependent-target" className="documentation-nested-sub-section">
              <div className="documentation-nested-sub-section-title">
                What is my dependent target?
              </div>

              <div className="documentation-section-content">
                The dependent target is going to be who the dependent source action is going to
                directly target. For ‘Go Fish’, this will be ‘deck’.
              </div>
            </div>

            <div id="dependent-target-action" className="documentation-nested-sub-section">
              <div className="documentation-nested-sub-section-title">
                What is my dependent target action?
              </div>

              <div className="documentation-section-content">
                My dependent target action is what is going to happen to the dependent target - if
                the dependent target is ‘deck’ then the dependent target action should be ‘give
                card’.
              </div>
            </div>
            {/* NESTED SUB SECTION BLOCK ENDS HERE */}
          </div>
          {/* SECTION BLOCK ENDS HERE */}

          {/* ----SECTION BLOCK STARTS HERE */}
          <div id="turn-other-questions" className="documentation-section">
            {/* ----SUB SECTION BLOCK STARTS HERE */}
            <div id="other-questions" className="documentation-sub-section">
              <div className="documentation-sub-section-title">Other Questions</div>

              {/* ----NESTED SUB SECTION BLOCK STARTS HERE */}
              <div id="other-questions-add-phase" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">
                  How do I add more than one phase?
                </div>

                <div className="documentation-section-content">
                  After clicking ‘submit phase’, the form resets and the user can go about adding
                  new phases.
                </div>
              </div>

              <div id="other-questions-mistake-phase" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">
                  I mistakingly added a phase - how do I delete it?!
                </div>

                <div className="documentation-section-content">Coming soon!</div>
              </div>

              <div id="other-questions-second-phase" className="documentation-nested-sub-section">
                <div className="documentation-nested-sub-section-title">
                  What should my second phase be?
                </div>

                <div className="documentation-section-content">
                  This is completely optional - the user can go ahead and complete a game with only
                  one phase. However, for a game like ‘Go Fish’, they might want to have another
                  phase that’s going to be used to increment the score. The source needs to check if
                  they have a 4 of a kind and then add a dependent phase to increment the score.
                </div>
              </div>

              <div
                id="other-questions-delete-dep-phase"
                className="documentation-nested-sub-section"
              >
                <div className="documentation-nested-sub-section-title">
                  I accidentally clicked on dependent phase - how do I return to submit only one
                  phase?
                </div>

                <div className="documentation-section-content">
                  Clicking on ‘add dependent phase’ a second time will have the additional form hide
                  again.
                </div>
              </div>

              {/* NESTED SUB SECTION BLOCK ENDS HERE */}
            </div>
            {/* SUB SECTION BLOCK ENDS HERE */}
          </div>
          {/* SECTION BLOCK ENDS HERE */}
        </div>
      </div>
    );
  }
}
