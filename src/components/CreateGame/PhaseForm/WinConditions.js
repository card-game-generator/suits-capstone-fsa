import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let state = {
  whatToCheck: 'Player with highest score',
  whenToCheck: 'When deck is empty',
};
export default class WinConditions extends Component {
  constructor() {
    super();
    //Retrieve last state
    this.state = state;

    //bind all click functions
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillUnmount() {
    //remember state for next mount
    state = this.state;
  }

  //sets source, and target
  handleSelect(selectedOption) {
    if (selectedOption) {
      this.setState({ [selectedOption.name]: selectedOption.value })
    }
  }

  //sets the state upon selection of whenToCheck & whatToCheck options
  handleToggle(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const { whatToCheck, whenToCheck } = this.state;
    const name = this.props.gameName;

    return (
      <div className="win-condition-container main-window">
        <div className="win-condition">
          <div className="win-condition-form">
            <div className="parent-form-right-title">{name}</div>

            <div className="form-dropdown">

              <div className="win-condition-dropdown-container dropdown-container-box">

                <div className="label-option-container">
                  <label>How Do You Win?</label>
                  <Select
                    clearable={false}
                    value={this.state.whatToCheck}
                    onChange={this.handleSelect}
                    options={[
                      { value: 'Player with highest score', label: 'High Score', name: 'whatToCheck' },
                      { value: 'Player with most cards', label: 'Most Cards', name: 'whatToCheck' },
                      { value: 'Player with least cards', label: 'Least Cards', name: 'whatToCheck' },
                    ]}
                  />
                </div>

                <div className="label-option-container">
                  <label>When Do You Check?</label>
                  <Select
                    clearable={false}
                    value={this.state.whenToCheck}
                    onChange={this.handleSelect}
                    options={[
                      { value: 'When deck is empty', label: 'Empty Deck', name: 'whenToCheck' },
                    ]}
                  />
                </div>

              </div>

            </div>


          </div>

          <div className="win-condition-bottom-container bottom-container">
            <div className="win-condition-bottom-container-float bottom-container-float">

              <div className="bottom-content">
                <div className="bottom-content-group">
                  <div className="win-condition-what-to-check">{this.state.whatToCheck}</div>
                </div>
              </div>

              <div className="bottom-content">
                <div className="bottom-content-group">
                  <div className="win-condition-when-to-check">{this.state.whenToCheck}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div id="next-button" className="starting-button-next"><button className="starting-rules-bottom-button fas fa-chevron-right" type="button" onClick={() => handleSubmit({ whatToCheck, whenToCheck })}></button></div>
      </div>
    );
  }
}
