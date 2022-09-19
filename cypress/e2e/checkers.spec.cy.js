Cypress.config('baseUrl','https://www.gamesforthebrain.com/game/checkers')
describe('Checkers Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Should start new game, make moves and start a new game again', () => {
    cy.startNewGame()
    cy.validateTotalOfPieces("me1.gif",12)
    cy.validateTotalOfPieces("you1.gif",12)
    cy.movePiece("space62","space73")
    cy.movePiece("space73","space64")
    cy.validateTotalOfPieces("you1.gif",11)
    cy.startNewGame()
    cy.validateTotalOfPieces("me1.gif",12)
    cy.validateTotalOfPieces("you1.gif",12)
  })
})