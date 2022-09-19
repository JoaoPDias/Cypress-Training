Cypress.Commands.add('createDeck', () => {
    cy.request('POST','/deck/new/').then((response)=>{
        expect(response.body.success).to.be.true
        expect(response.body.shuffled).to.be.false
        expect(response.body.deck_id).to.not.be.null
        expect(response.body.remaining).to.be.equal(52)
        return response.body.deck_id
      })
})

Cypress.Commands.add('shuffleDeck', (deck_id) => {
    cy.request(`/deck/${deck_id}/shuffle/`).then((response)=>{
        expect(response.body.success).to.be.true
        expect(response.body.shuffled).to.be.true
        expect(response.body.deck_id).to.be.equal(deck_id)
      })
})

Cypress.Commands.add('drawCards', (deck_id, quantity) => {
    cy.request(`/deck/${deck_id}/draw/?count=${quantity}`).then((response)=>{
        expect(response.body.success).to.be.true
        expect(response.body.deck_id).to.be.equal(deck_id)
        expect(response.body.cards).to.have.lengthOf(quantity)
        return response.body.cards.map(card=>card.code)
      })
})

Cypress.Commands.add('createPile', (deck_id,pileName, quantity) => {
    cy.drawCards(deck_id,quantity).then(cardsCode=>{
        let cardsToPile = cardsCode.join(",")
        cy.request(`/deck/${deck_id}/pile/${pileName}/add/?cards=${cardsToPile}`).then((response)=>{
            expect(response.body.success).to.be.true
            expect(response.body.deck_id).to.be.equal(deck_id)
            expect(response.body.piles[pileName]).to.not.be.null
            expect(response.body.piles[pileName].remaining).to.be.equal(quantity)
        })
    });
})

Cypress.Commands.add('listCards', (deck_id,pileName, expectCardsQuantity) => {
    cy.request(`/deck/${deck_id}/pile/${pileName}/list/`).then((response)=>{
        expect(response.body.success).to.be.true
        expect(response.body.deck_id).to.be.equal(deck_id)
        expect(response.body.piles[pileName].cards).to.have.lengthOf(expectCardsQuantity)
        cy.log(response.body.piles[pileName].cards.map(card=>(`${card.value} ${card.suit}`)).join(", "))
    })
});

Cypress.Commands.add('shufflePile', (deck_id,pileName) => {
    cy.request(`/deck/${deck_id}/pile/${pileName}/shuffle/`).then((response)=>{
        expect(response.body.success).to.be.true
        expect(response.body.deck_id).to.be.equal(deck_id)
        expect(response.body.piles[pileName]).to.not.be.null
    })
});

Cypress.Commands.add('drawCardsFromPile', (deck_id,pileName,quantity) => {
    cy.request(`/deck/${deck_id}/pile/${pileName}/draw/?count=${quantity}`).then((response)=>{
        expect(response.body.success).to.be.true
        expect(response.body.deck_id).to.be.equal(deck_id)
        expect(response.body.piles[pileName]).to.not.be.null
        expect(response.body.cards).to.have.lengthOf(quantity)
    })
});