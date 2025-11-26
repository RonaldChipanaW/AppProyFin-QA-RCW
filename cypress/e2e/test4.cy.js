describe('My First Test', () => {
    it('clicks the link "type"', () => {
      cy.visit('https://example.cypress.io')
      cy.contains('Commands')
      cy.contains('get').click()
    })
    it('prueba de test formulario"', () => {
      cy.visit('https://example.cypress.io')
      // First, navigate to the page where the form exists
      // Be more specific to click the visible link in the main content
      cy.get('.home-list').contains('Querying').click()
      cy.get('.query-form').within(() => {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email')
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      })
    })
  })