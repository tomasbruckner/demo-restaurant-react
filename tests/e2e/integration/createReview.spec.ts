describe('Create review', () => {
  it('Create review', function test() {
    cy.mock();
    cy.login();
    cy.visit('http://localhost:3333/restaurant/1');
    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'Marvel Bar');

    cy.get(`[data-cy=review-dialog-open]`).first().click();

    cy.get('[data-cy=review-dialog-title]').type('Title');
    cy.get('[data-cy=review-dialog-review]').type('Review');

    cy.get(`[data-cy=form-dialog-submit]`)
      .click();
  });
});
