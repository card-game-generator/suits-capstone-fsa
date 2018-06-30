import React, { Component } from 'react';
import StartingRules from './StartingRules';
import PhaseForm from './PhaseForm';
import WinForm from './WinConditions';
// import { getGameObj } from '../../Board/BoardContext';

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      formIdx: 1,
      name: '',
      players: 0,
      cards: 0,
      turn: [],
      whatToCheck: '',
      whenToCheck: '',
    };
    this.handleState = this.handleState.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  handleState(stateChanges) {
    let formIdx = this.state.formIdx + 1;
    this.setState({ ...stateChanges, formIdx });
  }
  handleGameStart() { }

  showMenu() {
    document.getElementById("hamburger-menu").classList.toggle('hidden');
    document.getElementById("hamburger-button").classList.toggle('menu-open');
  }

  render() {
    let idx = this.state.formIdx;
    const captureRules = this.props.captureRules;
    return (
      <div id="parent-form" className="parent-form">

        <div id="hamburger-menu" className="parent-form-menu hidden">

          <div className="parent-form-title-container">
            <div className="parent-form-menu-icon"><i className="fas fa-heart"></i></div>
            <div className="parent-form-game-title">Suits</div>
          </div>

          <div className="parent-form-menu-section-title-container">
            <div className="parent-form-menu-icon"><i className="fas fa-cog"></i></div>
            <div className="parent-form-menu-title">Starting Overview</div>
          </div>

          <div className="parent-form-menu-section-container">
            <div className="menu-box">
              <div className="parent-form-menu-section-title">Game</div>
              <div className="parent-form-menu-options">
                <div className="parent-form-menu-name">Name: {this.state.name}</div>
              </div>
            </div>
          </div>

          <div className="parent-form-menu-section-container">
            <div className="menu-box">
              <div className="parent-form-menu-section-title">Options</div>
              <div className="parent-form-menu-options">
                <div className="parent-form-menu-players">Players: {this.state.players}</div>
                <div className="parent-form-menu-cards">Cards: {this.state.players}</div>
              </div>
            </div>
          </div>

          {this.state.turn.length !== 0 && <div className="parent-form-menu-section-title-container">
            <div className="parent-form-menu-icon"><i className="fas fa-cog"></i></div>
            <div className="parent-form-menu-title">Turn</div>
          </div>}

          <div className="parent-form-menu-section-container">
            {this.state.turn.map((phase, index) => {
              return (
                <div key={`${phase.source}${index}`} className="menu-box bottom-border">
                  <div className="parent-form-menu-options phase-container">
                    <div className="parent-form-menu-section-title">Phase {index + 1}</div>
                    <div className="parent-form-menu-phases">


                      <div className="parent-form-menu-phase-content phase-content">
                        <div className="parent-form-menu-source source-title">Source</div>
                        <div className="parent-form-menu-phase-group">
                          <div className="parent-form-menu-phase-icon">&#8627;</div>
                          <div className="parent-form-menu-source-content source-content">{phase.source}</div>
                        </div>
                      </div>

                      <div className="parent-form-menu-phase-content phase-content">
                        <div className="parent-form-menu-source-action source-title">Source Action</div>
                        <div className="parent-form-menu-phase-group">
                          <div className="parent-form-menu-phase-icon">&#8627;</div>
                          <div className="parent-form-menu-source-content source-content">{phase.sourceAction}</div>
                        </div>
                      </div>

                      <div className="parent-form-menu-phase-content phase-content">
                        <div className="parent-form-menu-target source-title">Target</div>
                        <div className="parent-form-menu-phase-group">
                          <div className="parent-form-menu-phase-icon">&#8627;</div>
                          <div className="parent-form-menu-source-content source-content">{phase.target}</div>
                        </div>
                      </div>

                      <div className="parent-form-menu-phase-content phase-content">
                        <div className="parent-form-menu-target-action source-title">Target Action</div>
                        <div className="parent-form-menu-phase-group">
                          <div className="parent-form-menu-phase-icon">&#8627;</div>
                          <div className="parent-form-menu-source-content source-content">{phase.targetAction}</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>


        <div id="parent-form-main" className="parent-form-main">
          <button id="hamburger-button" onClick={this.showMenu} className="hamburger-button"><i className="fas fa-bars"></i></button>
          {idx === 1 ? <StartingRules handleSubmit={this.handleState} /> : null}
          {idx === 2 ? <PhaseForm handleSubmit={this.handleState} /> : null}
          {idx === 3 ? (
            <div>
              <WinForm handleSubmit={this.handleState} />
              win rules what to check = {this.state.whatToCheck} when to check ={' '}
              {this.state.whenToCheck}
            </div>
          ) : null}
          {idx === 4 ? (
            <div className="parent-form-review-game">
              <div className="parent-form-right-title">Suits</div>
              {this.state.turn.map(phase => {
                return (
                  <div key={phase}>
                    just a div showing phase {phase.source} {phase.sourceAction} {phase.target}
                    {phase.targetAction}
                  </div>
                );
              })}

              <button
                onClick={() => {
                  captureRules(this.state);
                }}
              >
                Play Game!
          </button>

            </div>
          ) : null}

          {/* <div>players and cards populate here, maybe another subComponent</div>
      <div>
        {idx === 1 ? <StartingRules handleSubmit={this.handleState} /> : null}
        {idx === 2 ? <PhaseForm handleSubmit={this.handleState} /> : null}
        {idx === 3 ? <WinForm handleSubmit={this.handleState} /><div>
          win rules what to check = {this.state.whatToCheck} when to check ={' '}
          {this.state.whenToCheck}
        </div> : null}
        <div>players and cards populate here, maybe another subComponent</div>
        <div>
          just here to show local state of parent Number of players {this.state.players} Number of
          cards for each player {this.state.cards}
        </div> */}
        </div>
        {/* <div className="parent-form-next"><i className="fas fa-chevron-right"></i></div> */}
      </div>
    );
  }
}
