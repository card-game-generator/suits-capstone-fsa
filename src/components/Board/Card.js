import React, { Component } from 'react';

//This component renders out our card and receives props from the player/field
export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let player = this.props.player || null;
    let field = this.props.field || null;

    return (
      <div>
        TODO rewrite file once consumer is implemented
        {player.isCurrentPlayer || field ? <div>card</div> : null}
        hiiiiiiiiiiiiisdjfkdjslkfjldsjkl
      </div>
    );
  }
}
