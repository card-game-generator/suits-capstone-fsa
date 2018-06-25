import React, { Component } from 'react';
import Card from './Card';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { player: '' };
    // this.handleClick = this.handleClick.bind(this);
  }

  //Handles player click
  // handleClick(event) {
  //   console.log(event.target.name);
  // }

  render() {
    let player = this.props.player;
    return (
      <div className={`player-${player.name}`}>
        <button type="button" name="player" className="player-name">
          Name: {player.name}
        </button>
        <div className="player-hand" name="hand">
          Hand:{' '}
          {player.isCurrentPlayer ? (
            player.hand.map(card => {
              return (
                //Card component
                <Card key={`${card.suit}${card.value}`} player={player} card={card} />
              );
            })
          ) : (
            <p>hand hidden, player has {player.hand.length} cards</p>
          )}
        </div>
        <div className="player-score">Score: {player.score}</div>
        <hr />
      </div>
    );
  }
}
