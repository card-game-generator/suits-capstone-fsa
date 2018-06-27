import React, { Component } from 'react';
import Board from './components/Board/Board';
import StartingRules from './components/CreateGame/PhaseForm/StartingRules';
import WinConditions from './components/CreateGame/PhaseForm/WinConditions';

import ParentForm from './components/CreateGame/PhaseForm/ParentForm';
import './App.css';
import Test from './components/Board/test';

//  getGameObj(obj) {
//   console.log(obj);
//   currentGame = createGame(obj.players, obj.cards);
//   turn = obj.turn;
//   whatToCheck = obj.whatToCheck;
//   whenToCheck = obj.whenToCheck;
//   console.log(currentGame, turn, whatToCheck, whenToCheck, 'my defined states eventually');
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }
  getGameObj(obj) {
    // console.log(obj);
    // currentGame = createGame(obj.players, obj.cards);
    // turn = obj.turn;
    // whatToCheck = obj.whatToCheck;
    // whenToCheck = obj.whenToCheck;
    // console.log(currentGame, turn, whatToCheck, whenToCheck, 'my defined states eventually');
  }
  render() {
    return <div>{this.state.show ? <ParentForm /> : <Board />}</div>;
  }
}

export default App;
