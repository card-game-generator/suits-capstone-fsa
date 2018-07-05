import React, { Component } from 'react';

export default class Deck extends Component {
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
    return (
      <div className="deck-container">
        <button className="deck-button" type="submit" onClick={event => this.props.submitHandler(deck, this.state.reqCard, event)}>
          <img className="card-component-image" src={`/images/cards/back.png`} />
        </button>
        <p>{deck.cards.length} cards</p>
      </div>
    );
  }
}
