import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { reqCard: 'top' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    //Changes state to card
    this.setState({ reqCard: event.target.value });
  }

  render() {
    let deckValues = ['top', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    let deck = this.props.deck;
    console.log(this.props.deck);
    return (
      <div className="deck-container">
        Hi I'm the deck, I have <p>{deck.size} cards</p>
        <form onSubmit={event => this.props.submitHandler(deck, this.state.reqCard, event)}>
          <label>Request Card: </label>
          <select onChange={this.handleChange}>
            {deckValues.map(deckValue => {
              return (
                <option value={deckValue} key={deckValue}>
                  {deckValue}
                </option>
              );
            })}
          </select>
          <button type="submit">Request</button>
        </form>
      </div>
    );
  }
}
