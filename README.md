Welcome to SUITS! A card-game generator famous in one state!

Below you will find some information on how to navigate through our code.<br>

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
- [Components](#components)
  - [Board/Board.js](#board/board.js)
  - [Board/BoardContext.js](#board/boardcontext.js)
  - [Board/Card.js](#board/card.js)
  - [Board/Deck.js](#board/deck.js)
  - [Board/Field.js](#board/field.js)
  - [Board/Player.js](#board/player.js)
  - [CreateGame/Documentation.js](#creategame/documentation.js)
  - [CreateGame/FormContext.js](#creategame/formcontext.js)
  - [CreateGame/GameImport.js](#creategame/gameimport.js)
  - [CreateGame/ParentForm.js](#creategame/parentform.js)
  - [CreateGame/PhaseForm.js](#creategame/phaseform.js)
  - [CreateGame/StartingRules.js](#creategame/startingrules.js)
  - [CreateGame/WinConditions.js](#creategame/winconditions.js)
- [Game Logic](#game-logic)
  - [CurrentGame.js](#currentgame.js)
  - [Card.js](#card.js)
  - [Deck.js](#deck.js)
  - [Field.js](#field.js)
  - [Player.js](#player.js)

## Folder Structure

The general folders are nested as follows:

```
suits-capstone-fsa/
  public/
    stylesheet/
      style.css
    index.html
  src/
    components/
      Board/
        Board.js
        BoardContext.js
        Card.js
        Deck.js
        Field.js
        Player.js
      CreateGame/
        PhaseForm/
          Documentation.js
          FormContext.js
          GameImport.js
          ParentForm.js
          PhaseForm.js
          StartingRules.js
          WinConditions.js
    utils/
      Game/
        CurrentGame.js
      Card.js
      Deck.js
      Field.js
      Player.js
    App.js
    index.js
  README.md
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Don't forget to `npm install` before `npm start` the first time you open the repo.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

## Components

In `src/components/`, you have the following components:

### Board.js

Here, you'll be able to see the logic for all of the comopnents on the board. This includes each player, their hand, the deck, the field, win phases, and all the game logic behind building a game.

### Board/BoardContext.js

### Board/Card.js

### Board/Deck.js

### Board/Field.js

### Board/Player.js

### CreateGame/Documentation.js

### CreateGame/FormContext.js

### CreateGame/GameImport.js

### CreateGame/ParentForm.js

### CreateGame/PhaseForm.js

### CreateGame/StartingRules.js

### CreateGame/WinConditions.js

## Game Logic

In `utils/`, you will have the following utilities files that hold some our core game logic:

### CurrentGame.js

### Card.js

### Deck.js

### Field.js

### Player.js

## Phase Form explained
