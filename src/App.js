import React, { Component } from 'react';
import Board from './components/Board/Board';
import { createGame } from './utils/Game/CurrentGame';
import ParentForm from './components/CreateGame/PhaseForm/ParentForm';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const currentGame = createGame(obj.players, obj.cards);
    const { players, deck, field } = currentGame;
    const { whatToCheck, whenToCheck, turn, name } = obj;
    const boardSetup = { players, deck, field, turn, whatToCheck, whenToCheck, name };
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
        <ToastContainer />
      </div>
    );
  }
}

export default App;
