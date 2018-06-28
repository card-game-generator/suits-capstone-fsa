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
    let deckValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    let field = this.props.field;
    return (
      <div className="field-container">
        Hi I'm the field, I have <p>{field.size} cards</p>
        <form onSubmit={event => this.props.submitHandler(field, this.state.reqCard, event)}>
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
        <Card field={field} />
      </div>
    );
  }
}
