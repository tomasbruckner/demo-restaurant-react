describe('Create review reply', () => {
  it('Create review reply', function test() {
    cy.mock();
    cy.login();
    cy.visit('http://localhost:3333/owned-restaurants');
    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'Owned Restaurants');

    cy.get(`[data-cy=review-reply-dialog-open]`).first().click();
    cy.get('[data-cy=review-reply-dialog-text]').type('text');

    cy.get(`[data-cy=form-dialog-submit]`)
      .click();
  });
});
