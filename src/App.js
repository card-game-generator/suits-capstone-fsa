import React, { Component } from 'react';
import Board from './components/Board/Board';
// import logo from './logo.svg';
import './App.css';
import PhaseForm from './components/CreateGame/PhaseForm/PhaseForm';
const GameContext = React.createContext();

class App extends Component {
  render() {
    return (
      // <GameContext.Provider>
      //   <div className="App">
      //     <header className="App-header">
      //       <img src={logo} className="App-logo" alt="logo" />
      //       <h1 className="App-title">Suits</h1>
      //     </header>
      //     <PhaseForm />
      //   </div>
      // </GameContext.Provider>
      <Board />
    );
  }
}

export default App;
