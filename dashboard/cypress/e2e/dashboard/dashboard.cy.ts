describe('example to-do app', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8000/stocks', { fixture: 'stocks.json' }).as('getStocks')
    cy.intercept('GET', 'http://localhost:8000/stock/*', { fixture: 'stock.json' }).as('getStock')
    cy.intercept('GET', 'http://localhost:8000/predict/*', { fixture: 'predict.json' }).as('getPredict')
  })

  it('Validate page layout', () => {
    cy.visit('/')

    cy.prompt([
      'Make sure there is welcome text on the page',
      "Verify that there is a sidebar with different stocks listed and their prices",
      'Verify there is a searchbar located in the sidebar to search for stocks'
    ])
  })

  it('Verify that the search bar works', () => {
    cy.visit('/')

    cy.prompt([
      'Make sure a searchbar exists on the sidebar',
      "Type in the word 'Apple' into the searchbar and verify that the 'AAPL' stock is visible",
      'Click on the APPL stock from the sidebar and verify it takes you to the \'AAPL\' stock page'
    ])
  })

  it('Verify making a prediction works', () => {
    cy.visit('/')

    cy.prompt([
      'Click on the AAPL stock in the sidebar',
      "Verify there are different stats about the stock such as change, high, close, open",
      'Click the Predict button and verify that a green block appears with the text Buy'
    ])
  })
})
