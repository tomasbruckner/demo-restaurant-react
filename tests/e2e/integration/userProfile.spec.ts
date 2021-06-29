describe('User profile', () => {
  it('User profile', function test() {
    cy.mock();
    cy.login();
    cy.visit('http://localhost:3333/user-profile');
    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'Tomas Admin');

    cy.get(`[data-cy=review-detail-restaurant-link]`).first().click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/restaurant/3')
    })
  });
});
