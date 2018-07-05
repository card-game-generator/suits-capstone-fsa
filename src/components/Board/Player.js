import React, { Component } from 'react';
import Card from './Card';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqCard: 2,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedOption) {
    if (selectedOption) {
      this.setState({ [selectedOption.name]: selectedOption.value })
    }
  }

  handleChange(event) {
    //Changes state to card
    this.setState({ reqCard: event.target.value });
  }

  render() {
    let deckValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    let player = this.props.player;
    let { submitHandler } = this.props;

    return (
      <div className={`player-${player.name} player-parent-container`}>

        <div className="player-parent-left-container">

          <div className="player-parent-left-group">
            <div className="player-parent-image">
              <i className="fas fa-user-circle med-icon" />
            </div>
          </div>

          <div className="player-parent-left-group">
            <div className="player-parent-cards">
              {player.hand.map((card, index) => {
                return (
                  <div key={`${card}${index}`} className="player-parent-card">
                    <div className="playing-card med-icon" />
                  </div>
                )
              })}
            </div>
          </div>

        </div>


        <div className="player-parent-right-container">
          <div className="player-parent-right-group player-parent-right-group-name-label">
            <div className="player-name-label player-parent-label">Name:</div>
            <div className="player-name">{player.name}</div>
          </div>

          <div className="player-parent-right-group">
            <div className="player-score-label player-parent-label">Score:</div>
            <div className="player-score">{player.score}</div>
          </div>

          <div className="player-parent-right-group select-options">
            
            <div className="label-option-container">
            <Select
              clearable={false}
              value={this.state.reqCard}
              onChange={this.handleSelect}
              options={deckValues.map(deckValue => {
                return (
                  { value: deckValue, label: deckValue, name: 'reqCard' }
                );
              })}
            />
            </div>

            <button className="button-request" type="button" onClick={(event) => submitHandler(player, this.state.reqCard, event)}>Request</button>
          </div>

        </div>
      </div>
    );
  }
}
