import React, { Component } from 'react';

import BoardContext from './BoardContext';

//This component renders out our card and receives props from the player
export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let player = this.props.player;

    return (
      <BoardContext.Consumer>
        {({ state }) => {
          let card = player.isCurrentPlayer
            ? this.props.card
            : new Array(this.props.card.length).fill({ suit: 'hidden', value: 'card' });
          return (
            <div className="card-container">
              <div name="card" className={`${card.suit} ${card.value}`}>
                {card.suit}
                {card.value}
              </div>
            </div>
          );
        }}
      </BoardContext.Consumer>
    );
  }
}
