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
        <div className="documentation">
        
          <div className="documentation-title">Phase Form: </div>
          <div className="documentation-content">
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

        </div>
      </div>
    );
  }
}
