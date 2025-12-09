describe('example to-do app', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8000/stocks', { fixture: 'stocks.json' }).as('getStocks')
    cy.intercept('GET', 'http://localhost:8000/stock/*', { fixture: 'stock.json' }).as('getStock')
    cy.intercept('GET', 'http://localhost:8000/predict/*', { fixture: 'predict.json' }).as('getPredict')
  })

  it('Should have welcome text', () => {
    cy.visit('/')
    cy.get('header').first().should('have.text', 'Welcome to the Stock Dashboard')
  })
})
