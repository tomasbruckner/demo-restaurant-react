describe('User management', () => {
  it('User management', function test() {
    cy.mock();
    cy.login();
    cy.visit('http://localhost:3333/user-management');
    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'User Management');

    cy.get(`[data-cy=table-edit]`).first().click();
    cy.get(`[data-cy=table-clear]`).first().click();

    cy.get(`[data-cy=table-edit]`).first().click();
    cy.get(`[data-cy=table-check]`).first().click();
  });
});
