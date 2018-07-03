Welcome to SUITS! A card-game generator famous in one state!

Below you will find some information on how to navigate through our code.<br>

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
- [Components](#components)
  - [Board.js](#board.js)
  - [BoardContext.js](#boardcontext.js)
  - [Card.js](#card.js)
  - [Deck.js](#deck.js)
  - [Field.js](#field.js)
  - [Player.js](#player.js)
  - [Documentation.js](#documentation.js)
  - [FormContext.js](#formcontext.js)
  - [GameImport.js](#gameimport.js)
  - [ParentForm.js](#parentform.js)
  - [PhaseForm.js](#phaseform.js)
  - [StartingRules.js](#startingrules.js)
  - [WinConditions.js](#winconditions.js)
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

### BoardContext.js

### Card.js

### Deck.js

### Field.js

### Player.js

### Documentation.js

### FormContext.js

### GameImport.js

### ParentForm.js

### PhaseForm.js

### StartingRules.js

### WinConditions.js

## Game Logic

In `utils/`, you will have the following utilities files that hold some our core game logic:

### CurrentGame.js

### Card.js

### Deck.js

### Field.js

### Player.js

## Phase Form explained
