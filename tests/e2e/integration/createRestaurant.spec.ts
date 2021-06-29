describe('Create restaurant', () => {
  it('Create restaurant', function test() {
    cy.mock();
    cy.login();
    cy.visit('http://localhost:3333/owned-restaurants');
    cy.get('[data-cy=page-layout-title]').should('be.visible').and('have.text', 'Owned Restaurants');

    cy.get(`[data-cy=restaurant-create-button]`).click();

    cy.get('[data-cy=restaurant-add-name]').type('Restaurant');
    cy.get('[data-cy=restaurant-add-url]').type('https://test.com');
    cy.get('[data-cy=restaurant-add-phone]').type('123456789');
    cy.get('[data-cy=restaurant-add-address]').type('Street 123');
    cy.get('[data-cy=restaurant-add-description]').type('Lorem ipsum...');

    cy.get(`[data-cy=form-dialog-submit]`)
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/restaurant/3')
    });
  });
});
