import React, { Component } from 'react';

//This component renders out our card and receives props from the player/field
export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let player = this.props.player || {};
    let field = this.props.field || {};
    return (
      <div>
        {player.isCurrentPlayer
          ? player.hand.map(card => {
              <div key={`${card.suit}${card.value}`}>{`${card.suit}${card.value}`}</div>;
            })
          : null}

        {field.cards
          ? field.cards.map(card => {
              <div key={`${card.suit}${card.value}`}>{`${card.suit}${card.value}`}</div>;
            })
          : null}
      </div>
    );
  }
}
