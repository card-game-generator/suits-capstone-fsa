import React, { Component } from 'react';
import Board from './components/Board/Board';
import { createGame } from './utils/Game/CurrentGame';
import ParentForm from './components/CreateGame/PhaseForm/ParentForm';
import './App.css';
import db from './firestore';
class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
      boardSetup: {},
    };
    this.getGameObj = this.getGameObj.bind(this);
  }
  getGameObj(obj) {
    db.collection('games').add(obj);
    const currentGame = createGame(obj.players, obj.cards);
    const { players, deck, field } = currentGame;
    const { whatToCheck, whenToCheck, turn } = obj;
    const boardSetup = { players, deck, field, turn, whatToCheck, whenToCheck };
    this.setState({ boardSetup, show: false });
  }
  render() {
    return (
      <div>
        {this.state.show ? (
          <ParentForm captureRules={this.getGameObj} />
        ) : (
          <Board boardSetup={this.state.boardSetup} />
        )}
        {this.state.boardSetup.whatToCheck}
      </div>
    );
  }
}

export default App;
