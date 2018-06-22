import React, { Component } from 'react';
import Card from './Card';

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  //Handles player click
  handleClick(event) {
    console.log(event.target.name)
  }

  render() {
    let player = this.props.player
    
    return (
      <div className={`player-${player.name}`}>

        {/* This is rendering the player to click */}
        <button type="button" onClick={(event) => this.handleClick(event)} name={player.name} className="player-name">Name: {player.name}</button>
        
        {/* Map players hand */}
        <div className="player-hand">Hand: {player.isCurrentPlayer && player.hand.map(card => {
          return (

            //Card component
            <Card key={`${card.suit}${card.value}`} player={player} card={card}/>

          )
        })}</div>

        {/* Render players score */}
        <div className="player-score">Score: {player.score}</div>

        {/* Dividing line to distinguish players */}
        <hr />

      </div>
    )
  }
}
