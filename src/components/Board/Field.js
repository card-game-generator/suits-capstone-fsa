import React, { Component } from 'react';
import Card from './Card';

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = { reqCard: 'top' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    //Changes state to card
    this.setState({ reqCard: event.target.value });
  }

  render() {
    let field = this.props.field;
    return (
      <div className="field-container">
        <p>{field.cards.length} cards</p>
        <form onSubmit={event => this.props.submitHandler(field, this.state.reqCard, event)}>
          <label>Request Card: </label>
          <select onChange={this.handleChange}>
            {field.cards.map((card, i) => {
              return (
                <option value={card.value} key={i}>
                  {card.value} {card.suit}
                </option>
              );
            })}
          </select>
          <button type="submit">Request</button>
        </form>
        <Card field={field} />
      </div>
    );
  }
}
