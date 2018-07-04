import React, { Component } from 'react';
import StartingRules from './StartingRules';
import PhaseForm from './PhaseForm';
import WinForm from './WinConditions';
import db from '../../../firestore';
import Modal from 'react-responsive-modal';
import Documentation from './Documentation';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      formIdx: 1,
      name: 'SUITS',
      players: 1,
      cards: 1,
      turn: [],
      whatToCheck: '',
      whenToCheck: '',
      gameList: [],
      importedGame: '',
      modalOpen: false,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleState = this.handleState.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleImport = this.handleImport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
  }
  componentDidMount() {
    const gameList = [];
    db.collection('games')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          gameList.push({ ...doc.data(), id: doc.id });
        });
      });
    // this.setState(prevState => ({ gameList: [...prevState.gameList, ...gameList] }));

    this.setState({ gameList });
  }

  handleSelect(selectedOption) {
    if (selectedOption) {
      this.setState({ [selectedOption.name]: selectedOption.value });
    }
  }

  //for Modal opening
  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  //for Modal closing
  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleState(stateChanges) {
    let formIdx = this.state.formIdx + 1;
    this.setState({ ...stateChanges, formIdx });

    let hidden = document.getElementById('hamburger-menu').classList.contains('hidden');
    if (hidden) this.showMenu();
  }

  handleChange(event) {
    this.setState({ importedGame: event.target.value });
  }

  //For Jack to view imports, changes index to 10
  handleNavigate(num) {
    let formIdx = num;
    this.setState({ formIdx });
  }

  //For Jack to handle imports
  async handleImport(event) {
    event.preventDefault();
    const game = await db
      .collection('games')
      .doc(`${this.state.importedGame}`)
      .get();
    this.setState({ ...game.data() });
    //Logic here
  }

  showMenu() {
    document.getElementById('hamburger-menu').classList.toggle('hidden');
    document.getElementById('hamburger-button').classList.toggle('menu-open');
  }

  render() {
    let idx = this.state.formIdx;
    const captureRules = this.props.captureRules;
    const { modalOpen } = this.state;

    return (
      <div id="parent-form" className="parent-form">
        <div id="hamburger-menu" className="parent-form-menu hidden">
          <div className="parent-form-title-container">
            <div className="parent-form-menu-icon">
              <i className="fas fa-heart" />
            </div>
            <div className="parent-form-game-title">Suits</div>
          </div>

          {this.state.players > 0 && (
            <div
              onClick={() => this.handleNavigate(1)}
              className="parent-form-menu-section-title-container"
            >
              <div className="parent-form-menu-icon">
                <i className="fas fa-cog" />
              </div>
              <div className="parent-form-menu-title">Starting Overview</div>
            </div>
          )}

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
                <div className="parent-form-menu-cards">Cards: {this.state.cards}</div>
              </div>
            </div>
          </div>

          {this.state.turn.length !== 0 && (
            <div
              onClick={() => this.handleNavigate(2)}
              className="parent-form-menu-section-title-container"
            >
              <div className="parent-form-menu-icon">
                <i className="fas fa-cog" />
              </div>
              <div className="parent-form-menu-title">Turn</div>
            </div>
          )}

          {this.state.turn.length !== 0 && (
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
                            <div className="parent-form-menu-source-content source-content">
                              {phase.source}
                            </div>
                          </div>
                        </div>

                        <div className="parent-form-menu-phase-content phase-content">
                          <div className="parent-form-menu-source-action source-title">
                            Source Action
                          </div>
                          <div className="parent-form-menu-phase-group">
                            <div className="parent-form-menu-phase-icon">&#8627;</div>
                            <div className="parent-form-menu-source-content source-content">
                              {phase.sourceAction}
                            </div>
                          </div>
                        </div>

                        <div className="parent-form-menu-phase-content phase-content">
                          <div className="parent-form-menu-target source-title">Target</div>
                          <div className="parent-form-menu-phase-group">
                            <div className="parent-form-menu-phase-icon">&#8627;</div>
                            <div className="parent-form-menu-source-content source-content">
                              {phase.target}
                            </div>
                          </div>
                        </div>

                        <div className="parent-form-menu-phase-content phase-content">
                          <div className="parent-form-menu-target-action source-title">
                            Target Action
                          </div>
                          <div className="parent-form-menu-phase-group">
                            <div className="parent-form-menu-phase-icon">&#8627;</div>
                            <div className="parent-form-menu-source-content source-content">
                              {phase.targetAction}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {this.state.whatToCheck.length !== 0 &&
            this.state.whenToCheck.length !== 0 && (
              <div
                onClick={() => this.handleNavigate(3)}
                className="parent-form-menu-section-title-container"
              >
                <div className="parent-form-menu-icon">
                  <i className="fas fa-cog" />
                </div>
                <div className="parent-form-menu-title">Victory</div>
              </div>
            )}

          {this.state.whatToCheck.length !== 0 &&
            this.state.whenToCheck.length !== 0 && (
              <div className="parent-form-menu-section-container">
                <div className="menu-box">
                  <div className="parent-form-menu-section-title">Frequency</div>
                  <div className="parent-form-menu-options">
                    <div className="parent-form-menu-name">Time: {this.state.whenToCheck}</div>
                  </div>
                </div>
              </div>
            )}

          {this.state.whatToCheck.length !== 0 &&
            this.state.whenToCheck.length !== 0 && (
              <div className="parent-form-menu-section-container">
                <div className="menu-box">
                  <div className="parent-form-menu-section-title">Condition</div>
                  <div className="parent-form-menu-options">
                    <div className="parent-form-menu-name">Win: {this.state.whatToCheck}</div>
                  </div>
                </div>
              </div>
            )}

          <div className="parent-form-menu-section-title-container bottom-button">
            <div className="parent-form-menu-icon">
              <i className="fas fa-cog" />
            </div>
            <div onClick={() => this.handleNavigate(10)} className="parent-form-menu-title">
              My Games
            </div>
          </div>
        </div>

        <div id="parent-form-main" className="parent-form-main">
          <button id="hamburger-button" onClick={this.showMenu} className="hamburger-button">
            <i className="fas fa-bars" />
          </button>
          <button id="help-button" onClick={this.onOpenModal} className="help-button">
            <i className="fas fa-question-circle" />
          </button>

          <Modal open={modalOpen} onClose={this.onCloseModal} center>
            <Documentation />
          </Modal>

          {idx === 1 ? (
            <StartingRules gameName={this.state.name} handleSubmit={this.handleState} />
          ) : null}
          {idx === 2 ? (
            <PhaseForm gameName={this.state.name} handleSubmit={this.handleState} />
          ) : null}
          {idx === 3 ? (
            <WinForm gameName={this.state.name} handleSubmit={this.handleState} />
          ) : null}
          {idx === 4 ? (
            <div className="review-game-container main-window">
              <div className="review-game">
                <div className="review-game-content">
                  <div className="parent-form-right-title">{this.state.name}</div>
                  <div className="review-screen-container">
                    <div className="review-screen-label">Players:</div>
                    <div className="review-screen-item">{this.state.players}</div>
                    <div className="review-screen-label">Cards per player: </div>
                    <div className="review-screen-item">{this.state.cards}</div>
                    <div className="review-screen-label">Phases:</div>
                    {this.state.turn.map(phase => {
                      return (
                        <div className="review-screen-item" key={phase}>
                          {phase.source} {phase.sourceAction} {phase.target} {phase.targetAction}
                        </div>
                      );
                    })}
                    <div className="review-screen-label">How do win?</div>
                    <div className="review-screen-item">{this.state.whatToCheck}</div>
                    <div className="review-screen-label">When do you check?</div>
                    <div className="review-screen-item">{this.state.whenToCheck}</div>
                  </div>
                  <button
                    onClick={() => {
                      db.collection('games').add(this.state);
                    }}
                  >
                    Save game!
                  </button>
                </div>
              </div>

              <div id="next-button" className="starting-button-next">
                <button
                  className="starting-rules-bottom-button fas fa-chevron-right"
                  type="button"
                  onClick={() => captureRules(this.state)}
                />
              </div>
            </div>
          ) : null}

          {/* JL: Hits Firebase for saved Game Objects */}
          {idx === 10 ? (
            <div className="saved-games-dropdown-container">
              <div className="parent-form-right-title">{this.state.name}</div>
              <div className="saved-games-dropdown">
                <form onSubmit={this.handleImport}>
                  <label>Import Game: </label>

                  <Select
                    clearable={false}
                    value={this.state.importedGame}
                    onChange={this.handleSelect}
                    options={this.state.gameList.map(gameObj => {
                      return { value: gameObj.id, label: gameObj.name, name: 'importedGame' };
                    })}
                  />

                  <button type="submit">Import</button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
