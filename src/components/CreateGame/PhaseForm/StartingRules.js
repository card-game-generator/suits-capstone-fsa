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
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  incrementPlayers() {
    let players = this.state.players + 1;
    this.state.players < 4
      ? this.setState({
        players,
      })
      : alert('No more than 4 players allowed!');
  }

  incrementCards() {
    let cards = this.state.cards + 1;
    this.state.cards < 53
      ? this.setState({
        cards,
      })
      : alert('No more than 52 cards allowed!');
  }

  decrementPlayers() {
    let players = this.state.players - 1;
    this.state.players >= 1 ? this.setState({ players }) : '';
  }

  decrementCards() {
    let cards = this.state.cards - 1;
    this.state.cards > 0 ? this.setState({ cards }) : '';
  }
  // handleSubmit() {
  //   let { players, cards } = this.state;
  //   console.log(this.props.handleSubmit, 'hey', this.setState);
  //   this.props.handleSubmit();
  // }
  render() {
    const handleSubmit = this.props.handleSubmit;
    let playerArr = new Array(this.state.players).fill('player');
    let cardArr = [];
    this.state.cards > 0 ? (cardArr = new Array(this.state.cards).fill('card')) : [];
    return (
      <div className="starting-rules">
        <div className="starting-rules-form">
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
          <button type="button" onClick={() => handleSubmit({ ...this.state })}>
            Set initial rules
        </button>
        </div>

        <div className="starting-rules-icons-container">
          {playerArr.map((player, index) => {
            return (
              <div key={`${player}${index + 1}`} className="starting-rules-icons">
                <div className={`starting-rules-${player}${index + 1}`}>{player}{index + 1}</div>
                {cardArr.map((card, index) => {
                  return (
                    <div key={`${card}${index}`} className="starting-rules-card">Card</div>
                  )
                })
                }
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
