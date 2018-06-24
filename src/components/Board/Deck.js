import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let deck = this.props.deck;
    console.log(deck);
    return (
      <div>
        Hi I'm the deck, I have <p>{deck.size} cards</p>
      </div>
    );
  }
}
