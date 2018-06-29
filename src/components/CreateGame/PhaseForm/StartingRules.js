import React, { Component } from 'react';

export default class StartRules extends Component {
  constructor() {
    super();
    this.state = {
      players: 1,
      cards: 0,
      name: ''
    };
    this.incrementPlayers = this.incrementPlayers.bind(this);
    this.incrementCards = this.incrementCards.bind(this);
    this.decrementPlayers = this.decrementPlayers.bind(this);
    this.decrementCards = this.decrementCards.bind(this);
    this.handleName = this.handleName.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.moveNextButton = this.moveNextButton.bind(this);
  }

  // componentDidMount() {
  //   this.moveNextButton();
  // }

  handleName(event) {
    let name = event.target.value
    this.setState({ name })
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
    let dealtCards = this.state.players * this.state.cards
    dealtCards < 53
      ? this.setState({
        cards,
      })
      : alert('Bro...we only have 52 cards in the deck.');
  }

  decrementPlayers() {
    let players = this.state.players - 1;
    this.state.players >= 1 ? this.setState({ players }) : '';
  }

  decrementCards() {
    let cards = this.state.cards - 1;
    this.state.cards > 0 ? this.setState({ cards }) : '';
  }

  //move next button to right side, to keep page responsive
  // moveNextButton() {
  //   let main = document.getElementById('parent-form');
  //   let button = document.getElementById('next-button');
  //   main.appendChild(button);
  // }

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
      <div className="starting-container">
        <div className="starting-rules">
          <div className="starting-rules-form">
            <div className="parent-form-right-title">Suits</div>
            <div className="starting-rules-name-container">
              <input onChange={this.handleName} value={this.state.name}/>
            </div>
            <div className="starting-rules-options-container">
              <div className="starting-rules-players">
                <div className="starting-rules-players-title">Players</div>
                <div className="starting-rules-players-count-container">
                  <div className="starting-rules-players-count">{this.state.players}</div>
                  <div className="starting-rules-players-buttons">
                    <button name="players" onClick={this.incrementPlayers}><i className="fas fa-sort-up"></i>

                    </button>
                    <button name="players" onClick={this.decrementPlayers}><i className="fas fa-sort-down"></i>

                    </button>
                  </div>
                </div>
              </div>
              <div className="starting-rules-cards">
                <div className="starting-rules-cards-title">Cards</div>
                <div className="starting-rules-cards-count-container">
                  <div className="starting-rules-cards-count">{this.state.cards}</div>
                  <div className="starting-rules-cards-buttons">
                    <button name="cards" onClick={this.incrementCards}><i className="fas fa-sort-up"></i>

                    </button>
                    <button name="cards" onClick={this.decrementCards}><i className="fas fa-sort-down"></i>

                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="starting-rules-bottom-container">
            {playerArr.map((player, index) => {
              return (
                <div key={`${player}${index + 1}`} className="starting-rules-bottom-icons">
                  <div className={`starting-rules-bottom-icons-${player}${index + 1}`}><i className="fas fa-user-circle med-icon"></i></div>
                  <div className="starting-rules-bottom-icons-cards">
                    {cardArr.map((card, index) => {
                      return (
                        <div key={`${card}${index}`} className="starting-rules-bottom-icons-card"><div className="playing-card med-icon"></div></div>
                      )
                    })
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div id="next-button" className="starting-button-next"><button className="starting-rules-bottom-button fas fa-chevron-right" type="button" onClick={() => handleSubmit({ ...this.state })}></button></div>
      </div>
    );
  }
}
