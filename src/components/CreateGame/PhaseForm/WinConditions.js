import React, { Component } from 'react';

//CG: Use some sort of mapping system to load these in along with good descriptions of what they are.
let optionMapper = {
  'score:highest': 'Player with highest score', 
  'deck:empty': 'When deck is empty'
}
export default class WinConditions extends Component {
  constructor() {
    super();
    this.state = {
      whatToCheck: 'Player with highest score',
      whenToCheck: 'When deck is empty',
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  //sets the state upon selection of whenToCheck & whatToCheck options
  handleToggle(event) {
    event.preventDefault(); //CG: Not sure if we need this. 
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const { whatToCheck, whenToCheck } = this.state;
    return (
      <div>
        <div className="parent-form-right-title">Suits</div>
        <div>
          <h4>How do you win?</h4>
          <p>
            Below, enter the condition that will lead to winning a game, and when we should be
            checking for the condition.
          </p>
        </div>
        <form>
          <label>
            How do you win?
            <select name="whatToCheck" onChange={this.handleToggle}>
            {/* CG: Utilize value on option. */}
              <option>Player with highest score</option>
              <option>Player with most cards</option>
              <option>Player with least cards</option>
            </select>
          </label>

          <div>
            {/* CG: Avoid strong tag. */}
            <strong>How:</strong> {this.state.whatToCheck}
          </div>
          <br />
          <label>
            When do you check?
            <select name="whenToCheck" onChange={this.handleToggle}>
              <option>When deck is empty</option>
            </select>
          </label>

          <div>
            <strong>When:</strong> {this.state.whenToCheck}
          </div>
        </form>
        <br />
        <button
          type="button"
          onClick={() => {
            handleSubmit({ whatToCheck, whenToCheck });
          }}
        >
          Review your Game
        </button>
      </div>
    );
  }
}
