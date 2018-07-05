import React, { Component } from 'react';

//This component renders out our card and receives props from the player/field
export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let player = this.props.card;
    let field = this.props.field || {};
    let card = this.props.card || { suit: '', value: '' };
    let abbrevCard = card.value.toUpperCase() + card.suit.slice(0, 1).toUpperCase();

    return (
      <div className="card-component-container">
        <img className="card-component-image" src={`/images/cards/${abbrevCard}.png`} />
      </div>
    );
  }
}

// {
//   field.cards
//     ? field.cards.map(card => {
//         <div key={`${card.suit}${card.value}`}>{`${card.suit}${card.value}`}</div>;
//       })
//     : null;}
