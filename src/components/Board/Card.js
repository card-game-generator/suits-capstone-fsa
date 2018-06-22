import React, { Component } from 'react';

import BoardContext from './BoardContext';

export default class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    let player = this.props.player

    return (
        <BoardContext.Consumer>
            {({state}) => {
                
                let card = player.isCurrentPlayer ? this.props.card : new Array(this.props.card.length).fill({suit: 'hidden', value: 'card'})
                console.log(card)
                return (
                <div className="card-container">
                    <div className={`${card.suit}`}>{card.suit}</div>
                    <div className={`${card.value}`}>{card.value}</div>
                </div>
                )
            }
            // <div className={`card-${this.props.card.suit}${this.props.card.value}`}>
            //     <div className={`card-${this.props.card.suit}`}>{this.props.card.suit}</div>
            //     <div className={`card-${this.props.card.value}`}>{this.props.card.value}</div>
            //  </div>
        }
        </BoardContext.Consumer>
    )
  }
}
