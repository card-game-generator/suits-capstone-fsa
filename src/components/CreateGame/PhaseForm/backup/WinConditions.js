import React, { Component } from 'react';

let state = {
  whatToCheck: 'Player with highest score',
  whenToCheck: 'When deck is empty',
};
export default class WinConditions extends Component {
  constructor() {
    super();
<<<<<<< HEAD
    //Retrieve last state
    this.state = state;

    //bind all click functions
=======
    this.state = {
      whatToCheck: 'Player with highest score',
      whenToCheck: 'When deck is empty',
    };
>>>>>>> master
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillUnmount() {
    //remember state for next mount
    state = this.state;
  }

  //sets the state upon selection of whenToCheck & whatToCheck options
  handleToggle(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const { whatToCheck, whenToCheck } = this.state;
    const name = this.props.gameName;

    return (
<<<<<<< HEAD
      <div className="win-condition-container main-window">
        <div className="win-condition">
          <div className="win-condition-form">
            <div className="parent-form-right-title">{name}</div>

            <form>
              <label>
                How do you win?
            <select name="whatToCheck" onChange={this.handleToggle}>
                  <option>Player with highest score</option>
                  <option>Player with most cards</option>
                  <option>Player with least cards</option>
                </select>
              </label>

              <div>
                <strong>How:</strong> {this.state.whatToCheck}
              </div>

              <label>
                When do you check?
=======
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
              <option>Player with highest score</option>
              <option>Player with most cards</option>
              <option>Player with least cards</option>
            </select>
          </label>

          <div>
            <strong>How:</strong> {this.state.whatToCheck}
          </div>
          <br />
          <label>
            When do you check?
>>>>>>> master
            <select name="whenToCheck" onChange={this.handleToggle}>
                  <option>When deck is empty</option>
                </select>
              </label>

              <div>
                <strong>When:</strong> {this.state.whenToCheck}
              </div>
            </form>
          </div>
<<<<<<< HEAD

          <div className="win-condition-bottom-container bottom-container">
            <div className="win-condition-what-to-check">{this.state.whatToCheck}</div>
            <div className="win-condition-when-to-check">{this.state.whenToCheck}</div>
          </div>

        </div>
        <div id="next-button" className="starting-button-next"><button className="starting-rules-bottom-button fas fa-chevron-right" type="button" onClick={() => handleSubmit({ whatToCheck, whenToCheck })}></button></div>
=======
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
>>>>>>> master
      </div>
    );
  }
}
