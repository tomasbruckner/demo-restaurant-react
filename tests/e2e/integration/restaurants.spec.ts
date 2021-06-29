describe('Create restaurant', () => {
  it('Create restaurant', function test() {
    cy.mock();
    cy.login();
    cy.visit('http://localhost:3333/restaurants');

    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'Restaurants');
    cy.get('[data-cy=restaurant-list-item]').first().click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/restaurant/1')
    });

    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'Marvel Bar');
  });
});
