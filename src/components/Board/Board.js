import React, { Component } from 'react';
import Player from './Player';

import BoardContext from './BoardContext';

export default class Board extends Component {
  constructor() {
    super();

    //deck assumes that we have 4 players with 7 cards, hence 52-28 = 24 cards.
    this.state = { 
        deck: 24, 
        field: 0,
        players: [{
            hand: [{suit: 'hearts', value: '6'},{suit: 'club', value: '1'},{suit: 'spade', value: '9'},{suit: 'diamond', value: '4'}],
            score: 4,
            name: 'Player 1',
            isCurrentPlayer: true
        }, {
            hand: [{suit: 'diamond', value: '8'},{suit: 'spade', value: '3'},{suit: 'spade', value: 'A'},{suit: 'diamond', value: 'Q'}],
            score: 6,
            name: 'Player 2',
            isCurrentPlayer: false
        }]
    };
  }

  handleClick(event) {
    console.log(event.target.name)
  }

  render() {
    return (
        <BoardContext.Provider value={{state: this.state}}>
        <div className="game-board">
            <div className="player-container">
                {this.state.players.map(player => {
                    return (
                        <Player key={player.name} player={player}/>
                        )
                })}
                
            </div>
            <button onClick={(event) => this.handleClick(event)} name={this.state.deck} className="game-deck">
                THIS IS THE DECK
            </button>
        </div>
        </BoardContext.Provider>
    );
  }
}
