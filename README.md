Welcome to SUITS! A card-game generator famous in one state!

Below you will find some information on how to navigate through our code.<br>

## Table of Contents

- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Playing the Game](#playing-the-game)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
- [Board Components](#board-components)
  - [Board.js](#Board.js)
  - [Card.js](#Card.js)
  - [Deck.js](#Deck.js)
  - [Field.js](#Field.js)
  - [Player.js](#Player.js)
- [CreateGame Components](#creategame-components)
  - [Documentation.js](#documentation.js)
  - [GameImport.js](#gameimport.js)
  - [ParentForm.js](#parentform.js)
  - [PhaseForm.js](#phaseform.js)
  - [StartingRules.js](#startingrules.js)
  - [WinConditions.js](#winconditions.js)
- [Game Logic](#game-logic)
  - [Game Logic](#game-logic)
  - [CurrentGame.js](#currentgame.js)
  - [Card.js](#card.js)
  - [Deck.js](#deck.js)
  - [Field.js](#field.js)
  - [Player.js](#player.js)
- [Developers](#developers)

## Introduction

Welcome to Suits, a card-game generator geared towards game-makers and card-game fanatics alike.

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

## Playing the Game

After running `npm install` and `npm start` and opening [http://localhost:3000](http://localhost:3000), you should be able to begin a game.

1.  Select the number of players and number of cards per hand. You can also add a name to your game by clicking on the 'Suits' logo and typing it in. Click on the right green bar to navigate to the next page.

2.  Select the phases you wish a turn to consist of. On the site, clicking on the help modal on the top right corner will provide you with directions on how to complete this section. Click on the right green bar to navigate to the next page.

3.  Select how your game would be won, and when to check for this - at the end of each phase? At the end of each turn? When the deck is empty? The possibilities are _almost_ endless! Click on the right green bar to navigate to the next page.

4.  Review your game rules. If you wish to change anything, click on the hamburger menu on the top left corner to go back to any form you want to edit. Once you feel comfortable with your choices, you have the choice to save your game to be able to come back and play it. Now, let's play some cards!

5.  The board is really straightforward - it is already set up for the game that you want to play and it will only allow the current player to make allowed moves. Play until the game is over, and the winner is announced!

<!--SECTION THREE-->

## Board Components

In `src/components/Board`, you have the following components:

### Board.js

Here, you'll be able to see the logic for all of the components on the board. This includes each player, their hand, the deck, the field, win phases, and all the game logic behind building a game.

### Card.js

Renders the card components for each player's hand.

### Deck.js

Renders the deck that's on the board components, making it clickable for players to select from if their created game includes it.

### Field.js

Renders the field, or the face up deck, that's on the board components, making it clickable for players to select from if their created game includes it. A field is also used as the 'discard' pile.

### Player.js

This handles the 'request card from another player' aspect of the card game. It also shows and hides the cards as the game allows for currently and inactive players.

<!--SECTION FOUR-->

## CreateGame Components

In `src/components/CreateGame/PhaseForm`, you have the following components:

### Documentation.js

Where we render the create-game instructions in the help module in the upper right hand corner of the screen.

### GameImport.js

Importing a single game upon click of a button, controlled by firebase.

### ParentForm.js

This is the home page. Here, we being in the [StartingRules](#startingrules.js) We also have the code for our hamburger menu on this component.

### PhaseForm.js

One of our more reobust components, this is where a user can actually create the game they want to play. Composed of one form and one form that you can toggle, you can input the rules for your game. If there are any questions, the user can click the help modal on the top right corner of the page to see descriptive instructions on how to fill out the forms on this page.

### StartingRules.js

Here is the logic that's rendered on the ParentForm component. We can find logic for incrementing and decrementing players and cards, as well as changing the name of the game right on the title of the page.

### WinConditions.js

Here we have the front-end for win conditions. This is where we simply render the dropdown with selections on how you can win a game, and when to check for that win condition.

<!--SECTION FIVE-->

## Game Logic

In `utils/`, you will have the following utilities files that hold some our core game logic:

### CurrentGame.js

In this file inside the Game folder, we hold the logic for beginning a game. We have functions for creating each individual player's hand, checking for win conditions, and the most important part of our application - the validator function. In this function, we pass in every current phase and cross reference it with the move that is supposed to be made during that phase, not allowing invalid moves to be done.

### Card.js

This component creates an individual card, made up of a suit and a value.

### Deck.js

This is where the deck is created and shuffled. We also have methods 'getSize' and 'giveCard', which check the size of the deck and give a random card to the player if needed, respectively.

### Field.js

Similar to the [Deck Component](#deck.js), the field consists of face up cards that aren't in a player's hand. It also has methods on it to give a card to a player if needed, or to allow a player to drop a card on it.

### Player.js

Player is class with many methods on it that belong to an individual player. We can create a player's hand; increment their score; give a card to another player; add a card from another player, the deck, or field; and check if a player has 4 of a kind.

# Developers

- [Bernice Marie Abreu](https://github.com/bmabreu)
- [Daniel Castillo](https://github.com/dcastillo3)
- [Dolibeth Estevez](https://github.com/dolibethestevez)
- [Jack Lye](https://github.com/catncradle)
