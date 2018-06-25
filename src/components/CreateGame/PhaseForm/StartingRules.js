import React, { Component } from 'react';

export default class StartRules extends Component {
  constructor() {
    super();
    this.state = {
      players: 1,
      cards: 0,
    };
    this.incrementPlayers = this.incrementPlayers.bind(this);
    this.incrementCards = this.incrementCards.bind(this);

    this.decrementPlayers = this.decrementPlayers.bind(this);
    this.decrementCards = this.decrementCards.bind(this);
  }

  incrementPlayers(event) {
    this.state.players < 4
      ? this.setState({
          name: this.state[event.target.name]++,
        })
      : alert('No more than 4 players allowed!');
  }

  incrementCards(event) {
    this.state.cards < 53
      ? this.setState({
          name: this.state[event.target.name]++,
        })
      : alert('No more than 52 cards allowed!');
  }

  decrementPlayers(event) {
    this.state.players >= 1 ? this.setState({ name: this.state[event.target.name]-- }) : '';
  }

  decrementCards(event) {
    this.state.cards > 0 ? this.setState({ name: this.state[event.target.name]-- }) : '';
  }

  render() {
    let playerArr = new Array(this.state.players).fill('player');
    let cardArr = [];
    this.state.cards > 0 ? (cardArr = new Array(this.state.cards).fill('card')) : [];
    let playerIdx = 0;
    let cardIdx = 0;

    console.log('STATE:', this.state);
    return (
      <div>
        <div>
          Players: {this.state.players}
          <button name="players" onClick={this.incrementPlayers}>
            +
          </button>
          <button name="players" onClick={this.decrementPlayers}>
            -
          </button>
        </div>
        <div>
          Cards: {this.state.cards}
          <button name="cards" onClick={this.incrementCards}>
            +
          </button>
          <button name="cards" onClick={this.decrementCards}>
            -
          </button>
        </div>
        <div>
          {playerArr.map(player => {
            {
              playerIdx++;
            }
            return <div key={playerIdx}>{player}</div>;
          })}
        </div>
        <div>
          {cardArr.map(card => {
            {
              cardIdx++;
            }
            return <div key={cardIdx}>{card}</div>;
          })}
        </div>
      </div>
    );
  }
}
