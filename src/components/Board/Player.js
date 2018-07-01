import React, { Component } from 'react';
import Card from './Card';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      reqCard: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ player: this.props.player });
  }

  handleChange(event) {
    //Changes state to card
    this.setState({ reqCard: event.target.value });
  }

  render() {
    let deckValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
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
                <Card key={`${card.suit}${card.value}`} player={this.state.player} card={card} />
              );
            })
          ) : (
            <p>hand hidden, player has {player.hand.length} cards</p>
          )}
        </div>
        <div className="player-score">Score: {player.score}</div>
        <form onSubmit={event => this.props.submitHandler(player, this.state.reqCard, event)}>
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
        <hr />
      </div>
    );
  }
}
