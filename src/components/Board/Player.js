import React, { Component } from 'react';
import Card from './Card';

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    console.log(event.target.name)
  }

  render() {
    let player = this.props.player
    
    return (
      <div className={`player-${player.name}`}>
        <button type="button" onClick={(event) => this.handleClick(event)} name={player.name} className="player-name">Name: {player.name}</button>
        <div className="player-hand">Hand: {player.isCurrentPlayer && player.hand.map(card => {
          return (
            <Card key={`${card.suit}${card.value}`} player={player} card={card}/>
          )
        })}</div>
        <div className="player-score">Score: {player.score}</div>
        <hr />
      </div>
    )
  }
}
