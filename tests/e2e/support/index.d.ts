declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    mock(): Chainable<Element>
    login(): Chainable<Element>
  }
}
