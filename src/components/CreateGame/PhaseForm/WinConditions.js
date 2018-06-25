import React, { Component } from 'react';

export default class WinConditions extends Component {
  constructor() {
    super();
    this.state = {
      whatToCheck: '',
      whenToCheck: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  //sets the state upon selection of whenToCheck & whatToCheck options
  handleToggle(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    console.log('STATE', this.state);
    return (
      <div>
        <form>
          <label>
            How do you win?
            <select name="whatToCheck" onChange={this.handleToggle}>
              <option>Please Select</option>
              <option>Player with highest score</option>
              {/* <option>Player with most cards</option>
              <option>Player with least cards</option>
              <option>First with 4 of a kind</option> */}
            </select>
          </label>

          <div>
            <strong>How:</strong> {this.state.whatToCheck}
          </div>

          <label>
            When do you check?
            <select name="whenToCheck" onChange={this.handleToggle}>
              <option>Please Select</option>
              <option>End of each turn</option>
              <option>End of each phase</option>
              <option>When Deck is empty</option>
            </select>
          </label>

          <div>
            <strong>When:</strong> {this.state.whenToCheck}
          </div>
        </form>
      </div>
    );
  }
}
