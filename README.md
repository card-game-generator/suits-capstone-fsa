Welcome to SUITS! A card-game generator famous in one state!

Below you will find some information on how to navigate through our code.<br>

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
- [Board Components](#board-components)
  - [Board.js](#board.js)
    <!-- - [BoardContext.js](#boardcontext.js) -->
  - [Card.js](#card.js)
  - [Deck.js](#deck.js)
  - [Field.js](#field.js)
  - [Player.js](#player.js)
- [CreateGame Components](#creategame-components)
  - [Documentation.js](#documentation.js)
    <!-- - [FormContext.js](#formcontext.js) -->
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
- [Playing the Game](#playing-the-game)

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

<!--SECTION ONE-->

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Don't forget to `npm install` before `npm start` the first time you open the repo.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

<!--SECTION TWO-->

## Board Components

In `src/components/Board`, you have the following components:

### Board.js

Here, you'll be able to see the logic for all of the comopnents on the board. This includes each player, their hand, the deck, the field, win phases, and all the game logic behind building a game.

<!-- ### BoardContext.js -->

### Card.js

Renders the card components for each player's hand.

### Deck.js

Renders the deck that's on the board components, making it clickable for players to select from if their created game includes it.

### Field.js

Renders the field, or the face up deck, that's on the board components, making it clickable for players to select from if their created game includes it. A field is also used as the 'discard' pile.

### Player.js

This handles the 'request card from another player' aspect of the card game. It also shows and hides the cards as the game allows for currently and inactive players.

<!--SECTION THREE-->

## CreateGame Components

In `src/components/CreateGame/PhaseForm`, you have the following components:

### Documentation.js

Where we render the create-game instructions in the help module in the upper right hand corner of the screen.

<!-- ### FormContext.js -->

### GameImport.js

Importing a single game upon click of a button, controlled by firebase.

### ParentForm.js

This is the home page.

### PhaseForm.js

### StartingRules.js

### WinConditions.js

<!--SECTION FOUR-->

## Game Logic

In `utils/`, you will have the following utilities files that hold some our core game logic:

### CurrentGame.js

### Card.js

### Deck.js

### Field.js

### Player.js

<!--SECTION FIVE-->

## Playing the Game
