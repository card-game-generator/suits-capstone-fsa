import React, { Component } from 'react';

export default class WinConditions extends Component {
  constructor() {
    super();
    this.state = {
      whenToCheck: '',
      whatToCheck: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
  }

  render() {
    return (
      <div>
        <form>
          <label>
            When do you check?
            <select name="whenToCheck" onChange={this.handleToggle}>
              <option>End of each turn</option>
              <option>When Deck is empty</option>
            </select>
          </label>

          <div>When: {this.state.whenToCheck}</div>

          <label>
            How do you win?
            <select name="whatToCheck" onChange={this.handleToggle}>
              <option>Player with highest score</option>
              {/* <option>Player with most cards</option>
              <option>Player with least cards</option>
              <option>First with 4 of a kind</option> */}
            </select>
          </label>

          <div>How: {this.state.whatToCheck}</div>
        </form>
      </div>
    );
  }
}
