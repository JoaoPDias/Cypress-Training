Cypress.config('baseUrl','http://deckofcardsapi.com/api')
describe('Deck of Cards API', () => {
  it('Create a deck, shuffle it, draw cards, create 2 piles, list them, shuffle the first pile and draw cards from both', () => {
    cy.createDeck().then(deck_id=>{
      cy.shuffleDeck(deck_id);
      cy.drawCards(deck_id,3);
      cy.createPile(deck_id,"pile1",5)
      cy.createPile(deck_id,"pile2",5)
      cy.listCards(deck_id,"pile1",5)
      cy.listCards(deck_id,"pile2",5)
      cy.shufflePile(deck_id,"pile1")
      cy.drawCardsFromPile(deck_id,"pile1",2)
      cy.drawCardsFromPile(deck_id,"pile2",3)
    })
  })
})