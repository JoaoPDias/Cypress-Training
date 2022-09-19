# Cypress Training Session
In this session, it was created 2 approaches for API Testing and E2E Testing using Cypress with Custom Commands
## API Testing

The API Testing was focused on the [Deck of Card API](http://deckofcardsapi.com/).

There are endpoins to represent the actions of an real deck of cards as Shuffling, Creating Piles, Drawing. We can create a deck and use the **deck_id** as a query parameter for the other requests. 

In the **checkers.spec.cy.js** was created the test using the Custom Commands implemented in the **/support/commands.js**.

## E2E Testing

It was used the website [Games for The Brain](https://www.gamesforthebrain.com/game/checkers/) to do the testing. It was difficult to avoid the usage of wait explicit time during the execution of movements due to an state created by the time processing of the computer method inside the game logic. Aiming to optimize the way of cy.wait was used, it was created a custom command that represent the move pieces actions, as well as the actions to start a new game and validate the board state.

