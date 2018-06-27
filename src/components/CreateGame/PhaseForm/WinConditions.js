import React, { Component } from 'react';

export default class WinConditions extends Component {
  constructor() {
    super();
    this.state = {
      whatToCheck: '',
      whenToCheck: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //sets the state upon selection of whenToCheck & whatToCheck options
  handleToggle(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //TODO: this should be redirecting to a page that reviews all the rules for your game
  handleSubmit() {
    console.log('ON SUBMIT', this.state);
  }

  render() {
    console.log('STATE', this.state);
    return (
      <div>
        <form>
          <label>
            How do you win?
            <select name="whatToCheck" onChange={this.handleToggle}>
              <option>Player with highest score</option>
              <option>Player with most cards</option>
              <option>Player with least cards</option>
              <option>First with 4 of a kind</option>
            </select>
          </label>

          <div>
            <strong>How:</strong> {this.state.whatToCheck}
          </div>

          <label>
            When do you check?
            <select name="whenToCheck" onChange={this.handleToggle}>
              <option>End of each turn</option>
              <option>End of each phase</option>
              <option>When deck is empty</option>
            </select>
          </label>

          <div>
            <strong>When:</strong> {this.state.whenToCheck}
          </div>
        </form>
        <button type="button" onClick={this.handleSubmit}>
          Review your Game
        </button>
      </div>
    );
  }
}
